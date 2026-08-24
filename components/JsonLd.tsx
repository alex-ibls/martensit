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
        sameAs: [site.telegramUrl, site.maxUrl],
        address: {
          "@type": "PostalAddress",
          addressLocality: site.city,
          addressRegion: site.region,
          addressCountry: "RU",
        },
        areaServed: [
          {
            "@type": "Country",
            name: site.country,
          },
          {
            "@type": "City",
            name: site.city,
          },
        ],
        makesOffer: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Производство и монтаж светопрозрачных конструкций",
              description:
                "Изготовление в Воронеже, монтаж светопрозрачных конструкций на алюминиевых и ПВХ системах по всей России. Объём производства 2 500–3 000 м² в месяц.",
            },
          },
          {
            "@type": "Service",
            name: "Фасадное остекление и входные группы",
            description:
              "Алюминиевые светопрозрачные конструкции: фасады, входные группы, панорамное остекление.",
          },
          {
            "@type": "Service",
            name: "Замер и проектирование светопрозрачных конструкций",
            description:
              "Сложные архитектурные решения и типовые задачи. Выезд на объект по России.",
          },
          {
            "@type": "Service",
            name: "Ремонт и обслуживание светопрозрачных конструкций",
            description:
              "Диагностика, ремонт алюминиевых конструкций и окон ПВХ.",
          },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "Работаете только в Воронеже?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Завод в Воронеже, объекты — по всей России. Замер, производство и монтаж согласовываем под задачу.",
            },
          },
          {
            "@type": "Question",
            name: "Как проходит замер светопрозрачных конструкций?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Выезжаем на объект клиента. Встреча и замер согласовываются отдельно.",
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
            name: "Можно заказать от производителя типовые окна?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Да. Делаем и архитектурные решения, и типовые окна ПВХ, двери, проёмы — изготовление и монтаж.",
            },
          },
          {
            "@type": "Question",
            name: "Есть ремонт и обслуживание уже стоящих конструкций?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Да. Ремонт и обслуживание светопрозрачных конструкций: диагностика, ремонт алюминиевых систем и окон ПВХ.",
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
