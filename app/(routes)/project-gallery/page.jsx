import FilterClient from "./FilterClient";
import styles from "./Gallery.module.css";
import CTASection from "../../components/CTASection";
import SchemaMarkup from "../../components/seo/SchemaMarkup";
import { generateGalleryMetadata } from "../../components/seo/generateMetadata";
import { client } from "../../lib/sanity";
import { headers } from "next/headers";

const galleryQuery = `
  *[_type == "project"] | order(featured desc, completedDate desc) {
    _id,
    category,
    client,
    completedDate,
    description,
    featured,
    images[] {
      _key,
      alt,
      caption,
      asset {
        asset-> {
          _id,
          url,
          metadata {
            dimensions
          }
        }
      }
    },
    location,
    longDescription,
    materials[],
    projectValue,
    slug,
    tags[],
    testimonial,
    title,
  }
`;

async function getProjects() {
  try {
    const projects = await client.fetch(galleryQuery);
    return projects || [];
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
}

async function getServiceAreas(projects) {
  const projectLocations = [
    ...new Set(projects.map((p) => p.location).filter(Boolean)),
  ];
  const hardcodedAreas = [
    "Indianapolis, IN",
    "Meridian Hills, IN",
    "Noblesville, IN",
    "Carmel, IN",
    "Fishers, IN",
    "Zionsville, IN",
    "Westfield, IN",
  ];

  return [...new Set([...projectLocations, ...hardcodedAreas])];
}

export async function generateMetadata() {
  const projects = await getProjects();
  const serviceAreas = await getServiceAreas(projects);

  return generateGalleryMetadata(projects, serviceAreas);
}

export default async function ProjectGallery() {
  const projects = await getProjects();
  const serviceAreas = await getServiceAreas(projects);

  const headersList = await headers();
  const host = headersList.get("host") || "whalecreek.co";
  const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
  const currentUrl = `${protocol}://${host}/project-gallery`;

  return (
    <>
      <SchemaMarkup
        type="gallery"
        data={projects}
        serviceAreas={serviceAreas}
        currentUrl={currentUrl}
      />
      <main className={styles.main}>
        <FilterClient projects={projects} />
        <CTASection />
      </main>
    </>
  );
}
