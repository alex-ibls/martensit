import { faqItems } from "@/lib/faq";
import {
  allProducts,
  productHref,
  type CatalogProduct,
} from "@/lib/products";
import { offerServices } from "@/lib/services";
import { absoluteOn, resolveMetadataBase } from "@/lib/seo";
import { site } from "@/lib/site";

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

function organizationNode(siteUrl: string) {
  const orgId = `${siteUrl}/#org`;
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
    url: siteUrl,
    image: absoluteOn(new URL(siteUrl), site.ogImage),
    logo: {
      "@type": "ImageObject",
      url: absoluteOn(new URL(siteUrl), site.logo),
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

export async function JsonLd() {
  const siteUrl = (await resolveMetadataBase()).origin;
  const orgId = `${siteUrl}/#org`;

  return (
    <JsonLdScript
      data={{
        "@context": "https://schema.org",
        "@graph": [
          organizationNode(siteUrl),
          {
            "@type": "WebSite",
            "@id": `${siteUrl}/#website`,
            url: siteUrl,
            name: site.orgName,
            inLanguage: "ru-RU",
            publisher: { "@id": orgId },
          },
          {
            "@type": "FAQPage",
            "@id": `${siteUrl}/#faq`,
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

export async function PrivacyJsonLd() {
  const siteUrl = (await resolveMetadataBase()).origin;
  const orgId = `${siteUrl}/#org`;
  const pageUrl = absoluteOn(new URL(siteUrl), "/privacy");

  return (
    <JsonLdScript
      data={{
        "@context": "https://schema.org",
        "@graph": [
          organizationNode(siteUrl),
          {
            "@type": "WebPage",
            "@id": `${pageUrl}#webpage`,
            url: pageUrl,
            name: "Политика обработки персональных данных",
            inLanguage: "ru-RU",
            isPartOf: { "@id": `${siteUrl}/#website` },
            about: { "@id": orgId },
          },
          {
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: site.brand,
                item: siteUrl,
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

export async function ProductsJsonLd() {
  const metadataBase = await resolveMetadataBase();
  const siteUrl = metadataBase.origin;
  const orgId = `${siteUrl}/#org`;
  const pageUrl = absoluteOn(metadataBase, "/produkciya");
  const products = allProducts();

  return (
    <JsonLdScript
      data={{
        "@context": "https://schema.org",
        "@graph": [
          organizationNode(siteUrl),
          {
            "@type": "CollectionPage",
            "@id": `${pageUrl}#webpage`,
            url: pageUrl,
            name: "Продукция",
            description: `Каталог светопрозрачных конструкций завода «${site.brand}».`,
            inLanguage: "ru-RU",
            isPartOf: { "@id": `${siteUrl}/#website` },
            about: { "@id": orgId },
            mainEntity: {
              "@type": "ItemList",
              numberOfItems: products.length,
              itemListElement: products.map((product, index) => ({
                "@type": "ListItem",
                position: index + 1,
                item: {
                  "@type": "Product",
                  name: product.name,
                  description: product.summary,
                  image: absoluteOn(metadataBase, product.image),
                  url: absoluteOn(metadataBase, productHref(product.id)),
                  brand: { "@type": "Brand", name: site.brand },
                  manufacturer: { "@id": orgId },
                },
              })),
            },
          },
          {
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: site.brand,
                item: siteUrl,
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Продукция",
                item: pageUrl,
              },
            ],
          },
        ],
      }}
    />
  );
}

export async function ProductPageJsonLd({ product }: { product: CatalogProduct }) {
  const metadataBase = await resolveMetadataBase();
  const siteUrl = metadataBase.origin;
  const orgId = `${siteUrl}/#org`;
  const catalogUrl = absoluteOn(metadataBase, "/produkciya");
  const pageUrl = absoluteOn(metadataBase, productHref(product.id));

  return (
    <JsonLdScript
      data={{
        "@context": "https://schema.org",
        "@graph": [
          organizationNode(siteUrl),
          {
            "@type": "Product",
            "@id": `${pageUrl}#product`,
            name: product.name,
            description: product.body,
            image: absoluteOn(metadataBase, product.image),
            url: pageUrl,
            brand: { "@type": "Brand", name: site.brand },
            manufacturer: { "@id": orgId },
            category: product.sectionTitle,
          },
          {
            "@type": "WebPage",
            "@id": `${pageUrl}#webpage`,
            url: pageUrl,
            name: product.name,
            description: product.summary,
            inLanguage: "ru-RU",
            isPartOf: { "@id": `${siteUrl}/#website` },
            about: { "@id": `${pageUrl}#product` },
          },
          {
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: site.brand,
                item: siteUrl,
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Продукция",
                item: catalogUrl,
              },
              {
                "@type": "ListItem",
                position: 3,
                name: product.name,
                item: pageUrl,
              },
            ],
          },
        ],
      }}
    />
  );
}
