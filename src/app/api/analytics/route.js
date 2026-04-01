import { NextResponse } from "next/server";

/**
 * GA4 Analytics Data API proxy.
 *
 * Required env vars:
 *   GOOGLE_SERVICE_ACCOUNT_EMAIL  – service account email
 *   GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY – PEM private key (with \n)
 *   GA4_PROPERTY_ID – numeric GA4 property id
 *   ANALYTICS_PASSWORD – simple password to protect this route
 */

/* ──────────────────────── helpers ──────────────────────── */

/**
 * Create a signed JWT for the Google Analytics Data API.
 * We avoid heavy SDKs and use native Web Crypto + base64.
 */
async function createSignedJwt(email, privateKeyPem) {
  const header = { alg: "RS256", typ: "JWT" };
  const now = Math.floor(Date.now() / 1000);
  const payload = {
    iss: email,
    scope: "https://www.googleapis.com/auth/analytics.readonly",
    aud: "https://oauth2.googleapis.com/token",
    iat: now,
    exp: now + 3600,
  };

  const enc = new TextEncoder();
  const b64url = (buf) =>
    btoa(String.fromCharCode(...new Uint8Array(buf)))
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");
  const b64urlStr = (str) =>
    btoa(str).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");

  const headerB64 = b64urlStr(JSON.stringify(header));
  const payloadB64 = b64urlStr(JSON.stringify(payload));
  const signingInput = `${headerB64}.${payloadB64}`;

  // Import RSA private key
  const pemBody = privateKeyPem
    .replace(/-----BEGIN PRIVATE KEY-----/g, "")
    .replace(/-----END PRIVATE KEY-----/g, "")
    .replace(/\s/g, "");
  const binaryKey = Uint8Array.from(atob(pemBody), (c) => c.charCodeAt(0));

  const cryptoKey = await crypto.subtle.importKey(
    "pkcs8",
    binaryKey,
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const signature = await crypto.subtle.sign(
    "RSASSA-PKCS1-v1_5",
    cryptoKey,
    enc.encode(signingInput)
  );

  return `${signingInput}.${b64url(signature)}`;
}

async function getAccessToken() {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const rawKey = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY;
  if (!email || !rawKey) throw new Error("Missing service account credentials.");

  // Handle escaped newlines from env
  const privateKey = rawKey.replace(/\\n/g, "\n");
  const jwt = await createSignedJwt(email, privateKey);

  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Token exchange failed: ${text}`);
  }

  const data = await res.json();
  return data.access_token;
}

async function runReport(accessToken, propertyId, body) {
  const url = `https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runReport`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`GA4 runReport failed: ${text}`);
  }
  return res.json();
}

/* ──────────────────────── route ──────────────────────── */

export async function POST(request) {
  try {
    const { password, dateRange = "30days" } = await request.json();

    // Simple password gate
    if (password !== process.env.ANALYTICS_PASSWORD) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const propertyId = process.env.GA4_PROPERTY_ID;
    if (!propertyId) {
      return NextResponse.json(
        { error: "GA4_PROPERTY_ID not configured" },
        { status: 500 }
      );
    }

    // Map date range presets to GA4 date range
    const dateRangeMap = {
      today: { startDate: "today", endDate: "today" },
      yesterday: { startDate: "yesterday", endDate: "yesterday" },
      "7days": { startDate: "7daysAgo", endDate: "today" },
      "30days": { startDate: "30daysAgo", endDate: "today" },
      "60days": { startDate: "60daysAgo", endDate: "today" },
    };
    const range = dateRangeMap[dateRange] || dateRangeMap["30days"];

    const accessToken = await getAccessToken();

    // ─── 1. Summary totals ───
    const summaryReport = await runReport(accessToken, propertyId, {
      dateRanges: [range],
      metrics: [
        { name: "activeUsers" },
        { name: "sessions" },
        { name: "screenPageViews" },
        { name: "eventCount" },
        { name: "userEngagementDuration" },
      ],
    });

    // ─── 2. Daily active users (last 30 days) ───
    const dailyReport = await runReport(accessToken, propertyId, {
      dateRanges: [range],
      dimensions: [{ name: "date" }],
      metrics: [
        { name: "activeUsers" },
        { name: "sessions" },
        { name: "screenPageViews" },
      ],
      orderBys: [{ dimension: { dimensionName: "date" } }],
    });

    // ─── 3. Top events (custom) ───
    const eventsReport = await runReport(accessToken, propertyId, {
      dateRanges: [range],
      dimensions: [{ name: "eventName" }],
      metrics: [
        { name: "eventCount" },
        { name: "totalUsers" },
      ],
      orderBys: [
        { metric: { metricName: "eventCount" }, desc: true },
      ],
      limit: 25,
    });

    // ─── 4. Top pages ───
    const pagesReport = await runReport(accessToken, propertyId, {
      dateRanges: [range],
      dimensions: [{ name: "pagePath" }],
      metrics: [
        { name: "screenPageViews" },
        { name: "activeUsers" },
        { name: "userEngagementDuration" },
      ],
      orderBys: [
        { metric: { metricName: "screenPageViews" }, desc: true },
      ],
      limit: 15,
    });

    // ─── 5. Traffic sources ───
    const sourcesReport = await runReport(accessToken, propertyId, {
      dateRanges: [range],
      dimensions: [
        { name: "sessionSource" },
        { name: "sessionMedium" },
      ],
      metrics: [
        { name: "sessions" },
        { name: "activeUsers" },
      ],
      orderBys: [
        { metric: { metricName: "sessions" }, desc: true },
      ],
      limit: 15,
    });

    // ─── 6. Devices ───
    const devicesReport = await runReport(accessToken, propertyId, {
      dateRanges: [range],
      dimensions: [{ name: "deviceCategory" }],
      metrics: [
        { name: "activeUsers" },
        { name: "sessions" },
      ],
      orderBys: [
        { metric: { metricName: "activeUsers" }, desc: true },
      ],
    });

    // ─── 7. Cities (top 10) ───
    const citiesReport = await runReport(accessToken, propertyId, {
      dateRanges: [range],
      dimensions: [{ name: "city" }],
      metrics: [
        { name: "activeUsers" },
        { name: "sessions" },
      ],
      orderBys: [
        { metric: { metricName: "activeUsers" }, desc: true },
      ],
      limit: 10,
    });

    // ─── 8. Custom funnel events (A/B test related) ───
    const abTestReport = await runReport(accessToken, propertyId, {
      dateRanges: [range],
      dimensions: [
        { name: "eventName" },
      ],
      metrics: [
        { name: "eventCount" },
        { name: "totalUsers" },
      ],
      dimensionFilter: {
        filter: {
          fieldName: "eventName",
          inListFilter: {
            values: [
              "bolsa_cta_view",
              "bolsa_cta_click",
              "bolsa_cta_click_url",
              "challenge_modal_view",
              "challenge_modal_view_url",
              "challenge_accepted",
              "challenge_declined",
              "entry_gate_view",
              "entry_gate_accepted",
              "entry_gate_declined",
            ],
          },
        },
      },
      orderBys: [
        { metric: { metricName: "eventCount" }, desc: true },
      ],
      limit: 50,
    });

    // ─── 9. Hourly pattern ───
    const hourlyReport = await runReport(accessToken, propertyId, {
      dateRanges: [range],
      dimensions: [{ name: "hour" }],
      metrics: [
        { name: "activeUsers" },
        { name: "eventCount" },
      ],
      orderBys: [{ dimension: { dimensionName: "hour" } }],
    });

    return NextResponse.json({
      summary: summaryReport,
      daily: dailyReport,
      events: eventsReport,
      pages: pagesReport,
      sources: sourcesReport,
      devices: devicesReport,
      cities: citiesReport,
      abTest: abTestReport,
      hourly: hourlyReport,
    });
  } catch (err) {
    console.error("[Analytics API]", err);
    return NextResponse.json(
      { error: err.message || "Internal server error" },
      { status: 500 }
    );
  }
}
