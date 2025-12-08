import styles from "./Services.module.css";
import Image from "next/image";
import SchemaMarkup from "../../components/seo/SchemaMarkup";
import { generatePageMetadata } from "../../components/seo/generateMetadata";
import { pageConfigs } from "../../lib/seo/seoConfig";
import { headers } from "next/headers";
import { client } from "../../lib/sanity";

const serviceAreasQuery = `*[_type == "project" && defined(location)].location`;

async function getServiceAreas() {
  try {
    const locations = await client.fetch(serviceAreasQuery);
    const dynamicAreas = [...new Set(locations.filter(Boolean))];

    // Hardcoded areas for immediate SEO benefit
    const hardcodedAreas = [
      "Indianapolis, IN",
      "Meridian Hills, IN",
      "Noblesville, IN",
      "Carmel, IN",
      "Fishers, IN",
      "Zionsville, IN",
      "Westfield, IN",
    ];

    const allAreas = [...new Set([...dynamicAreas, ...hardcodedAreas])];
    return allAreas;
  } catch (error) {
    console.error("Error fetching service areas:", error);
    return [
      "Indianapolis, IN",
      "Meridian Hills, IN",
      "Noblesville, IN",
      "Carmel, IN",
      "Fishers, IN",
    ];
  }
}

// Generate metadata using your existing services config
export async function generateMetadata() {
  const servicesConfig = pageConfigs.services;

  return generatePageMetadata(
    servicesConfig,
    [],
    "https://whalecreek.co/indianapolis-general-contractor"
  );
}

export default async function Services() {
  const serviceAreas = await getServiceAreas();
  const headersList = await headers();
  const host = headersList.get("host") || "whalecreek.co";
  const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
  const currentUrl = `${protocol}://${host}/indianapolis-general-contractor`;

  const mainServices = [
    {
      id: "outdoor-living-deck-building-indianapolis",
      title: "Outdoor Living & Deck Building Indianapolis",
      image: "/images/Noblesville-Deck.JPG",
      description:
        "Whale Creek Co designs and builds custom outdoor living spaces in Indianapolis, including decks, patios, pergolas, and covered outdoor rooms that extend how you use your home year-round.",
      details:
        "As experienced deck builders and outdoor living contractors in Indianapolis, we account for Indiana’s freeze-thaw cycles, drainage requirements, and structural load standards to ensure your outdoor investment holds up for decades. From custom decks to outdoor kitchens and covered porches, every structure is engineered for durability and visual impact.",
      blueprint: "OUT_001",
      features: [
        "Custom deck building Indianapolis",
        "Pergolas and covered porches",
        "Outdoor kitchens and living spaces",
        "Patio design and construction",
        "Weather-resistant construction",
      ],
    },
    {
      id: "residential-general-contractor-indianapolis",
      title: "Residential General Contractor Indianapolis",
      image: "/images/Westfield_Sunroom.jpeg",
      description:
        "Whale Creek Co is a licensed and bonded residential general contractor in Indianapolis specializing in home additions, remodeling, and full custom residential construction throughout Central Indiana.",
      details:
        "With over 20 years of residential construction experience, our team handles kitchen remodels, bathroom renovations, room additions, and complete home transformations. We serve homeowners throughout Indianapolis, Carmel, Fishers, Noblesville, and surrounding communities with transparent pricing, precise scheduling, and long-term craftsmanship.",
      blueprint: "RES_001",
      features: [
        "Licensed residential general contractor Indianapolis",
        "Home additions and remodeling",
        "Kitchen and bathroom renovations",
        "Complete home transformations",
        "Serving Indianapolis metro area",
      ],
    },
    {
      id: "commercial-general-contractors-indianapolis",
      title: "Commercial General Contractors Indianapolis",
      image: "/images/Patio_Indianapolis.jpg",
      description:
        "Whale Creek Co provides professional commercial general contracting services in Indianapolis for offices, retail spaces, and light industrial construction throughout Central Indiana.",
      details:
        "From tenant improvements and office build-outs to full commercial renovations, our Indianapolis commercial contractors work with business owners, developers, and property managers to deliver efficient, code-compliant build-outs with minimal downtime.",
      blueprint: "COM_001",
      features: [
        "Commercial general contractors Indianapolis",
        "Office and retail construction",
        "Tenant improvements and build-outs",
        "Industrial and commercial renovations",
        "Licensed and insured commercial contractors",
      ],
    },
    {
      id: "custom-millwork-woodworking-indianapolis",
      title: "Custom Millwork & Woodworking Indianapolis",
      image: "/images/Pocket_Doors.jpeg",
      description:
        "Whale Creek Co blends expert general contracting with in-house master woodworking to create custom millwork, cabinetry, built-ins, and architectural wood features.",
      details:
        "Our craftsmen specialize in custom cabinetry, built-in furniture, trim work, and architectural millwork for both residential and commercial clients. From custom kitchen cabinets to executive office built-ins, every detail is built for precision, durability, and visual harmony.",
      blueprint: "MIL_001",
      features: [
        "Custom millwork and cabinetry",
        "Architectural woodworking",
        "Built-in furniture and storage",
        "Precision craftsmanship",
        "Residential and commercial millwork",
      ],
    },
  ];

  return (
    <>
      <SchemaMarkup
        type="page"
        serviceAreas={serviceAreas}
        currentUrl={currentUrl}
      />
      <main className={styles.main}>
        {/* Hero Section */}
        <section className={styles.heroSection}>
          <div className={styles.heroContainer}>
            <h1>
              Indianapolis General Contractors for Residential & Commercial
              Construction
            </h1>
            <p className={styles.heroSubtitle}>
              Whale Creek Co is a licensed, bonded, and insured Indianapolis
              general contractor specializing in residential remodeling,
              commercial construction, custom millwork, and outdoor living
              spaces throughout Central Indiana. With over 20 years of hands-on
              experience, we deliver craftsmanship-driven construction with
              clear communication, reliable timelines, and long-term durability.
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
                className={`${styles.serviceSection} ${index % 2 === 1 ? styles.serviceReverse : ""}`}
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
                          <i className="ph ph-check-circle"></i>
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
                        objectFit: "cover",
                        width: "100%",
                        height: "100%",
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
              As licensed general contractors in Indianapolis Indiana, we bring
              decades of construction expertise to every project throughout the
              greater Indianapolis metropolitan area.
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
