"use client";

import { useState, useMemo } from "react";
import VMasker from "vanilla-masker";
import hubCommunity from "@/network/hub-community";
import { useAuth } from "@/contexts/AuthContext";

import {
  ROLES,
  RATING_4,
  QUANTITY_3,
  EVENT_FOCUS,
  WEEKDAYS,
  PERIODS,
  MODALITIES,
  VOLUNTEER_HOURS,
  NPS_QUESTION,
  MEAL_SLOTS,
  STRUCTURE_QUESTIONS,
  MENTOR_QUESTIONS,
  FACILITATOR_QUESTIONS,
  EXPERIENCE_RATING_QUESTIONS,
  sectionsForRole,
} from "@/data/feedback-questions";

import RatingScale4 from "./feedback/RatingScale4";
import NpsScale from "./feedback/NpsScale";
import SelectField from "./feedback/SelectField";

const FIELD_INPUT_CLASS =
  "w-full bg-[#f4f4f0] border-4 border-black text-black px-4 py-3 font-bold placeholder:text-gray-400 focus:outline-none focus:bg-white focus:shadow-[4px_4px_0_#000] focus:-translate-y-1 transition-all";

const SectionHeader = ({ number, title, subtitle }) => (
  <div className="border-b-4 border-black pb-4 mb-6">
    <div className="flex items-baseline gap-3">
      <span className="text-techstars-green font-black text-3xl md:text-4xl tracking-tighter">
        {String(number).padStart(2, "0")}
      </span>
      <h3 className="text-2xl md:text-3xl font-black text-black uppercase tracking-tighter">
        {title}
      </h3>
    </div>
    {subtitle && (
      <p className="text-gray-700 font-bold text-sm md:text-base mt-2">
        {subtitle}
      </p>
    )}
  </div>
);

export default function EventFeedbackForm() {
  const { user, isAuthenticated } = useAuth();

  // ─── State ─────────────────────────────────────────────────────────────
  const [role, setRole] = useState("");
  const [respondentName, setRespondentName] = useState(user?.name || "");
  const [respondentEmail, setRespondentEmail] = useState(user?.email || "");
  const [allowEditIdentity, setAllowEditIdentity] = useState(!isAuthenticated);

  const [npsScore, setNpsScore] = useState(null);

  const [meals, setMeals] = useState(
    MEAL_SLOTS.reduce((acc, slot) => {
      acc[slot.key] = { quality: "", quantity: "", variety: "" };
      return acc;
    }, {})
  );

  const [ratings, setRatings] = useState({});

  const [expUnderstoodJourney, setExpUnderstoodJourney] = useState("");
  const [expEventFocus, setExpEventFocus] = useState("");

  const [suggestions, setSuggestions] = useState("");

  const [volunteerInterested, setVolunteerInterested] = useState("");
  const [volunteerData, setVolunteerData] = useState({
    volunteer_weekday: "",
    volunteer_period: "",
    volunteer_modality: "",
    volunteer_resides_local: "",
    volunteer_work_area: "",
    volunteer_education: "",
    volunteer_phone: "",
    volunteer_email: "",
    volunteer_social: "",
    volunteer_expectations: "",
    volunteer_prior_experience: "",
    volunteer_weekly_hours: "",
    volunteer_extra: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  // ─── Derived ───────────────────────────────────────────────────────────
  const activeSections = useMemo(() => sectionsForRole(role), [role]);
  const showMentors = activeSections.includes("mentors");

  const setRating = (key, value) =>
    setRatings((prev) => ({ ...prev, [key]: value }));

  const setMeal = (slotKey, field, value) =>
    setMeals((prev) => ({
      ...prev,
      [slotKey]: { ...prev[slotKey], [field]: value },
    }));

  const setVolunteerField = (key, value) =>
    setVolunteerData((prev) => ({ ...prev, [key]: value }));

  // ─── Validation ────────────────────────────────────────────────────────
  const validate = () => {
    if (!role) return "Selecione seu papel no evento.";
    if (npsScore === null || npsScore === undefined)
      return "Responda a pergunta NPS (0 a 10).";

    for (const slot of MEAL_SLOTS) {
      const m = meals[slot.key];
      if (!m.quality || !m.quantity || !m.variety) {
        return `Avalie todas as dimensões de ${slot.label}.`;
      }
    }

    for (const q of STRUCTURE_QUESTIONS) {
      if (!ratings[q.key]) return `Responda: ${q.label}`;
    }

    if (showMentors) {
      for (const q of MENTOR_QUESTIONS) {
        if (!ratings[q.key]) return `Responda sobre os mentores: ${q.label}`;
      }
    }

    for (const q of FACILITATOR_QUESTIONS) {
      if (!ratings[q.key]) return `Responda sobre o facilitador: ${q.label}`;
    }

    if (!expUnderstoodJourney) return "Responda se entendeu a jornada do evento.";
    if (!expEventFocus) return "Responda sobre o foco do evento.";

    for (const q of EXPERIENCE_RATING_QUESTIONS) {
      if (!ratings[q.key]) return `Responda: ${q.label}`;
    }

    if (!volunteerInterested)
      return "Indique se gostaria de participar da próxima organização.";

    if (volunteerInterested === "true") {
      const required = [
        "volunteer_weekday",
        "volunteer_period",
        "volunteer_modality",
        "volunteer_resides_local",
        "volunteer_phone",
        "volunteer_email",
        "volunteer_weekly_hours",
      ];
      for (const k of required) {
        if (!volunteerData[k]) {
          return "Complete os dados de voluntariado para confirmar seu interesse.";
        }
      }
      const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRe.test(volunteerData.volunteer_email.trim())) {
        return "E-mail de voluntariado inválido.";
      }
      const phoneDigits = volunteerData.volunteer_phone.replace(/\D/g, "");
      if (phoneDigits.length < 10) {
        return "Telefone de voluntariado inválido.";
      }
    }

    return null;
  };

  // ─── Submit ────────────────────────────────────────────────────────────
  const handleSubmit = async () => {
    const errorMessage = validate();
    if (errorMessage) {
      setError(errorMessage);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setError("");
    setIsLoading(true);

    const mealsArray = MEAL_SLOTS.map((slot) => ({
      meal_slot: slot.key,
      quality: meals[slot.key].quality,
      quantity: meals[slot.key].quantity,
      variety: meals[slot.key].variety,
    }));

    const payload = {
      role,
      nps_score: npsScore,
      respondent_name: respondentName.trim() || null,
      respondent_email: respondentEmail.trim() || null,
      meals: mealsArray,
      ...ratings,
      exp_understood_journey: expUnderstoodJourney === "true",
      exp_event_focus: expEventFocus,
      suggestions: suggestions.trim() || null,
      volunteer_interested: volunteerInterested === "true",
      ...(volunteerInterested === "true"
        ? {
            volunteer_weekday: volunteerData.volunteer_weekday || null,
            volunteer_period: volunteerData.volunteer_period || null,
            volunteer_modality: volunteerData.volunteer_modality || null,
            volunteer_resides_local: volunteerData.volunteer_resides_local === "true",
            volunteer_work_area: volunteerData.volunteer_work_area.trim() || null,
            volunteer_education: volunteerData.volunteer_education.trim() || null,
            volunteer_phone: volunteerData.volunteer_phone.replace(/\D/g, "") || null,
            volunteer_email: volunteerData.volunteer_email.trim() || null,
            volunteer_social: volunteerData.volunteer_social.trim() || null,
            volunteer_expectations: volunteerData.volunteer_expectations.trim() || null,
            volunteer_prior_experience: volunteerData.volunteer_prior_experience.trim() || null,
            volunteer_weekly_hours: volunteerData.volunteer_weekly_hours || null,
          }
        : {}),
      volunteer_extra: volunteerData.volunteer_extra.trim() || null,
    };

    try {
      await hubCommunity.eventFeedback.create(payload);
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      const status = err.response?.status;
      if (status === 403 || status === 401) {
        setError("Sem permissão para enviar. Recarregue a página e tente novamente.");
      } else if (err.message === "Network Error") {
        setError("Sem conexão com o servidor. Verifique sua internet.");
      } else {
        setError("Pane no sistema! Tente novamente em alguns instantes.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // ─── Submitted state ───────────────────────────────────────────────────
  if (submitted) {
    return (
      <div className="bg-techstars-green border-4 border-black shadow-[12px_12px_0_#000] p-8 md:p-12 text-center">
        <div className="w-20 h-20 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-[4px_4px_0_#fff] border-4 border-black">
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-4xl md:text-5xl font-black text-black uppercase tracking-tighter mb-4">
          OBRIGADO!
        </h3>
        <p className="text-black font-bold text-lg md:text-xl max-w-md mx-auto">
          Sua opinião é fundamental para fazermos o próximo Startup Weekend ainda melhor.
        </p>
      </div>
    );
  }

  // ─── Form ──────────────────────────────────────────────────────────────
  return (
    <div className="space-y-8">
      {/* Section 0: Role */}
      <div className="bg-white border-4 border-black p-6 md:p-10 shadow-[12px_12px_0_#9333ea]">
        <SectionHeader
          number={1}
          title="Quem está respondendo?"
          subtitle="Selecione seu papel no Startup Weekend."
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {ROLES.map((r) => {
            const selected = role === r.value;
            return (
              <button
                key={r.value}
                type="button"
                onClick={() => setRole(r.value)}
                className={`border-4 border-black p-6 text-center transition-all ${
                  selected
                    ? "bg-techstars-green text-black shadow-[8px_8px_0_#000] -translate-y-1 -translate-x-1"
                    : "bg-white hover:bg-gray-100 hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[8px_8px_0_#000]"
                }`}
              >
                <div className="text-4xl mb-2">{r.emoji}</div>
                <div className="font-black uppercase text-lg tracking-tight">{r.label}</div>
              </button>
            );
          })}
        </div>

        {role && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-black font-black uppercase text-sm mb-2">
                Nome
              </label>
              <input
                type="text"
                value={respondentName}
                onChange={(e) => setRespondentName(e.target.value)}
                disabled={isAuthenticated && !allowEditIdentity}
                placeholder="Seu nome (opcional)"
                className={FIELD_INPUT_CLASS + " disabled:opacity-60"}
              />
            </div>
            <div>
              <label className="block text-black font-black uppercase text-sm mb-2">
                E-mail
              </label>
              <input
                type="email"
                value={respondentEmail}
                onChange={(e) => setRespondentEmail(e.target.value)}
                disabled={isAuthenticated && !allowEditIdentity}
                placeholder="seu@email.com (opcional)"
                className={FIELD_INPUT_CLASS + " disabled:opacity-60"}
              />
            </div>
            {isAuthenticated && (
              <div className="md:col-span-2">
                <button
                  type="button"
                  onClick={() => setAllowEditIdentity((v) => !v)}
                  className="text-xs font-black uppercase underline tracking-wider text-gray-700 hover:text-black"
                >
                  {allowEditIdentity ? "← Voltar a usar dados da conta" : "Alterar dados →"}
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {!role && (
        <div className="text-center text-gray-600 font-bold text-sm uppercase tracking-wider py-8">
          ↑ Selecione seu papel para continuar a pesquisa.
        </div>
      )}

      {role && (
        <>
          {/* Section: NPS */}
          <div className="bg-white border-4 border-black p-6 md:p-10 shadow-[12px_12px_0_#0EA5E9]">
            <SectionHeader number={2} title="Recomendação (NPS)" />
            <NpsScale
              value={npsScore}
              onChange={setNpsScore}
              label={NPS_QUESTION[role]}
              required
            />
          </div>

          {/* Section: Refeições */}
          <div className="bg-white border-4 border-black p-6 md:p-10 shadow-[12px_12px_0_#FCD34D]">
            <SectionHeader
              number={3}
              title="Refeições"
              subtitle="Avalie a qualidade das refeições fornecidas durante o evento."
            />
            <div className="space-y-8">
              {MEAL_SLOTS.map((slot) => (
                <div key={slot.key} className="border-l-4 border-black pl-4 py-2">
                  <h4 className="font-black uppercase text-base md:text-lg mb-4 tracking-tight">
                    {slot.label}
                  </h4>
                  <div className="space-y-4">
                    <RatingScale4
                      name={`${slot.key}_quality`}
                      label="Qualidade da comida"
                      options={RATING_4}
                      value={meals[slot.key].quality}
                      onChange={(v) => setMeal(slot.key, "quality", v)}
                      required
                    />
                    <RatingScale4
                      name={`${slot.key}_quantity`}
                      label="Quantidade da comida"
                      options={QUANTITY_3}
                      value={meals[slot.key].quantity}
                      onChange={(v) => setMeal(slot.key, "quantity", v)}
                      required
                    />
                    <RatingScale4
                      name={`${slot.key}_variety`}
                      label="Variedade"
                      options={RATING_4}
                      value={meals[slot.key].variety}
                      onChange={(v) => setMeal(slot.key, "variety", v)}
                      required
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Estrutura */}
          <div className="bg-white border-4 border-black p-6 md:p-10 shadow-[12px_12px_0_#39C463]">
            <SectionHeader
              number={4}
              title="Estrutura e organização"
              subtitle="Sobre a estrutura e organização do evento."
            />
            <div className="space-y-6">
              {STRUCTURE_QUESTIONS.map((q) => (
                <RatingScale4
                  key={q.key}
                  name={q.key}
                  label={q.label}
                  options={RATING_4}
                  value={ratings[q.key] || ""}
                  onChange={(v) => setRating(q.key, v)}
                  required
                />
              ))}
            </div>
          </div>

          {/* Section: Mentores */}
          {showMentors && (
            <div className="bg-white border-4 border-black p-6 md:p-10 shadow-[12px_12px_0_#EC4899]">
              <SectionHeader
                number={5}
                title="Mentores"
                subtitle="Sobre os mentores que participaram do evento."
              />
              <div className="space-y-6">
                {MENTOR_QUESTIONS.map((q) => (
                  <RatingScale4
                    key={q.key}
                    name={q.key}
                    label={q.label}
                    options={RATING_4}
                    value={ratings[q.key] || ""}
                    onChange={(v) => setRating(q.key, v)}
                    required
                  />
                ))}
              </div>
            </div>
          )}

          {/* Section: Facilitador */}
          <div className="bg-white border-4 border-black p-6 md:p-10 shadow-[12px_12px_0_#000]">
            <SectionHeader
              number={showMentors ? 6 : 5}
              title="Facilitador"
              subtitle="Sobre o facilitador do evento."
            />
            <div className="space-y-6">
              {FACILITATOR_QUESTIONS.map((q) => (
                <RatingScale4
                  key={q.key}
                  name={q.key}
                  label={q.label}
                  options={RATING_4}
                  value={ratings[q.key] || ""}
                  onChange={(v) => setRating(q.key, v)}
                  required
                />
              ))}
            </div>
          </div>

          {/* Section: Experiência */}
          <div className="bg-white border-4 border-black p-6 md:p-10 shadow-[12px_12px_0_#FCD34D]">
            <SectionHeader
              number={showMentors ? 7 : 6}
              title="Experiência e jornada"
              subtitle="Sobre a sua experiência e jornada durante o evento."
            />
            <div className="space-y-8">
              <SelectField
                label="Você entendeu a jornada do evento?"
                value={expUnderstoodJourney}
                onChange={setExpUnderstoodJourney}
                options={[
                  { value: "true", label: "Sim" },
                  { value: "false", label: "Não" },
                ]}
                required
              />

              <SelectField
                label="Você considera que o evento é voltado apenas para a criação de startups ou também para o desenvolvimento pessoal e aprimoramento profissional?"
                value={expEventFocus}
                onChange={setExpEventFocus}
                options={EVENT_FOCUS}
                required
              />

              {EXPERIENCE_RATING_QUESTIONS.map((q) => (
                <RatingScale4
                  key={q.key}
                  name={q.key}
                  label={q.label}
                  options={RATING_4}
                  value={ratings[q.key] || ""}
                  onChange={(v) => setRating(q.key, v)}
                  required
                />
              ))}
            </div>
          </div>

          {/* Section: Sugestões */}
          <div className="bg-white border-4 border-black p-6 md:p-10 shadow-[12px_12px_0_#0EA5E9]">
            <SectionHeader
              number={showMentors ? 8 : 7}
              title="Sugestões e elogios"
              subtitle="Agora é com você."
            />
            <div>
              <label className="block text-black font-bold text-sm md:text-base mb-2">
                Quais sugestões de melhorias, críticas, elogios você gostaria de fazer?
              </label>
              <textarea
                rows={5}
                value={suggestions}
                onChange={(e) => setSuggestions(e.target.value)}
                placeholder="Compartilhe livremente..."
                className={FIELD_INPUT_CLASS}
              />
            </div>
          </div>

          {/* Section: Voluntariado */}
          <div className="bg-white border-4 border-black p-6 md:p-10 shadow-[12px_12px_0_#39C463]">
            <SectionHeader
              number={showMentors ? 9 : 8}
              title="Próxima edição"
              subtitle="Quer ajudar a organizar o próximo Startup Weekend?"
            />

            <SelectField
              label="Você gostaria de fazer parte do próximo time de organização?"
              value={volunteerInterested}
              onChange={setVolunteerInterested}
              options={[
                { value: "true", label: "Sim" },
                { value: "false", label: "Não" },
              ]}
              required
            />

            {volunteerInterested === "true" && (
              <div className="mt-8 space-y-6 border-t-4 border-black pt-6">
                <SelectField
                  label="Qual o melhor dia da semana para você?"
                  value={volunteerData.volunteer_weekday}
                  onChange={(v) => setVolunteerField("volunteer_weekday", v)}
                  options={WEEKDAYS}
                  required
                />
                <SelectField
                  label="Qual o melhor período para participar das reuniões?"
                  value={volunteerData.volunteer_period}
                  onChange={(v) => setVolunteerField("volunteer_period", v)}
                  options={PERIODS}
                  required
                />
                <SelectField
                  label="Qual a disponibilidade para participar das reuniões de organização?"
                  value={volunteerData.volunteer_modality}
                  onChange={(v) => setVolunteerField("volunteer_modality", v)}
                  options={MODALITIES}
                  required
                />
                <SelectField
                  label="Você reside em Anápolis - GO?"
                  value={volunteerData.volunteer_resides_local}
                  onChange={(v) => setVolunteerField("volunteer_resides_local", v)}
                  options={[
                    { value: "true", label: "Sim" },
                    { value: "false", label: "Não" },
                  ]}
                  required
                />

                <div>
                  <label className="block text-black font-bold text-sm md:text-base mb-2">
                    Qual sua área de trabalho?
                  </label>
                  <input
                    type="text"
                    value={volunteerData.volunteer_work_area}
                    onChange={(e) => setVolunteerField("volunteer_work_area", e.target.value)}
                    placeholder="Ex: Marketing, Tecnologia, Educação..."
                    className={FIELD_INPUT_CLASS}
                  />
                </div>

                <div>
                  <label className="block text-black font-bold text-sm md:text-base mb-2">
                    Qual sua formação?
                  </label>
                  <input
                    type="text"
                    value={volunteerData.volunteer_education}
                    onChange={(e) => setVolunteerField("volunteer_education", e.target.value)}
                    placeholder="Ex: Engenharia da Computação"
                    className={FIELD_INPUT_CLASS}
                  />
                </div>

                <div>
                  <label className="block text-black font-bold text-sm md:text-base mb-2">
                    Telefone (WhatsApp) <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    value={volunteerData.volunteer_phone}
                    onChange={(e) =>
                      setVolunteerField(
                        "volunteer_phone",
                        VMasker.toPattern(e.target.value, "(99) 99999-9999")
                      )
                    }
                    maxLength={15}
                    placeholder="(00) 00000-0000"
                    className={FIELD_INPUT_CLASS}
                  />
                </div>

                <div>
                  <label className="block text-black font-bold text-sm md:text-base mb-2">
                    E-mail <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="email"
                    value={volunteerData.volunteer_email}
                    onChange={(e) => setVolunteerField("volunteer_email", e.target.value)}
                    placeholder="seu@email.com"
                    className={FIELD_INPUT_CLASS}
                  />
                </div>

                <div>
                  <label className="block text-black font-bold text-sm md:text-base mb-2">
                    Redes sociais (LinkedIn, Instagram, Facebook, etc.)
                  </label>
                  <textarea
                    rows={2}
                    value={volunteerData.volunteer_social}
                    onChange={(e) => setVolunteerField("volunteer_social", e.target.value)}
                    placeholder="Cole os links..."
                    className={FIELD_INPUT_CLASS}
                  />
                </div>

                <div>
                  <label className="block text-black font-bold text-sm md:text-base mb-2">
                    O que você espera ao ajudar a organizar o Techstars_ Startup Weekend?
                  </label>
                  <textarea
                    rows={3}
                    value={volunteerData.volunteer_expectations}
                    onChange={(e) => setVolunteerField("volunteer_expectations", e.target.value)}
                    className={FIELD_INPUT_CLASS}
                  />
                </div>

                <div>
                  <label className="block text-black font-bold text-sm md:text-base mb-2">
                    Você já fez trabalho voluntário? Caso sim, poderia explicar?
                  </label>
                  <textarea
                    rows={3}
                    value={volunteerData.volunteer_prior_experience}
                    onChange={(e) => setVolunteerField("volunteer_prior_experience", e.target.value)}
                    className={FIELD_INPUT_CLASS}
                  />
                </div>

                <SelectField
                  label="Quanto tempo na semana você poderia se dedicar ao trabalho voluntário?"
                  value={volunteerData.volunteer_weekly_hours}
                  onChange={(v) => setVolunteerField("volunteer_weekly_hours", v)}
                  options={VOLUNTEER_HOURS}
                  required
                />
              </div>
            )}

            <div className="mt-8 border-t-4 border-black pt-6">
              <label className="block text-black font-bold text-sm md:text-base mb-2">
                Tem algo a mais que gostaria de falar?
              </label>
              <textarea
                rows={3}
                value={volunteerData.volunteer_extra}
                onChange={(e) => setVolunteerField("volunteer_extra", e.target.value)}
                placeholder="Opcional"
                className={FIELD_INPUT_CLASS}
              />
            </div>
          </div>

          {/* Submit */}
          {error && (
            <div className="bg-red-500 border-4 border-black text-white p-4 shadow-[6px_6px_0_#000] font-black uppercase tracking-widest text-sm text-center">
              ERRO: {error}
            </div>
          )}

          <button
            type="button"
            onClick={handleSubmit}
            disabled={isLoading}
            className="brutal-btn w-full py-5 text-lg md:text-xl tracking-tighter disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-x-0 disabled:hover:translate-y-0 disabled:hover:shadow-[6px_6px_0_#000]"
          >
            {isLoading ? "ENVIANDO..." : "ENVIAR PESQUISA"}
          </button>
        </>
      )}
    </div>
  );
}
