import styles from "./page.module.css";
import Hero from "./components/Hero";
import Services from "./components/Services";
import AboutSection from "./components/AboutSection";
export default function Home() {
  return (
    <main className={styles.main} role='main'>
      <Hero/>
      <Services/>
      <AboutSection/>
    </main>
  );
}
