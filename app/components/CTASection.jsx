"use client";

import CTAButtons from "./CTAButtons";
import SocialIcons from "./SocialIcons";
import styles from "./CTASection.module.css";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function CTASection() {
  const [isHomePage, setIsHomePage] = useState(false);
  const router = usePathname();

  useEffect(() => {
    const checkCurrentPage = () => {
      const path = router;
      setIsHomePage(path === "/" || path === "/home");
      console.log("ran check current page", checkCurrentPage);
    };

    checkCurrentPage();
    // Listen for navigation changes if needed
    window.addEventListener("popstate", checkCurrentPage);

    return () => window.removeEventListener("popstate", checkCurrentPage);
  }, [router]);

  // Don't render anything if we're on the home page
  if (isHomePage) {
    return null;
  }
  return (
    <section className={styles.cta}>
      <div className={styles.ctaContainer}>
        <div className={styles.ctaContent}>
          <h2>
            Ready to <span className={styles.ctaAccent}>Transform </span>
            <br /> Your Home or Business?
          </h2>
          <p>
            Contact Whale Creek Co today for a free consultation. We’ll help you
            plan and build a space that’s thoughtful, well-crafted, and built to
            last.
          </p>
          <div className={styles.ctaButtons}>
            <CTAButtons />
          </div>
        </div>
      </div>
    </section>
  );
}
