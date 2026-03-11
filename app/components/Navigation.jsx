"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import styles from "./Navigation.module.css";

const SERVICES_BASE = "/indianapolis-general-contractor";

const navItems = [
  {
    href_dynamic: true, // uses pathname for hash
    label: "About",
  },
  {
    label: "Services",
    href: "/indianapolis-general-contractor",
    dropdown: [
      {
        href: `${SERVICES_BASE}#custom-woodworking-millwork`,
        label: "Woodworking",
      },
      {
        label: "Construction",
        isAccordion: true,
        children: [
          { href: `${SERVICES_BASE}#outdoor-living-spaces`, label: "Outdoor Living" },
          { href: `${SERVICES_BASE}#residential-renovation-services`, label: "Residential Renovation" },
          { href: `${SERVICES_BASE}#commercial-projects`, label: "Commercial Projects" },
        ],
      },
      {
        href: `${SERVICES_BASE}#underground`,
        label: "Underground",
        isUnderground: true,
      },
    ],
  },
  {
    label: "Gallery",
    href: "/project-gallery",
    dropdown: [
      { href: "/project-gallery", label: "Construction" },
      { href: "/project-gallery?category=millwork", label: "Millwork" },
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

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileExpanded, setMobileExpanded] = useState(null);
  const [mobileNestedExpanded, setMobileNestedExpanded] = useState(null);
  const [desktopAccordionOpen, setDesktopAccordionOpen] = useState(null);
  const dropdownRef = useRef(null);
  const pathname = usePathname();

  // Resolve About href based on current path
  const resolvedNavItems = navItems.map((item) =>
    item.href_dynamic
      ? { ...item, href: pathname === "/" ? "#about" : "/#about" }
      : item,
  );

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
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setActiveDropdown(null);
        setDesktopAccordionOpen(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => {
    setIsOpen(false);
    setMobileExpanded(null);
    setMobileNestedExpanded(null);
  };

  const handleDropdownLeave = () => {
    setActiveDropdown(null);
    setDesktopAccordionOpen(null);
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
                <span className={styles.brandText}>Whale Creek Construction</span>
              </Link>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className={styles.desktopMenu} ref={dropdownRef}>
            {resolvedNavItems.map((item, index) => {
              if (item.dropdown) {
                const isActive = activeDropdown === item.label;
                return (
                  <div
                    key={item.label}
                    className={styles.dropdownWrapper}
                    onMouseEnter={() => setActiveDropdown(item.label)}
                    onMouseLeave={handleDropdownLeave}
                  >
                    <Link
                      href={item.href}
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
                    </Link>

                    <div className={`${styles.dropdown} ${isActive ? styles.dropdownOpen : ""}`}>
                      {item.dropdown.map((child) => {
                        // Nested accordion item (Construction)
                        if (child.isAccordion) {
                          const isAccOpen = desktopAccordionOpen === child.label;
                          return (
                            <div key={child.label} className={styles.dropdownAccordion}>
                              <button
                                className={`${styles.dropdownItem} ${styles.dropdownAccordionTrigger}`}
                                onClick={() =>
                                  setDesktopAccordionOpen(isAccOpen ? null : child.label)
                                }
                              >
                                {child.label}
                                <svg
                                  className={`${styles.chevronSmall} ${isAccOpen ? styles.chevronOpen : ""}`}
                                  width="8"
                                  height="5"
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
                              {isAccOpen && (
                                <div className={styles.dropdownAccordionItems}>
                                  {child.children.map((sub) => (
                                    <Link
                                      key={sub.href}
                                      href={sub.href}
                                      className={`${styles.dropdownItem} ${styles.dropdownSubItem}`}
                                      onClick={() => {
                                        setActiveDropdown(null);
                                        setDesktopAccordionOpen(null);
                                      }}
                                    >
                                      <span className={styles.subArrow}>↳</span>
                                      {sub.label}
                                    </Link>
                                  ))}
                                </div>
                              )}
                            </div>
                          );
                        }

                        // Normal dropdown item
                        return (
                          <Link
                            key={child.href}
                            href={child.href}
                            className={`${styles.dropdownItem} ${child.isUnderground ? styles.dropdownItemUnderground : ""}`}
                            onClick={() => {
                              setActiveDropdown(null);
                              setDesktopAccordionOpen(null);
                            }}
                          >
                            {child.isUnderground && (
                              <span className={styles.undergroundDot} />
                            )}
                            {child.label}
                          </Link>
                        );
                      })}
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
        <div className={`${styles.mobileMenuOverlay} ${isOpen ? styles.overlayOpen : ""}`}>
          <div className={styles.mobileMenu}>
            <div className={styles.mobileMenuHeader}>
              <span className={styles.mobileMenuTitle}>Menu</span>
              <button
                className={styles.closeButton}
                onClick={closeMenu}
                aria-label="Close menu"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            <div className={styles.mobileMenuItems}>
              {resolvedNavItems.map((item, index) => {
                if (item.dropdown) {
                  const isExpanded = mobileExpanded === item.label;
                  return (
                    <div key={item.label} className={styles.mobileDropdownGroup}>
                      <div className={styles.mobileDropdownHeader}>
                        <Link
                          href={item.href}
                          className={`${styles.mobileNavLink} ${styles.mobileDropdownLabel}`}
                          onClick={closeMenu}
                          style={{ animationDelay: `${index * 0.1}s` }}
                        >
                          {item.label}
                        </Link>
                        <button
                          className={`${styles.mobileChevronButton}`}
                          onClick={() => setMobileExpanded(isExpanded ? null : item.label)}
                          aria-label={`Toggle ${item.label} submenu`}
                        >
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
                      </div>

                      {isExpanded && (
                        <div className={styles.mobileDropdownItems}>
                          {item.dropdown.map((child) => {
                            if (child.isAccordion) {
                              const isNestedOpen = mobileNestedExpanded === child.label;
                              return (
                                <div key={child.label} className={styles.mobileNestedGroup}>
                                  <button
                                    className={`${styles.mobileNavLink} ${styles.mobileDropdownItem} ${styles.mobileDropdownTrigger}`}
                                    onClick={() =>
                                      setMobileNestedExpanded(isNestedOpen ? null : child.label)
                                    }
                                  >
                                    {child.label}
                                    <svg
                                      className={`${styles.chevron} ${isNestedOpen ? styles.chevronOpen : ""}`}
                                      width="8"
                                      height="5"
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
                                  {isNestedOpen && (
                                    <div className={styles.mobileNestedItems}>
                                      {child.children.map((sub) => (
                                        <Link
                                          key={sub.href}
                                          href={sub.href}
                                          className={`${styles.mobileNavLink} ${styles.mobileDropdownItem} ${styles.mobileSubItem}`}
                                          onClick={closeMenu}
                                        >
                                          <span className={styles.subArrow}>↳</span>
                                          {sub.label}
                                        </Link>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              );
                            }

                            return (
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
                            );
                          })}
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

      {isOpen && (
        <div className={styles.backdrop} onClick={closeMenu} aria-hidden="true" />
      )}
    </>
  );
}