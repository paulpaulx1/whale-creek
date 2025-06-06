'use client';

import { useEffect } from 'react';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

const ClientInteractions = () => {
  // Use your existing hook with better options for this use case
  const visibleElements = useIntersectionObserver({
    threshold: 0.12, 
    rootMargin: '0px 0px -150px 0px' // Don't trigger until 150px into viewport
  });

  useEffect(() => {
    // Debug: Log when elements become visible
    console.log('Visible elements:', visibleElements);
    
    // Apply visibility classes based on intersection observer
    Object.entries(visibleElements).forEach(([element, isVisible]) => {
      const el = document.querySelector(`[data-element="${element}"]`);
      console.log(`Element ${element}:`, el, 'isVisible:', isVisible);
      
      if (el && isVisible) {
        el.classList.add('visible');
        console.log(`Added 'visible' class to ${element}`);
      }
    });
  }, [visibleElements]);

  useEffect(() => {
    // Debug: Check if elements exist on mount
    console.log('Checking elements on mount:');
    ['services', 'content', 'image', 'stats'].forEach(elementName => {
      const el = document.querySelector(`[data-element="${elementName}"]`);
      console.log(`${elementName}:`, el);
    });

    // Enhanced circle interactions
    const circleGroups = document.querySelectorAll('[data-circles]');
    
    circleGroups.forEach(group => {
      const handleMouseEnter = function() {
        const circles = this.querySelectorAll('[class*="circle"]');
        circles.forEach((circle, index) => {
          setTimeout(() => {
            circle.style.transform = 'scale(1.3) translateY(-8px) rotate(' + (index * 72) + 'deg)';
          }, index * 100);
        });
      };
      
      const handleMouseLeave = function() {
        const circles = this.querySelectorAll('[class*="circle"]');
        circles.forEach(circle => {
          circle.style.transform = 'scale(1) translateY(0) rotate(0deg)';
        });
      };

      group.addEventListener('mouseenter', handleMouseEnter);
      group.addEventListener('mouseleave', handleMouseLeave);

      // Store handlers for cleanup
      group._handleMouseEnter = handleMouseEnter;
      group._handleMouseLeave = handleMouseLeave;
    });

    // Cleanup function
    return () => {
      circleGroups.forEach(group => {
        if (group._handleMouseEnter) {
          group.removeEventListener('mouseenter', group._handleMouseEnter);
        }
        if (group._handleMouseLeave) {
          group.removeEventListener('mouseleave', group._handleMouseLeave);
        }
      });
    };
  }, []);

  return null; // This component doesn't render anything
};

export default ClientInteractions;