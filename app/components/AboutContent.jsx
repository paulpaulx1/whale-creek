import styles from "./AboutSection.module.css";
import Reviews from "./Reviews";
import Image from "next/image";
import AboutCarousel from "./AboutCarousel";

import StatCard from "./StatCard";

const AboutContent = () => {
  const stats = [
    { number: "500+", label: "Projects Completed" },
    { number: "15+", label: "Years Experience" },
    { number: "100%", label: "Client Satisfaction" },
    { number: "24/7", label: "Project Support" },
  ];

  return (
    <div className={styles.container}>
      {/* About Content Grid */}
      <div className={styles.aboutContent}>
        {/* Content Section */}
        <div className={styles.content} data-element="content">
          <h1 className={styles.title}>
            Master{" "}
            <span className={styles.heroAccent}>Craftsmen</span> Serving Indianapolis
          </h1>

          <div className={styles.contentBlock}>
            <p>
              As Indianapolis' most trusted general contractor and woodworker specialists, we've perfected the art of transforming homes throughout central Indiana with precision CNC machining and time-honored craftsmanship techniques.
            </p>
            <p>
              Our Indianapolis woodworker heritage combines with modern general contractor expertise, advanced CNC operations, and strict adherence to industry standards to deliver results that exceed building codes and stand the test of time.
            </p>
            <p>
              Every custom millwork piece, every renovation, every addition reflects our commitment to Indianapolis homeowners who demand excellence backed by licensed, bonded professionals operating at the highest industry standards.
            </p>
          </div>

          {/* Clean circle accent */}
          <div className={styles.aboutCircles} data-circles="about">
            <div
              className={styles.circle}
              style={{ backgroundColor: "#D32F2F" }}
            ></div>
            <div
              className={styles.circle}
              style={{ backgroundColor: "#1976D2" }}
            ></div>
            <div
              className={styles.circle}
              style={{ backgroundColor: "#F57C00" }}
            ></div>
            <div
              className={styles.circle}
              style={{ backgroundColor: "#66BB6A" }}
            ></div>
            <div
              className={styles.circle}
              style={{ backgroundColor: "#FF7043" }}
            ></div>
          </div>
        </div>

        {/* Image Section */}
        <div className={styles.imageSection} data-element="image">
          <AboutCarousel />
        </div>
      </div>

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

        {/* Clean circle accent */}
        <div className={styles.statsCircles} data-circles="stats">
          <div
            className={styles.circle}
            style={{ backgroundColor: "#FF7043" }}
          ></div>
          <div
            className={styles.circle}
            style={{ backgroundColor: "#F57C00" }}
          ></div>
          <div
            className={styles.circle}
            style={{ backgroundColor: "#D32F2F" }}
          ></div>
          <div
            className={styles.circle}
            style={{ backgroundColor: "#66BB6A" }}
          ></div>
          <div
            className={styles.circle}
            style={{ backgroundColor: "#1976D2" }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default AboutContent;