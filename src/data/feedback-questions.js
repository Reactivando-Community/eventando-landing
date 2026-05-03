/**
 * Event Feedback / NPS Survey Configuration
 *
 * Single source of truth for question text, scales, and per-role visibility.
 * The form renders by mapping over these arrays; the admin analytics use the
 * same labels for chart axes and table headers.
 */

// ─── Roles ───────────────────────────────────────────────────────────────

export const ROLES = [
  { value: "participante", label: "Participante", emoji: "🚀" },
  { value: "mentor", label: "Mentor", emoji: "🧭" },
  { value: "jurado", label: "Jurado", emoji: "⚖️" },
];

// ─── Scales ──────────────────────────────────────────────────────────────

export const RATING_4 = [
  { value: "ruim", label: "Ruim" },
  { value: "regular", label: "Regular" },
  { value: "boa", label: "Boa" },
  { value: "excelente", label: "Excelente" },
];

export const QUANTITY_3 = [
  { value: "suficiente", label: "Suficiente" },
  { value: "pouca", label: "Pouca" },
  { value: "exagerada", label: "Exagerada" },
];

export const YES_NO = [
  { value: "true", label: "Sim" },
  { value: "false", label: "Não" },
];

export const EVENT_FOCUS = [
  { value: "somente_startups", label: "Somente startups" },
  { value: "desenvolvimento_pessoal_profissional", label: "Desenvolvimento pessoal/profissional" },
];

export const WEEKDAYS = [
  { value: "segunda", label: "Segunda-feira" },
  { value: "terca", label: "Terça-feira" },
  { value: "quarta", label: "Quarta-feira" },
  { value: "quinta", label: "Quinta-feira" },
  { value: "sexta", label: "Sexta-feira" },
];

export const PERIODS = [
  { value: "manha", label: "Período da manhã" },
  { value: "tarde", label: "Período da tarde" },
  { value: "noite", label: "Período da noite" },
];

export const MODALITIES = [
  { value: "presencial", label: "Presencial" },
  { value: "remoto", label: "Remoto" },
  { value: "hibrido", label: "Híbrido" },
];

export const VOLUNTEER_HOURS = [
  { value: "menos_1h", label: "Menos de 1h" },
  { value: "entre_1h_2h", label: "1h a 2h" },
  { value: "entre_2h_4h", label: "2h a 4h" },
  { value: "mais_4h", label: "Mais de 4h" },
];

// ─── Section 0: NPS ──────────────────────────────────────────────────────

export const NPS_QUESTION = {
  participante: "Em uma escala de 0 a 10, qual a chance de você recomendar o Startup Weekend para um amigo?",
  mentor: "Em uma escala de 0 a 10, qual a chance de você recomendar ser mentor neste evento para um colega?",
  jurado: "Em uma escala de 0 a 10, qual a chance de você recomendar ser jurado neste evento para um colega?",
};

// ─── Section 1: Refeições ────────────────────────────────────────────────

export const MEAL_SLOTS = [
  { key: "sex_jantar", label: "Sexta-feira – Jantar" },
  { key: "sab_cafe", label: "Sábado – Café da manhã" },
  { key: "sab_almoco", label: "Sábado – Almoço" },
  { key: "sab_lanche", label: "Sábado – Café da tarde" },
  { key: "sab_jantar", label: "Sábado – Jantar" },
  { key: "dom_cafe", label: "Domingo – Café da manhã" },
  { key: "dom_almoco", label: "Domingo – Almoço" },
  { key: "dom_lanche", label: "Domingo – Café da tarde" },
];

// ─── Section 2: Estrutura e organização ──────────────────────────────────

export const STRUCTURE_QUESTIONS = [
  { key: "structure_venue", label: "Local do evento (espaço físico, conforto, acessibilidade)" },
  { key: "structure_facilities", label: "Estrutura do evento (equipamentos, salas, internet, etc.)" },
  { key: "structure_org_availability", label: "Disponibilidade dos organizadores (acessibilidade, apoio, prontidão)" },
  { key: "structure_org_treatment", label: "Tratamento dos organizadores com os participantes (cordialidade, receptividade)" },
  { key: "structure_pre_communication", label: "A comunicação pré-evento foi clara e eficiente?" },
  { key: "structure_info_completeness", label: "Você recebeu todas as informações necessárias para participar do evento?" },
  { key: "structure_punctuality", label: "O evento começou e terminou nos horários programados?" },
  { key: "structure_schedule_distribution", label: "A distribuição dos horários (palestras, mentorias, atividades) foi adequada?" },
  { key: "structure_logistics", label: "A logística (credenciamento, recepção, entrega de materiais) foi eficiente?" },
];

// ─── Section 3: Mentores ─────────────────────────────────────────────────

export const MENTOR_QUESTIONS = [
  { key: "mentors_subject_mastery", label: "Domínio do assunto" },
  { key: "mentors_treatment", label: "Tratativa com os participantes" },
  { key: "mentors_journey_support", label: "Apoio na jornada do evento" },
  { key: "mentors_journey_understanding", label: "Entendimento sobre a jornada do evento" },
  { key: "mentors_availability", label: "Disponibilidade dos mentores" },
  { key: "mentors_doubt_resolution", label: "Os mentores conseguiram esclarecer suas dúvidas de forma eficiente?" },
  { key: "mentors_time_availability", label: "Os mentores estavam disponíveis durante o tempo necessário?" },
  { key: "mentors_idea_encouragement", label: "Os mentores incentivaram o desenvolvimento da sua ideia/projeto?" },
  { key: "mentors_felt_supported", label: "Você se sentiu apoiado pelos mentores durante o processo?" },
  { key: "mentors_interaction_quality", label: "A interação com os mentores foi satisfatória para o avanço do seu projeto?" },
];

// ─── Section 4: Facilitador ──────────────────────────────────────────────

export const FACILITATOR_QUESTIONS = [
  { key: "facilitator_subject_mastery", label: "Domínio do assunto" },
  { key: "facilitator_treatment", label: "Tratativa com os participantes" },
  { key: "facilitator_journey_support", label: "Apoio na jornada do evento" },
  { key: "facilitator_journey_understanding", label: "Entendimento sobre a jornada do evento" },
  { key: "facilitator_availability", label: "Disponibilidade do facilitador" },
  { key: "facilitator_clarity", label: "O facilitador foi claro ao explicar as etapas e a jornada do evento?" },
  { key: "facilitator_motivation", label: "O facilitador motivou os participantes durante o evento?" },
  { key: "facilitator_dynamics", label: "O facilitador conseguiu manter a dinâmica e energia do grupo?" },
  { key: "facilitator_mediation", label: "A mediação do facilitador entre as diferentes atividades foi eficaz?" },
  { key: "facilitator_direction", label: "Você se sentiu bem direcionado pelo facilitador em relação às atividades e o andamento do evento?" },
];

// ─── Section 5: Experiência e jornada ────────────────────────────────────

export const EXPERIENCE_RATING_QUESTIONS = [
  { key: "exp_overall_quality", label: "Como você avalia a qualidade geral do evento?" },
  { key: "exp_would_recommend", label: "Você recomendaria o Techstars_ Startup Weekend para outras pessoas?" },
  { key: "exp_personal_growth", label: "Você sentiu que o evento ajudou no seu crescimento pessoal ou profissional?" },
  { key: "exp_met_expectations", label: "A experiência proporcionada pelo evento atendeu ou superou suas expectativas?" },
  { key: "exp_career_value", label: "Você acredita que o evento trouxe valor para sua carreira ou projeto?" },
  { key: "exp_collaborative_env", label: "A organização do evento proporcionou um ambiente colaborativo e inovador?" },
  { key: "exp_attend_again", label: "Você considera participar de outras edições do Techstars_ Startup Weekend?" },
];

// ─── Section 7: Voluntariado ─────────────────────────────────────────────

export const VOLUNTEER_FIELDS = [
  { key: "volunteer_weekday", label: "Qual o melhor dia da semana para você?", type: "select", options: WEEKDAYS, showIfInterested: true },
  { key: "volunteer_period", label: "Qual o melhor período para participar das reuniões?", type: "select", options: PERIODS, showIfInterested: true },
  { key: "volunteer_modality", label: "Qual a disponibilidade para participar das reuniões de organização?", type: "select", options: MODALITIES, showIfInterested: true },
  { key: "volunteer_resides_local", label: "Você reside em Anápolis - GO?", type: "yesno", showIfInterested: true },
  { key: "volunteer_work_area", label: "Qual sua área de trabalho?", type: "text", showIfInterested: true },
  { key: "volunteer_education", label: "Qual sua formação?", type: "text", showIfInterested: true },
  { key: "volunteer_phone", label: "Para fazer parte da organização, vamos criar um grupo no WhatsApp. Qual o número do seu telefone?", type: "phone", showIfInterested: true },
  { key: "volunteer_email", label: "Qual seu e-mail?", type: "email", showIfInterested: true },
  { key: "volunteer_social", label: "Coloque aqui suas redes sociais (LinkedIn, Instagram, Facebook, etc.)", type: "textarea", showIfInterested: true },
  { key: "volunteer_expectations", label: "O que você espera ao ajudar a organizar o Techstars_ Startup Weekend?", type: "textarea", showIfInterested: true },
  { key: "volunteer_prior_experience", label: "Você já fez trabalho voluntário? Caso sim, poderia explicar?", type: "textarea", showIfInterested: true },
  { key: "volunteer_weekly_hours", label: "Quanto tempo na semana você poderia se dedicar ao trabalho voluntário?", type: "select", options: VOLUNTEER_HOURS, showIfInterested: true },
  { key: "volunteer_extra", label: "Tem algo a mais que gostaria de falar?", type: "textarea", showIfInterested: false },
];

// ─── Helpers ─────────────────────────────────────────────────────────────

/**
 * Returns the list of sections that apply to a given role.
 * - Mentor role: skip the "rate the mentors" section (they don't rate themselves).
 * - All other sections shown to all roles.
 */
export const sectionsForRole = (role) => {
  const all = ["meals", "structure", "mentors", "facilitator", "experience", "suggestions", "volunteer"];
  if (role === "mentor") return all.filter((s) => s !== "mentors");
  return all;
};
