import React, { forwardRef } from 'react';

const ArtTemplate = forwardRef(({ photoUrl, role, format }, ref) => {
  const isStory = format === '9:16';
  
  const roleColors = {
    'Participante': 'bg-techstars-green text-black',
    'Líder': 'bg-yellow-400 text-black',
    'Mentor': 'bg-pink-500 text-white',
    'Voluntário': 'bg-blue-600 text-white',
  };
  const badgeColor = roleColors[role] || roleColors['Participante'];

  return (
    <div
      ref={ref}
      id="art-template-container"
      className={`relative w-full overflow-hidden brutal-border bg-black ${
        isStory ? 'aspect-[9/16]' : 'aspect-[4/3]'
      } flex flex-col bg-noise`}
    >
      {/* Imagem do Usuário */}
      {photoUrl ? (
        <img
          src={photoUrl}
          alt="Sua foto"
          className="absolute inset-0 w-full h-full object-cover z-10 grayscale-[0.2] contrast-125"
          crossOrigin="anonymous" 
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-[#f4f4f0] z-10">
          <p className="text-gray-400 text-sm md:text-base font-bold uppercase text-center w-full">SUA FOTO</p>
        </div>
      )}

      {/* Filtro / Gradient pra dar contraste nos textos */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 z-10"></div>

      {/* Conteúdo Overlay */}
      <div className="absolute w-full h-full inset-0 z-20 flex flex-col justify-end p-6 md:p-8 pointer-events-none">
        
        {/* Bottom: SW Name and Role */}
        <div className={`flex ${isStory ? 'flex-col items-start gap-2' : 'flex-row justify-between items-end gap-4'} w-full`}>
          <img 
            src="/images/logo_sw_anapolis.png" 
            alt="Startup Weekend Anápolis" 
            className={`${isStory ? 'h-16 max-w-[70%]' : 'h-16 md:h-24 max-w-[50%]'} object-contain object-left-bottom brightness-0 invert opacity-80 drop-shadow-[2px_2px_0_rgba(0,0,0,1)]`} 
          />

          <div className={`shrink-0 brutal-border shadow-[4px_4px_0_#000] ${isStory ? 'px-3 py-1.5 text-sm md:text-lg' : 'px-3 md:px-4 py-2 text-base md:text-2xl lg:text-3xl'} font-black uppercase tracking-wide ${badgeColor}`}>
            {role}
          </div>
        </div>

      </div>
    </div>
  );
});

ArtTemplate.displayName = 'ArtTemplate';
export default ArtTemplate;
