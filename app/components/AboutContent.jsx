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
            Indianapolis&apos;{" "}
            <span className={styles.heroAccent}>Trusted</span> Craftsmen
          </h1>

          <div className={styles.contentBlock}>
            <p>
              With decades of combined experience, Whale Creek Construction has
              established itself as Indianapolis&apos; premier destination for
              custom millwork and construction excellence.
            </p>
            <p>
              Our team combines traditional woodworking techniques with modern
              technology and project management systems to deliver projects on
              time, within budget, and beyond expectations.
            </p>
            <p>
              Every project begins with understanding your vision and ends with
              results that exceed your expectations.
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
