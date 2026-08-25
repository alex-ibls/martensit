import { faqItems } from "@/lib/faq";
import { offerServices } from "@/lib/services";
import { absoluteUrl, site } from "@/lib/site";

function JsonLdScript({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

function organizationNode() {
  const orgId = `${site.siteUrl}/#org`;
  const phone = site.phoneHref.replace("tel:", "");

  return {
    "@type": ["LocalBusiness", "Manufacturer"],
    "@id": orgId,
    name: site.orgName,
    alternateName: site.brand,
    legalName: site.legalName,
    taxID: site.inn,
    foundingDate: "2019-09-12",
    slogan: site.tagline,
    description: site.description,
    url: site.siteUrl,
    image: absoluteUrl(site.ogImage),
    logo: {
      "@type": "ImageObject",
      url: absoluteUrl(site.logo),
    },
    email: site.email,
    telephone: phone,
    sameAs: [site.telegramUrl],
    address: {
      "@type": "PostalAddress",
      addressLocality: site.city,
      addressRegion: site.region,
      addressCountry: "RU",
    },
    areaServed: [
      { "@type": "Country", name: site.country },
      { "@type": "City", name: site.city },
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: phone,
      email: site.email,
      contactType: "sales",
      areaServed: "RU",
      availableLanguage: "Russian",
    },
    makesOffer: offerServices.map((service) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: service.name,
        description: service.description,
        provider: { "@id": orgId },
        areaServed: site.country,
      },
    })),
  };
}

export function JsonLd() {
  const orgId = `${site.siteUrl}/#org`;

  return (
    <JsonLdScript
      data={{
        "@context": "https://schema.org",
        "@graph": [
          organizationNode(),
          {
            "@type": "WebSite",
            "@id": `${site.siteUrl}/#website`,
            url: site.siteUrl,
            name: site.orgName,
            inLanguage: "ru-RU",
            publisher: { "@id": orgId },
          },
          {
            "@type": "FAQPage",
            "@id": `${site.siteUrl}/#faq`,
            inLanguage: "ru-RU",
            mainEntity: faqItems.map((item) => ({
              "@type": "Question",
              name: item.q,
              acceptedAnswer: {
                "@type": "Answer",
                text: item.a,
              },
            })),
          },
        ],
      }}
    />
  );
}

export function PrivacyJsonLd() {
  const orgId = `${site.siteUrl}/#org`;
  const pageUrl = absoluteUrl("/privacy");

  return (
    <JsonLdScript
      data={{
        "@context": "https://schema.org",
        "@graph": [
          organizationNode(),
          {
            "@type": "WebPage",
            "@id": `${pageUrl}#webpage`,
            url: pageUrl,
            name: "Политика обработки персональных данных",
            inLanguage: "ru-RU",
            isPartOf: { "@id": `${site.siteUrl}/#website` },
            about: { "@id": orgId },
          },
          {
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: site.brand,
                item: site.siteUrl,
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Политика обработки персональных данных",
                item: pageUrl,
              },
            ],
          },
        ],
      }}
    />
  );
}
