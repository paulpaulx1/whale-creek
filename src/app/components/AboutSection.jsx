import AboutContent from './AboutContent';
import AboutInteractive from './AboutInteractive';
import styles from './AboutSection.module.css';

const AboutSection = () => {
  return (
    <section className={styles.aboutSection}>
      {/* Server-rendered content for SEO */}
      <AboutContent />
      
      {/* Client-side interactive enhancements */}
      <AboutInteractive />
    </section>
  );
};

export default AboutSection;
