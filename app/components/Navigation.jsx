'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import styles from './Navigation.module.css';
import Image from 'next/image';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (pathname === '/') {
        setIsScrolled(window.scrollY > 100);
      } else {
        setIsScrolled(true);
      }
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={`${styles.nav} ${isScrolled ? styles.navScrolled : ''}`}>
      <div className={styles.navContainer}>
        {/* Logo */}
        <Link href='/' className={styles.logo}>
          <div className={styles.logoIcon}>
            <Image
              className={styles.logoImage}
              width='70'
              height='70'
              src='/images/whaleCreek.png'
              alt='Whale Creek Logo'
            />
          </div>
          <span className={styles.logoText}>Whale Creek Co</span>
        </Link>

        {/* Phone Number and Navigation Container */}
        <div className={styles.navRight}>
          {/* Phone Number */}
          <div className={styles.phoneContainer}>
            <div className={styles.phoneInfo}>
              <div className={styles.phoneIcon}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className={styles.phoneDetails}>
                <div className={styles.phoneLocation}>Indianapolis, IN</div>
                <a href="tel:317-431-2449" className={styles.phoneNumber}>(317) 431-2449</a>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <ul className={styles.navLinks}>
            <li>
              <Link href='/'>About</Link>
            </li>
            <li>
              <Link href='/indianapolis-general-contractor'>Services</Link>
            </li>
            <li>
              <Link href='/project-gallery'>Gallery</Link>
            </li>
            <li>
              <Link href='/blog'>Blog</Link>
            </li>
            <li>
              <Link href='/indianapolis-woodworker-contact'>Contact</Link>
            </li>
          </ul>
        </div>

        {/* Mobile Menu Button */}
        <div
          className={`${styles.hamburger} ${isMobileMenuOpen ? styles.hamburgerOpen : ''}`}
          onClick={toggleMobileMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`${styles.mobileMenu} ${isMobileMenuOpen ? styles.mobileMenuOpen : ''}`}
        >
          {/* Phone in Mobile Menu */}
          <div className={styles.mobilePhoneContainer}>
            <div className={styles.mobilePhoneInfo}>
              <div className={styles.phoneIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className={styles.phoneDetails}>
                <div className={styles.phoneLocation}>Indianapolis, IN</div>
                <a href="tel:317-431-2449" className={styles.phoneNumber}>(317) 431-2449</a>
              </div>
            </div>
          </div>
          
          <ul className={styles.mobileNavLinks}>
            <li>
              <Link href='/' onClick={closeMobileMenu}>
                About
              </Link>
            </li>
            <li>
              <Link
                href='/indianapolis-general-contractor'
                onClick={closeMobileMenu}
              >
                Services
              </Link>
            </li>
            <li>
              <Link href='/project-gallery' onClick={closeMobileMenu}>
                Gallery
              </Link>
            </li>
            <li>
              <Link href='/blog' onClick={closeMobileMenu}>
                Blog
              </Link>
            </li>
            <li>
              <Link
                href='/indianapolis-woodworker-contact'
                onClick={closeMobileMenu}
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className={styles.mobileMenuOverlay}
          onClick={closeMobileMenu}
        ></div>
      )}
    </nav>
  );
}