import type { Metadata } from "next";
import { Cinzel, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/footer/Footer";
import CustomCursor from "@/components/ui/CustomCursor";
import AudioPlayer from "@/components/ui/AudioPlayer";
import SmoothScrollProvider from "@/components/ui/SmoothScrollProvider";
import GlobalFireworksController from "@/components/fireworks/GlobalFireworksController";
import ScrollProgressBar from "@/components/ui/ScrollProgressBar";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "600", "700", "900"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://pattas26.mkce.ac.in"),
  title: {
    default: "PATTAS’26 at MKCE",
    template: "%s | PATTAS’26 at MKCE",
  },
  applicationName: "PATTAS’26 at MKCE",
  description:
    "Official Festival Website for PATTAS’26 at MKCE (M. Kumarasamy College of Engineering, Karur). Celebrating Light, Tradition & Togetherness on 04 November 2026. Explore 10 events, rules, interactive 3D hero, fireworks, and registrations.",
  keywords: [
    "PATTAS'26 at MKCE",
    "PATTAS'26",
    "MKCE",
    "M. Kumarasamy College of Engineering",
    "Diwali Festival MKCE",
    "Pattas 2026",
    "Karur college festival",
    "Diwali celebration",
  ],
  authors: [{ name: "MKCE Agastya Arts Club & Creative Team" }],
  openGraph: {
    title: "PATTAS’26 at MKCE",
    description:
      "Celebrating Light, Tradition & Togetherness on 04 November 2026 at M. Kumarasamy College of Engineering (MKCE), Karur. Explore all 10 events, schedule, interactive 3D diya, fireworks, and register today!",
    url: "https://pattas26.mkce.ac.in",
    siteName: "PATTAS’26 at MKCE",
    images: [
      {
        url: "/assets/brand/pattas26-logo.png",
        width: 1024,
        height: 426,
        alt: "PATTAS’26 at MKCE Official Festival Logo",
      },
      {
        url: "/assets/posters/pattas26-welcome-poster.jpg",
        width: 1024,
        height: 819,
        alt: "PATTAS’26 at MKCE Official Festival Poster",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PATTAS’26 at MKCE",
    description:
      "Celebrating Light, Tradition & Togetherness on 04 November 2026 at M. Kumarasamy College of Engineering (MKCE), Karur.",
    images: ["/assets/brand/pattas26-logo.png"],
  },
  icons: {
    icon: [
      { url: "/assets/brand/pattas26-icon.png", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    shortcut: "/assets/brand/pattas26-icon.png",
    apple: "/assets/brand/pattas26-icon.png",
  },
  other: {
    "website:title": "PATTAS’26 at MKCE | M. Kumarasamy College of Engineering",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <meta name="title" content="PATTAS’26 at MKCE | M. Kumarasamy College of Engineering" />
      </head>
      <body
        className={`${cinzel.variable} ${plusJakartaSans.variable} font-sans bg-fest-midnight text-fest-cream antialiased selection:bg-fest-gold selection:text-fest-midnight`}
      >
        <SmoothScrollProvider>
          <ScrollProgressBar />
          <CustomCursor />
          <AudioPlayer />
          <GlobalFireworksController />
          <Navbar />
          <main className="min-h-screen pt-20 flex flex-col">{children}</main>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
