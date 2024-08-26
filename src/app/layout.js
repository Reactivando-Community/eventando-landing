import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PopupWidget } from "@/components/PopupWidget";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Join Community",
  description: "Ingressos Join Community",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider enableSystem={false} forcedTheme="dark" attribute="class">
          <Navbar />
          <div>{children}</div>
          {/* <Footer /> */}
          {/* <PopupWidget /> */}
        </ThemeProvider>
      </body>
    </html>
  );
}
