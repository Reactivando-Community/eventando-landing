import speakersData from '@/data/speakers.json';

/**
 * Busca dados de um speaker pelo ID
 * @param {number|string} speakerId - ID do speaker
 * @returns {Object|null} Dados do speaker ou null se não encontrado
 */
export function getSpeakerById(speakerId) {
  if (!speakerId) return null;
  
  const speaker = speakersData.find(s => s.id === speakerId);
  return speaker || null;
}

/**
 * Busca dados de um speaker pelo nome (fallback)
 * @param {string} speakerName - Nome do speaker
 * @returns {Object|null} Dados do speaker ou null se não encontrado
 */
export function getSpeakerByName(speakerName) {
  if (!speakerName) return null;
  
  const speaker = speakersData.find(s => 
    s.name.toLowerCase().includes(speakerName.toLowerCase()) ||
    speakerName.toLowerCase().includes(s.name.toLowerCase())
  );
  return speaker || null;
}

/**
 * Busca dados de múltiplos speakers por IDs
 * @param {Array<number|string>} speakerIds - Array de IDs dos speakers
 * @returns {Array<Object>} Array com dados dos speakers encontrados
 */
export function getSpeakersByIds(speakerIds) {
  if (!speakerIds || !Array.isArray(speakerIds)) return [];
  
  return speakerIds
    .map(id => getSpeakerById(id))
    .filter(speaker => speaker !== null);
}

/**
 * Cria um mapa de speakers para lookup rápido
 * @returns {Map} Mapa com ID como chave e dados do speaker como valor
 */
export function createSpeakerMap() {
  const speakerMap = new Map();
  speakersData.forEach(speaker => {
    speakerMap.set(speaker.id, speaker);
  });
  return speakerMap;
}

/**
 * Busca speakers por comunidade
 * @param {string} community - Nome da comunidade
 * @returns {Array<Object>} Array com speakers da comunidade
 */
export function getSpeakersByCommunity(community) {
  if (!community) return [];
  
  return speakersData.filter(speaker => 
    speaker.community.toLowerCase().includes(community.toLowerCase())
  );
}

/**
 * Busca speakers por palavra-chave no título da palestra
 * @param {string} keyword - Palavra-chave para buscar
 * @returns {Array<Object>} Array com speakers que têm a palavra-chave no título
 */
export function getSpeakersByTalkKeyword(keyword) {
  if (!keyword) return [];
  
  return speakersData.filter(speaker => 
    speaker.talk.toLowerCase().includes(keyword.toLowerCase())
  );
}
