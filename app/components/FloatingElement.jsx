'use client';

import { useEffect } from 'react';
import styles from './FloatingElement.module.css';

const FloatingElement = ({ type, className }) => {
  useEffect(() => {
    const handleMouseMove = (e) => {
      const elements = document.querySelectorAll('.floating-element');
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      
      elements.forEach((element, index) => {
        const speed = (index + 1) * 0.3;
        const xOffset = (x - 0.5) * speed * 30;
        const yOffset = (y - 0.5) * speed * 30;
        const rotation = (x - 0.5) * speed * 15;
        element.style.transform += ` translate(${xOffset}px, ${yOffset}px) rotate(${rotation}deg)`;
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const shapes = {
    triangle: <div className={styles.triangle} />,
    circle: <div className={styles.circle} />,
    square: <div className={styles.square} />,
    beam: <div className={styles.beam} />,
    oval: <div className={styles.oval} />
  };

  return (
    <div className={`floating-element ${styles.floatingElement} ${styles[type]} ${className}`}>
      {shapes[type]}
    </div>
  );
};

export default FloatingElement;