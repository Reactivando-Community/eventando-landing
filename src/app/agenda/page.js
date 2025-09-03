'use client';

import { useState } from 'react';
import agendaData from '@/data/agenda.json';
import AgendaFilter from '@/components/AgendaFilter';
import SpeakerCard from '@/components/SpeakerCard';
import SpeakerModal from '@/components/SpeakerModal';
import { getSpeakerById } from '@/utils/speakerLookup';
import Link from 'next/link';
import Image from 'next/image';
import NewFooter from '@/components/NewFooter';

export default function AgendaPage() {
  const [activeDay, setActiveDay] = useState(0);
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedSpeaker, setSelectedSpeaker] = useState(null);

  const getSessionTypeColor = (type) => {
    switch (type) {
      case 'keynote':
        return 'bg-gradient-to-r from-primary-600 to-primary-700';
      case 'parallel':
        return 'bg-gradient-to-r from-green-600 to-teal-600';
      case 'break':
        return 'bg-gradient-to-r from-orange-500 to-red-500';
      case 'opening':
        return 'bg-gradient-to-r from-yellow-500 to-orange-500';
      case 'closing':
        return 'bg-gradient-to-r from-indigo-600 to-purple-600';
      default:
        return 'bg-gradient-to-r from-dark-600 to-dark-700';
    }
  };

  const getSessionTypeLabel = (type) => {
    switch (type) {
      case 'keynote':
        return 'Keynote';
      case 'parallel':
        return 'Sessões Paralelas';
      case 'break':
        return 'Intervalo';
      case 'opening':
        return 'Abertura';
      case 'closing':
        return 'Encerramento';
      default:
        return 'Sessão';
    }
  };

  const formatTime = (time) => {
    return time.replace(':', 'h');
  };

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
  };

  const filteredSessions = agendaData.days[activeDay].sessions.filter(session => {
    if (activeFilter === 'all') return true;
    return session.type === activeFilter;
  });

  return (
    <div className="min-h-screen bg-dark-900 text-white">
      {/* Header */}
      <div className="bg-gradient-to-br from-dark-900 via-dark-800 to-primary-900">
        {/* Header com navegação */}
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
              className="text-gray-300 hover:text-white transition-colors"
            >
              ← Voltar para o evento
            </Link>
          </div>
        </div>
        
        {/* Título da agenda */}
        <div className="container mx-auto px-4 pb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-center mb-4">
            <span className="bg-gradient-to-r from-white to-primary-200 bg-clip-text text-transparent">
              Agenda do Evento
            </span>
          </h1>
          <p className="text-xl text-center text-gray-300 max-w-3xl mx-auto">
            Confira a programação completa do Join Community 2025 com todas as palestras, 
            workshops e atividades dos dois dias de evento.
          </p>
        </div>
      </div>

      {/* Day Tabs */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          {agendaData.days.map((day, index) => (
            <button
              key={index}
              onClick={() => setActiveDay(index)}
              className={`px-6 py-4 rounded-lg font-semibold transition-all duration-300 ${
                activeDay === index
                  ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-lg transform scale-105'
                  : 'bg-dark-800 text-gray-300 hover:bg-dark-700 hover:text-white'
              }`}
            >
              <div className="text-lg">{day.dayName}</div>
              <div className="text-sm opacity-80">{day.date}</div>
            </button>
          ))}
        </div>

        {/* Filter */}
        <AgendaFilter onFilterChange={handleFilterChange} />

        {/* Agenda Content */}
        <div className="space-y-6">
          {filteredSessions.map((session, index) => (
            <div
              key={index}
              className="bg-dark-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {/* Session Header */}
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                <div className="flex items-center space-x-4 mb-4 lg:mb-0">
                  <div className={`px-3 py-1 rounded-full text-sm font-semibold ${getSessionTypeColor(session.type)}`}>
                    {getSessionTypeLabel(session.type)}
                  </div>
                  <div className="text-sm text-gray-400">
                    {formatTime(session.startTime)} - {formatTime(session.endTime)} ({session.duration})
                  </div>
                </div>
                <div className="text-sm text-gray-400">
                  📍 {session.location}
                </div>
              </div>

              {/* Session Content */}
              {session.type === 'parallel' ? (
                <div>
                  <h3 className="text-xl font-bold mb-4 text-primary-400">
                    {session.title}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {session.tracks.map((track, trackIndex) => (
                      <div
                        key={trackIndex}
                        className="bg-dark-700 rounded-lg p-4 hover:bg-dark-600 transition-colors duration-200 cursor-pointer"
                        onClick={() => track.speakerId && setSelectedSpeaker(track.speakerId)}
                      >
                        <div className="text-sm font-semibold text-primary-400 mb-2">
                          {track.room}
                        </div>
                        {track.speakerId && (
                          <div className="text-sm font-medium text-white mb-1">
                            <SpeakerCard 
                              speakerId={track.speakerId}
                              onClick={() => track.speakerId && setSelectedSpeaker(track.speakerId)}
                              isClickable={false}
                            >
                              {getSpeakerById(track.speakerId)?.name || 'Speaker não encontrado'}
                            </SpeakerCard>
                            {getSpeakerById(track.speakerId)?.community && (
                              <div className="text-xs text-primary-400 mt-1">
                                🏢 {getSpeakerById(track.speakerId).community}
                              </div>
                            )}
                          </div>
                        )}
                        <div className="text-sm text-gray-300">
                          {track.title}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div>
                  <h3 className="text-xl font-bold mb-2 text-white">
                    {session.title}
                  </h3>
                  {session.speakerId && (
                    <div className="text-lg text-primary-400 font-medium">
                      👤 <SpeakerCard speakerId={session.speakerId}>
                        {getSpeakerById(session.speakerId)?.name || 'Speaker não encontrado'}
                      </SpeakerCard>
                      {getSpeakerById(session.speakerId)?.community && (
                        <div className="text-sm text-primary-300 mt-1">
                          🏢 {getSpeakerById(session.speakerId).community}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="mt-12 bg-dark-800 rounded-xl p-6">
          <h3 className="text-xl font-bold mb-4 text-center">Legenda</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 rounded bg-gradient-to-r from-primary-600 to-primary-700"></div>
              <span className="text-sm">Keynote</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 rounded bg-gradient-to-r from-green-600 to-teal-600"></div>
              <span className="text-sm">Sessões Paralelas</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 rounded bg-gradient-to-r from-orange-500 to-red-500"></div>
              <span className="text-sm">Intervalo</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 rounded bg-gradient-to-r from-yellow-500 to-orange-500"></div>
              <span className="text-sm">Abertura</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 rounded bg-gradient-to-r from-indigo-600 to-purple-600"></div>
              <span className="text-sm">Encerramento</span>
            </div>
          </div>
        </div>
      </div>

      {/* Speaker Modal */}
      <SpeakerModal
        isOpen={selectedSpeaker !== null}
        onClose={() => setSelectedSpeaker(null)}
        speakerId={selectedSpeaker}
      />

      <NewFooter />
    </div>
  );
}
