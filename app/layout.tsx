import type { Metadata, Viewport } from "next";
import ScrollToTopFab from "@/app/_components/ScrollToTopFab";
import ServiceWorkerRegister from "@/app/_components/ServiceWorkerRegister";
import { DEFAULT_DESCRIPTION, SITE_NAME, SITE_URL } from "@/src/lib/seo";
import "./globals.css";
import "./child.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Kur'an Öğren | Elifba, Tecvid ve Namaz Sureleri",
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/pwa/apple-touch-icon.png",
  },
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    title: SITE_NAME,
    statusBarStyle: "default",
  },
  other: {
    "apple-mobile-web-app-capable": "yes",
  },
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "education",
  formatDetection: { email: false, address: false, telephone: false },
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

export const viewport: Viewport = {
  themeColor: "#17594f",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const websiteStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    alternateName: "Kur'an Öğrenme Sitesi",
    url: `${SITE_URL}/`,
    inLanguage: "tr-TR",
    description: DEFAULT_DESCRIPTION,
  };

  return (
    <html lang="tr">
      <body>
        {children}
        <ServiceWorkerRegister />
        <ScrollToTopFab />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteStructuredData).replace(/</g, "\\u003c") }}
        />
      </body>
    </html>
  );
}
