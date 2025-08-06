import styles from "./ServiceCardsSection.module.css";
import ServiceCard from './ServiceCard';

const ServiceCardsSection = () => {
  const services = [
    {
      iconType: 'house',
      blueprint: 'RES_001',
      title: 'Residential General Contracting',
      description: 'Licensed Indianapolis general contractors specializing in home additions, remodeling, and custom residential construction throughout central Indiana.',
      linkUrl: '/indianapolis-general-contractor#residential-general-contractor-indianapolis',
      linkText: 'Learn More About Residential Services'
    },
    {
      iconType: 'buildings',
      blueprint: 'COM_001',
      title: 'Commercial General Contracting',
      description: 'Professional commercial construction services for Indianapolis businesses including office build-outs, retail spaces, and tenant improvements.',
      linkUrl: '/indianapolis-general-contractor#commercial-general-contractors-indianapolis',
      linkText: 'Explore Commercial Services'
    },
    {
      iconType: 'hammer',
      blueprint: 'MIL_001',
      title: 'Custom Millwork & Woodworking',
      description: 'Master craftsmen creating custom cabinetry, built-ins, architectural millwork, and precision woodworking for Indianapolis homes and businesses.',
      linkUrl: '/indianapolis-general-contractor#custom-millwork-woodworking-indianapolis',
      linkText: 'View Millwork Services'
    },
    {
      iconType: 'ruler',
      blueprint: 'OUT_001',
      title: 'Outdoor Living & Deck Building',
      description: 'Custom deck building, pergolas, patios, and outdoor living spaces designed for Indianapolis area homes with weather-resistant construction.',
      linkUrl: '/indianapolis-general-contractor#outdoor-living-deck-building-indianapolis',
      linkText: 'See Outdoor Living Options'
    },
    {
      iconType: 'toolbox',
      blueprint: 'CAB_001',
      title: 'Custom Cabinetry',
      description: 'Bespoke storage solutions designed and built to maximize space while complementing your unique style and functional needs.',
      linkUrl: null,
      linkText: null
    },
    {
      iconType: 'wrench',
      blueprint: 'DES_001',
      title: 'Design Services',
      description: 'Professional design guidance to help you visualize and plan your project from initial concept to final execution.',
      linkUrl: null,
      linkText: null
    },
  ];

  return (
    <section 
      className={styles.servicesSection}
      data-element="services"
    >
      <div className={styles.container}>
        <div className={styles.servicesHeader}>
          <h2 className={styles.servicesTitle}>Services</h2>
        </div>
        
        <div className={styles.servicesGrid}>
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              iconType={service.iconType}
              blueprint={service.blueprint}
              title={service.title}
              description={service.description}
              linkUrl={service.linkUrl}
              linkText={service.linkText}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceCardsSection;