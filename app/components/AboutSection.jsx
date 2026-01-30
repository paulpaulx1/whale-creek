import AboutContent from "./AboutContent";
import styles from "./AboutSection.module.css";

const AboutSection = () => {
  return (
    <section className={styles.aboutSection}>
      <AboutContent />
    </section>
  );
};

export default AboutSection;
