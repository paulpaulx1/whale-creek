import styles from "./page.module.css";
import Hero from "./components/Hero";
import Services from "./components/Services";
import AboutSection from "./components/AboutSection";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className={styles.main}>
      <Hero></Hero>
      <Services></Services>
      <AboutSection></AboutSection>
      <Footer></Footer>
    </main>
  );
}
