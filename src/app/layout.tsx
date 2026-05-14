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
  metadataBase: new URL("https://www.devitinternational.com"), // Base URL for relative image paths
  title: {
    default: "DevIt | Premium Web & Mobile App Development Studio",
    template: "%s | DevIt",
  },
  description: "DevIt is a premium software development studio specializing in branding, web development, mobile apps, and SEO. We turn ideas into products people actually use.",
  keywords: [
    "web development studio",
    "mobile app development",
    "branding and marketing",
    "SEO & analytics",
    "custom software development",
    "DevIt",
    "UI/UX design",
    "React development",
    "DevIt International",
    "web development",
    "app development"
  ],
  authors: [{ name: "DevIt" }],
  creator: "DevIt",
  publisher: "DevIt",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.devitinternational.com",
    title: "DevIt | Premium Web & Mobile App Development Studio",
    description: "Turning ideas into products people actually use. Premium software development studio offering web development, mobile apps, branding, and SEO.",
    siteName: "DevIt",
    images: [
      {
        url: "/og-image.png", // Ensure you add an og-image.png to the /public directory for social sharing previews
        width: 1200,
        height: 630,
        alt: "DevIt - Premium Software Development Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DevIt | Premium Web & Mobile App Development Studio",
    description: "Turning ideas into products people actually use. Premium software development studio offering web development, mobile apps, branding, and SEO.",
    images: ["/og-image.png"],
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
