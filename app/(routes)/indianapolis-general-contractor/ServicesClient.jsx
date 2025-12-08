"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import styles from "./Services.module.css";

export default function ServicesClient({ services, serviceAreas }) {
  const cardsRef = useRef([]);
  const imageRefs = useRef([]);

  /* ✅ STAGGERED SCROLL-IN */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);
          }
        });
      },
      { threshold: 0.25 }
    );

    cardsRef.current.forEach((el) => el && observer.observe(el));

    return () => observer.disconnect();
  }, []);

  /* ✅ PARALLAX DRIFT */
  useEffect(() => {
    const onScroll = () => {
      imageRefs.current.forEach((img) => {
        if (!img) return;
        const rect = img.getBoundingClientRect();
        const offset = rect.top * 0.08;
        img.style.transform = `translateY(${offset}px)`;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <main className={styles.main}>
      {/* ✅ HERO */}
      <section className={styles.servicesHero}>
        <Image
          src="/images/Noblesville-Deck.JPG"
          alt="Whale Creek Outdoor Living and General Contracting"
          fill
          priority
          className={styles.servicesHeroImage}
        />
        <div className={styles.servicesHeroOverlay} />
        <div className={styles.servicesHeroContent}>
          <h1>What We Do</h1>
          <p>
            Residential construction, custom millwork, and commercial general
            contracting — built with precision, clarity, and long-term
            durability across Central Indiana.
          </p>
        </div>
      </section>

      {/* ✅ SERVICES WITH STAGGER */}
      <section className={styles.services}>
        <div className={styles.servicesContainer}>
          {services.map((service, index) => (
            <div
              key={service.id}
              ref={(el) => (cardsRef.current[index] = el)}
              className={`${styles.serviceSection} ${index % 2 ? styles.serviceReverse : ""}`}
            >
              <div
                className={styles.serviceContent}
                data-blueprint={service.blueprint}
              >
                <div className={styles.serviceText}>
                  <h2>{service.title}</h2>
                  <p className={styles.serviceDescription}>
                    {service.description}
                  </p>
                  <p className={styles.serviceDetails}>{service.details}</p>

                  <ul className={styles.serviceFeatures}>
                    {service.features.map((feature, i) => (
                      <li key={i}>
                        <i className="ph ph-check-circle" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div
                  className={styles.serviceImage}
                  ref={(el) => (imageRefs.current[index] = el)}
                >
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className={styles.serviceImg}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ✅ SERVICE AREAS */}
      <section className={styles.serviceAreasSection}>
        <div className={styles.serviceAreasContainer}>
          <div className={styles.serviceAreasList}>
            {serviceAreas.map((area, i) => (
              <span key={i} className={styles.serviceArea}>
                {area}
              </span>
            ))}
          </div>

          <p>
            As licensed general contractors in Indianapolis, we bring decades of
            construction expertise to projects throughout Central Indiana.
          </p>
        </div>
      </section>
    </main>
  );
}
