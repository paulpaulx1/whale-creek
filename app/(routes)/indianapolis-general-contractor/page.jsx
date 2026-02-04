import styles from "./Services.module.css";
import SchemaMarkup from "../../components/seo/SchemaMarkup";
import { generatePageMetadata } from "../../components/seo/generateMetadata";
import { pageConfigs } from "../../lib/seo/seoConfig";
import { headers } from "next/headers";
import { client } from "../../lib/sanity";
import ServicesClient from "./ServicesClient";

const serviceAreasQuery = `*[_type == "project" && defined(location)].location`;

async function getServiceAreas() {
  try {
    const locations = await client.fetch(serviceAreasQuery);
    const dynamicAreas = [...new Set(locations.filter(Boolean))];

    const hardcodedAreas = [
      "Indianapolis, IN",
      "Meridian Hills, IN",
      "Noblesville, IN",
      "Carmel, IN",
      "Fishers, IN",
      "Zionsville, IN",
      "Westfield, IN",
    ];

    return [...new Set([...dynamicAreas, ...hardcodedAreas])];
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

export async function generateMetadata() {
  const servicesConfig = pageConfigs.services;

  return generatePageMetadata(
    servicesConfig,
    [],
    "https://whalecreek.co/indianapolis-general-contractor",
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
      title: "Outdoor Living Spaces",
      image: "/images/Pergola.jpg",
      description:
        "We design and build decks, pergolas, patios, sunrooms, and outdoor structures to extend your living space. From quiet backyard retreats to entertainment-ready decks, our outdoor projects are thoughtfully designed, structurally sound, and built for Indiana's climate.",
      details:
        "We account for Indiana's freeze-thaw cycles, drainage, and structural load standards to ensure every outdoor structure holds up for decades.",
      blueprint: "OUT_001",
      features: [],
      additionalInfo: "",
    },
    {
      id: "residential-general-contractor-indianapolis",
      title: "Residential Renovation Services",
      image: "/images/AvonInside.jpg",
      description:
        "As experienced general contractors in Indianapolis, we guide homeowners through renovation projects of all kinds. Our renovation work commonly includes:",
      blueprint: "RES_001",
      features: [
        "Kitchen renovations that improve flow, storage, and usability",
        "Custom cabinetry focused on design, efficiency, and longevity",
        "Whole-home renovations and structural reconfigurations",
      ],
      additionalInfo:
        "As an Indianapolis residential general contractor, we oversee planning, permits, scheduling, and trade coordination, so your project stays organized, predictable, and aligned with your goals.",
    },
    {
      id: "commercial-general-contractors-indianapolis",
      title: "Commercial Projects",
      image: "/images/covramirror.webp",
      description:
        "Whale Creek Co partners with businesses seeking a dependable manufacturing and fabrication shop. Whether you need custom furniture, retail buildouts, or specialty wood products, we're here for you from early prototyping to full-scale production.",
      details:
        "Our experience serving both B2B and B2C clients means we understand:",
      blueprint: "COM_001",
      features: [
        "Production timelines and coordination",
        "Repeatability and quality control",
        "Packaging, staging, and delivery readiness",
      ],
      additionalInfo:
        "From specialty product lines to repeatable cabinetry systems, we deliver production work with precision, care, and all the standards we apply to one-off builds.",
    },
    {
      id: "custom-millwork-woodworking-indianapolis",
      title: "Custom Woodworking & Millwork",
      image: "/images/PortholeMirror2.jpg",
      description:
        "We produce custom woodwork and millwork for commercial and residential applications, ranging from standalone pieces to integrated architectural elements. Our state-of-the-art CNC milling technology allows us to execute complex cuts, intricate patterns, and tight precision across both short runs and larger production volumes.",
      details: "Common projects include:",
      blueprint: "MIL_001",
      features: [
        "Custom furniture",
        "Built-ins, shelving, and cabinetry",
        "Bar fronts, reception desks, and retail elements",
        "Architectural millwork and specialty components",
      ],
      additionalInfo: "",
    },
  ];

  return (
    <>
      <SchemaMarkup
        type="page"
        serviceAreas={serviceAreas}
        currentUrl={currentUrl}
      />

      {/* ✅ Client component handles animation only */}
      <ServicesClient services={mainServices} serviceAreas={serviceAreas} />
    </>
  );
}
