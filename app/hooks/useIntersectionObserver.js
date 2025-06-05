'use client';

import { useEffect, useRef, useState } from 'react';

const useIntersectionObserver = (options = {}) => {
  const [visibleElements, setVisibleElements] = useState({});
  const observerRef = useRef(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setVisibleElements(prev => ({
              ...prev,
              [entry.target.dataset.element]: true
            }));
          }
        });
      },
      { 
        threshold: 0.1, 
        rootMargin: '0px 0px -50px 0px',
        ...options 
      }
    );

    const elements = document.querySelectorAll('[data-element]');
    elements.forEach(el => observerRef.current.observe(el));

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return visibleElements;
};

export default useIntersectionObserver;