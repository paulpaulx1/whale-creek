"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import styles from "./Navigation.module.css";

const navItems = [
  { href: "/", label: "About" },
  { href: "/indianapolis-general-contractor", label: "Services" },
  { href: "/project-gallery", label: "Gallery" },
  { href: "/blog", label: "Blog" },
  { href: "/indianapolis-woodworker-contact", label: "Contact" },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (pathname === "/") {
        setIsScrolled(window.scrollY > 50);
      } else {
        setIsScrolled(true);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  useEffect(() => {
    // Prevent body scroll when menu is open
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <>
      <nav className={`${styles.nav} ${isScrolled ? styles.navScrolled : ""}`}>
        <div className={styles.navContainer}>
          {/* Logo/Brand */}
          <div className={styles.brand}>
            <div className={styles.logoWrapper} style={{ display: "flex" }}>
              <div className={styles.logoIcon}>
                <Image
                  className={styles.logoImage}
                  width="60"
                  height="60"
                  src="/images/whaleCreek.png"
                  alt="Whale Creek Logo"
                />
              </div>
              <Link href="/" className={styles.brandLink} onClick={closeMenu}>
                <span className={styles.brandText}>Whale Creek</span>
              </Link>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className={styles.desktopMenu}>
            {navItems.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                className={`${styles.navLink} ${styles.navItem}`}
                onClick={closeMenu}
                style={{ animationDelay: `${(index + 1) * 0.1}s` }}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`${styles.menuToggle} ${isOpen ? styles.menuOpen : ""}`}
            onClick={toggleMenu}
            aria-label="Toggle navigation menu"
            aria-expanded={isOpen}
          >
            <span className={styles.menuLine}></span>
            <span className={styles.menuLine}></span>
            <span className={styles.menuLine}></span>
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <div
          className={`${styles.mobileMenuOverlay} ${isOpen ? styles.overlayOpen : ""}`}
        >
          <div className={styles.mobileMenu}>
            <div className={styles.mobileMenuHeader}>
              <span className={styles.mobileMenuTitle}>Menu</span>
              <button
                className={styles.closeButton}
                onClick={closeMenu}
                aria-label="Close menu"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M18 6L6 18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M6 6L18 18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            <div className={styles.mobileMenuItems}>
              {navItems.map((item, index) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={styles.mobileNavLink}
                  onClick={closeMenu}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Backdrop */}
      {isOpen && (
        <div
          className={styles.backdrop}
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}
    </>
  );
}
