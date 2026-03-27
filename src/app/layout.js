import Script from "next/script";
import { ThemeProvider } from "next-themes";
import "./globals.css";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PopupWidget } from "@/components/PopupWidget";

export const metadata = {
  metadataBase: new URL("https://startupweekendanapolis.com.br"), 
  title: "techstars_ Startup Weekend Anápolis | Techstars",

  description:
    "Participe do techstars_ Startup Weekend Anápolis 2026. 54 horas para transformar sua ideia em realidade. Conecte-se com mentores, valide sua startup e construa o futuro em Anápolis.",
  keywords: [
    "techstars_ Startup Weekend Anápolis",
    "Techstars Anápolis",
    "Empreendedorismo Anápolis",
    "Startup Goiás",
    "Evento de Inovação Anápolis",
    "Hackathon Anápolis",
    "Criação de Startups",
    "Validação de Ideias",
    "Mentoria de Negócios",
  ],
  authors: [{ name: "techstars_ Startup Weekend Anápolis" }],
  creator: "techstars_ Startup Weekend Anápolis Team",
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
    title: "techstars_ Startup Weekend Anápolis | Techstars",
    description: "54 horas de pura inovação e empreendedorismo em Anápolis. Transforme sua ideia em um negócio real!",
    url: "https://startupweekendanapolis.com.br", 
    siteName: "techstars_ Startup Weekend Anápolis",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "/images/og-image.png",
        width: 1024,
        height: 445,
        alt: "techstars_ Startup Weekend Anápolis | Techstars",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "techstars_ Startup Weekend Anápolis | Techstars",
    description: "54 horas de inovação e empreendedorismo em Anápolis. Garanta sua vaga!",
    images: ["/images/og-image.png"],
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
        {/* Meta Pixel Code */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '829738210158718');
fbq('track', 'PageView');`}
        </Script>
        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=829738210158718&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        {/* End Meta Pixel Code */}
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
