'use client';

import { useRef } from 'react';
import Image from 'next/image';
import StatCard from './/StatCard';
import CircleAccent from './/CircleAccent';
import FloatingElement from './/FloatingElement';
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
      {/* Kinetic Background Elements */}
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
            <span className={styles.titleAccent1}></span>
            Indianapolis'{' '}
            <span className={styles.heroAccent}>
              Trusted
            </span>{' '}
            Craftsmen
            <span className={styles.titleAccent2}></span>
          </h2>

          <div className={styles.paragraphs}>
            <p className={`${styles.paragraph} ${styles.paragraph1}`}>
              <span className={styles.paragraphAccent}></span>
              With decades of combined experience, Whale Creek Construction has established itself as Indianapolis' premier destination for custom millwork and construction excellence.
            </p>

            <p className={`${styles.paragraph} ${styles.paragraph2}`}>
              <span className={styles.paragraphAccent}></span>
              Our team combines traditional woodworking techniques with modern technology and project management systems to deliver projects on time, within budget, and beyond expectations.
            </p>

            <p className={`${styles.paragraph} ${styles.paragraph3}`}>
              <span className={styles.paragraphAccent}></span>
              Every project begins with understanding your vision and ends with results that exceed your expectations.
            </p>
          </div>

          {/* About Circle Accent */}
          <CircleAccent 
            colors={aboutCircleColors} 
            className={styles.aboutCircles}
          />
        </div>

        {/* Image */}
        <div 
          className={`${styles.imageSection} ${visibleElements.image ? styles.visible : ''}`}
          data-element="image"
        >
          <div className={styles.imageContainer}>
            <div className={styles.imageAccent1}></div>
            <div className={styles.imageAccent2}></div>
            
            <Image
              src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt="Indianapolis construction team at work"
              width={600}
              height={500}
              className={styles.image}
            />
          </div>
        </div>

        {/* Stats Section */}
        <div 
          className={`${styles.statsSection} ${visibleElements.stats ? styles.visible : ''}`}
          data-element="stats"
        >
          <div className={styles.statsHeader}>
            <h3 className={styles.statsTitle}>
              <span className={styles.statsTitleAccent1}></span>
              Our Track Record
              <span className={styles.statsTitleAccent2}></span>
            </h3>
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

          {/* Stats Circle Accent */}
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