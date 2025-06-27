// components/Hero.js
'use client';
import { useState, useRef } from 'react';
import styles from "./Hero.module.css";
import CTAButtons from "./CTAButtons";
import SocialIcons from "./SocialIcons";

export default function Hero() {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef(null);

  const handleVideoLoad = () => {
    setVideoLoaded(true);
  };

  return (
    <section className={styles.hero}>
      <div className={styles.heroVideoBackground}>
        <video 
          ref={videoRef}
          autoPlay 
          muted 
          playsInline 
          loop 
          preload="auto" 
          onLoadedData={handleVideoLoad}
          className={videoLoaded ? styles.videoLoaded : ''}
        >
          <source
            src="https://koklgwni3prbahdf.public.blob.vercel-storage.com/whale-creek-drone-footy.mov"
            type="video/mp4"
          />
        </video>
      </div>

      {/* Rest of your component */}
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