'use client';

import Link from 'next/link';
import Image from 'next/image';
import styles from './Footer.module.css';
import SocialIcons from './SocialIcons';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Asymmetrical main content */}
        <div className={styles.mainContent}>
          {/* Left side - Logo section */}
          <div className={styles.logoSection}>
            <div className={styles.whaleLogoHero}>
              <Image
                className={styles.logoImage}
                width={120}
                height={120}
                src='/images/whaleCreek.png'
                alt='Whale Creek Logo'
              />
            </div>
            <h2 className={styles.heroTitle}>Whale Creek Co</h2>
            <p className={styles.heroSubtitle}>
              Indianapolis&apos; Premier Millwork & Construction
            </p>
            <div className={styles.socialSection}>
              <SocialIcons />
            </div>
          </div>

          {/* Right side content */}
          <div className={styles.rightContent}>
            {/* Contact grid */}
            <div className={styles.contactGrid}>
              <div className={styles.contactItem}>
                <p>Call</p>
                <a href="tel:3174312449">(317) 431-2449</a>
              </div>
              <div className={styles.contactItem}>
                <p>Email</p>
                <a href="mailto:dave@whalecreek.co">dave@whalecreek.co</a>
              </div>
              <div className={styles.contactItem}>
                <p>Service</p>
                <span>Indianapolis & Surrounding Areas</span>
              </div>
            </div>

            {/* Quick links */}
            <div className={styles.quickLinks}>
              <p>Quick Links</p>
              <div className={styles.linksList}>
                <Link href='/about'>About</Link>
                <Link href='/indianapolis-general-contractor'>Services</Link>
                <Link href='/project-gallery'>Gallery</Link>
                <Link href='/contact'>Contact</Link>
                <Link href='/blog'>Blog</Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className={styles.bottomBar}>
          <p className={styles.copyright}>© 2025 Whale Creek Co</p>
          <p className={styles.designedBy}>
            Designed by{' '}
            <a
              href='https://paxmedia.com'
              target='_blank'
              rel='noopener noreferrer'
            >
              Pax Media
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
