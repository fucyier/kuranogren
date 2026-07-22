import type { Metadata } from "next";

export const SITE_NAME = "Kur'an Öğren";
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://kuranogren.com").replace(/\/$/, "");
export const DEFAULT_DESCRIPTION = "Elifba, tecvid ve namaz surelerini sesli örnekler, ayrıntılı anlatımlar ve bol pratikle adım adım öğrenin.";

export function absoluteUrl(path = "/") {
  const normalizedPath = path === "/" ? "" : `/${path.replace(/^\/+|\/+$/g, "")}`;
  return `${SITE_URL}${normalizedPath}/`;
}

export function createPageMetadata({
  title,
  description = DEFAULT_DESCRIPTION,
  path,
}: {
  title: string;
  description?: string;
  path: string;
}): Metadata {
  const url = absoluteUrl(path);
  const socialTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: "tr_TR",
      url,
      siteName: SITE_NAME,
      title: socialTitle,
      description,
    },
    twitter: {
      card: "summary",
      title: socialTitle,
      description,
    },
  };
}
