"use client";
import React from "react";
import { Container } from "@/components/Container";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/24/solid";

export const Faq = () => {
  return (
    <Container className="!p-0">
      <div className="w-full max-w-2xl p-2 mx-auto rounded-2xl">
        {faqdata.map((item, index) => (
          <div key={item.question} className="mb-5">
            <Disclosure>
              {({ open }) => (
                <>
                  <DisclosureButton className="flex items-center justify-between w-full px-4 py-4 text-lg text-left text-gray-800 rounded-lg bg-gray-50 hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-indigo-100 focus-visible:ring-opacity-75 dark:bg-trueGray-800 dark:text-gray-200">
                    <span>{item.question}</span>
                    <ChevronUpIcon
                      className={`${
                        open ? "" : "transform rotate-180"
                      } w-5 h-5 text-indigo-500`}
                    />
                  </DisclosureButton>
                  <DisclosurePanel className="px-4 pt-4 pb-2 text-gray-500 whitespace-pre-line dark:text-gray-300">
                    {item.answer}
                  </DisclosurePanel>
                </>
              )}
            </Disclosure>
          </div>
        ))}
      </div>
    </Container>
  );
}

const faqdata = [
  {
    question: "Este evento é para mim?",
    answer: `Se você se interessa por empreendedorismo, a resposta muito provavelmente é sim. Seja você um(a) empreendedor(a) em série ou alguém que está conhecendo o ecossistema de startups agora, você vai se encaixar muito bem, desde que esteja motivado(a) a construir um produto ou startup e aberto(a) a novas ideias. Acreditamos que grandes ideias podem vir de qualquer lugar.

O evento é um ambiente colaborativo e inclusivo para compartilhar, aprender, construir e se divertir. Esperamos que cada pessoa da comunidade seja inclusiva com todas as pessoas e ideias durante o techstars_ Startup Weekend, e damos boas-vindas a todos, independentemente de experiência, setor ou histórico.`,
  },
  {
    question: "Preciso participar nos três dias?",
    answer: `Com exceção da equipe organizadora, mentores, palestrantes, voluntários e jurados, todas as pessoas que participam do evento como participantes são esperadas para participar dos três dias. Isso é importante não só para preservar a sua própria experiência de aprendizado, mas também para minimizar distrações ou interrupções para o time que você escolher integrar.

Em muitos techstars_ Startup Weekends, existe uma opção de inscrição apenas para assistir às apresentações de domingo (“Somente Apresentação de Domingo”), destinada a quem quer apenas ver o pitch final das equipes. Amigos, familiares e colegas são muito bem-vindos para assistir às apresentações finais e ver tudo o que vocês construíram em apenas um fim de semana. Verifique a página de inscrição do evento da sua cidade para saber se essa opção está disponível.`,
  },
  {
    question: "Como faço para me inscrever?",
    answer: `Todo techstars_ Startup Weekend tem um site oficial com uma página de inscrição. Veja a página de eventos em https://www.techstars.com/events para conferir a lista completa de eventos.

Geralmente existem diferentes tipos de ingresso para diferentes perfis, como “Negócios”, “Designer”, “Técnico” ou “Entusiasta”. As equipes organizadoras acompanham isso para garantir que o evento tenha pessoas com formações e habilidades diversas, o que ajuda a formar times equilibrados e eficazes. Escolha o tipo de ingresso que mais se aproxima da sua experiência — não se preocupe se nada corresponder exatamente ao seu perfil.`,
  },
  {
    question: "Posso pagar na hora, no local do evento?",
    answer: `Em alguns casos é possível pagar o ingresso na porta, no dia do evento. Porém, é sempre preferível comprar seu ingresso com antecedência, pois os organizadores precisam planejar e contratar alimentação e materiais de acordo com o número de participantes.

Entre em contato com os organizadores locais para entender melhor as opções de pagamento disponíveis na sua cidade.`,
  },
  {
    question: "Eu preciso já ter um time formado?",
    answer: `Não. Todas as pessoas que participam do evento como participantes são esperadas para chegar sem time formado e então entrar e atuar em um time durante o evento. Isso é fundamental para preservar a experiência educacional do techstars_ Startup Weekend.

O time ideal é composto por pessoas com diferentes formações e experiências, que colaboram para construir um ótimo Produto Mínimo Viável (MVP), usando o framework Lean Canvas. Quanto mais pessoas engajadas no seu time fazendo pesquisa de mercado e desenvolvendo o modelo de negócio, mais rápido vocês conseguirão criar um MVP para apresentar no domingo.`,
  },
  {
    question: "Que tipo de ingresso devo comprar para poder apresentar uma ideia?",
    answer: `Apresentar (fazer pitch) é aberto a todas as pessoas participantes! Recomendamos que você compre o ingresso que melhor representa o seu perfil ou conjunto de habilidades.

O importante é estar disposto(a) a colaborar e construir junto com o time.`,
  },
  {
    question: "A organização oferece hospedagem?",
    answer: `Na maioria dos casos, os participantes são responsáveis por organizar seu próprio transporte e hospedagem (se necessário) para os eventos presenciais.

Se você estiver vindo de outra cidade ou não conhecer bem a região, entre em contato com a equipe organizadora local para pedir recomendações próximas ao local do evento.`,
  },
  {
    question: "Preciso apresentar uma ideia para poder participar?",
    answer: `Não é obrigatório, mas nós incentivamos muito que você apresente. Você pode fazer pitch de uma ideia que está na cabeça há anos ou de algo que surgir na hora, durante o evento.

Por favor, evite apresentar uma ideia em que você já esteja trabalhando de forma estruturada fora do techstars_ Startup Weekend. O objetivo do evento é aprender a ir da ideação ao produto.

Pitchar é uma oportunidade valiosa para praticar falar em público. Você provavelmente não vai se arrepender de ter apresentado, mas pode se arrepender de não ter tentado.`,
  },
  {
    question: "Quais são os critérios de avaliação?",
    answer: `Os jurados normalmente avaliam três grandes dimensões:

Modelo de Negócio:
- Como o time pretende transformar isso em um negócio de sucesso?
- A ideia é realmente diferenciada?
- Qual é a proposta de valor central?
- Pensaram em concorrência, escala, aquisição de clientes e modelo de receita?
- Identificaram um mercado-alvo específico?
- Como vão conquistar os primeiros 100 clientes?

Validação com Clientes:
- O time está construindo algo que as pessoas realmente querem?
- Eles conversaram com clientes ou potenciais usuários?
- Quem serão os usuários, quem serão os clientes, e há diferença entre eles?
- Quantas pessoas foram entrevistadas?
- Eles abordaram o público certo nas entrevistas?
- O que aprenderam com essas conversas?
- Quais são as principais dores e necessidades identificadas?

Execução & Design:
- Eles conseguiram estabelecer um MVP — o conjunto mínimo de funcionalidades para começar a coletar feedback?
- Que feedback receberam para inspirar o MVP?
- Construíram um protótipo? Qualquer formato vale, até papel ou slides.
- O MVP faz sentido para os objetivos do fim de semana?
- Se houver demo técnica, quão funcional ela está?
- É fácil para o usuário navegar e usar o produto?
- Conseguiram incorporar feedback dos clientes na solução?`,
  },
  {
    question: "Onde encontro a programação do evento?",
    answer: `Cada evento tem sua programação detalhada publicada no site local do evento. As agendas geralmente ficam disponíveis cerca de 3 semanas antes do início.`,
  },
  {
    question: "O que eu devo levar para um evento presencial?",
    answer: `Alguns itens que recomendamos levar:
- Laptop ou computador portátil
- Carregador do laptop
- Caderno ou bloco de notas e caneta
- Cartões de visita (ou aplicativo de cartão digital)
- Seu celular — sinta-se à vontade para tirar fotos e vídeos do evento
- Opcional: segundo monitor, teclado, mouse, ou qualquer outro item que te ajude a ser mais produtivo(a)
- E, principalmente, muita energia!`,
  },
  {
    question: "Como posso me preparar?",
    answer: `Algumas dicas para se preparar para o fim de semana:
- Consulte ferramentas e materiais que podem te ajudar a se preparar (muitos eventos compartilham listas e links úteis).
- Faça uma pesquisa de mercado básica para entender melhor o problema que você quer resolver.
- Pratique seu pitch. Na sexta-feira você terá cerca de 60 segundos para convencer outras pessoas a entrar no seu time. Seja claro(a), objetivo(a) e convincente.

Um bom pitch de 60 segundos geralmente inclui:
- Quem é você e qual é o seu background
- Qual problema seu produto pretende resolver
- Como o produto resolve esse problema
- Quais habilidades você precisa no time (por exemplo: desenvolvedor(a), designer, marketing)
- Um nome para a sua startup
- Familiaridade com algumas das ferramentas que você pode usar durante o fim de semana, como o Lean Canvas
- E, claro: descansar bem antes do evento!`,
  },
  {
    question: "Qual é a política de reembolso?",
    answer: `O techstars_ Startup Weekend recomenda que as equipes organizadoras geralmente aceitem pedidos de reembolso até 72 horas antes do início do evento (por exemplo, se o evento começa na sexta-feira, os pedidos de reembolso devem ser feitos até a noite de terça).

Entre em contato com a equipe organizadora local para detalhes específicos sobre a política de reembolso do seu evento.`,
  },
  {
    question: "Quais são as regras do evento?",
    answer: `Existem regras e um código de conduta para o fim de semana, criados para garantir que todas as pessoas tenham uma experiência segura, respeitosa e proveitosa.

Ao se inscrever e participar, você concorda em seguir essas diretrizes, respeitando os demais participantes, mentores, organizadores e jurados, bem como as decisões da organização.`,
  },
];
