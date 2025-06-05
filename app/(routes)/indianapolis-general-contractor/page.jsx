import ServiceCard from '../../components/ServiceCard'
import styles from './Services.module.css';

export default function Services() {
  const services = [
    {
      iconType: 'hammer',
      blueprint: 'MILL_001',
      title: 'Custom Millwork',
      description:
        'Precision-crafted trim, moldings, and architectural details that transform spaces with timeless elegance and superior quality.',
    },
    {
      iconType: 'house',
      blueprint: 'RES_001',
      title: 'Home Construction',
      description:
        'Complete home construction and renovation services, bringing your vision to life with meticulous attention to detail.',
    },
    {
      iconType: 'buildings',
      blueprint: 'COM_001',
      title: 'Commercial Projects',
      description:
        'Professional-grade construction solutions for businesses, combining functionality with aesthetic appeal.',
    },
    {
      iconType: 'toolbox',
      blueprint: 'CAB_001',
      title: 'Custom Cabinetry',
      description:
        'Bespoke storage solutions designed and built to maximize space while complementing your unique style.',
    },
    {
      iconType: 'wrench',
      blueprint: 'REN_001',
      title: 'Renovation & Remodeling',
      description:
        'Transform existing spaces with expert renovation services that blend modern functionality with classic craftsmanship.',
    },
    {
      iconType: 'ruler',
      blueprint: 'DES_001',
      title: 'Design Services',
      description:
        'Professional design guidance to help you visualize and plan your project from initial concept to final execution.',
    },
  ];

  return (
    <section className={styles.services} id='services'>
      <div className={styles.servicesContainer}>
        <div className={styles.sectionHeader}>
          <h2>Our Expertise</h2>
          <p>
            From concept to completion, we deliver exceptional craftsmanship
            across all aspects of construction, design, and custom woodworking.
          </p>
        </div>
        <div className={styles.servicesGrid}>
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              iconType={service.iconType}
              blueprint={service.blueprint}
              title={service.title}
              description={service.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
