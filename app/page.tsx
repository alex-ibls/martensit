import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import {
  Audiences,
  Capacity,
  Contacts,
  Design,
  Faq,
  Hero,
  Pillars,
  Portfolio,
  Process,
  Service,
  Systems,
} from "@/components/landing";

export default function Home() {
  return (
    <>
      <JsonLd />
      <Header />
      <main>
        <Hero />
        <Capacity />
        <Pillars />
        <Systems />
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
