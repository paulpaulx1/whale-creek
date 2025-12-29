"use client";

import Link from "next/link";
import { HardHatIcon, ShovelIcon } from "@phosphor-icons/react";
import styles from "./CTAButtons.module.css";

export default function CTAButtons({ isHomepage = false }) {
  return (
    <div className={styles.ctaButtons}>
      <a
        href="tel:317-431-2449"
        className={`${styles.btn} ${styles.btnPrimary} ${isHomepage ? styles.homepageBtn : ""}`}
      >
        <HardHatIcon size={32} className={styles.btnIcon} />
        <span className={styles.btnText}>Get Free Estimate</span>
      </a>
      <Link
        href="/project-gallery"
        className={`${styles.btn} ${styles.btnSecondary} ${isHomepage ? styles.homepageBtn : ""}`}
      >
        <ShovelIcon size={32} className={styles.btnIcon} />
        <span className={styles.btnText}>View Our Work</span>
      </Link>
    </div>
  );
}
