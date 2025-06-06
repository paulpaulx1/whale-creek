import styles from "./page.module.css";
import Hero from "./components/Hero";
import ServiceCardsSection from "./components/ServiceCardsSection";
import AboutContent from "./components/AboutContent";
import ClientInteractions from "./components/ClientInteractions";

export default function Home() {
  return (
    <main className={styles.main} role='main'>
      <Hero/>
      <ServiceCardsSection />
      <AboutContent />
      <ClientInteractions />
    </main>
  );
}