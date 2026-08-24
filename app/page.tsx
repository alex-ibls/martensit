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
  Lead,
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
        <Lead />
        <Faq />
        <Contacts />
      </main>
      <Footer />
    </>
  );
}
