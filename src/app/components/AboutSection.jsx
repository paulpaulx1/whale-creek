'use client';

import { useRef } from 'react';
import StatCard from './StatCard';
import CircleAccent from './CircleAccent';
import FloatingElement from './FloatingElement';
import useIntersectionObserver from '../hooks/useIntersectionObserver';
import styles from './AboutSection.module.css';

const AboutSection = () => {
  const visibleElements = useIntersectionObserver();
  const aboutRef = useRef(null);

  const stats = [
    { number: '500+', label: 'Projects Completed' },
    { number: '15+', label: 'Years Experience' },
    { number: '100%', label: 'Client Satisfaction' },
    { number: '24/7', label: 'Project Support' }
  ];

  const aboutCircleColors = ['#D32F2F', '#1976D2', '#F57C00', '#66BB6A', '#FF7043'];
  const statsCircleColors = ['#FF7043', '#F57C00', '#D32F2F', '#66BB6A', '#1976D2'];

  return (
    <section className={styles.aboutSection} ref={aboutRef}>
      {/* Keep the kinetic background - you liked this */}
      <div className={styles.kineticBackground}>
        <FloatingElement type="triangle" className={styles.floatingTriangle} />
        <FloatingElement type="circle" className={styles.floatingCircle} />
        <FloatingElement type="square" className={styles.floatingSquare} />
        <FloatingElement type="beam" className={styles.floatingBeam} />
        <FloatingElement type="oval" className={styles.floatingOval} />
      </div>

      <div className={styles.container}>
        {/* Content */}
        <div 
          className={`${styles.content} ${visibleElements.content ? styles.visible : ''}`}
          data-element="content"
        >
          <h2 className={styles.title}>
            Indianapolis' <span className={styles.highlight}>Trusted</span> Craftsmen
          </h2>

          {/* Single content block instead of separate cards */}
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

          {/* Keep circle accent but simplified */}
          <CircleAccent 
            colors={aboutCircleColors} 
            className={styles.aboutCircles}
          />
        </div>

        {/* Simplified image section */}
        <div 
          className={`${styles.imageSection} ${visibleElements.image ? styles.visible : ''}`}
          data-element="image"
        >
          <div className={styles.imageContainer}>
            <img
              src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt="Indianapolis construction team at work"
              className={styles.image}
            />
          </div>
        </div>

        {/* Stats section - cleaned up */}
        <div 
          className={`${styles.statsSection} ${visibleElements.stats ? styles.visible : ''}`}
          data-element="stats"
        >
          <div className={styles.statsHeader}>
            <h3 className={styles.statsTitle}>Our Track Record</h3>
          </div>

          <div className={styles.statsGrid}>
            {stats.map((stat, index) => (
              <StatCard 
                key={index}
                number={stat.number}
                label={stat.label}
                index={index}
              />
            ))}
          </div>

          <CircleAccent 
            colors={statsCircleColors} 
            className={styles.statsCircles}
          />
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
