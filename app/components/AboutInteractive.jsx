'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './AboutSection.module.css';

const AboutInteractive = () => {
  const [visibleElements, setVisibleElements] = useState({});
  const observerRef = useRef(null);

  useEffect(() => {
    // Intersection Observer for clean fade-in animations
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const element = entry.target.dataset.element;
            if (element) {
              setVisibleElements(prev => ({
                ...prev,
                [element]: true
              }));
              
              // Add visible class to trigger CSS animations
              entry.target.classList.add('visible');
            }
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    // Observe elements with data-element attributes
    const elements = document.querySelectorAll('[data-element]');
    elements.forEach(el => observerRef.current.observe(el));

    // Setup clean circle interactions
    setupCircleInteractions();

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const setupCircleInteractions = () => {
    const circleContainers = document.querySelectorAll('[data-circles]');
    
    circleContainers.forEach(container => {
      const circles = container.querySelectorAll(`.${styles.circle}`);
      
      container.addEventListener('mouseenter', () => {
        circles.forEach((circle, index) => {
          setTimeout(() => {
            circle.style.transform = 'scale(1.2) translateY(-4px)';
            circle.style.opacity = '1';
          }, index * 50);
        });
      });
      
      container.addEventListener('mouseleave', () => {
        circles.forEach(circle => {
          circle.style.transform = 'scale(1) translateY(0)';
          circle.style.opacity = '0.8';
        });
      });

      // Subtle click effects
      circles.forEach(circle => {
        circle.addEventListener('click', () => {
          circle.style.transform = 'scale(1.5) translateY(-8px)';
          circle.style.transition = 'all 0.2s ease';
          
          setTimeout(() => {
            circle.style.transform = 'scale(1) translateY(0)';
            circle.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
          }, 200);
        });
      });
    });
  };

  return (
    <>
      {/* Minimal kinetic background elements */}
      <div className={styles.kineticBackground}>
        <div className={`${styles.floatingElement} ${styles.floatingTriangle}`}></div>
        <div className={`${styles.floatingElement} ${styles.floatingCircle}`}></div>
        <div className={`${styles.floatingElement} ${styles.floatingSquare}`}></div>
      </div>
    </>
  );
};

export default AboutInteractive;