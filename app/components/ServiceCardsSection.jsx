"use client";

import { useEffect, useState, useRef } from "react";
import ServiceCard from "./ServiceCard";
import styles from "./ServiceCardsSection.module.css";

export default function ServiceCardsSection() {
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasAnimated(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const services = [
    {
      iconType: "house",
      blueprint: "RES_001",
      title: "Residential General Contracting",
      description:
        "Licensed, bonded, and insured Indianapolis general contractors specializing in renovations, home additions, and custom residential remodels.",
      linkUrl:
        "/indianapolis-general-contractor#residential-general-contractor-indianapolis",
      linkText: "Learn More About Residential Services",
    },
    {
      iconType: "buildings",
      blueprint: "COM_001",
      title: "Commercial General Contracting",
      description:
        "Full-service commercial construction for Indianapolis businesses, with deep experience in everything from office build-outs and retail spaces to custom millwork and tenant improvements.",
      linkUrl:
        "/indianapolis-general-contractor#commercial-general-contractors-indianapolis",
      linkText: "Explore Commercial Services",
    },
    {
      iconType: "hammer",
      blueprint: "MIL_001",
      title: "Custom Millwork & Woodworking",
      description:
        "Architectural millwork, custom cabinetry, built-ins, and precision woodworking created by master craftsmen in our Garfield Park workshop.",
      linkUrl:
        "/indianapolis-general-contractor#custom-millwork-woodworking-indianapolis",
      linkText: "View Millwork Services",
    },
    {
      iconType: "ruler",
      blueprint: "OUT_001",
      title: "Outdoor Living & Deck Building",
      description:
        "Custom decks, pergolas, patios, and sunrooms designed to expand how you live, with quality built to last in Indiana’s climate.",
      linkUrl:
        "/indianapolis-general-contractor#outdoor-living-deck-building-indianapolis",
      linkText: "See Outdoor Living Options",
    },
    {
      iconType: "toolbox",
      blueprint: "CAB_001",
      title: "Custom Cabinetry",
      description:
        "Bespoke storage solutions designed and built to fit your unique space, style, and functional needs.",
      linkUrl: null,
      linkText: null,
    },
    {
      iconType: "wrench",
      blueprint: "DES_001",
      title: "Design Services",
      description:
        "Collaborative design guidance from concept to completion, helping you solve layout challenges and make informed decisions about materials, finishes, and functionality.",
      linkUrl: null,
      linkText: null,
    },
  ];
  return (
    <section ref={sectionRef} className={styles.servicesSection}>
      <div className={styles.container}>
        <div className={styles.servicesHeader}>
          <h2
            className={`${styles.servicesTitle} ${hasAnimated ? styles.titleVisible : ""}`}
          >
            What We Build
          </h2>
          <p
            className={`${styles.servicesSubtitle} ${hasAnimated ? styles.subtitleVisible : ""}`}
          >
            From custom millwork to complete home renovations, we bring
            expertise and craftsmanship to every project.
          </p>
        </div>

        <div className={styles.servicesGrid}>
          {services.map((service, i) => (
            <div
              key={i}
              className={`${hasAnimated ? styles.cardVisible : styles.cardHidden}`}
            >
              <ServiceCard {...service} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
