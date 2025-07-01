"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { communities } from "./communities";
import { SocialLinks, getChannelLabel } from "./SocialLinks";

const DescriptionText = ({ text }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const maxLength = 120;

  const shouldShowButton = text.length > maxLength;
  const displayText = isExpanded
    ? text
    : text.slice(0, maxLength) + (shouldShowButton ? "..." : "");

  return (
    <div>
      <p className="text-gray-600 dark:text-gray-300 whitespace-pre-line leading-relaxed text-sm">
        {displayText}
      </p>

      {shouldShowButton && (
        <div className="mt-2">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm font-medium transition-colors duration-200 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
          >
            {isExpanded ? "Ver menos" : "Ver mais"}
          </button>
        </div>
      )}
    </div>
  );
};

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
  const [selectedChannel, setSelectedChannel] = useState("Todos");
  const [searchTerm, setSearchTerm] = useState("");

  const allChannels = ["Todos"];
  communities.forEach((community) => {
    if (community.socialLinks) {
      community.socialLinks.forEach((link) => {
        const channelLabel = getChannelLabel(link.type);
        if (!allChannels.includes(channelLabel)) {
          allChannels.push(channelLabel);
        }
      });
    }
  });

  const filteredCommunities = communities.filter((community) => {
    const matchesCategory =
      selectedCategory === "Todas" || community.category === selectedCategory;
    const matchesSearch =
      community.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      community.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesChannel =
      selectedChannel === "Todos" ||
      (community.socialLinks &&
        community.socialLinks.some(
          (link) => getChannelLabel(link.type) === selectedChannel
        ));
    return matchesCategory && matchesSearch && matchesChannel;
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-900">
      {/* Header */}
      <header className="bg-white dark:bg-dark-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/images/logo-join-white.png"
                alt="Join Community"
                width={150}
                height={40}
                className="h-10 w-auto"
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
          <div className="mb-8 text-center">
            <p className="text-gray-600 dark:text-gray-300">
              {filteredCommunities.length} comunidade
              {filteredCommunities.length !== 1 ? "s" : ""} encontrada
              {filteredCommunities.length !== 1 ? "s" : ""}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCommunities.map((community, index) => (
              <div
                key={index}
                className="bg-white dark:bg-dark-800 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden flex flex-col min-h-[20rem]"
              >
                <div className="p-6 flex flex-col h-full">
                  {/* Header com logo e nome */}
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gray-100 dark:bg-dark-700 rounded-lg flex items-center justify-center mr-4 overflow-hidden flex-shrink-0">
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
                    <div className="min-w-0 flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
                        {community.name}
                      </h3>
                      <span className="inline-block px-2 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full">
                        {community.category}
                      </span>
                    </div>
                  </div>

                  {/* Descrição */}
                  <div className="flex-1 mb-4">
                    <DescriptionText text={community.description} />
                  </div>

                  {/* Links sociais */}
                  <div className="mt-auto">
                    <SocialLinks socialLinks={community.socialLinks} />
                  </div>
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
