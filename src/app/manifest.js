export default function manifest() {
  return {
    name: 'techstars_ Startup Weekend Anápolis | Techstars',
    short_name: 'TSW Anápolis',
    description: 'Participe do techstars_ Startup Weekend Anápolis 2026. 54 horas para transformar sua ideia em realidade.',
    start_url: '/',
    display: 'standalone',
    background_color: '#000000',
    theme_color: '#39C463',
    icons: [
      {
        src: '/images/TS_favcon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  }
}
