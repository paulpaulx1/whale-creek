import styles from './AboutSection.module.css';
import Reviews from './Reviews';

const AboutContent = () => {
  const stats = [
    { number: '150+', label: 'Projects Completed' },
    { number: '15+', label: 'Years Experience' },
    { number: '100%', label: 'Client Satisfaction' },
    { number: '24/7', label: 'Project Support' }
  ];

  return (
    <div className={styles.container}>
      {/* Content Section - Left Column */}
      <div className={styles.content} data-element="content">
        <h2 className={styles.title}>
          <span className={styles.titleAccent1}></span>
          Indianapolis' <span className={styles.heroAccent}>Trusted</span> Craftsmen
          <span className={styles.titleAccent2}></span>
        </h2>

        <div className={styles.contentBlock}>
          <p>
            With decades of combined experience, Whale Creek Construction has established itself as Indianapolis' premier destination for custom millwork and construction excellence.
          </p>
          <p>
            Our team combines traditional woodworking techniques with modern technology and project management systems to deliver projects on time, within budget, and beyond expectations.
          </p>
          <p>
            Every project begins with understanding your vision and ends with results that exceed your expectations.
          </p>
        </div>

        {/* Circle accent placeholder - will be enhanced by client component */}
        <div className={styles.aboutCircles} data-circles="about">
          <div className={styles.circle} style={{ backgroundColor: '#D32F2F' }}></div>
          <div className={styles.circle} style={{ backgroundColor: '#1976D2' }}></div>
          <div className={styles.circle} style={{ backgroundColor: '#F57C00' }}></div>
          <div className={styles.circle} style={{ backgroundColor: '#66BB6A' }}></div>
          <div className={styles.circle} style={{ backgroundColor: '#FF7043' }}></div>
        </div>
      </div>

      {/* Image Section - Right Column */}
      <div className={styles.imageSection} data-element="image">
        <div className={styles.imageContainer}>
          <img
            src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            alt="Indianapolis construction team at work"
            className={styles.image}
          />
        </div>
      </div>

      {/* Stats Section - Full Width Below */}
      <div className={styles.statsSection} data-element="stats">
        <div className={styles.statsHeader}>
          <h3 className={styles.statsTitle}>Our Track Record</h3>
        </div>

        <div className={styles.statsGrid}>
          {stats.map((stat, index) => (
            <div 
              key={index}
              className={`${styles.statCard} ${styles[`statCard${index + 1}`]}`}
              data-stat-final={stat.number}
            >
              <div className={styles.statAccent} />
              <span className={styles.statNumber} data-number={stat.number}>
                {stat.number}
              </span>
              <span className={styles.statLabel}>
                {stat.label}
              </span>
            </div>
          ))}
        </div>
        <Reviews />

        {/* Stats circle accent placeholder */}
        <div className={styles.statsCircles} data-circles="stats">
          <div className={styles.circle} style={{ backgroundColor: '#FF7043' }}></div>
          <div className={styles.circle} style={{ backgroundColor: '#F57C00' }}></div>
          <div className={styles.circle} style={{ backgroundColor: '#D32F2F' }}></div>
          <div className={styles.circle} style={{ backgroundColor: '#66BB6A' }}></div>
          <div className={styles.circle} style={{ backgroundColor: '#1976D2' }}></div>
        </div>
      </div>
    </div>
  );
};

export default AboutContent;