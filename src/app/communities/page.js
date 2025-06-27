"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const communities = [
  // {
  //   name: "AWS User Group Goiânia",
  //   description: "Comunidade focada em tecnologias AWS e cloud computing",
  //   logo: "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg",
  //   link: "https://www.meetup.com/aws-user-group-goiania/",
  //   category: "Cloud",
  // },
  // {
  //   name: "GDG Goiânia",
  //   description: "Google Developer Group Goiânia - tecnologias Google",
  //   logo: "https://developers.google.com/static/community/images/gdg-logo.svg",
  //   link: "https://gdg.community.dev/gdg-goiania/",
  //   category: "Google",
  // },

  {
    name: "GynSec",
    description: `A GynSec é uma comunidade de cibersegurança que nasceu no coração do Brasil, em Goiânia-GO!

Nosso propósito é claro: disseminar conhecimento, conectar entusiastas e profissionais, e fortalecer o ecossistema de segurança digital.`,
    logo: "https://i.ibb.co/KcKfcqVC/GYNSEC-finalredandbluenobackground-Matheus-Costa.png",
    link: "https://www.meetup.com/gynsec/",
    category: "Segurança",
  },
  {
    name: "Reactivando",
    description: `A Reactivando é uma comunidade tech que nasceu com o pé no React, mas o coração aberto pra tudo que fortalece o ecossistema: meetups, mentorias, carreira e muita troca entre devs de todo o Brasil. 

Nosso objetivo? Reativar a cena tech onde você estiver.`,
    logo: "https://i.ibb.co/M3G7Pzc/REACTVANDO-LOGO.jpg",
    link: "https://www.meetup.com/reactivando/",
    category: "Tecnologia",
  },
  // {
  //   name: "GOJava",
  //   description: "Comunidade Java em Goiás",
  //   logo: "https://upload.wikimedia.org/wikipedia/en/3/30/Java_programming_language_logo.svg",
  //   link: "https://www.meetup.com/gojava/",
  //   category: "Java",
  // },
  // {
  //   name: "Override .Net Community",
  //   description: "Comunidade .NET em Goiás",
  //   logo: "https://upload.wikimedia.org/wikipedia/commons/e/e8/.NET_logo.svg",
  //   link: "https://www.meetup.com/override-dotnet/",
  //   category: ".NET",
  // },
  // {
  //   name: "MulheresGO",
  //   description: "Comunidade de mulheres na tecnologia em Goiás",
  //   logo: "https://cdn-icons-png.flaticon.com/512/1995/1995574.png",
  //   link: "https://www.meetup.com/mulheresgo/",
  //   category: "Diversidade",
  // },
  // {
  //   name: "StartupGO",
  //   description: "Comunidade de startups e empreendedorismo",
  //   logo: "https://cdn-icons-png.flaticon.com/512/1995/1995574.png",
  //   link: "https://www.meetup.com/startupgo/",
  //   category: "Startups",
  // },
  // // Comunidades sem logo (vão mostrar a inicial)
  // {
  //   name: "CS Meetup GO",
  //   description: "Encontros sobre Ciência da Computação e tecnologia",
  //   logo: null,
  //   link: "https://www.meetup.com/cs-meetup-go/",
  //   category: "Geral",
  // },
  // {
  //   name: "DevOpsGO",
  //   description: "Comunidade de DevOps e automação em Goiás",
  //   logo: null,
  //   link: "https://www.meetup.com/devopsgo/",
  //   category: "DevOps",
  // },
  // {
  //   name: "GAMEGO",
  //   description: "Comunidade de desenvolvimento de jogos em Goiás",
  //   logo: null,
  //   link: "https://www.meetup.com/gamego/",
  //   category: "Games",
  // },
  // {
  //   name: "GUOCB",
  //   description: "Grupo de Usuários Oracle de Goiânia",
  //   logo: null,
  //   link: "https://www.meetup.com/guocb/",
  //   category: "Oracle",
  // },
  // {
  //   name: "IxDA",
  //   description: "Interaction Design Association Goiânia",
  //   logo: null,
  //   link: "https://www.meetup.com/ixda-goiania/",
  //   category: "Design",
  // },
  // {
  //   name: "PorteraTech",
  //   description: "Comunidade de tecnologia e inovação",
  //   logo: null,
  //   link: "https://www.meetup.com/porteratech/",
  //   category: "Inovação",
  // },
  // {
  //   name: "Product Camp Goiás",
  //   description: "Comunidade de Product Management",
  //   logo: null,
  //   link: "https://www.meetup.com/product-camp-goias/",
  //   category: "Product",
  // },
  // {
  //   name: "Anapolivre",
  //   description: "Comunidade de software livre em Anápolis",
  //   logo: null,
  //   link: "https://www.meetup.com/anapolivre/",
  //   category: "Software Livre",
  // },
  // {
  //   name: "OWASP Goiânia",
  //   description: "OWASP Chapter Goiânia - segurança de aplicações",
  //   logo: null,
  //   link: "https://www.meetup.com/owasp-goiania/",
  //   category: "Segurança",
  // },
];

const categories = [
  "Todas",
  "Tecnologia",
  "Empreendedorismo",
  "Educação",
  "Cultura",
  "Esporte",
  "Arte",
  "Meio Ambiente",
  "Saúde",
  "Direitos Humanos",
  "Voluntariado",
  "Profissional",
  "Acadêmico",
  "Social",
  "Criativo",
  "Inovação",
];

export default function CommunitiesPage() {
  const [selectedCategory, setSelectedCategory] = useState("Todas");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCommunities = communities.filter((community) => {
    const matchesCategory =
      selectedCategory === "Todas" || community.category === selectedCategory;
    const matchesSearch =
      community.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      community.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-900">
      {/* Header */}
      <header className="bg-white dark:bg-dark-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/images/logo-join.png"
                alt="Join Community"
                width={120}
                height={40}
                className="h-8 w-auto"
              />
            </Link>
            <Link
              href="/"
              className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              ← Voltar para o evento
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-6 bg-white dark:bg-dark-800">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Comunidades
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Conheça as comunidades que fazem parte do ecossistema de Goiás
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <div className="relative w-full max-w-md">
              <input
                type="text"
                placeholder="Buscar comunidades..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 pl-10 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-dark-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <svg
                className="absolute left-3 top-3.5 h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-dark-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Communities Grid */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCommunities.map((community, index) => (
              <div
                key={index}
                className="bg-white dark:bg-dark-800 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gray-100 dark:bg-dark-700 rounded-lg flex items-center justify-center mr-4 overflow-hidden">
                      {community.logo ? (
                        <Image
                          src={community.logo}
                          alt={`Logo ${community.name}`}
                          width={48}
                          height={48}
                          className="w-full h-full object-contain"
                          onError={(e) => {
                            // Fallback para inicial se a imagem falhar
                            e.target.style.display = "none";
                            e.target.nextSibling.style.display = "flex";
                          }}
                        />
                      ) : null}
                      <span
                        className={`text-xl font-bold text-gray-600 dark:text-gray-300 ${
                          community.logo ? "hidden" : "flex"
                        } items-center justify-center w-full h-full`}
                      >
                        {community.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {community.name}
                      </h3>
                      <span className="inline-block px-2 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full">
                        {community.category}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 whitespace-pre-line">
                    {community.description}
                  </p>
                  <a
                    href={community.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
                  >
                    Conhecer comunidade
                    <svg
                      className="ml-2 h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>

          {filteredCommunities.length === 0 && (
            <div className="text-center py-16">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47-.881-6.08-2.33"
                />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
                Nenhuma comunidade encontrada
              </h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Tente ajustar os filtros de busca.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-dark-900 text-gray-400">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-lg mb-4">Join Community 2025</p>
          <p className="text-sm">
            Organização Join Community • Todos os direitos reservados
          </p>
        </div>
      </footer>
    </div>
  );
}
