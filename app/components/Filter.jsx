// components/Filter.jsx
"use client";

import styles from "./Filter.module.css";
import {
  SquaresFour,
  Hammer,
  House,
  Buildings,
  Toolbox,
  Wrench,
  Lightbulb,
  Star,
  Eye,
  Newspaper,
} from "@phosphor-icons/react";

export default function Filter({
  categories,
  activeFilter,
  onFilterChange,
  className = "",
}) {
  const iconMap = {
    all: SquaresFour,
    millwork: Hammer,
    residential: House,
    commercial: Buildings,
    cabinetry: Toolbox,
    renovation: Wrench,
    tips: Lightbulb,
    tools: Wrench,
    spotlights: Star,
    "behind-scenes": Eye,
  };

  return (
    <section className={`${styles.filterSection} ${className}`}>
      <div className={styles.container}>
        <div className={styles.filterGrid}>
          {categories.map((category) => {
            const Icon = iconMap[category.id];

            return (
              <button
                key={category.id}
                className={`${styles.filterBtn} ${
                  activeFilter === category.id ? styles.active : ""
                }`}
                onClick={() => onFilterChange(category.id)}
              >
                {Icon && (
                  <Icon size={26} weight="bold" className={styles.filterIcon} />
                )}
                <span>{category.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
