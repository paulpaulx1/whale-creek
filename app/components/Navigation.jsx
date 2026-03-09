"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import styles from "./Navigation.module.css";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileExpanded, setMobileExpanded] = useState(null);
  const dropdownRef = useRef(null);
  const pathname = usePathname();

  const navItems = [
    {
      href: pathname === "/" ? "#about" : "/#about",
      label: "About",
    },
    { href: "/indianapolis-general-contractor", label: "Services" },
    {
      label: "Gallery",
      dropdown: [
        { href: "/project-gallery", label: "Projects" },
        {
          href: "/project-gallery/underground",
          label: "Underground",
          isUnderground: true,
        },
      ],
    },
    { href: "/blog", label: "Blog" },
    { href: "/indianapolis-woodworker-contact", label: "Contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (pathname === "/") {
        setIsScrolled(window.scrollY > 50);
      } else {
        setIsScrolled(true);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => {
    setIsOpen(false);
    setMobileExpanded(null);
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
                  width={60}
                  height={60}
                  src="/images/whaleCreek.png"
                  alt="Whale Creek Logo"
                />
              </div>
              <Link href="/" className={styles.brandLink} onClick={closeMenu}>
                <span className={styles.brandText}>
                  Whale Creek Construction
                </span>
              </Link>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className={styles.desktopMenu} ref={dropdownRef}>
            {navItems.map((item, index) => {
              if (item.dropdown) {
                const isActive = activeDropdown === item.label;
                return (
                  <div
                    key={item.label}
                    className={styles.dropdownWrapper}
                    onMouseEnter={() => setActiveDropdown(item.label)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <button
                      className={`${styles.navLink} ${styles.navItem} ${styles.dropdownTrigger} ${isActive ? styles.dropdownTriggerActive : ""}`}
                      style={{ animationDelay: `${(index + 1) * 0.1}s` }}
                      aria-expanded={isActive}
                    >
                      {item.label}
                      <svg
                        className={`${styles.chevron} ${isActive ? styles.chevronOpen : ""}`}
                        width="10"
                        height="6"
                        viewBox="0 0 10 6"
                        fill="none"
                      >
                        <path
                          d="M1 1L5 5L9 1"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>

                    <div
                      className={`${styles.dropdown} ${isActive ? styles.dropdownOpen : ""}`}
                    >
                      {item.dropdown.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className={`${styles.dropdownItem} ${child.isUnderground ? styles.dropdownItemUnderground : ""}`}
                          onClick={() => setActiveDropdown(null)}
                        >
                          {child.isUnderground && (
                            <span className={styles.undergroundDot} />
                          )}
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`${styles.navLink} ${styles.navItem}`}
                  onClick={closeMenu}
                  style={{ animationDelay: `${(index + 1) * 0.1}s` }}
                >
                  {item.label}
                </Link>
              );
            })}
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
              {navItems.map((item, index) => {
                if (item.dropdown) {
                  const isExpanded = mobileExpanded === item.label;
                  return (
                    <div
                      key={item.label}
                      className={styles.mobileDropdownGroup}
                    >
                      <button
                        className={`${styles.mobileNavLink} ${styles.mobileDropdownTrigger}`}
                        onClick={() =>
                          setMobileExpanded(isExpanded ? null : item.label)
                        }
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        {item.label}
                        <svg
                          className={`${styles.chevron} ${isExpanded ? styles.chevronOpen : ""}`}
                          width="10"
                          height="6"
                          viewBox="0 0 10 6"
                          fill="none"
                        >
                          <path
                            d="M1 1L5 5L9 1"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                      {isExpanded && (
                        <div className={styles.mobileDropdownItems}>
                          {item.dropdown.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              className={`${styles.mobileNavLink} ${styles.mobileDropdownItem} ${child.isUnderground ? styles.mobileDropdownItemUnderground : ""}`}
                              onClick={closeMenu}
                            >
                              {child.isUnderground && (
                                <span className={styles.undergroundDot} />
                              )}
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={styles.mobileNavLink}
                    onClick={closeMenu}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {item.label}
                  </Link>
                );
              })}
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
