export const createImage = (url) =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", (error) => reject(error));
    image.src = url;
  });

export async function getCroppedImg(imageSrc, pixelCrop) {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    return null;
  }

  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  );

  // Retorna data URL em vez de Blob URL.
  // html-to-image clona o DOM e embute os recursos no SVG. Blob URLs (blob:https://...)
  // são referências efêmeras que não sobrevivem à clonagem, causando foto preta no Safari.
  // Data URLs são strings autocontidas que o clone consegue embutir diretamente.
  return canvas.toDataURL("image/jpeg", 0.92);
}
