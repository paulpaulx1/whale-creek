// components/Hero.js (Server Component)
import styles from "./Hero.module.css";
import CTAButtons from "./CTAButtons";
import SocialIcons from "./SocialIcons";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroVideoBackground}>
        <video autoPlay muted playsInline loop preload="auto" controls={false}>
          <source
            src="https://koklgwni3prbahdf.public.blob.vercel-storage.com/whale-creek-drone-footy.mov"
            type="video/mp4"
          />
        </video>
      </div>

      <div className={styles.heroContainer}>
        <div className={styles.heroContent}>
          <h1>
            Indiana&apos;s Premier{" "}
            <span className={styles.heroAccent}>Construction</span> & Millwork
            Company
          </h1>
          <h2>
            Licensed & Bonded. Founded by master builder David Finegan, we
            specialize in custom woodwork, deck building, sunrooms, home
            additions, and complete renovations throughout Indianapolis and
            central Indiana. From outdoor living spaces to bespoke cabinetry,
            our design-focused approach delivers architectural woodwork and
            general contracting excellence that brings decades of craftsmanship
            to every project.
          </h2>
        </div>

        <div className={styles.heroActions}>
          <div className={styles.ctaSection}>
            <CTAButtons />
          </div>
          <div className={styles.socialSection}>
            <SocialIcons />
          </div>
        </div>
      </div>
    </section>
  );
}
