import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Manrope, Newsreader } from "next/font/google";
import "./globals.css";

const bodyFont = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const displayFont = Newsreader({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const monoFont = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://school-ui.com"),
  title: {
    default: "School UI — AI belongs inside the school",
    template: "%s — School UI",
  },
  description:
    "A private, locally operated school AI workspace built with students and teachers at Lessing-Gymnasium Karlsruhe.",
  keywords: [
    "School UI",
    "school AI",
    "local AI",
    "education technology",
    "DGX Spark",
    "privacy",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    title: "School UI — AI belongs inside the school",
    description:
      "School-controlled AI, built with the people who teach and learn there.",
    siteName: "School UI",
  },
  twitter: {
    card: "summary_large_image",
    title: "School UI — AI belongs inside the school",
    description:
      "School-controlled AI, built with the people who teach and learn there.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0a3670",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${bodyFont.variable} ${displayFont.variable} ${monoFont.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
