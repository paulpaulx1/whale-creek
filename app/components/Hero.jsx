// Server Component - no 'use client' directive
import styles from "./Hero.module.css";
import CTAButtons from "./CTAButtons";
import SocialIcons from "./SocialIcons";
import VideoBackground from "./VideoBackground";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <VideoBackground />

      <div className={styles.heroContainer}>
        <div className={styles.heroContent}>
          <h1>
            Indiana&apos;s Premier{" "}
            <span className={styles.heroAccent}>Construction</span> <br/>and
            Woodworking
          </h1>
          <h2>
            Licensed & Bonded general contractors in Indianapolis Indiana.
            Founded by master builder David Finegan, our Indianapolis general
            contractors specialize in custom woodwork, deck building, sunrooms,
            home additions, and complete renovations throughout Indianapolis and
            central Indiana. As an experienced general contractor Indianapolis
            teams trust, we deliver architectural woodwork and construction
            excellence with decades of craftsmanship in every project.
          </h2>
        </div>

        <div className={styles.heroActions}>
          <div className={styles.ctaSection}>
            <CTAButtons isHomepage={true} />
          </div>
          <div className={styles.socialSection}>
            <SocialIcons isHomepage={true} />
          </div>
        </div>
      </div>
    </section>
  );
}
