import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import { getCroppedImg } from '@/utils/cropImage';

export default function ImageCropper({ imageSrc, onCropDone, onCancel, format }) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const aspect = format === '9:16' ? 9 / 16 : 1 / 1;

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleCrop = async () => {
    try {
      const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
      onCropDone(croppedImage);
    } catch (e) {
      console.error(e);
      alert("Erro ao recortar a imagem.");
    }
  };

  return (
    <div className="brutal-card overflow-hidden relative" style={{ height: '500px', width: '100%' }}>
      {/* Container de visualização */}
      <div className="absolute inset-x-0 top-0 bottom-[100px] md:bottom-[80px] bg-black">
        <Cropper
          image={imageSrc}
          crop={crop}
          zoom={zoom}
          aspect={aspect}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
          cropShape="rect"
          showGrid={true}
        />
      </div>

      {/* Controles: Zoom e Botões */}
      <div className="absolute bottom-0 inset-x-0 bg-white brutal-border-t p-4 flex flex-col gap-4 z-10 pointer-events-auto">
        {/* Linha do Zoom */}
        <div className="flex w-full items-center gap-4">
          <label className="font-bold uppercase text-xs md:text-sm whitespace-nowrap">Zoom</label>
          <input
            type="range"
            value={zoom}
            min={1}
            max={3}
            step={0.1}
            aria-labelledby="Zoom"
            onChange={(e) => setZoom(e.target.value)}
            className="w-full accent-techstars-green"
          />
        </div>
        
        {/* Linha dos Botões */}
        <div className="flex gap-3 w-full justify-end">
          <button onClick={onCancel} className="brutal-btn-white py-2 px-4 text-xs md:text-sm w-1/2 md:w-auto font-black cursor-pointer text-center">
            Cancelar
          </button>
          <button onClick={handleCrop} className="brutal-btn py-2 px-4 text-xs md:text-sm w-1/2 md:w-auto font-black cursor-pointer text-center">
            Confirmar Corte
          </button>
        </div>
      </div>
    </div>
  );
}
