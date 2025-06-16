// components/Filter.jsx
import styles from './Filter.module.css';

export default function Filter({
  categories,
  activeFilter,
  onFilterChange,
  className = '',
}) {
  return (
    <section className={`${styles.filterSection} ${className}`}>
      <div className={styles.container}>
        <div className={styles.filterGrid}>
          {categories.map((category) => (
            <button
              key={category.id}
              className={`${styles.filterBtn} ${
                activeFilter === category.id ? styles.active : ''
              }`}
              onClick={() => onFilterChange(category.id)}
            >
              <span>{category.label}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
