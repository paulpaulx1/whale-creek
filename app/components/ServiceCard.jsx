// ServiceCard.js
import Link from 'next/link';
import ServiceIcon from './ServiceIcon';
import styles from './ServiceCard.module.css';

const ServiceCard = ({ iconType, blueprint, title, description, linkUrl, linkText }) => {
  return (
    <div className={styles.serviceCard} data-blueprint={blueprint}>
      <div className={styles.serviceIcon}>
        <ServiceIcon type={iconType} size={32} />
      </div>
      
      <h3>{title}</h3>
      <p>{description}</p>
      
      {linkUrl && linkText && (
        <div className={styles.cardLink}>
          <Link href={linkUrl} className={styles.readMoreLink}>
            {linkText}
            <i className="ph ph-arrow-right"></i>
          </Link>
        </div>
      )}
    </div>
  );
};

export default ServiceCard;