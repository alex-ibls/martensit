import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import {
  Audiences,
  Contacts,
  Design,
  Faq,
  Hero,
  Pillars,
  Portfolio,
  Process,
  Products,
  Service,
  Suppliers,
  Systems,
} from "@/components/landing";

export default function Home() {
  return (
    <>
      <JsonLd />
      <Header />
      <main id="main-content">
        <Hero />
        <Pillars />
        <Systems />
        <Products />
        <Suppliers />
        <Design />
        <Service />
        <Audiences />
        <Process />
        <Portfolio />
        <Faq />
        <Contacts />
      </main>
      <Footer />
    </>
  );
}
