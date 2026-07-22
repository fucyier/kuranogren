import type { Metadata } from "next";
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteStructuredData).replace(/</g, "\\u003c") }}
        />
      </body>
    </html>
  );
}
