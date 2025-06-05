import styles from "./page.module.css";
import Hero from "./components/Hero";
import AboutSection from "./components/AboutSection";
export default function Home() {
  return (
    <main className={styles.main} role='main'>
      <Hero/>
      <AboutSection/>
    </main>
  );
}
