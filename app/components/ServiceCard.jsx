import ServiceIcon from './ServiceIcon'
import styles from './ServiceCard.module.css'

export default function ServiceCard({ iconType, blueprint, title, description }) {
  return (
    <div className={styles.serviceCard} data-blueprint={blueprint}>
      <div className={styles.serviceIcon}>
        <ServiceIcon type={iconType} size={32} />
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  )
}