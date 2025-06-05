'use client'

import { HardHatIcon, ShovelIcon } from '@phosphor-icons/react'
import styles from './CTAButtons.module.css'

export default function CTAButtons() {
  return (
    <div className={styles.ctaButtons}>
      <a href="#contact" className={`${styles.btn} ${styles.btnPrimary}`}>
        <HardHatIcon size={32} className={styles.btnIcon} />
        <span className={styles.btnText}>Get Free Estimate</span>
      </a>
      <a href="#gallery" className={`${styles.btn} ${styles.btnSecondary}`}>
        <ShovelIcon size={32} className={styles.btnIcon} />
        <span className={styles.btnText}>View Our Work</span>
      </a>
    </div>
  )
}