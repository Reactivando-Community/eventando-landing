"use client";

import Image from "next/image";

// Dados dos palestrantes principais
const keynoteSpeakers = [
  {
    id: 1,
    name: "Alyf Mendonça",
    photo: "/images/speakers/alyf-mendonca.jpeg",
    talk: "As oportunidades para programadores no mercado financeiro",
    bio: "Alyf Mendonça é Head de Tecnologia na AUVP, com mais de 9 anos de experiência em desenvolvimento de sistemas. Atuou em empresas como Santander e BTG Pactual e atualmente lidera equipes e cria soluções voltadas ao mercado financeiro.",
    linkedin: "https://www.linkedin.com/in/alyf-mendon%C3%A7a-3549a5144/",
    instagram: "alyfmendonca",
    featured: true,
  },
  {
    id: 2,
    name: "Marcelo Palladino",
    photo: "/images/speakers/MarceloPalladino.jpg",
    talk: "O que aprendi (e continuo aprendendo) com a cultura da Amazon que Impulsiona inovação",
    bio: 'Marcelo Palladino "Palla" tem mais de 30 anos de experiência no mercado. Hoje, atua como Senior Developer Advocate na AWS, onde trabalha para conectar desenvolvedores e empresas à inovação em nuvem, promovendo boas práticas de engenharia, arquitetura moderna e adoção de tecnologias emergentes.',
    linkedin: "https://www.linkedin.com/in/mfpalladino/",
    instagram: "https://www.instagram.com/pallaseminsta/",
    featured: true,
  },
  {
    id: 3,
    name: "Luiz Machado",
    photo: "/images/speakers/luiz-machado.jpg",
    talk: "Por que dropei mais de 10 empresas (e o problema nem sempre era eu)",
    bio: "Luiz Machado é Head de Tecnologia, AWS Community Builder e especialista em segurança AWS/DevSecOps. Fundador da comunidade GYNSec, cria e apoia ferramentas open source. Focado em evoluir pessoas, formar líderes e impulsionar a maturidade técnica das equipes.",
    linkedin: "https://linkedin.com/in/luizmachadoaws",
    instagram: "https://instagram.com/luizmachadoaws",
    featured: true,
  },
  {
    id: 4,
    name: "Ana Mioto",
    photo: "/images/speakers/ana-mioto.jpg",
    talk: "ML no escuro: Por que seus modelos falham em produção e como a observabilidade pode salvar o dia",
    bio: "Ana Mioto é Cientista de Dados Sênior no Banco Bradesco. Já atuou como pesquisadora e em empresas dos setores de saúde, finanças, mídia e educação. Possui paixão por Ciência de Dados e Inteligência Artificial com foco em aplicações práticas nos negócios. É Co-Fundadora e Líder de Pesquisa & Desenvolvimento na Comunidade Data Girls. Também reconhecida como Microsoft MVP e Alura Star.",
    linkedin: "https://www.linkedin.com/in/anaclara-amioto/",
    instagram: "https://www.instagram.com/ana_mioto/",
    featured: true,
  },
  {
    id: 5,
    name: "Tiago Jorge",
    photo: "/images/speakers/tiago-jorge.jpg",
    talk: "Do Monolito a Event-Driven: A Jornada Serverless que Transformará sua Carreira",
    bio: "Head Serverless at Cilia Tecnologia",
    linkedin: "https://linkedin.com/in/tiagojorgeaws",
    instagram: "https://www.instagram.com/tiagojorgep/",
    featured: true,
  },
];

const getSocialIcon = (platform: string) => {
  switch (platform.toLowerCase()) {
    case "linkedin":
      return (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      );
    case "instagram":
      return (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.017 0C8.396 0 7.929.01 6.71.058 5.493.107 4.67.267 3.95.567c-.74.31-1.37.723-2.008 1.36C1.305 2.565.893 3.195.583 3.935c-.3.72-.46 1.543-.509 2.76C.026 7.914.016 8.381.016 12.002c0 3.62.01 4.087.058 5.306.049 1.217.209 2.04.509 2.76.31.74.723 1.37 1.36 2.008.638.637 1.268 1.05 2.008 1.36.72.3 1.543.46 2.76.509 1.219.048 1.686.058 5.306.058 3.62 0 4.087-.01 5.306-.058 1.217-.049 2.04-.209 2.76-.509.74-.31 1.37-.723 2.008-1.36.637-.638 1.05-1.268 1.36-2.008.3-.72.46-1.543.509-2.76.048-1.219.058-1.686.058-5.306 0-3.62-.01-4.087-.058-5.306-.049-1.217-.209-2.04-.509-2.76-.31-.74-.723-1.37-1.36-2.008C19.403.893 18.773.48 18.033.17c-.72-.3-1.543-.46-2.76-.509C14.054.01 13.587 0 9.967 0h2.05zm-.05 5.435c3.61 0 6.567 2.956 6.567 6.567 0 3.61-2.956 6.567-6.567 6.567-3.61 0-6.567-2.956-6.567-6.567 0-3.61 2.956-6.567 6.567-6.567zM12.017 16.002A4.001 4.001 0 1112.017 8a4.001 4.001 0 010 8.002zm7.833-10.32a1.536 1.536 0 11-3.072 0 1.536 1.536 0 013.072 0z" />
        </svg>
      );
    default:
      return null;
  }
};

export default function KeynoteSpeakersSection() {
  return (
    <section className="py-24 px-6 bg-gray-50 dark:bg-dark-800">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            Keynote Speakers
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Conheça os palestrantes principais que irão compartilhar
            conhecimentos e experiências únicas no techstars_ Startup Weekend Anápolis
          </p>
        </div>

        {/* Speakers Grid */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {keynoteSpeakers.map((speaker, index) => {
            const isLastItem = index === keynoteSpeakers.length - 1;
            const isOddNumber = keynoteSpeakers.length % 2 !== 0;
            const shouldCenter = isLastItem && isOddNumber;

            return (
              <div
                key={speaker.id}
                className={`group relative bg-white/80 dark:bg-dark-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-dark-700 ${
                  shouldCenter ? "lg:col-span-2 lg:max-w-2xl lg:mx-auto" : ""
                }`}
              >
                {/* Featured Badge */}
                <div className="absolute -top-3 -right-3 bg-primary-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                  KEYNOTE
                </div>

                <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
                  {/* Speaker Photo */}
                  <div className="relative">
                    <div className="relative w-40 h-40 lg:w-48 lg:h-48">
                      <Image
                        src={speaker.photo}
                        alt={speaker.name}
                        fill
                        className="rounded-2xl object-cover shadow-lg group-hover:scale-105 transition-transform duration-300"
                      />
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent rounded-2xl" />
                    </div>

                    {/* Floating Icon */}
                    <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center shadow-lg">
                      <svg
                        className="w-6 h-6 text-white"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" />
                      </svg>
                    </div>
                  </div>

                  {/* Speaker Info */}
                  <div className="flex-1 text-center lg:text-left">
                    <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-3">
                      {speaker.name}
                    </h3>

                    <div className="bg-primary-50 dark:bg-primary-900/20 rounded-xl p-4 mb-6 border border-primary-100 dark:border-primary-800">
                      <p className="text-lg font-semibold text-primary-700 dark:text-primary-300">
                        {speaker.talk}
                      </p>
                    </div>

                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                      {speaker.bio}
                    </p>

                    {/* Social Links */}
                    <div className="flex justify-center lg:justify-start space-x-4">
                      {speaker.linkedin && (
                        <a
                          href={speaker.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full hover:scale-110 transition-transform duration-200 shadow-lg"
                        >
                          {getSocialIcon("linkedin")}
                        </a>
                      )}
                      {speaker.instagram && (
                        <a
                          href={
                            speaker.instagram.startsWith("http")
                              ? speaker.instagram
                              : `https://instagram.com/${speaker.instagram}`
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full hover:scale-110 transition-transform duration-200 shadow-lg"
                        >
                          {getSocialIcon("instagram")}
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-primary-800 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              Não perca as palestras principais!
            </h3>
            <p className="text-lg opacity-90 mb-6">
              Garante sua vaga para assistir aos keynote speakers e muito mais
              no techstars_ Startup Weekend Anápolis
            </p>
            <a
              href="https://doity.com.br/startup-weekend-anapolis"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-white text-primary-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-200 shadow-lg"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
              Inscreva-se Agora
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
