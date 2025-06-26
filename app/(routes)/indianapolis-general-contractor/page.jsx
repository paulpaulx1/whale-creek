import styles from './Services.module.css';
import SchemaMarkup from '../../components/seo/SchemaMarkup';
import { generatePageMetadata } from '../../components/seo/generateMetadata';
import { pageConfigs } from '../../lib/seo/seoConfig'; // Adjust path to your StructuredData.jsx
import { headers } from 'next/headers';
import { client } from '../../lib/sanity';

const serviceAreasQuery = `*[_type == "project" && defined(location)].location`;

async function getServiceAreas() {
  try {
    const locations = await client.fetch(serviceAreasQuery);
    const dynamicAreas = [...new Set(locations.filter(Boolean))];

    // Hardcoded areas for immediate SEO benefit
    const hardcodedAreas = [
      'Indianapolis, IN',
      'Meridian Hills, IN',
      'Noblesville, IN',
      'Carmel, IN',
      'Fishers, IN',
      'Zionsville, IN',
      'Westfield, IN',
    ];

    // Combine and deduplicate
    const allAreas = [...new Set([...dynamicAreas, ...hardcodedAreas])];
    return allAreas;
  } catch (error) {
    console.error('Error fetching service areas:', error);
    return [
      'Indianapolis, IN',
      'Meridian Hills, IN',
      'Noblesville, IN',
      'Carmel, IN',
      'Fishers, IN',
    ];
  }
}

// Generate metadata using your existing services config
export async function generateMetadata() {
  const servicesConfig = pageConfigs.services;

  return generatePageMetadata(
    servicesConfig,
    [], // Add service areas if needed
    'https://whalecreek.co/services'
  );
}

export default async function Services() {
  // Get current URL for schema markup
  const serviceAreas = await getServiceAreas();
  const headersList = headers();
  const host = headersList.get('host') || 'whalecreek.co';
  const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
  const currentUrl = `${protocol}://${host}/indianapolis-general-contractor`;

  const mainServices = [
    {
      id: 'construction',
      title: 'Construction Services',
      image: '/images/construction-services.jpg',
      description:
        'Whale Creek Co operates as a one-stop design and construction hub, offering end-to-end solutions. Our skilled team, equipped with diverse tools and expertise, seamlessly integrates design, woodworking, and general contracting services.',
      details:
        'From envisioning to execution, we specialize in delivering high-quality, creative solutions for a wide range of projects. We are licensed, bonded, and insured General Contractors in the city of Indianapolis.',
      blueprint: 'CONST_001',
      features: [
        'Licensed, bonded, and insured',
        'End-to-end design and construction',
        'Skilled team with diverse expertise',
        'High-quality creative solutions',
      ],
    },
    {
      id: 'outdoor',
      title: 'Outdoor Living',
      image: '/images/outdoor-living.jpg',
      description:
        'Whale Creek Co is the premier destination for outdoor living in Indianapolis. With over 20 years of experience in the woodworking, construction, and design fields, we are a valuable resource for Indianapolis homeowners.',
      details:
        'Our skilled team specializes in designing and crafting custom decks, pergolas, patios, and room additions that elevate your outdoor experience and add significant value to your home.',
      blueprint: 'OUT_001',
      features: [
        'Custom decks and pergolas',
        'Patio design and construction',
        'Room additions',
        'Over 20 years of experience',
      ],
    },
    {
      id: 'design',
      title: 'Design Centered, Customer Focused Building Services',
      image: '/images/design-services.jpg',
      description:
        'Whale Creek Co caters to a diverse clientele, ranging from individual homeowners seeking personalized designs to interior designers seeking expert craftsmanship.',
      details:
        "We serve the needs of large and small commercial businesses in the Indianapolis metro area, providing comprehensive solutions tailored to each client's unique requirements. Whether you are looking for custom built-ins, furniture, cabinets, millwork, or remodeling, Whale Creek Co can tailor a custom built solution for your project.",
      blueprint: 'DES_001',
      features: [
        'Residential and commercial clients',
        'Custom built-ins and furniture',
        'Cabinet and millwork solutions',
        'Personalized design approach',
      ],
    },
  ];

  return (
    <>
      <SchemaMarkup
        type='page'
        serviceAreas={serviceAreas}
        currentUrl={currentUrl}
      />
      <main className={styles.main}>
        {/* Main Services Section */}
        <section className={styles.services}>
          <div className={styles.servicesContainer}>
            {mainServices.map((service, index) => (
              <div
                key={service.id}
                className={`${styles.serviceSection} ${index % 2 === 1 ? styles.serviceReverse : ''}`}
              >
                <div className={styles.serviceContent}>
                  <div className={styles.serviceText}>
                    <div
                      className={styles.serviceBlueprintLabel}
                      data-blueprint={service.blueprint}
                    >
                      {service.blueprint}
                    </div>
                    <h3>{service.title}</h3>
                    <p className={styles.serviceDescription}>
                      {service.description}
                    </p>
                    <p className={styles.serviceDetails}>{service.details}</p>
                    <ul className={styles.serviceFeatures}>
                      {service.features.map((feature, idx) => (
                        <li key={idx}>
                          <i className='ph ph-check-circle'></i>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className={styles.serviceImage}>
                    <div className={styles.imagePlaceholder}>
                      <i
                        className='ph ph-image'
                        style={{ fontSize: '4rem', opacity: 0.3 }}
                      ></i>
                      <p>{service.title}</p>
                    </div>
                    {/* Replace with actual images when available */}
                    {/* <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    style={{ objectFit: 'contain' }}
                  /> */}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
