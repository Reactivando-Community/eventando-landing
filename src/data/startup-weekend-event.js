/**
 * Startup Weekend Anápolis - Goiânia - Event Configuration
 *
 * Update these values for your event:
 * - date, dateFull: actual event dates
 * - venue: name, address, mapsUrl
 * - registrationUrl: Eventbrite, Doity, or Meetup link
 * - whatsappContact: organizer contact
 * - stats: adjust numbers as needed
 *
 * Official Startup Weekend assets: brandfolder.com/techstars-media/startup-weekend
 */

export const eventConfig = {
  name: "Startup Weekend",
  city: "Anápolis - Goiás",
  fullName: "Startup Weekend Anápolis",
  tagline: "54 horas para transformar sua ideia em realidade",
  // Dates - update with actual event dates
  date: "Maio 2026",
  dateFull: "1 a 3 de Maio, 2026",
  // Venue
  venue: {
    name: "SENAI Roberto Mange",
    address: "Anápolis - GO",
    mapsUrl: "https://maps.app.goo.gl/4PyR9orJusrfRR6J8", // e.g. "https://maps.google.com/..."
  },
  // Registration - add your Eventbrite/Doity/Meetup link
  registrationUrl: "https://www.techstars.com/communities/startup-weekend",
  whatsappContact: "https://wa.link/801vds",
  // Stats (typical Startup Weekend numbers - adjust as needed)
  stats: [
    { number: "54", label: "Horas", description: "De validação e criação" },
    { number: "100+", label: "Empreendedores", description: "Em todo o mundo" },
    { number: "150+", label: "Países", description: "Startup Weekend global" },
    { number: "1", label: "Ideia", description: "Pode mudar tudo" },
  ],
  // Organizer info
  organizer: "Startup Weekend Anápolis",
  techstarsUrl: "https://www.techstars.com/communities/startup-weekend",
};
