import styles from "./AboutSection.module.css";
import Reviews from "./Reviews";
import Image from "next/image";
import AboutCarousel from "./AboutCarousel";

import StatCard from "./StatCard";

const AboutContent = () => {
  const stats = [
    { number: "150+", label: "Projects Completed" },
    { number: "15+", label: "Years Experience" },
    { number: "100%", label: "Client Satisfaction" },
    { number: "24/7", label: "Project Support" },
  ];

  return (
    <div className={styles.container}>
      {/* About Content Grid - Reversed Layout */}
      <div className={styles.aboutContent}>
        {/* Image Section - Now First */}
        <div className={styles.imageSection} data-element="image">
          <AboutCarousel />
        </div>

        {/* Content Section - Now Second */}
        <div className={styles.content} data-element="content">
          <h1 className={styles.title}>
            About Whale Creek
          </h1>

          <div className={styles.contentBlock}>
          <p>
  As Indianapolis' most trusted general contractor and woodworker specialists, we've been transforming homes and businesses throughout the greater Indianapolis area for over 15 years. Our team combines traditional craftsmanship with modern techniques to deliver exceptional results on every project.
</p>
<p>
  Our Indianapolis woodworker heritage combines with modern general contractor expertise, advanced CNC operations, and strict adherence to industry standards to deliver results that exceed building codes and stand the test of time. Every project reflects our commitment to Indianapolis homeowners who demand excellence backed by licensed, bonded professionals.
</p>
          </div>
        </div>
      </div>

      {/* Divider Line */}
      <div className={styles.sectionDivider}></div>

      {/* Stats Section */}
      <div className={styles.statsSection} data-element="stats">
        <div className={styles.statsHeader}>
          <div className={styles.statsTitle}>Our Track Record</div>
        </div>

        <div className={styles.statsGrid}>
          {stats.map((statObj, i) => (
            <StatCard
              key={i}
              number={statObj.number}
              label={statObj.label}
              index={i}
            />
          ))}
        </div>

        <Reviews />
      </div>
    </div>
  );
};

export default AboutContent;