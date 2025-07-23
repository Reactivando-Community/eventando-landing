"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import eventando from "@/network/eventando";
import HeroSection from "@/components/HeroSection";
import InfoSection from "@/components/InfoSection";
import StatsSection from "@/components/StatsSection";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const params = useSearchParams();
  const [productsToList, setProductsToList] = useState([]);
  const [productSelectedId, setProductSelectedId] = useState(null);

  const findSalesFromParam = async () => {
    try {
      const slug = params.get("event");

      if (!slug) {
        return;
      }

      const response = await eventando.event.getSaleDetail({ slug });

      if (response.data.data.length === 0) {
        alert("Essa promoção não existe!");
        return;
      }

      const sale = response.data.data[0].attributes;
      const { payment_option_id } = sale;
      const event = sale.event.data.attributes;

      console.log("event: ", event);

      const options = event.payment_option;

      options.forEach((option) => {
        if (option.id === payment_option_id) {
          const newProduct = {
            value: option.id,
            label: option.name,
          };

          console.log("setProduct(newProduct): ", newProduct);

          setProductsToList((s) => {
            return [...s, newProduct];
          });

          return;
        }
      });
      
      // The product is already added to the list via setProductsToList above
      // No need to filter or set again
    } catch (err) {
      console.log(err);
    }
  };

  const findSales = async () => {
    try {
      const response = await eventando.event.getAllProducts();
      const data = response.data.data;

      const { payment_option } = data.attributes;

      const s = payment_option.map((option) => {
        if (option.enabled && option.can_be_listed) {
          return {
            value: option.id,
            label: option.name,
            price: option.value,
          };
        }
      });
      const filteredProducts = s.filter((option) => option !== undefined);
      setProductsToList(filteredProducts);
      setProductSelectedId(filteredProducts[0].value);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    findSales();
  }, []);

  useEffect(() => {
    findSalesFromParam();
  }, []);

  return (
    <Suspense>
      <main className="min-h-screen">
        {/* Hero Section */}
        <HeroSection
          productsToList={productsToList}
          productSelectedId={productSelectedId}
        />

        {/* Info Section */}
        <InfoSection />

        {/* Stats Section */}
        <StatsSection />

        {/* Lotes e Brindes Section */}
        <section className="py-20 px-6 bg-gray-50 dark:bg-dark-800">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                Lotes e Brindes
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                Garanta sua vaga com os melhores preços e brindes exclusivos!
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {/* Primeiro Lote */}
              <div className="bg-white dark:bg-dark-700 rounded-xl p-8 shadow-sm border-2 border-primary-500 relative">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    Primeiro Lote
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Até 10/08 ou 50 inscrições
                  </p>
                  <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                    R$ 150,00
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
                    * Valor inclui camisa do evento
                  </p>
                  <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-2 mb-6">
                    <li>✅ Brindes exclusivos</li>
                    <li>✅ Acesso completo ao evento</li>
                    <li>✅ Coffee break + Almoço</li>
                    <li>✅ Material do evento</li>
                  </ul>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Vagas limitadas - Garanta já!
                  </div>
                </div>
              </div>

              {/* Segundo Lote */}
              <div className="bg-white dark:bg-dark-700 rounded-xl p-8 shadow-sm">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    Segundo Lote
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Até 10 de Setembro
                  </p>
                  <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                    R$ 170,00
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
                    * Valor inclui camisa do evento
                  </p>
                  <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-2 mb-6">
                    <li>✅ Acesso completo ao evento</li>
                    <li>✅ Material do evento</li>
                    <li>✅ Coffee break + Almoço</li>
                  </ul>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Preço especial por tempo limitado
                  </div>
                </div>
              </div>

              {/* Terceiro Lote */}
              <div className="bg-white dark:bg-dark-700 rounded-xl p-8 shadow-sm">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    Terceiro Lote
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Até a data de encerramento das inscrições
                  </p>
                  <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                    R$ 190,00
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
                    * Valor inclui camisa do evento
                  </p>
                  <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-2 mb-6">
                    <li>✅ Acesso completo ao evento</li>
                    <li>✅ Material do evento</li>
                    <li>✅ Coffee break + Almoço</li>
                  </ul>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Últimas vagas disponíveis
                  </div>
                </div>
              </div>
            </div>

            {/* Informações adicionais */}
            <div className="mt-12 text-center">
              <div className="bg-white dark:bg-dark-700 rounded-lg p-8 shadow-sm max-w-4xl mx-auto">
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                  Informações Importantes
                </h3>
                <div className="grid md:grid-cols-2 gap-6 text-left">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                      💳 Formas de Pagamento
                    </h4>
                    <ul className="text-gray-600 dark:text-gray-300 space-y-2">
                      <li>• <strong>PIX:</strong> Desconto especial</li>
                      <li>• <strong>Cartão de Crédito:</strong> Através da plataforma Doity</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                      🎁 Brindes e Benefícios
                    </h4>
                    <ul className="text-gray-600 dark:text-gray-300 space-y-2">
                      <li>• <strong>Primeiras 50 inscrições:</strong> Brindes exclusivos</li>
                      <li>• <strong>Palestrantes:</strong> Inscrição gratuita</li>
                      <li>• <strong>Networking:</strong> Coffee break + Almoço</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Sponsors Section */}
        <section className="py-20 px-6 bg-white dark:bg-dark-900">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                Apoio
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Empresas e instituições que apoiam este evento
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
              <div className="p-4 bg-white rounded-lg shadow-sm">
                <SenaiLogo />
              </div>
            </div>
          </div>
        </section>

        {/* Sponsors Section */}
        <section className="py-20 px-6 bg-gray-50 dark:bg-dark-800">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                Patrocinadores
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                Ainda estamos buscando patrocinadores para este evento
              </p>
              <div className="bg-white dark:bg-dark-700 rounded-lg p-8 shadow-sm max-w-2xl mx-auto">
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  Quer patrocinar o Join Community?
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Entre em contato conosco para conhecer nossas opções de
                  patrocínio e como sua empresa pode fazer parte deste evento
                  incrível!
                </p>
                <a
                  href="https://wa.link/801vds"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors duration-200"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                  </svg>
                  Falar no WhatsApp
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Call for Papers Section */}
        <section className="py-20 px-6 bg-white dark:bg-dark-900">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                Call for Papers
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                Quer compartilhar seu conhecimento com a comunidade?
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="bg-gradient-to-br from-primary-500/10 to-primary-600/10 border border-primary-200/30 rounded-xl p-8">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-primary-500 rounded-lg flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Palestras
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Apresente uma palestra de até 45 minutos sobre tecnologia, 
                  empreendedorismo ou inovação. Compartilhe experiências, 
                  cases de sucesso ou tendências do mercado.
                </p>
                <ul className="text-sm text-gray-500 dark:text-gray-400 space-y-1">
                  <li>• Duração: Até 45 minutos</li>
                  <li>• Formato: Presencial</li>
                  <li>• Público: 250+ participantes</li>
                  <li>• <strong>Prazo de submissão: 10/08</strong></li>
                  <li>• <strong>Inscrição gratuita para palestrantes</strong></li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-secondary-500/10 to-secondary-600/10 border border-secondary-200/30 rounded-xl p-8">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-secondary-500 rounded-lg flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Workshops
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Conduza um workshop prático de até 45 minutos onde os 
                  participantes possam aprender fazendo. Ideal para 
                  tecnologias específicas ou metodologias.
                </p>
                <ul className="text-sm text-gray-500 dark:text-gray-400 space-y-1">
                  <li>• Duração: Até 45 minutos</li>
                  <li>• Formato: Hands-on</li>
                  <li>• Vagas limitadas</li>
                </ul>
              </div>
            </div>

            <div className="text-center mt-12">
              <div className="bg-white dark:bg-dark-700 rounded-lg p-8 shadow-sm max-w-2xl mx-auto">
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  Como submeter sua proposta?
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Envie sua proposta através do formulário abaixo ou entre em 
                  contato conosco para mais informações sobre o processo de seleção.
                  <br />
                  <span className="text-primary-600 dark:text-primary-400 font-semibold">
                    ⏰ Prazo para submissão: 10/08
                  </span>
                  <br />
                  <span className="text-green-600 dark:text-green-400 font-semibold">
                    🎁 Palestrantes selecionados ganham inscrição gratuita!
                  </span>
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="https://forms.gle/ARBB7ATEanJHRhgCA"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition-colors duration-200"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Submeter Proposta
                  </a>
                  <a
                    href="https://wa.link/801vds"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors duration-200"
                  >
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                    </svg>
                    Falar no WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-6 bg-dark-900 text-gray-400">
          <div className="max-w-6xl mx-auto text-center">
            <p className="text-lg mb-4">Join Community 2025</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-4">
              <Link
                href="/communities"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Ver Comunidades
              </Link>
              <span className="hidden sm:block text-gray-600">•</span>
              <a
                href="https://wa.link/801vds"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Contato
              </a>
            </div>
            <p className="text-sm">
              Organização Join Community • Todos os direitos reservados
            </p>
          </div>
        </footer>
      </main>
    </Suspense>
  );
}

function SenaiLogo() {
  return (
    <a
      href="https://senaigoias.com.br/faculdade-fatesg"
      target="_blank"
      rel="noopener noreferrer"
      className="hover:opacity-80 transition-opacity"
    >
      <div className="bg-white p-4 rounded-lg">
        <svg
          width="120"
          height="40"
          viewBox="0 0 50.785 18.114"
          version="1.1"
          id="svg8"
          fill="#1c63b7ff"
          color="#1c63b7ff"
        >
          <defs id="defs2">
            <clipPath clipPathUnits="userSpaceOnUse" id="clipPath26">
              <path
                d="M -0.2021,-0.015 H 595.0735 V 841.8748 H -0.2021 Z"
                clipRule="evenodd"
                id="path24"
              ></path>
            </clipPath>
          </defs>
          <g id="layer1">
            <g
              id="g22"
              clipPath="url(#clipPath26)"
              transform="matrix(0.35277777,0,0,-0.35277777,-19.506119,278.39945)"
            >
              <g id="g52" transform="translate(-170.18556,158.04471)">
                <path
                  d="m 332.7012,620.6357 -2.3692,-4.392 -3.5005,-6.4868 h 3.5005 3.4988 l -1.0199,10.8788 z"
                  style={{
                    fill: "currentcolor",
                    fillOpacity: 1,
                    fillRule: "nonzero",
                    stroke: "none",
                  }}
                  id="path54"
                ></path>
                <path
                  d="m 369.4334,624.7766 h -7.7309 v 0.9697 h 7.7309 z m 0,-6.1934 h -7.7309 v 0.9714 h 7.7309 z m 0,-6.355 h -7.7309 v 0.9697 h 7.7309 z m 0,-6.4432 h -7.7309 v 0.9706 h 7.7309 z m 0,-6.2112 h -7.7309 v 0.9705 h 7.7309 z m -16.0441,-0.006 h -7.253 l 5.5673,26.1811 h 7.2518 z m -18.2044,0 -0.6525,5.114 h -4.2004 -6.4236 l -2.7938,-5.114 h -5.8099 -1.4417 l 1.4417,2.374 14.4584,23.8071 h 0.5689 8.28 l 4.7679,-26.1811 z m -34.0506,0 -4.6227,20.0534 h -0.0723 l -4.2605,-20.0534 h -5.7928 -0.7339 l 0.7339,3.4535 4.8313,22.7276 h 10.1526 l 4.6315,-19.5083 0.0839,0.0731 4.1332,19.4352 h 5.0862 1.4412 l -1.4412,-6.7802 -4.1258,-19.4009 z m -18.3359,10.6263 h -11.6773 l -1.1786,-5.5491 h 12.6909 l -1.0811,-5.0772 h -19.944 l 5.5664,26.1811 h 19.2113 0.7338 l -0.7338,-3.4461 -0.3479,-1.6293 h -12.6924 l -1.1491,-5.4043 h 11.6784 z m -22.2227,7.8681 h -7.2542 c 0.2483,1.0151 0.0853,1.7779 -0.4515,2.3207 -0.5029,0.5431 -1.3853,0.834 -2.6176,0.834 -1.6679,0 -3.3488,-1.088 -3.6255,-2.3925 -0.4056,-1.9236 1.7816,-2.539 3.5955,-3.0475 4.151,-1.1248 10.4389,-1.5588 8.9376,-8.6289 -1.1724,-5.5137 -7.1671,-8.1295 -13.2219,-8.1295 -6.0928,0 -11.0854,1.7821 -9.6843,8.89 h 7.2533 c -0.5561,-2.4656 0.9672,-3.8084 3.5782,-3.8084 1.6741,0 3.9951,0.8706 4.3634,2.6113 0.7565,3.5538 -4.7741,2.7936 -9.9343,5.2946 -2.4007,1.1605 -3.1916,3.5546 -2.5949,6.3819 1.607,6.2011 7.4098,7.9044 12.8852,7.9044 5.4045,0 10.5412,-1.9205 8.771,-8.2301 z m -35.0972,13.0569 v -5.3725 h 7.7306 v -0.9697 h -7.7306 v -5.222 h 7.7306 v -0.9714 h -7.7306 v -5.3844 h 7.7306 v -0.9706 h -7.7306 v -5.4714 h 7.7306 v -0.9718 h -7.7306 v -5.2398 h 7.7306 v -0.9714 h -7.7306 v -5.3215 h 143.9578 v 36.8665 z"
                  style={{
                    fill: "currentcolor",
                    fillOpacity: 1,
                    fillRule: "nonzero",
                    stroke: "none",
                  }}
                  id="path56"
                ></path>
              </g>
            </g>
          </g>
        </svg>
      </div>
    </a>
  );
}
