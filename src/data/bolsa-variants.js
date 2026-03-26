/**
 * A/B test variants for the scholarship CTA.
 * Each variant has a CTA title, subtitle, modal challenge text,
 * and the accept/decline button labels.
 */
export const bolsaVariants = [
  {
    id: "B",
    ctaTitle:
      "Esse programa não é pra todo mundo. É pra quem tem coragem de provar que merece estar aqui.",
    ctaSubtitle: "Bolsa 100%. Sem custo. Sem desculpa.",
    modalChallenge:
      "Esse programa vai te tirar da zona de conforto, te colocar sob pressão e te forçar a entregar resultado. Bolsa 100%. Ainda quer participar?",
  },
  {
    id: "D",
    ctaTitle:
      "A gente não quer saber se você é rico ou pobre. A gente quer saber se você merece.",
    ctaSubtitle: "Bolsa 100%. Prove que é digno de uma.",
    modalChallenge:
      "Essa bolsa não é caridade. É uma aposta em quem tem fome de fazer acontecer. Se você tem, nos convença.",
  },
  {
    id: "E",
    ctaTitle:
      "A oportunidade que você vive pedindo tá na sua frente. Bolsa 100%.",
    ctaSubtitle:
      "Inscreva-se ou admita que o problema nunca foi a falta de chance.",
    modalChallenge:
      "Se você não se inscrever agora, a culpa não é mais do universo. É sua.",
  },
];

/**
 * Pick a random variant. Uses Math.random() for even distribution.
 */
export function pickVariant() {
  return bolsaVariants[Math.floor(Math.random() * bolsaVariants.length)];
}
