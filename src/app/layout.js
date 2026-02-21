import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PopupWidget } from "@/components/PopupWidget";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Startup Weekend Anápolis - Goiânia | Techstars",
  description:
    "54 horas para transformar sua ideia em realidade. Startup Weekend powered by Techstars - conecte-se com empreendedores, valide sua ideia e construa um negócio.",
  icons: {
    icon: "/images/TS_favcon.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          enableSystem={false}
          forcedTheme="dark"
          attribute="class"
        >
          {/* <Navbar /> */}
          <div>{children}</div>
          {/* <Footer /> */}
          {/* <PopupWidget /> */}
        </ThemeProvider>
      </body>
    </html>
  );
}
