'use client';

import { useState } from 'react';
import { getSpeakerById } from '@/utils/speakerLookup';
import SpeakerModal from './SpeakerModal';

export default function SpeakerCard({ speakerId, children, className = "", onClick, isClickable = true }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const speaker = getSpeakerById(speakerId);

  if (!speaker) {
    return <span className={className}>{children}</span>;
  }

  const handleClick = (e) => {
    if (onClick) {
      // Se há um onClick externo, chama ele e para a propagação
      e.stopPropagation();
      onClick();
    } else if (isClickable) {
      // Se não há onClick externo e é clicável, abre o modal
      setIsModalOpen(true);
    }
  };

  return (
    <>
      <span
        className={`${isClickable && !onClick ? 'cursor-pointer hover:text-primary-300' : ''} transition-colors ${className}`}
        onClick={handleClick}
      >
        {children}
      </span>

      <SpeakerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        speakerId={speakerId}
      />
    </>
  );
}
