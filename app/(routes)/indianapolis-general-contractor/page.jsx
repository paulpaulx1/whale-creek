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
        "Whale Creek Co designs and builds custom outdoor living spaces in Indianapolis, including decks, patios, pergolas, and covered outdoor rooms.",
      details:
        "We account for Indiana’s freeze-thaw cycles, drainage, and structural load standards to ensure every outdoor structure holds up for decades.",
      blueprint: "OUT_001",
      features: [
        "Custom deck building Indianapolis",
        "Pergolas and covered porches",
        "Outdoor kitchens and living spaces",
        "Weather-resistant construction",
      ],
    },
    {
      id: "residential-general-contractor-indianapolis",
      title: "Residential General Contractor Indianapolis",
      image: "/images/Westfield_Sunroom.jpeg",
      description:
        "Licensed and bonded residential general contractor specializing in additions, remodeling, and full custom construction.",
      details:
        "Our team delivers kitchen remodels, bathroom renovations, room additions, and full home transformations with precise execution.",
      blueprint: "RES_001",
      features: [
        "Licensed residential general contractor",
        "Home additions and remodeling",
        "Kitchen and bathroom renovations",
        "Complete home transformations",
      ],
    },
    {
      id: "commercial-general-contractors-indianapolis",
      title: "Commercial General Contractors Indianapolis",
      image: "/images/Patio_Indianapolis.jpg",
      description:
        "Professional commercial general contracting services in Indianapolis for offices, retail spaces, and build-outs.",
      details:
        "From tenant improvements to full commercial renovations, we deliver efficient, code-compliant construction with minimal downtime.",
      blueprint: "COM_001",
      features: [
        "Office and retail construction",
        "Tenant improvements and build-outs",
        "Industrial renovations",
        "Licensed and insured contractors",
      ],
    },
    {
      id: "custom-millwork-woodworking-indianapolis",
      title: "Custom Millwork & Woodworking Indianapolis",
      image: "/images/Pocket_Doors.jpeg",
      description:
        "In-house master woodworking for custom cabinetry, built-ins, and architectural millwork.",
      details:
        "From kitchens to executive offices, every piece is built for precision, durability, and visual harmony.",
      blueprint: "MIL_001",
      features: [
        "Custom cabinetry",
        "Architectural woodworking",
        "Built-in furniture",
        "Precision craftsmanship",
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

      {/* ✅ Client component handles animation only */}
      <ServicesClient services={mainServices} serviceAreas={serviceAreas} />
    </>
  );
}
