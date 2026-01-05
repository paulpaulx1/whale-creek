import styles from "./ServiceCardsSection.module.css";
import ServiceCard from "./ServiceCard";

const ServiceCardsSection = () => {
  const services = [
    {
      iconType: "house",
      blueprint: "RES_001",
      title: "Residential General Contracting",
      description:
        "Licensed, bonded, and insured Indianapolis general contractors specializing in renovations, home additions, and custom residential remodels.",
      linkUrl:
        "/indianapolis-general-contractor#residential-general-contractor-indianapolis",
      linkText: "Learn More About Residential Services",
    },
    {
      iconType: "buildings",
      blueprint: "COM_001",
      title: "Commercial General Contracting",
      description:
        "Full-service commercial construction for Indianapolis businesses, with deep experience in everything from office build-outs and retail spaces to custom millwork and tenant improvements.",
      linkUrl:
        "/indianapolis-general-contractor#commercial-general-contractors-indianapolis",
      linkText: "Explore Commercial Services",
    },
    {
      iconType: "hammer",
      blueprint: "MIL_001",
      title: "Custom Millwork & Woodworking",
      description:
        "Architectural millwork, custom cabinetry, built-ins, and precision woodworking created by master craftsmen in our Garfield Park workshop.",
      linkUrl:
        "/indianapolis-general-contractor#custom-millwork-woodworking-indianapolis",
      linkText: "View Millwork Services",
    },
    {
      iconType: "ruler",
      blueprint: "OUT_001",
      title: "Outdoor Living & Deck Building",
      description:
        "Custom decks, pergolas, patios, and sunrooms designed to expand how you live, with quality built to last in Indiana’s climate.",
      linkUrl:
        "/indianapolis-general-contractor#outdoor-living-deck-building-indianapolis",
      linkText: "See Outdoor Living Options",
    },
    {
      iconType: "toolbox",
      blueprint: "CAB_001",
      title: "Custom Cabinetry",
      description:
        "Bespoke storage solutions designed and built to fit your unique space, style, and functional needs.",
      linkUrl: null,
      linkText: null,
    },
    {
      iconType: "wrench",
      blueprint: "DES_001",
      title: "Design Services",
      description:
        "Collaborative design guidance from concept to completion, helping you solve layout challenges and make informed decisions about materials, finishes, and functionality.",
      linkUrl: null,
      linkText: null,
    },
  ];

  return (
    <section className={styles.servicesSection} data-element="services">
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
