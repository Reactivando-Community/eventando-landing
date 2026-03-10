import { ThemeProvider } from "next-themes";
import "./globals.css";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PopupWidget } from "@/components/PopupWidget";

export const metadata = {
  metadataBase: new URL("https://startupweekendanapolis.com.br"), 
  title: "Startup Weekend Anápolis | Techstars",

  description:
    "Participe do Startup Weekend Anápolis 2026. 54 horas para transformar sua ideia em realidade. Conecte-se com mentores, valide sua startup e construa o futuro em Anápolis.",
  keywords: [
    "Startup Weekend Anápolis",
    "Techstars Anápolis",
    "Empreendedorismo Anápolis",
    "Startup Goiás",
    "Evento de Inovação Anápolis",
    "Hackathon Anápolis",
    "Criação de Startups",
    "Validação de Ideias",
    "Mentoria de Negócios",
  ],
  authors: [{ name: "Techstars Startup Weekend Anápolis" }],
  creator: "Startup Weekend Anápolis Team",
  publisher: "Techstars",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: "/images/TS_favcon.svg",
    apple: "/images/TS_favcon.svg",
  },
  openGraph: {
    title: "Startup Weekend Anápolis | Techstars",
    description: "54 horas de pura inovação e empreendedorismo em Anápolis. Transforme sua ideia em um negócio real!",
    url: "https://startupweekendanapolis.com.br", 
    siteName: "Startup Weekend Anápolis",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "/images/Startup Weekend Logo (1).png",
        width: 1200,
        height: 630,
        alt: "Startup Weekend Anápolis",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Startup Weekend Anápolis | Techstars",
    description: "54 horas de inovação e empreendedorismo em Anápolis. Garanta sua vaga!",
    images: ["/images/Startup Weekend Logo (1).png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};


export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body>
        <ThemeProvider
          enableSystem={false}
          forcedTheme="dark"
          attribute="class"
        >
          {/* <Navbar /> */}
          <div className="antialiased font-sans">{children}</div>
          {/* <Footer /> */}
          {/* <PopupWidget /> */}
        </ThemeProvider>
      </body>
    </html>
  );
}
