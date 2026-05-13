import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { SiteShell } from "@/components/SiteShell";
import { siteConfig } from "@/lib/site-config";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Perceived Performance — Make Loading Feel Fast",
    template: `%s — ${siteConfig.name}`,
  },
  description:
    "Loading states, skeleton screens, progress bars, and AI streaming UX. Interactive demos that show what makes a UI feel fast and how to build it.",
  metadataBase: new URL(siteConfig.url),
  keywords: [
    "perceived performance",
    "loading states",
    "skeleton screen",
    "loading spinner",
    "progress bar",
    "loading animation",
    "shimmer loading",
    "skeleton loader",
    "typing indicator",
    "streaming response ui",
    "loading state ux",
    "loading screen design",
    "ai chat loading",
  ],
  openGraph: {
    title: "Perceived Performance — Make Loading Feel Fast",
    description:
      "Loading states, skeleton screens, progress bars, and AI streaming UX. Interactive demos that show what makes a UI feel fast and how to build it.",
    url: siteConfig.url,
    siteName: siteConfig.name,
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "feelsfast — perceived performance demos and loading patterns",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Perceived Performance — Make Loading Feel Fast",
    description:
      "Loading states, skeleton screens, progress bars, and AI streaming UX. Interactive demos that show what makes a UI feel fast.",
    images: ["/opengraph-image"],
  },
  authors: [{ name: siteConfig.author.name, url: siteConfig.author.url }],
  creator: siteConfig.author.name,
  publisher: siteConfig.author.name,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full">
        <SiteShell>{children}</SiteShell>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
