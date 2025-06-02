'use client';

import Link from 'next/link';
import Image from 'next/image';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        
        {/* Hero logo section - much bigger and centered */}
        <div className={styles.heroSection}>
          <div className={styles.whaleLogoHero}>
            <Image 
              className={styles.logoImage} 
              width={120} 
              height={120} 
              src="/images/whaleCreek.png" 
              alt="Whale Creek Logo" 
            />
          </div>
          <h2 className={styles.heroTitle}>Whale Creek Co</h2>
          <p className={styles.heroSubtitle}>Indianapolis&apos; Premier Millwork & Construction</p>
        </div>

        {/* Simple contact grid */}
        <div className={styles.contactGrid}>
          <div className={styles.contactItem}>
            <h4>Call</h4>
            <a href="tel:3174312449">(317) 431-2449</a>
          </div>
          <div className={styles.contactItem}>
            <h4>Email</h4>
            <a href="mailto:info@whalecreekwoodworking.com">dave@whalecreek.co</a>
          </div>
          <div className={styles.contactItem}>
            <h4>Service</h4>
            <span>Indianapolis & Surrounding Areas</span>
          </div>
        </div>

        {/* Simple bottom bar */}
        <div className={styles.bottomBar}>
          <p className={styles.copyright}>© 2025 Whale Creek Co</p>
          <p className={styles.designedBy}>
            Designed by <a href="https://paxmedia.com" target="_blank" rel="noopener noreferrer">Pax Media</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;