'use client'

import { useEffect, useState } from 'react'
import styles from './KineticBackground.module.css'

export default function KineticBackground() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className={styles.kineticBg}>
      {/* Floating Construction Elements */}
      <div 
        className={`${styles.floatingElement} ${styles.hammer}`}
        style={{
          transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`
        }}
      />
      <div 
        className={`${styles.floatingElement} ${styles.wrench}`}
        style={{
          transform: `translate(${mousePosition.x * -0.015}px, ${mousePosition.y * 0.025}px)`
        }}
      />
      <div 
        className={`${styles.floatingElement} ${styles.gear}`}
        style={{
          transform: `translate(${mousePosition.x * 0.03}px, ${mousePosition.y * -0.02}px) rotate(${mousePosition.x * 0.5}deg)`
        }}
      />
      <div 
        className={`${styles.floatingElement} ${styles.triangle}`}
        style={{
          transform: `translate(${mousePosition.x * -0.02}px, ${mousePosition.y * -0.015}px)`
        }}
      />
      <div 
        className={`${styles.floatingElement} ${styles.circle}`}
        style={{
          transform: `translate(${mousePosition.x * 0.025}px, ${mousePosition.y * 0.03}px)`
        }}
      />
    </div>
  )
}