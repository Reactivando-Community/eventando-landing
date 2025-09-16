# Página de Agenda do Eventando 2025

## 📅 Visão Geral

Criei uma página de agenda completa e responsiva para o evento Eventando 2025, baseada nos dados dos CSVs fornecidos. A página inclui:

- **Dois dias de programação** (19 e 20 de setembro de 2025)
- **Design moderno e responsivo** com tema escuro
- **Filtros por tipo de sessão** (Keynotes, Sessões Paralelas, Intervalos, etc.)
- **Layout em grid** para sessões paralelas
- **Cores diferenciadas** para cada tipo de sessão
- **Informações detalhadas** incluindo horários, palestrantes e salas

## 🚀 Como Acessar

1. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```

2. **Acesse a página de agenda:**
   ```
   http://localhost:3000/agenda
   ```

3. **Ou clique no botão "Ver todas as palestras" na página inicial**

## 📁 Arquivos Criados

### 1. `src/data/agenda.json`
- Dados estruturados da agenda em formato JSON
- Inclui todos os horários, palestrantes e sessões dos dois dias
- Organizado por dias e tipos de sessão
- **Refatorado**: Agora usa referências por ID aos speakers existentes

### 2. `src/app/agenda/page.js`
- Página principal da agenda
- Componente React com estado para tabs e filtros
- Design responsivo com Tailwind CSS
- Suporte a sessões paralelas e keynotes
- **Atualizado**: Integração com dados de speakers via lookup

### 3. `src/components/AgendaFilter.js`
- Componente de filtro por tipo de sessão
- Botões interativos com cores diferenciadas
- Filtros: Todas, Keynotes, Sessões Paralelas, Intervalos, Abertura, Encerramento

### 4. `src/components/SpeakerCard.js` (NOVO)
- Componente clicável para exibir informações dos speakers
- Abre modal com informações completas ao clicar
- Integração com SpeakerModal para experiência rica

### 5. `src/components/SpeakerModal.js` (NOVO)
- Modal responsivo com informações completas do palestrante
- Foto, bio, comunidade, título da palestra e links sociais
- Design moderno com animações suaves
- Botões de redes sociais estilizados

### 6. `src/utils/speakerLookup.js` (NOVO)
- Funções utilitárias para buscar dados dos speakers
- Lookup por ID, nome, comunidade e palavras-chave
- Integração com o arquivo speakers.json existente

## 🎨 Características do Design

### Cores por Tipo de Sessão:
- **Keynotes**: Gradiente primary (azul) - seguindo o padrão da primeira página
- **Sessões Paralelas**: Gradiente verde-teal
- **Intervalos**: Gradiente laranja-vermelho
- **Abertura**: Gradiente amarelo-laranja
- **Encerramento**: Gradiente índigo-roxo

### Layout Responsivo:
- **Desktop**: Grid de 3 colunas para sessões paralelas
- **Tablet**: Grid de 2 colunas
- **Mobile**: Layout em coluna única
- **Tabs**: Responsivas com layout flexível

## 📊 Estrutura dos Dados

### Estrutura Refatorada (Sem Duplicação):
Cada sessão agora contém:
```json
{
  "startTime": "10:00",
  "endTime": "10:30",
  "duration": "0:30",
  "type": "parallel",
  "title": "Sessões Paralelas",
  "location": "Múltiplas Salas",
  "tracks": [
    {
      "room": "Sala 304",
      "speakerId": 24,
      "title": "Road to Cybersec"
    }
  ]
}
```

### Vantagens da Nova Estrutura:
- ✅ **Sem duplicação**: Dados dos speakers centralizados em `speakers.json`
- ✅ **Manutenção fácil**: Alterações nos speakers refletem automaticamente na agenda
- ✅ **Consistência**: Mesmos dados em todas as páginas
- ✅ **Performance**: Lookup otimizado com funções utilitárias
- ✅ **Extensibilidade**: Fácil adicionar novos campos aos speakers

## 🔧 Funcionalidades

1. **Navegação por Dias**: Tabs para alternar entre sexta e sábado
2. **Filtros**: Filtro por tipo de sessão
3. **Sessões Paralelas**: Grid responsivo mostrando todas as salas
4. **Informações Detalhadas**: Horários, duração, palestrantes e localização
5. **Legenda**: Guia visual das cores e tipos de sessão
6. **Cards Clicáveis**: Clique em qualquer card de sessão para ver detalhes do palestrante
7. **Modal de Speaker**: Modal completo com foto, bio, comunidade e links sociais
8. **Integração de Dados**: Dados centralizados sem duplicação

## 📱 Responsividade

- **Mobile First**: Design otimizado para dispositivos móveis
- **Breakpoints**: sm, md, lg para diferentes tamanhos de tela
- **Grid Adaptativo**: Colunas que se ajustam ao tamanho da tela
- **Touch Friendly**: Botões e elementos otimizados para toque

## 🎯 Próximos Passos Sugeridos

1. **Adicionar busca**: Campo de busca por palestrante ou título
2. **Favoritos**: Sistema para marcar sessões de interesse
3. **Calendário**: Integração com calendário pessoal
4. **Notificações**: Lembretes de sessões próximas
5. **Compartilhamento**: Links para sessões específicas

A página está pronta para uso e pode ser facilmente customizada conforme necessário!
