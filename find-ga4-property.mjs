/**
 * Script to discover the GA4 Property ID linked to this Firebase project.
 * Uses the Google Analytics Admin API to list all accessible accounts/properties.
 */

import { readFileSync } from "fs";
import { webcrypto } from "crypto";

const globalCrypto = webcrypto;

const SA_FILE = "./swanapolis-firebase-adminsdk-fbsvc-d59bebad30.json";
const sa = JSON.parse(readFileSync(SA_FILE, "utf8"));

async function createSignedJwt(email, privateKeyPem, scope) {
  const header = { alg: "RS256", typ: "JWT" };
  const now = Math.floor(Date.now() / 1000);
  const payload = {
    iss: email,
    scope,
    aud: "https://oauth2.googleapis.com/token",
    iat: now,
    exp: now + 3600,
  };

  const enc = new TextEncoder();
  const b64url = (buf) =>
    Buffer.from(buf).toString("base64url");
  const b64urlStr = (str) =>
    Buffer.from(str).toString("base64url");

  const headerB64 = b64urlStr(JSON.stringify(header));
  const payloadB64 = b64urlStr(JSON.stringify(payload));
  const signingInput = `${headerB64}.${payloadB64}`;

  const pemBody = privateKeyPem
    .replace(/-----BEGIN PRIVATE KEY-----/g, "")
    .replace(/-----END PRIVATE KEY-----/g, "")
    .replace(/\s/g, "");
  const binaryKey = Buffer.from(pemBody, "base64");

  const cryptoKey = await globalCrypto.subtle.importKey(
    "pkcs8",
    binaryKey,
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const signature = await globalCrypto.subtle.sign(
    "RSASSA-PKCS1-v1_5",
    cryptoKey,
    enc.encode(signingInput)
  );

  return `${signingInput}.${b64url(signature)}`;
}

async function getAccessToken(scope) {
  const jwt = await createSignedJwt(sa.client_email, sa.private_key, scope);
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt,
    }),
  });
  const data = await res.json();
  if (!res.ok) {
    console.error("Token error:", data);
    process.exit(1);
  }
  return data.access_token;
}

async function main() {
  console.log("🔍 Buscando informações com a service account:", sa.client_email);
  console.log("📂 Projeto Firebase:", sa.project_id);
  console.log("");

  // Try 1: GA Admin API - list account summaries
  console.log("── Tentativa 1: GA Admin API (listar contas/propriedades) ──");
  try {
    const token = await getAccessToken("https://www.googleapis.com/auth/analytics.readonly");
    const res = await fetch(
      "https://analyticsadmin.googleapis.com/v1beta/accountSummaries",
      { headers: { Authorization: `Bearer ${token}` } }
    );
    const data = await res.json();
    if (data.accountSummaries && data.accountSummaries.length > 0) {
      console.log("✅ Contas encontradas!\n");
      for (const acct of data.accountSummaries) {
        console.log(`  Conta: ${acct.displayName} (${acct.account})`);
        if (acct.propertySummaries) {
          for (const prop of acct.propertySummaries) {
            const propId = prop.property.replace("properties/", "");
            console.log(`    🏷️  Propriedade: ${prop.displayName}`);
            console.log(`    📊 Property ID: ${propId}`);
            console.log(`    🔗 Resource: ${prop.property}`);
            console.log("");
          }
        }
      }
    } else {
      console.log("⚠️  Nenhuma conta/propriedade acessível.");
      console.log("   Resposta:", JSON.stringify(data, null, 2));
    }
  } catch (e) {
    console.log("❌ Erro:", e.message);
  }

  // Try 2: Firebase API - get analytics info
  console.log("\n── Tentativa 2: Firebase API (projeto → analytics) ──");
  try {
    const token = await getAccessToken("https://www.googleapis.com/auth/firebase.readonly");
    const res = await fetch(
      `https://firebase.googleapis.com/v1beta1/projects/${sa.project_id}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    const data = await res.json();
    if (data.analyticsAccountId) {
      console.log(`✅ Analytics Account ID: ${data.analyticsAccountId}`);
    }
    if (data.resources?.analyticsPropertyId) {
      console.log(`✅ Analytics Property ID: ${data.resources.analyticsPropertyId}`);
    }
    if (!data.analyticsAccountId && !data.resources?.analyticsPropertyId) {
      console.log("   Resposta:", JSON.stringify(data, null, 2));
    }
  } catch (e) {
    console.log("❌ Erro:", e.message);
  }

  console.log("\n── Dica ──");
  console.log("Se nenhum Property ID foi encontrado, você precisa:");
  console.log("1. Ir em https://analytics.google.com → Admin → Property Access Management");
  console.log(`2. Adicionar ${sa.client_email} como Viewer`);
  console.log("3. Rodar este script novamente");
}

main().catch(console.error);
