// components/Hero.js (Server Component)
import Image from "next/image";
import styles from "./Hero.module.css";
import CTAButtons from "./CTAButtons";
import SocialIcons from "./SocialIcons";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroContainer}>
        <div className={styles.heroContent}>
          <h1>
            Indiana&apos;s Premier{" "}
            <span className={styles.heroAccent}>Construction</span> & Millwork
            Company
          </h1>
          <p>
            Founded by master woodworker David Finegan, we deliver architectural
            woodwork, design services, and general contracting excellence
            throughout central Indiana. From complete home remodeling to custom
            cabinetry, we bring decades of craftsmanship to every project.
          </p>
          <div className={styles.ctaSection}>
            <div className={styles.ctaButtons}>
              <CTAButtons />
            </div>
            <div className={styles.heroCircles}>
              <SocialIcons className={styles.socialIcons} />
              <div className={styles.heroCircle}></div>
              <div className={styles.heroCircle}></div>
              <div className={styles.heroCircle}></div>
              <div className={styles.heroCircle}></div>
              <div className={styles.heroCircle}></div>
            </div>
          </div>
        </div>
        <div className={styles.heroImage}>
          <Image
            src="/images/DavidFinegan.jpg"
            alt="Custom woodworking in Indianapolis workshop"
            width={600}
            height={500}
            priority
            className={styles.heroImg}
          />
        </div>
      </div>
    </section>
  );
}
