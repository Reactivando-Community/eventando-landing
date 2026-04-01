"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import StartupWeekendFooter from "@/components/startup-weekend/StartupWeekendFooter";

/* ────────────── helpers ────────────── */
function parseRows(report, dimNames = [], metricNames = []) {
  if (!report?.rows) return [];
  return report.rows.map((row) => {
    const obj = {};
    (row.dimensionValues || []).forEach((v, i) => {
      obj[dimNames[i] || `dim${i}`] = v.value;
    });
    (row.metricValues || []).forEach((v, i) => {
      obj[metricNames[i] || `met${i}`] = Number(v.value);
    });
    return obj;
  });
}

function formatNum(n) {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(1) + "K";
  return n.toLocaleString("pt-BR");
}

function formatDuration(seconds) {
  if (seconds < 60) return `${Math.round(seconds)}s`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ${Math.round(seconds % 60)}s`;
  return `${Math.floor(seconds / 3600)}h ${Math.floor((seconds % 3600) / 60)}m`;
}

function formatDate(dateStr) {
  // "20260330" → "30/03"
  if (!dateStr || dateStr.length < 8) return dateStr;
  return `${dateStr.slice(6, 8)}/${dateStr.slice(4, 6)}`;
}

/* ────────────── mini chart components ────────────── */

function BarChart({ data, valueKey, labelKey, color = "#39C463", maxBars = 15 }) {
  const sliced = data.slice(0, maxBars);
  const maxVal = Math.max(...sliced.map((d) => d[valueKey]), 1);

  return (
    <div className="space-y-2">
      {sliced.map((item, i) => {
        const pct = (item[valueKey] / maxVal) * 100;
        return (
          <div key={i} className="flex items-center gap-3">
            <span className="text-xs font-bold text-black w-32 truncate shrink-0 text-right">
              {item[labelKey] || "(not set)"}
            </span>
            <div className="flex-1 h-7 bg-gray-100 border-2 border-black relative overflow-hidden">
              <div
                className="absolute inset-y-0 left-0 transition-all duration-700"
                style={{ width: `${pct}%`, backgroundColor: color }}
              />
              <span className="absolute inset-0 flex items-center justify-end pr-2 text-[11px] font-black text-black">
                {formatNum(item[valueKey])}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function SparkLine({ data, valueKey, color = "#39C463" }) {
  if (!data.length) return null;
  const values = data.map((d) => d[valueKey]);
  const minVal = Math.min(...values);
  const maxVal = Math.max(...values);
  const range = maxVal - minVal || 1;
  const W = 400;
  const H = 80;
  const pad = 4;

  const points = values.map((v, i) => {
    const x = pad + (i / (values.length - 1 || 1)) * (W - 2 * pad);
    const y = H - pad - ((v - minVal) / range) * (H - 2 * pad);
    return `${x},${y}`;
  });

  const areaPath = `M${points[0]} ${points.join(" L")} L${W - pad},${H - pad} L${pad},${H - pad} Z`;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-20" preserveAspectRatio="none">
      <defs>
        <linearGradient id={`grad-${color.replace("#", "")}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0.02" />
        </linearGradient>
      </defs>
      <path d={areaPath} fill={`url(#grad-${color.replace("#", "")})`} />
      <polyline
        points={points.join(" ")}
        fill="none"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DonutChart({ data, nameKey, valueKey, colors }) {
  const total = data.reduce((s, d) => s + d[valueKey], 0) || 1;
  let cumAngle = -90;

  return (
    <div className="flex items-center gap-6">
      <svg viewBox="0 0 100 100" className="w-32 h-32 shrink-0">
        {data.map((item, i) => {
          const pct = item[valueKey] / total;
          const angle = pct * 360;
          const startAngle = cumAngle;
          cumAngle += angle;
          const endAngle = cumAngle;

          const r = 40;
          const cx = 50;
          const cy = 50;
          const x1 = cx + r * Math.cos((Math.PI / 180) * startAngle);
          const y1 = cy + r * Math.sin((Math.PI / 180) * startAngle);
          const x2 = cx + r * Math.cos((Math.PI / 180) * endAngle);
          const y2 = cy + r * Math.sin((Math.PI / 180) * endAngle);
          const largeArc = angle > 180 ? 1 : 0;

          return (
            <path
              key={i}
              d={`M${cx},${cy} L${x1},${y1} A${r},${r} 0 ${largeArc},1 ${x2},${y2} Z`}
              fill={colors[i % colors.length]}
              stroke="black"
              strokeWidth="2"
            />
          );
        })}
        <circle cx="50" cy="50" r="22" fill="white" stroke="black" strokeWidth="2" />
        <text
          x="50"
          y="52"
          textAnchor="middle"
          dominantBaseline="middle"
          className="text-[11px] font-black"
          fill="black"
        >
          {formatNum(total)}
        </text>
      </svg>
      <div className="space-y-1.5">
        {data.map((item, i) => (
          <div key={i} className="flex items-center gap-2">
            <div
              className="w-4 h-4 border-2 border-black shrink-0"
              style={{ backgroundColor: colors[i % colors.length] }}
            />
            <span className="text-xs font-bold text-black capitalize">
              {item[nameKey] || "(not set)"}
            </span>
            <span className="text-xs font-black text-gray-500 ml-auto">
              {Math.round((item[valueKey] / total) * 100)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function HeatmapRow({ data, valueKey, labelKey, color = "#39C463" }) {
  const maxVal = Math.max(...data.map((d) => d[valueKey]), 1);
  return (
    <div className="flex gap-1 flex-wrap">
      {data.map((item, i) => {
        const intensity = item[valueKey] / maxVal;
        return (
          <div
            key={i}
            className="flex flex-col items-center gap-1"
            title={`${item[labelKey]}: ${item[valueKey]}`}
          >
            <div
              className="w-8 h-8 border-2 border-black flex items-center justify-center text-[9px] font-black"
              style={{
                backgroundColor: intensity > 0.1
                  ? `rgba(57, 196, 99, ${0.15 + intensity * 0.85})`
                  : "#f4f4f0",
                color: intensity > 0.5 ? "black" : "#666",
              }}
            >
              {item[valueKey]}
            </div>
            <span className="text-[9px] font-bold text-gray-500">{item[labelKey]}h</span>
          </div>
        );
      })}
    </div>
  );
}

/* ────────────── Main Page ────────────── */

export default function AnalyticsPage() {
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const fetchAnalytics = useCallback(async (pwd) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/analytics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: pwd }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Erro ao buscar dados");
      setData(json);
      setAuthenticated(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Parse data
  const summary = data?.summary?.rows?.[0];
  const summaryMetrics = summary
    ? {
        users: Number(summary.metricValues[0].value),
        sessions: Number(summary.metricValues[1].value),
        pageViews: Number(summary.metricValues[2].value),
        events: Number(summary.metricValues[3].value),
        engagement: Number(summary.metricValues[4].value),
      }
    : null;

  const dailyData = parseRows(data?.daily, ["date"], ["users", "sessions", "pageViews"]);
  const eventsData = parseRows(data?.events, ["eventName"], ["count", "users"]);
  const pagesData = parseRows(data?.pages, ["pagePath"], ["views", "users", "engagement"]);
  const sourcesData = parseRows(data?.sources, ["source", "medium"], ["sessions", "users"]);
  const devicesData = parseRows(data?.devices, ["device"], ["users", "sessions"]);
  const citiesData = parseRows(data?.cities, ["city"], ["users", "sessions"]);
  const abTestData = parseRows(data?.abTest, ["eventName"], ["count", "users"]);
  const hourlyData = parseRows(data?.hourly, ["hour"], ["users", "events"]);

  // Custom events only (filter out GA4 auto-events)
  const customEvents = eventsData.filter(
    (e) =>
      ![
        "first_visit",
        "session_start",
        "page_view",
        "scroll",
        "user_engagement",
        "click",
        "form_start",
        "form_submit",
        "file_download",
        "view_search_results",
      ].includes(e.eventName)
  );

  // Merged sources label
  const sourcesWithLabel = sourcesData.map((s) => ({
    ...s,
    label: `${s.source || "(direto)"} / ${s.medium || "(none)"}`,
  }));

  /* ──── Login gate ──── */
  if (!authenticated) {
    return (
      <main className="min-h-screen bg-[#f4f4f0] flex items-center justify-center px-6">
        <div className="brutal-card bg-white p-8 md:p-12 max-w-md w-full">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">📊</span>
            <h1 className="text-2xl md:text-3xl font-black text-black uppercase tracking-tight">
              Analytics
            </h1>
          </div>
          <p className="text-sm font-bold text-gray-600 mb-6">
            Insira a senha para acessar o painel de analytics consolidado.
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              fetchAnalytics(password);
            }}
          >
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Senha de acesso"
              className="w-full px-4 py-3 border-4 border-black font-bold text-black placeholder:text-gray-400 focus:outline-none focus:ring-4 focus:ring-techstars-green mb-4"
              autoFocus
            />
            {error && (
              <div className="bg-red-500 text-white text-xs font-black uppercase px-3 py-2 border-2 border-black mb-4">
                {error}
              </div>
            )}
            <button
              type="submit"
              disabled={loading || !password}
              className="brutal-btn w-full px-6 py-3 text-base disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Carregando…
                </span>
              ) : (
                "Acessar Dashboard"
              )}
            </button>
          </form>
          <div className="mt-6 pt-4 border-t-2 border-gray-200">
            <Link
              href="/startup-weekend"
              className="text-xs font-black text-gray-400 uppercase hover:text-black transition-colors"
            >
              ← Voltar ao site
            </Link>
          </div>
        </div>
      </main>
    );
  }

  /* ──── Dashboard ──── */
  return (
    <main className="min-h-screen bg-[#f4f4f0] overflow-x-hidden">
      {/* Header */}
      <section className="bg-black brutal-border-y py-12 px-6 relative overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-20 pointer-events-none" />
        <div className="max-w-6xl mx-auto relative z-10">
          <Link
            href="/startup-weekend"
            className="inline-flex items-center text-white font-black uppercase text-sm mb-6 hover:text-techstars-green transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Voltar
          </Link>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white uppercase tracking-tighter leading-none mb-3">
                Analytics
                <br />
                Dashboard.
              </h1>
              <p className="text-base md:text-lg font-bold text-gray-400 max-w-xl leading-relaxed">
                Dados consolidados do Firebase Analytics — últimos 30 dias.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <div className="bg-techstars-green text-black text-[10px] font-black uppercase tracking-widest px-3 py-1.5 border-2 border-black shadow-[3px_3px_0_#fff]">
                FIREBASE ANALYTICS
              </div>
              <div className="bg-white text-black text-[10px] font-black uppercase tracking-widest px-3 py-1.5 border-2 border-black shadow-[3px_3px_0_#39C463]">
                ÚLTIMOS 30 DIAS
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Summary Cards */}
      {summaryMetrics && (
        <section className="py-8 px-6 bg-[#f4f4f0]">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {[
                { label: "Usuários Ativos", value: summaryMetrics.users, icon: "👤", color: "bg-blue-500" },
                { label: "Sessões", value: summaryMetrics.sessions, icon: "🔗", color: "bg-purple-500" },
                { label: "Visualizações", value: summaryMetrics.pageViews, icon: "👁️", color: "bg-pink-500" },
                { label: "Eventos", value: summaryMetrics.events, icon: "⚡", color: "bg-yellow-400" },
                {
                  label: "Engajamento",
                  value: null,
                  displayValue: formatDuration(summaryMetrics.engagement),
                  icon: "⏱️",
                  color: "bg-techstars-green",
                },
              ].map((card, i) => (
                <div
                  key={i}
                  className="brutal-card bg-white p-5 flex flex-col gap-2 hover:-translate-y-1 transition-transform"
                >
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-8 h-8 ${card.color} border-2 border-black flex items-center justify-center shadow-[2px_2px_0_#000]`}
                    >
                      <span className="text-sm">{card.icon}</span>
                    </div>
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                      {card.label}
                    </span>
                  </div>
                  <span className="text-2xl md:text-3xl font-black text-black">
                    {card.displayValue || formatNum(card.value)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Daily Trend */}
      {dailyData.length > 0 && (
        <section className="py-6 px-6 bg-[#f4f4f0]">
          <div className="max-w-6xl mx-auto">
            <div className="brutal-card bg-white p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-blue-500 border-3 border-black flex items-center justify-center shadow-[3px_3px_0_#000]">
                  <span className="text-lg">📈</span>
                </div>
                <div>
                  <h2 className="text-lg md:text-xl font-black text-black uppercase tracking-tight">
                    Usuários Diários
                  </h2>
                  <p className="text-[10px] font-bold text-gray-400 uppercase">Últimos 30 dias</p>
                </div>
              </div>
              <SparkLine data={dailyData} valueKey="users" color="#39C463" />
              <div className="flex justify-between mt-2 text-[10px] font-bold text-gray-400">
                <span>{formatDate(dailyData[0]?.date)}</span>
                <span>{formatDate(dailyData[dailyData.length - 1]?.date)}</span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Two-column: Events + Pages */}
      <section className="py-6 px-6 bg-[#f4f4f0]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Custom Events */}
          {customEvents.length > 0 && (
            <div className="brutal-card bg-white p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-yellow-400 border-3 border-black flex items-center justify-center shadow-[3px_3px_0_#000]">
                  <span className="text-lg">⚡</span>
                </div>
                <div>
                  <h2 className="text-lg font-black text-black uppercase tracking-tight">
                    Eventos Custom
                  </h2>
                  <p className="text-[10px] font-bold text-gray-400 uppercase">
                    {customEvents.length} eventos rastreados
                  </p>
                </div>
              </div>
              <BarChart
                data={customEvents}
                valueKey="count"
                labelKey="eventName"
                color="#FACC15"
              />
            </div>
          )}

          {/* Top Pages */}
          {pagesData.length > 0 && (
            <div className="brutal-card bg-white p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-pink-500 border-3 border-black flex items-center justify-center shadow-[3px_3px_0_#000]">
                  <span className="text-lg">📄</span>
                </div>
                <div>
                  <h2 className="text-lg font-black text-black uppercase tracking-tight">
                    Páginas Mais Visitadas
                  </h2>
                  <p className="text-[10px] font-bold text-gray-400 uppercase">
                    Por visualizações
                  </p>
                </div>
              </div>
              <BarChart
                data={pagesData}
                valueKey="views"
                labelKey="pagePath"
                color="#EC4899"
              />
            </div>
          )}
        </div>
      </section>

      {/* Three-column: Sources + Devices + Cities */}
      <section className="py-6 px-6 bg-[#f4f4f0]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Traffic Sources */}
          {sourcesWithLabel.length > 0 && (
            <div className="brutal-card bg-white p-6">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 bg-purple-500 border-2 border-black flex items-center justify-center shadow-[2px_2px_0_#000]">
                  <span className="text-sm">🌐</span>
                </div>
                <h2 className="text-base font-black text-black uppercase tracking-tight">
                  Fontes de Tráfego
                </h2>
              </div>
              <div className="space-y-2">
                {sourcesWithLabel.slice(0, 8).map((s, i) => (
                  <div key={i} className="flex items-center justify-between gap-2 py-1.5 border-b border-gray-100 last:border-0">
                    <span className="text-xs font-bold text-black truncate">{s.label}</span>
                    <span className="text-xs font-black text-purple-600 shrink-0">
                      {formatNum(s.sessions)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Devices */}
          {devicesData.length > 0 && (
            <div className="brutal-card bg-white p-6">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 bg-techstars-green border-2 border-black flex items-center justify-center shadow-[2px_2px_0_#000]">
                  <span className="text-sm">📱</span>
                </div>
                <h2 className="text-base font-black text-black uppercase tracking-tight">
                  Dispositivos
                </h2>
              </div>
              <DonutChart
                data={devicesData}
                nameKey="device"
                valueKey="users"
                colors={["#39C463", "#3B82F6", "#F59E0B", "#EC4899"]}
              />
            </div>
          )}

          {/* Cities */}
          {citiesData.length > 0 && (
            <div className="brutal-card bg-white p-6">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 bg-orange-500 border-2 border-black flex items-center justify-center shadow-[2px_2px_0_#000]">
                  <span className="text-sm">📍</span>
                </div>
                <h2 className="text-base font-black text-black uppercase tracking-tight">
                  Top Cidades
                </h2>
              </div>
              <div className="space-y-2">
                {citiesData.map((c, i) => (
                  <div key={i} className="flex items-center justify-between gap-2 py-1.5 border-b border-gray-100 last:border-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black text-gray-300 w-5">{i + 1}.</span>
                      <span className="text-xs font-bold text-black">{c.city || "(not set)"}</span>
                    </div>
                    <span className="text-xs font-black text-orange-600 shrink-0">
                      {formatNum(c.users)} users
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* A/B Test Results */}
      {abTestData.length > 0 && (
        <section className="py-6 px-6 bg-[#f4f4f0]">
          <div className="max-w-6xl mx-auto">
            <div className="brutal-card bg-white p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-techstars-green border-3 border-black flex items-center justify-center shadow-[3px_3px_0_#000]">
                  <span className="text-lg">🧪</span>
                </div>
                <div>
                  <h2 className="text-lg md:text-xl font-black text-black uppercase tracking-tight">
                    Funil de Conversão — Bolsa 100%
                  </h2>
                  <p className="text-[10px] font-bold text-gray-400 uppercase">
                    Eventos do fluxo de bolsa e entry gate
                  </p>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b-4 border-black">
                      <th className="py-3 px-3 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                        Evento
                      </th>
                      <th className="py-3 px-3 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">
                        Contagem
                      </th>
                      <th className="py-3 px-3 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">
                        Usuários
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {abTestData.map((row, i) => (
                      <tr
                        key={i}
                        className="border-b-2 border-gray-100 hover:bg-techstars-green/10 transition-colors"
                      >
                        <td className="py-2.5 px-3 text-xs font-bold text-black flex items-center gap-2">
                          <span className="w-2 h-2 bg-techstars-green border border-black shrink-0" />
                          {row.eventName}
                        </td>
                        <td className="py-2.5 px-3 text-xs font-black text-black text-right">
                          {formatNum(row.count)}
                        </td>
                        <td className="py-2.5 px-3 text-xs font-black text-gray-500 text-right">
                          {formatNum(row.users)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Hourly Heatmap */}
      {hourlyData.length > 0 && (
        <section className="py-6 px-6 bg-[#f4f4f0]">
          <div className="max-w-6xl mx-auto">
            <div className="brutal-card bg-white p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-blue-500 border-3 border-black flex items-center justify-center shadow-[3px_3px_0_#000]">
                  <span className="text-lg">🕐</span>
                </div>
                <div>
                  <h2 className="text-lg font-black text-black uppercase tracking-tight">
                    Padrão de Horários
                  </h2>
                  <p className="text-[10px] font-bold text-gray-400 uppercase">
                    Usuários por hora (últimos 7 dias)
                  </p>
                </div>
              </div>
              <HeatmapRow data={hourlyData} valueKey="users" labelKey="hour" />
            </div>
          </div>
        </section>
      )}

      {/* All Events Table */}
      {eventsData.length > 0 && (
        <section className="py-6 px-6 bg-[#f4f4f0]">
          <div className="max-w-6xl mx-auto">
            <div className="brutal-card bg-white p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gray-800 border-3 border-black flex items-center justify-center shadow-[3px_3px_0_#000]">
                  <span className="text-lg text-white">📋</span>
                </div>
                <div>
                  <h2 className="text-lg font-black text-black uppercase tracking-tight">
                    Todos os Eventos
                  </h2>
                  <p className="text-[10px] font-bold text-gray-400 uppercase">
                    Incluindo eventos automáticos do GA4
                  </p>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b-4 border-black">
                      <th className="py-3 px-3 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                        Evento
                      </th>
                      <th className="py-3 px-3 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">
                        Contagem
                      </th>
                      <th className="py-3 px-3 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">
                        Usuários
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {eventsData.map((row, i) => {
                      const isCustom = !["first_visit","session_start","page_view","scroll","user_engagement","click","form_start","form_submit","file_download","view_search_results"].includes(row.eventName);
                      return (
                        <tr
                          key={i}
                          className={`border-b-2 border-gray-100 hover:bg-techstars-green/10 transition-colors ${isCustom ? "" : "opacity-50"}`}
                        >
                          <td className="py-2.5 px-3 text-xs font-bold text-black flex items-center gap-2">
                            {isCustom && (
                              <span className="w-2 h-2 bg-techstars-green border border-black shrink-0" />
                            )}
                            {row.eventName}
                          </td>
                          <td className="py-2.5 px-3 text-xs font-black text-black text-right">
                            {formatNum(row.count)}
                          </td>
                          <td className="py-2.5 px-3 text-xs font-black text-gray-500 text-right">
                            {formatNum(row.users)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Refresh Button */}
      <section className="py-8 px-6 bg-[#f4f4f0]">
        <div className="max-w-6xl mx-auto flex justify-center">
          <button
            onClick={() => fetchAnalytics(password)}
            disabled={loading}
            className="brutal-btn px-8 py-3 text-sm disabled:opacity-50"
          >
            {loading ? "Atualizando…" : "🔄 Atualizar Dados"}
          </button>
        </div>
      </section>

      <StartupWeekendFooter />
    </main>
  );
}
