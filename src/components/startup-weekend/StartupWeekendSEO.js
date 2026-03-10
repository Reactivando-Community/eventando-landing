import { eventConfig } from "@/data/startup-weekend-event";

export default function StartupWeekendSEO() {
  const eventStructuredData = {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": `Techstars Startup Weekend ${eventConfig.city}`,
    "description": eventConfig.tagline,
    "image": "https://startupweekendanapolis.com.br/images/Startup%20Weekend%20Logo%20(1).png",
    "startDate": "2026-05-01T18:00:00-03:00",
    "endDate": "2026-05-03T21:00:00-03:00",
    "eventStatus": "https://schema.org/EventScheduled",
    "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
    "location": {
      "@type": "Place",
      "name": eventConfig.venue.name,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": eventConfig.venue.address,
        "addressLocality": "Anápolis",
        "addressRegion": "GO",
        "addressCountry": "BR"
      }
    },
    "organizer": {
      "@type": "Organization",
      "name": "Techstars",
      "url": "https://www.techstars.com"
    },
    "offers": {
      "@type": "Offer",
      "url": eventConfig.registrationUrl,
      "price": "100.00",
      "priceCurrency": "BRL",
      "availability": "https://schema.org/InStock",
      "validFrom": "2026-01-01"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(eventStructuredData) }}
    />
  );
}
