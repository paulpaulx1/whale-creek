'use client'

import CTAButtons from './CTAButtons';
import SocialIcons from './SocialIcons';
import styles from './CTASection.module.css';
import { useState, useEffect } from 'react';

export default function CTASection() {
  const [isHomePage, setIsHomePage] = useState(false);

  useEffect(() => {
    const checkCurrentPage = () => {
      const path = window.location.pathname;
      setIsHomePage(path === '/' || path === '/home');
    };

    checkCurrentPage();
    // Listen for navigation changes if needed
    window.addEventListener('popstate', checkCurrentPage);

    return () => window.removeEventListener('popstate', checkCurrentPage);
  }, []);

  // Don't render anything if we're on the home page
  if (isHomePage) {
    return null;
  }
    return (
      <section className={styles.cta}>
        <div className={styles.ctaContainer}>
          <div className={styles.ctaContent}>
            <h2>
              Ready to Transform Your{' '}
              <span className={styles.ctaAccent}>Home or Business?</span>
            </h2>
            <p>
              Contact Whale Creek Co today for a free consultation, and
              let&apos;s discuss how we can bring your dream space to life.
              Experience the best in construction and design in Indianapolis—
              quality, care and satisfaction await!
            </p>
            <div className={styles.ctaButtons}>
              <CTAButtons />
            </div>
            <div className={styles.ctaCircles}>
              <SocialIcons />
              <div className={styles.ctaCircle}></div>
              <div className={styles.ctaCircle}></div>
              <div className={styles.ctaCircle}></div>
              <div className={styles.ctaCircle}></div>
              <div className={styles.ctaCircle}></div>
            </div>
          </div>
        </div>
      </section>
    );
}