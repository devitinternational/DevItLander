import type { Metadata } from "next";
import { type ReactNode } from "react";
import { Press_Start_2P, VT323, Silkscreen } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";

const pressStart2P = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-press-start",
  display: "swap",
});

const vt323 = VT323({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-vt323",
  display: "swap",
});

const silkscreen = Silkscreen({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-silkscreen",
  display: "swap",
});

export const metadata: Metadata = {
  title: "DevIt - We Build Digital Experiences",
  description: "DevIt is a premium web development studio crafting beautiful websites and applications. We transform your ideas into stunning digital experiences.",
  openGraph: {
    title: "DevIt - We Build Digital Experiences",
    description: "Premium web development studio crafting beautiful websites and applications.",
  },

};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>

      <body suppressHydrationWarning className={`${pressStart2P.variable} ${vt323.variable} ${silkscreen.variable} font-sans antialiased`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
