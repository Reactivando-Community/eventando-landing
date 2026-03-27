/**
 * techstars_ Startup Weekend Anápolis  - Event Configuration
 *
 * Update these values for your event:
 * - date, dateFull: actual event dates
 * - venue: name, address, mapsUrl
 * - registrationUrl: Eventbrite, Doity, or Meetup link
 * - whatsappContact: organizer contact
 * - stats: adjust numbers as needed
 *
 * Official techstars_ Startup Weekend assets: brandfolder.com/techstars-media/startup-weekend
 */

export const eventConfig = {
  name: "techstars_ Startup Weekend",
  city: "Anápolis - Goiás",
  fullName: "techstars_ Startup Weekend Anápolis",
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
  registrationUrl: "https://doity.com.br/startup-weekend-anapolis",
  whatsappContact:
    "https://wa.me/5562993962325?text=Quero%20participar%20do%20Startup%20Weekend%20An%C3%A1polis",
  vipWhatsAppGroup:
    "https://chat.whatsapp.com/C2I5N2stMUTGPkYZ6QnRIx?mode=gi_t",
  // Stats (typical techstars_ Startup Weekend numbers - adjust as needed)
  stats: [
    { number: "54", label: "Horas", description: "De validação e criação" },
    { number: "100+", label: "Empreendedores", description: "Em todo o mundo" },
    { number: "150+", label: "Países", description: "techstars_ Startup Weekend global" },
    { number: "1", label: "Ideia", description: "Pode mudar tudo" },
  ],
  // Organizer info
  organizer: "techstars_ Startup Weekend Anápolis",
  techstarsUrl: "https://www.techstars.com/communities/startup-weekend",
  sponsorContact: {
    name: "Pedro Silva",
    whatsapp: "5562993962325",
    email: "contato@8020digital.com.br",
    whatsappLink:
      "https://wa.me/5562993962325?text=Olá%20Pedro,%20tenho%20interesse%20em%20patrocinar%20o%20Startup%20Weekend%20Anápolis",
  },
};
