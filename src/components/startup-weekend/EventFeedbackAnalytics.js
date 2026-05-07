"use client";

import { useMemo } from "react";
import {
  ROLES,
  RATING_4,
  MEAL_SLOTS,
  STRUCTURE_QUESTIONS,
  MENTOR_QUESTIONS,
  FACILITATOR_QUESTIONS,
  EXPERIENCE_RATING_QUESTIONS,
  EVENT_FOCUS,
  WEEKDAYS,
  PERIODS,
  MODALITIES,
  VOLUNTEER_HOURS,
} from "@/data/feedback-questions";

// ─── Math helpers ────────────────────────────────────────────────────────

const RATING_NUMERIC = { excelente: 4, boa: 3, regular: 2, ruim: 1 };
const RATING_LABEL = Object.fromEntries(RATING_4.map((r) => [r.value, r.label]));

const computeNps = (responses) => {
  if (!responses.length) return null;
  const valid = responses.filter((r) => typeof r.nps_score === "number");
  if (!valid.length) return null;
  const promoters = valid.filter((r) => r.nps_score >= 9).length;
  const detractors = valid.filter((r) => r.nps_score <= 6).length;
  const passives = valid.length - promoters - detractors;
  return {
    score: Math.round(((promoters - detractors) / valid.length) * 100),
    promoters,
    passives,
    detractors,
    total: valid.length,
  };
};

const satisfactionFor = (responses, key) => {
  const scored = responses.filter((r) => r[key]);
  if (!scored.length) return null;
  const positive = scored.filter(
    (r) => r[key] === "excelente" || r[key] === "boa"
  ).length;
  return {
    pct: Math.round((positive / scored.length) * 100),
    avg: scored.reduce((s, r) => s + (RATING_NUMERIC[r[key]] || 0), 0) / scored.length,
    n: scored.length,
  };
};

const overallSatisfaction = (responses) => {
  const allKeys = [
    ...STRUCTURE_QUESTIONS.map((q) => q.key),
    ...MENTOR_QUESTIONS.map((q) => q.key),
    ...FACILITATOR_QUESTIONS.map((q) => q.key),
    ...EXPERIENCE_RATING_QUESTIONS.map((q) => q.key),
  ];
  let positive = 0;
  let total = 0;
  for (const r of responses) {
    for (const k of allKeys) {
      if (r[k]) {
        total += 1;
        if (r[k] === "excelente" || r[k] === "boa") positive += 1;
      }
    }
  }
  if (!total) return null;
  return Math.round((positive / total) * 100);
};

// ─── CSV export ──────────────────────────────────────────────────────────

const toCsv = (rows, columns) => {
  const escape = (v) => {
    if (v === null || v === undefined) return "";
    const s = String(v).replace(/"/g, '""');
    return /[",\n]/.test(s) ? `"${s}"` : s;
  };
  const header = columns.map((c) => escape(c.label)).join(",");
  const body = rows
    .map((row) => columns.map((c) => escape(c.value(row))).join(","))
    .join("\n");
  return `${header}\n${body}`;
};

const downloadCsv = (filename, csv) => {
  const blob = new Blob(["﻿" + csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
};

// ─── UI primitives ───────────────────────────────────────────────────────

const StatCard = ({ label, value, sub, color = "bg-white" }) => (
  <div className={`brutal-card ${color} p-6 md:p-8`}>
    <div className="text-xs font-black uppercase tracking-widest text-gray-700 mb-2">
      {label}
    </div>
    <div className="text-4xl md:text-6xl font-black text-black tracking-tighter">
      {value}
    </div>
    {sub && (
      <div className="text-sm font-bold text-gray-700 mt-2">{sub}</div>
    )}
  </div>
);

const SatisfactionBar = ({ label, sat }) => {
  if (!sat) {
    return (
      <div className="border-l-4 border-black pl-4 py-2 opacity-50">
        <div className="text-sm font-bold mb-1">{label}</div>
        <div className="text-xs text-gray-600">Sem respostas</div>
      </div>
    );
  }
  const color =
    sat.pct >= 80 ? "bg-techstars-green" : sat.pct >= 60 ? "bg-yellow-300" : "bg-red-400";
  return (
    <div>
      <div className="flex justify-between items-baseline mb-2">
        <span className="text-sm font-bold pr-4 flex-1">{label}</span>
        <span className="text-sm font-black tabular-nums">
          {sat.pct}% <span className="text-xs text-gray-600">(n={sat.n})</span>
        </span>
      </div>
      <div className="border-4 border-black h-6 bg-white relative overflow-hidden">
        <div className={`${color} h-full`} style={{ width: `${sat.pct}%` }} />
      </div>
    </div>
  );
};

const heatmapColor = (avg) => {
  if (avg >= 3.5) return "bg-techstars-green";
  if (avg >= 2.5) return "bg-yellow-300";
  if (avg >= 1.5) return "bg-orange-400";
  return "bg-red-400";
};

const MealHeatmap = ({ responses }) => {
  // each response has a `meals` array of { meal_slot, quality, quantity, variety }
  const cells = useMemo(() => {
    const out = {};
    for (const slot of MEAL_SLOTS) {
      out[slot.key] = { quality: [], quantity: [], variety: [] };
    }
    for (const r of responses) {
      const list = r.meals || [];
      for (const m of list) {
        const cell = out[m.meal_slot];
        if (!cell) continue;
        if (m.quality && RATING_NUMERIC[m.quality]) cell.quality.push(RATING_NUMERIC[m.quality]);
        if (m.variety && RATING_NUMERIC[m.variety]) cell.variety.push(RATING_NUMERIC[m.variety]);
        if (m.quantity) cell.quantity.push(m.quantity);
      }
    }
    return out;
  }, [responses]);

  const avg = (arr) => (arr.length ? arr.reduce((s, v) => s + v, 0) / arr.length : null);
  const mode = (arr) => {
    if (!arr.length) return null;
    const counts = {};
    arr.forEach((v) => (counts[v] = (counts[v] || 0) + 1));
    return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
  };

  return (
    <div className="overflow-x-auto print:overflow-visible">
      <table className="w-full border-collapse min-w-[600px]">
        <thead>
          <tr>
            <th className="border-4 border-black bg-black text-white p-2 text-xs font-black uppercase tracking-widest text-left">
              Refeição
            </th>
            <th className="border-4 border-black bg-black text-white p-2 text-xs font-black uppercase tracking-widest">
              Qualidade
            </th>
            <th className="border-4 border-black bg-black text-white p-2 text-xs font-black uppercase tracking-widest">
              Variedade
            </th>
            <th className="border-4 border-black bg-black text-white p-2 text-xs font-black uppercase tracking-widest">
              Quantidade (mais comum)
            </th>
          </tr>
        </thead>
        <tbody>
          {MEAL_SLOTS.map((slot) => {
            const c = cells[slot.key];
            const qualityAvg = avg(c.quality);
            const varietyAvg = avg(c.variety);
            const qtyMode = mode(c.quantity);
            return (
              <tr key={slot.key}>
                <td className="border-4 border-black bg-white p-3 font-bold text-sm">
                  {slot.label}
                </td>
                <td
                  className={`border-4 border-black p-3 text-center font-black ${
                    qualityAvg ? heatmapColor(qualityAvg) : "bg-gray-200"
                  }`}
                >
                  {qualityAvg ? qualityAvg.toFixed(2) : "—"}
                </td>
                <td
                  className={`border-4 border-black p-3 text-center font-black ${
                    varietyAvg ? heatmapColor(varietyAvg) : "bg-gray-200"
                  }`}
                >
                  {varietyAvg ? varietyAvg.toFixed(2) : "—"}
                </td>
                <td className="border-4 border-black bg-white p-3 text-center font-bold text-sm capitalize">
                  {qtyMode || "—"}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <p className="text-xs text-gray-600 mt-2 font-bold">
        Escala: Ruim 1 · Regular 2 · Boa 3 · Excelente 4
      </p>
    </div>
  );
};

const VolunteerLeadsTable = ({ responses }) => {
  const leads = responses.filter((r) => r.volunteer_interested);

  const columns = [
    { label: "Nome", value: (r) => r.respondent_name || "—" },
    { label: "Email", value: (r) => r.volunteer_email || r.respondent_email || "—" },
    { label: "Telefone", value: (r) => r.volunteer_phone || "—" },
    { label: "Área", value: (r) => r.volunteer_work_area || "—" },
    { label: "Formação", value: (r) => r.volunteer_education || "—" },
    { label: "Reside Anápolis", value: (r) => (r.volunteer_resides_local ? "Sim" : "Não") },
    {
      label: "Dia",
      value: (r) => WEEKDAYS.find((w) => w.value === r.volunteer_weekday)?.label || "—",
    },
    {
      label: "Período",
      value: (r) => PERIODS.find((p) => p.value === r.volunteer_period)?.label || "—",
    },
    {
      label: "Modalidade",
      value: (r) => MODALITIES.find((m) => m.value === r.volunteer_modality)?.label || "—",
    },
    {
      label: "Horas/semana",
      value: (r) =>
        VOLUNTEER_HOURS.find((h) => h.value === r.volunteer_weekly_hours)?.label || "—",
    },
    { label: "Expectativas", value: (r) => r.volunteer_expectations || "—" },
    { label: "Voluntariado anterior", value: (r) => r.volunteer_prior_experience || "—" },
    { label: "Redes sociais", value: (r) => r.volunteer_social || "—" },
    { label: "Data", value: (r) => new Date(r.createdAt).toLocaleString("pt-BR") },
  ];

  const handleExport = () => {
    const csv = toCsv(leads, columns);
    const stamp = new Date().toISOString().slice(0, 10);
    downloadCsv(`voluntarios-sw-anapolis-${stamp}.csv`, csv);
  };

  if (!leads.length) {
    return (
      <div className="brutal-card bg-white p-6 text-center text-gray-600 font-bold">
        Nenhum interessado em voluntariar até o momento.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <p className="font-bold text-sm">
          {leads.length} interessado{leads.length === 1 ? "" : "s"} em organizar a próxima edição.
        </p>
        <button
          type="button"
          onClick={handleExport}
          className="brutal-btn-yellow px-4 py-2 text-xs print:hidden"
        >
          Exportar CSV
        </button>
      </div>
      <div className="overflow-x-auto print:overflow-visible">
        <table className="w-full border-collapse min-w-[900px] text-xs">
          <thead>
            <tr>
              {["Nome", "Email", "Telefone", "Área", "Formação", "Anápolis", "Dia", "Período", "Modalidade", "Horas"].map((h) => (
                <th
                  key={h}
                  className="border-4 border-black bg-black text-white p-2 font-black uppercase tracking-wider text-left"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {leads.map((r, i) => (
              <tr key={r.documentId || r.id || i} className="bg-white">
                <td className="border-4 border-black p-2 font-bold">{r.respondent_name || "—"}</td>
                <td className="border-4 border-black p-2">{r.volunteer_email || r.respondent_email || "—"}</td>
                <td className="border-4 border-black p-2">{r.volunteer_phone || "—"}</td>
                <td className="border-4 border-black p-2">{r.volunteer_work_area || "—"}</td>
                <td className="border-4 border-black p-2">{r.volunteer_education || "—"}</td>
                <td className="border-4 border-black p-2 text-center">{r.volunteer_resides_local ? "Sim" : "Não"}</td>
                <td className="border-4 border-black p-2">
                  {WEEKDAYS.find((w) => w.value === r.volunteer_weekday)?.label || "—"}
                </td>
                <td className="border-4 border-black p-2">
                  {PERIODS.find((p) => p.value === r.volunteer_period)?.label || "—"}
                </td>
                <td className="border-4 border-black p-2">
                  {MODALITIES.find((m) => m.value === r.volunteer_modality)?.label || "—"}
                </td>
                <td className="border-4 border-black p-2">
                  {VOLUNTEER_HOURS.find((h) => h.value === r.volunteer_weekly_hours)?.label || "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// ─── Main component ──────────────────────────────────────────────────────

export default function EventFeedbackAnalytics({ responses }) {
  const nps = useMemo(() => computeNps(responses), [responses]);
  const overallSat = useMemo(() => overallSatisfaction(responses), [responses]);

  const perRole = useMemo(() => {
    return ROLES.map((role) => {
      const subset = responses.filter((r) => r.role === role.value);
      return {
        ...role,
        count: subset.length,
        nps: computeNps(subset),
        sat: overallSatisfaction(subset),
      };
    });
  }, [responses]);

  const understoodJourneyCounts = useMemo(() => {
    const yes = responses.filter((r) => r.exp_understood_journey === true).length;
    const no = responses.filter((r) => r.exp_understood_journey === false).length;
    return { yes, no, total: yes + no };
  }, [responses]);

  const focusCounts = useMemo(() => {
    return EVENT_FOCUS.map((f) => ({
      ...f,
      count: responses.filter((r) => r.exp_event_focus === f.value).length,
    }));
  }, [responses]);

  const recentSuggestions = useMemo(
    () =>
      responses
        .filter((r) => r.suggestions && r.suggestions.trim())
        .slice(0, 20),
    [responses]
  );

  if (!responses.length) {
    return (
      <div className="brutal-card bg-white p-12 text-center">
        <h2 className="text-3xl font-black uppercase tracking-tighter mb-2">
          Sem respostas ainda
        </h2>
        <p className="text-gray-700 font-bold">
          As respostas aparecem aqui assim que forem enviadas.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {/* Hero stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          label="Total de respostas"
          value={responses.length}
          sub={`Em ${responses.filter((r) => r.role).length} respondentes com papel definido`}
        />
        <StatCard
          label="NPS (0-10)"
          value={nps ? `${nps.score > 0 ? "+" : ""}${nps.score}` : "—"}
          sub={
            nps
              ? `${nps.promoters} promotores · ${nps.passives} neutros · ${nps.detractors} detratores`
              : "Sem dados de NPS"
          }
          color={nps && nps.score >= 50 ? "bg-techstars-green" : nps && nps.score >= 0 ? "bg-yellow-300" : "bg-red-400"}
        />
        <StatCard
          label="Satisfação geral"
          value={overallSat !== null ? `${overallSat}%` : "—"}
          sub="% Excelente + Boa em todas as dimensões 4-pontos"
        />
      </div>

      {/* NPS distribution bar */}
      {nps && (
        <section>
          <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter mb-4 border-b-4 border-black pb-2">
            Distribuição NPS
          </h2>
          <div className="flex border-4 border-black h-12 bg-white overflow-hidden">
            <div
              className="bg-red-400 flex items-center justify-center font-black text-black text-xs md:text-sm"
              style={{ width: `${(nps.detractors / nps.total) * 100}%` }}
            >
              {nps.detractors > 0 && `${nps.detractors} detratores`}
            </div>
            <div
              className="bg-yellow-300 flex items-center justify-center font-black text-black text-xs md:text-sm border-x-4 border-black"
              style={{ width: `${(nps.passives / nps.total) * 100}%` }}
            >
              {nps.passives > 0 && `${nps.passives} neutros`}
            </div>
            <div
              className="bg-techstars-green flex items-center justify-center font-black text-black text-xs md:text-sm"
              style={{ width: `${(nps.promoters / nps.total) * 100}%` }}
            >
              {nps.promoters > 0 && `${nps.promoters} promotores`}
            </div>
          </div>
          <p className="text-xs text-gray-600 font-bold mt-2">
            Detratores 0-6 · Neutros 7-8 · Promotores 9-10
          </p>
        </section>
      )}

      {/* Per-role breakdown */}
      <section>
        <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter mb-4 border-b-4 border-black pb-2">
          Por papel
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {perRole.map((r) => (
            <div key={r.value} className="brutal-card bg-white p-6">
              <div className="text-3xl mb-2">{r.emoji}</div>
              <div className="font-black uppercase text-lg tracking-tight mb-3">
                {r.label}
              </div>
              <div className="text-sm font-bold text-gray-700">Respostas</div>
              <div className="text-3xl font-black tracking-tighter mb-2">{r.count}</div>
              <div className="text-sm font-bold text-gray-700">NPS</div>
              <div className="text-3xl font-black tracking-tighter mb-2">
                {r.nps ? `${r.nps.score > 0 ? "+" : ""}${r.nps.score}` : "—"}
              </div>
              <div className="text-sm font-bold text-gray-700">Satisfação</div>
              <div className="text-3xl font-black tracking-tighter">
                {r.sat !== null ? `${r.sat}%` : "—"}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Meal heatmap */}
      <section>
        <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter mb-4 border-b-4 border-black pb-2">
          Refeições
        </h2>
        <MealHeatmap responses={responses} />
      </section>

      {/* Structure */}
      <section>
        <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter mb-4 border-b-4 border-black pb-2">
          Estrutura e organização
        </h2>
        <div className="space-y-4">
          {STRUCTURE_QUESTIONS.map((q) => (
            <SatisfactionBar
              key={q.key}
              label={q.label}
              sat={satisfactionFor(responses, q.key)}
            />
          ))}
        </div>
      </section>

      {/* Mentors */}
      <section>
        <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter mb-4 border-b-4 border-black pb-2">
          Mentores
        </h2>
        <div className="space-y-4">
          {MENTOR_QUESTIONS.map((q) => (
            <SatisfactionBar
              key={q.key}
              label={q.label}
              sat={satisfactionFor(responses, q.key)}
            />
          ))}
        </div>
      </section>

      {/* Facilitator */}
      <section>
        <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter mb-4 border-b-4 border-black pb-2">
          Facilitador
        </h2>
        <div className="space-y-4">
          {FACILITATOR_QUESTIONS.map((q) => (
            <SatisfactionBar
              key={q.key}
              label={q.label}
              sat={satisfactionFor(responses, q.key)}
            />
          ))}
        </div>
      </section>

      {/* Experience */}
      <section>
        <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter mb-4 border-b-4 border-black pb-2">
          Experiência e jornada
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="brutal-card bg-white p-6">
            <div className="text-xs font-black uppercase tracking-widest text-gray-700 mb-2">
              Entendeu a jornada do evento?
            </div>
            <div className="flex border-4 border-black h-10 bg-white">
              <div
                className="bg-techstars-green flex items-center justify-center font-black text-xs"
                style={{
                  width: understoodJourneyCounts.total
                    ? `${(understoodJourneyCounts.yes / understoodJourneyCounts.total) * 100}%`
                    : "0%",
                }}
              >
                {understoodJourneyCounts.yes > 0 && `Sim ${understoodJourneyCounts.yes}`}
              </div>
              <div
                className="bg-red-400 flex items-center justify-center font-black text-xs border-l-4 border-black"
                style={{
                  width: understoodJourneyCounts.total
                    ? `${(understoodJourneyCounts.no / understoodJourneyCounts.total) * 100}%`
                    : "0%",
                }}
              >
                {understoodJourneyCounts.no > 0 && `Não ${understoodJourneyCounts.no}`}
              </div>
            </div>
          </div>

          <div className="brutal-card bg-white p-6">
            <div className="text-xs font-black uppercase tracking-widest text-gray-700 mb-2">
              Foco do evento
            </div>
            <ul className="space-y-2">
              {focusCounts.map((f) => (
                <li key={f.value} className="flex justify-between font-bold text-sm">
                  <span>{f.label}</span>
                  <span className="font-black">{f.count}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="space-y-4">
          {EXPERIENCE_RATING_QUESTIONS.map((q) => (
            <SatisfactionBar
              key={q.key}
              label={q.label}
              sat={satisfactionFor(responses, q.key)}
            />
          ))}
        </div>
      </section>

      {/* Suggestions */}
      <section>
        <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter mb-4 border-b-4 border-black pb-2">
          Sugestões e elogios
        </h2>
        {recentSuggestions.length === 0 ? (
          <p className="text-gray-600 font-bold">Nenhum comentário ainda.</p>
        ) : (
          <div className="space-y-4">
            {recentSuggestions.map((r, i) => {
              const role = ROLES.find((rr) => rr.value === r.role);
              return (
                <div
                  key={r.documentId || r.id || i}
                  className="brutal-card bg-white p-5"
                >
                  <div className="flex justify-between items-start mb-2 gap-2">
                    <span className="text-xs font-black uppercase tracking-widest text-gray-700">
                      {role ? `${role.emoji} ${role.label}` : "—"}
                      {r.respondent_name ? ` · ${r.respondent_name}` : ""}
                    </span>
                    <span className="text-xs font-bold text-gray-500 whitespace-nowrap">
                      {new Date(r.createdAt).toLocaleDateString("pt-BR")}
                    </span>
                  </div>
                  <p className="font-bold text-sm md:text-base whitespace-pre-wrap">
                    {r.suggestions}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Volunteer leads */}
      <section>
        <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter mb-4 border-b-4 border-black pb-2">
          Voluntários — próxima edição
        </h2>
        <VolunteerLeadsTable responses={responses} />
      </section>
    </div>
  );
}
