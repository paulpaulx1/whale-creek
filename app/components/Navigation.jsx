'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import styles from './Navigation.module.css'
import Image from 'next/image'

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

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