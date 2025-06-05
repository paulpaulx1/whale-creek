'use client';

import { useEffect, useRef, useState } from 'react';
import FloatingElement from './FloatingElement';
import styles from './AboutSection.module.css';

const AboutInteractive = () => {
  const [visibleElements, setVisibleElements] = useState({});
  const [animatedStats, setAnimatedStats] = useState({});
  const observerRef = useRef(null);

  useEffect(() => {
    // Intersection Observer for fade-in animations
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
            }

            // Handle stat animations
            if (entry.target.dataset.statFinal && !animatedStats[entry.target.dataset.statFinal]) {
              animateStatNumber(entry.target);
              setAnimatedStats(prev => ({
                ...prev,
                [entry.target.dataset.statFinal]: true
              }));
            }
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    // Observe elements
    const elements = document.querySelectorAll('[data-element], [data-stat-final]');
    elements.forEach(el => observerRef.current.observe(el));

    // Enhanced circle interactions
    setupCircleInteractions();

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const animateStatNumber = (statElement) => {
    const numberElement = statElement.querySelector('[data-number]');
    const finalNumber = numberElement.dataset.number;
    
    const isPercentage = finalNumber.includes('%');
    const hasPlus = finalNumber.includes('+');
    const hasSlash = finalNumber.includes('/');
    
    if (hasSlash) return; // Skip animation for complex numbers

    const cleanNumber = parseInt(finalNumber.replace(/[^\d]/g, ''));
    let current = 0;
    const increment = cleanNumber / 50;
    
    const counter = setInterval(() => {
      current += increment;
      if (current >= cleanNumber) {
        current = cleanNumber;
        clearInterval(counter);
      }
      
      let displayValue = Math.floor(current).toString();
      if (isPercentage) displayValue += '%';
      if (hasPlus) displayValue += '+';
      
      numberElement.textContent = displayValue;
    }, 50);
  };

  const setupCircleInteractions = () => {
    // Circle hover effects
    const circleContainers = document.querySelectorAll('[data-circles]');
    
    circleContainers.forEach(container => {
      const circles = container.querySelectorAll(`.${styles.circle}`);
      
      container.addEventListener('mouseenter', () => {
        circles.forEach((circle, index) => {
          setTimeout(() => {
            circle.style.transform = 'scale(1.4) translateY(-10px) rotate(' + (index * 72) + 'deg)';
          }, index * 100);
        });
      });
      
      container.addEventListener('mouseleave', () => {
        circles.forEach(circle => {
          circle.style.transform = 'scale(1) translateY(0) rotate(0deg)';
        });
      });

      // Individual circle click effects
      circles.forEach(circle => {
        circle.addEventListener('click', () => {
          circle.style.transform = 'scale(2) translateY(-20px) rotate(720deg)';
          setTimeout(() => {
            circle.style.transform = 'scale(1) translateY(0) rotate(0deg)';
          }, 600);
        });
      });
    });
  };

  // Apply visibility classes
  useEffect(() => {
    Object.keys(visibleElements).forEach(elementKey => {
      const element = document.querySelector(`[data-element="${elementKey}"]`);
      if (element) {
        element.classList.add(styles.visible);
      }
    });
  }, [visibleElements]);

  return (
    <>
      {/* Kinetic Background Elements */}
      <div className={styles.kineticBackground}>
        <FloatingElement type="triangle" className={styles.floatingTriangle} />
        <FloatingElement type="circle" className={styles.floatingCircle} />
        <FloatingElement type="square" className={styles.floatingSquare} />
        <FloatingElement type="beam" className={styles.floatingBeam} />
        <FloatingElement type="oval" className={styles.floatingOval} />
      </div>
    </>
  );
};

export default AboutInteractive;
