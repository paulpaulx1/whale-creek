// components/BackToTop.jsx
'use client';

import { useState, useEffect } from 'react';
import styles from './BackToTop.module.css';
import { ArrowUpIcon } from '@phosphor-icons/react';

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [isScrollingUp, setIsScrollingUp] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Show button after scrolling down 4 screen heights (as recommended) [[1]]
      const shouldShow = currentScrollY > window.innerHeight * .5;

      // Detect scroll direction
      const scrollingUp = currentScrollY < lastScrollY;

      setIsVisible(shouldShow);
      setIsScrollingUp(scrollingUp);
      setLastScrollY(currentScrollY);
    };

    // Throttle scroll events for better performance
    let timeoutId = null;
    const throttledHandleScroll = () => {
      if (timeoutId === null) {
        timeoutId = setTimeout(() => {
          handleScroll();
          timeoutId = null;
        }, 100);
      }
    };

    window.addEventListener('scroll', throttledHandleScroll);

    return () => {
      window.removeEventListener('scroll', throttledHandleScroll);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [lastScrollY]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // Handle keyboard navigation for accessibility
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      scrollToTop();
    }
  };

  if (!isVisible) return null;

  return (
    <button
      className={`${styles.backToTop} ${isScrollingUp ? styles.emphasized : ''}`}
      onClick={scrollToTop}
      onKeyDown={handleKeyDown}
      aria-label='Back to top'
      title='Back to Top'
      type='button'
    >
      <ArrowUpIcon size={32}/>
      <span className={styles.buttonText}>Back to Top</span>
    </button>
  );
}
