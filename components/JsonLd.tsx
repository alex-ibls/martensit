import { site } from "@/lib/site";

export function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["LocalBusiness", "Manufacturer"],
        "@id": `${site.siteUrl}/#org`,
        name: site.brand,
        alternateName: site.h1,
        slogan: site.tagline,
        description: site.description,
        url: site.siteUrl,
        email: site.email,
        telephone: site.phoneHref.replace("tel:", ""),
        address: {
          "@type": "PostalAddress",
          addressLocality: site.city,
          addressRegion: site.region,
          addressCountry: "RU",
        },
        areaServed: {
          "@type": "City",
          name: site.city,
        },
        makesOffer: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Производство и монтаж светопрозрачных конструкций",
              description:
                "Алюминиевые и ПВХ профильные системы. Объём производства 2 500–3 000 м² в месяц.",
            },
          },
          {
            "@type": "Service",
            name: "Замер и проектирование",
            description:
              "Сложные архитектурные решения и типовые задачи.",
          },
          {
            "@type": "Service",
            name: "Сервис и обслуживание действующих конструкций",
          },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "Как проходит замер?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Замерчик выезжает на объект клиента в Воронеже. Встреча и замер согласовываются отдельно.",
            },
          },
          {
            "@type": "Question",
            name: "Какой объём производства?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "2 500–3 000 м² светопрозрачных конструкций в месяц.",
            },
          },
          {
            "@type": "Question",
            name: "Работаете только со сложными проектами?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Нет. Берём и сложные архитектурные решения, и типовые задачи — окна, двери, стандартные проёмы.",
            },
          },
          {
            "@type": "Question",
            name: "Есть сервис уже установленных конструкций?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Да. Диагностика, ремонт и обслуживание действующих светопрозрачных конструкций.",
            },
          },
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
