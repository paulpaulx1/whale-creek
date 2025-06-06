import styles from "./AboutContent.module.css";
import Reviews from "./Reviews";
import Image from "next/image";
import StatCard from "./StatCard";

const AboutContent = () => {
  const stats = [
    { number: "150+", label: "Projects Completed" },
    { number: "15+", label: "Years Experience" },
    { number: "100%", label: "Client Satisfaction" },
    { number: "24/7", label: "Project Support" },
  ];

  return (
    <section className={styles.aboutSection}>
      {/* Kinetic Background Elements */}
      <div className={styles.kineticBackground}>
        <div className={`${styles.floatingElement} ${styles.floatingTriangle}`}></div>
        <div className={`${styles.floatingElement} ${styles.floatingCircle}`}></div>
        <div className={`${styles.floatingElement} ${styles.floatingSquare}`}></div>
        <div className={`${styles.floatingElement} ${styles.floatingBeam}`}></div>
        <div className={`${styles.floatingElement} ${styles.floatingOval}`}></div>
      </div>

      <div className={styles.container}>
        {/* About Content Grid - Content + Image */}
        <div className={styles.aboutContent}>
          {/* Content Section - Left Column */}
          <div className={styles.content} data-element="content">
            <h2 className={styles.title}>

              Indianapolis&apos; <span className={styles.heroAccent}>
                Trusted
              </span>{" "}
              Craftsmen
            </h2>

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

            {/* Circle accent placeholder - will be enhanced by client component */}
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

          {/* Image Section - Right Column */}
          <div className={styles.imageSection} data-element="image">
            <div className={styles.imageContainer}>
              <Image
                src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Indianapolis construction team at work"
                className={styles.image}
                width={600}
                height={500}
              />
            </div>
          </div>
        </div>

        {/* Stats Section - Full Width Below */}
        <div className={styles.statsSection} data-element="stats">
          <div className={styles.statsHeader}>
            <h3 className={styles.statsTitle}>Our Track Record</h3>
          </div>

          <div className={styles.statsGrid}>
            {stats.map((statObj, i) => (
              <StatCard
                key={i}
                number={statObj.number}
                label={statObj.label}
                index={statObj.index}
              />
            ))}
          </div>
          
          <Reviews />

          {/* Stats circle accent placeholder */}
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
    </section>
  );
};

export default AboutContent;