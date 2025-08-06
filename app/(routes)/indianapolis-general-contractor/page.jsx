import styles from './Services.module.css';
import Image from 'next/image';
import SchemaMarkup from '../../components/seo/SchemaMarkup';
import { generatePageMetadata } from '../../components/seo/generateMetadata';
import { pageConfigs } from '../../lib/seo/seoConfig'; 
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
    [], 
    'https://whalecreek.co/indianapolis-general-contractor'
  );
}

export default async function Services() {
  const serviceAreas = await getServiceAreas();
  const headersList = headers();
  const host = headersList.get('host') || 'whalecreek.co';
  const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
  const currentUrl = `${protocol}://${host}/indianapolis-general-contractor`;

  const mainServices = [
    {
      id: 'outdoor-living-deck-building-indianapolis',
      title: 'Outdoor Living & Deck Building Indianapolis',
      image: '/images/Noblesville-Deck.JPG',
      description:
        'Our general contractor Indianapolis team specializes in outdoor living spaces including custom decks, pergolas, patios, and outdoor room additions that extend your living space throughout the Indianapolis area.',
      details:
        'As experienced deck building and outdoor living general contractors in Indianapolis Indiana, we design and construct custom decks, covered porches, pergolas, outdoor kitchens, and patio spaces. Our Indianapolis general contractors understand local building codes and weather considerations to create durable, beautiful outdoor spaces.',
      blueprint: 'OUT_001',
      features: [
        'Custom deck building Indianapolis',
        'Pergolas and covered porches',
        'Outdoor kitchens and living spaces',
        'Patio design and construction',
        'Weather-resistant construction',
      ],
    },
    {
      id: 'residential-general-contractor-indianapolis',
      title: 'Residential General Contractor Indianapolis',
      image: '/images/Westfield_Sunroom.jpeg',
      description:
        'As licensed and bonded residential general contractors in Indianapolis Indiana, Whale Creek Co specializes in home additions, remodeling, and custom residential construction projects throughout central Indiana.',
      details:
        'Our Indianapolis general contractors team brings over 20 years of experience to residential projects including kitchen remodels, bathroom renovations, room additions, and complete home transformations. We serve homeowners in Indianapolis, Carmel, Fishers, Noblesville, and surrounding areas with comprehensive residential general contractor services.',
      blueprint: 'RES_001',
      features: [
        'Licensed residential general contractor Indianapolis',
        'Home additions and remodeling',
        'Kitchen and bathroom renovations',
        'Complete home transformations',
        'Serving Indianapolis metro area',
      ],
    },
    {
      id: 'commercial-general-contractors-indianapolis',
      title: 'Commercial General Contractors Indianapolis',
      image: '/images/Patio_Indianapolis.jpg',
      description:
        'Whale Creek Co provides comprehensive commercial general contractors Indianapolis services for businesses throughout central Indiana. Our commercial construction expertise spans retail spaces, offices, and industrial projects.',
      details:
        'As experienced commercial general contractors Indianapolis businesses trust, we handle tenant improvements, office build-outs, retail construction, and commercial renovations. Our general contractor Indianapolis team works with property managers, business owners, and developers across the Indianapolis metropolitan area.',
      blueprint: 'COM_001',
      features: [
        'Commercial general contractors Indianapolis',
        'Office and retail construction',
        'Tenant improvements and build-outs',
        'Industrial and commercial renovations',
        'Licensed and insured commercial contractors',
      ],
    },
    {
      id: 'custom-millwork-woodworking-indianapolis',
      title: 'Custom Millwork & Woodworking Indianapolis',
      image: '/images/Pocket_Doors.jpeg', 
      description:
        'Combining our general contractor Indianapolis expertise with master woodworking, Whale Creek Co creates custom millwork, built-ins, cabinetry, and architectural woodwork for residential and commercial clients.',
      details:
        'Our Indianapolis general contractors team includes skilled craftsmen who specialize in custom cabinetry, built-in furniture, trim work, and architectural millwork. From custom kitchen cabinets to office built-ins, we deliver precision woodworking that complements our general contracting services throughout Indianapolis and central Indiana.',
      blueprint: 'MIL_001',
      features: [
        'Custom millwork and cabinetry',
        'Architectural woodworking',
        'Built-in furniture and storage',
        'Precision craftsmanship',
        'Residential and commercial millwork',
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
        {/* Hero Section */}
        <section className={styles.heroSection}>
          <div className={styles.heroContainer}>
            <h1>General Contractors in Indianapolis Indiana</h1>
            <p className={styles.heroSubtitle}>
              Licensed, bonded, and insured Indianapolis general contractors specializing in residential and commercial construction, custom millwork, and outdoor living spaces throughout central Indiana.
            </p>
          </div>
        </section>

        {/* Main Services Section */}
        <section className={styles.services}>
          <div className={styles.servicesContainer}>
            {mainServices.map((service, index) => (
              <div
                key={service.id}
                id={service.id}
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
                    <h2>{service.title}</h2>
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
                    <Image
                      src={service.image}
                      alt={service.title}
                      width={600}
                      height={400}
                      className={styles.serviceImg}
                      style={{
                        objectFit: 'cover',
                        width: '100%',
                        height: '100%'
                      }}
                      priority={index < 2} // Priority load first 2 images
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Service Areas Section */}
        <section className={styles.serviceAreasSection}>
          <div className={styles.serviceAreasContainer}>
            <div className={styles.serviceAreasList}>
              {serviceAreas.map((area, index) => (
                <span key={index} className={styles.serviceArea}>
                  {area}
                </span>
              ))}
            </div>
            <p>
              As licensed general contractors in Indianapolis Indiana, we bring decades of construction expertise to every project throughout the greater Indianapolis metropolitan area.
            </p>
          </div>
        </section>
      </main>
    </>
  );
}