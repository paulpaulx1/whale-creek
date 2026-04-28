// app/project-gallery/page.jsx

import FilterClient from "./FilterClient";
import styles from "./Gallery.module.css";
import SchemaMarkup from "../../components/seo/SchemaMarkup";
import { generateGalleryMetadata } from "../../components/seo/generateMetadata";
import { client } from "../../lib/sanity";

export const revalidate = 300;

const SITE_URL = "https://www.whalecreek.co";
const PAGE_PATH = "/project-gallery";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;

const galleryQuery = `
  *[
    _type == "project" &&
    defined(slug.current) &&
    category != "underground" &&
    !(_id in path("drafts.**"))
  ]
  | order(
      defined(order) desc,
      order asc,
      featured desc,
      completedDate desc
    ) {
    _id,
    category,
    client,
    completedDate,
    description,
    featured,
    location,
    longDescription,
    materials[],
    projectValue,
    "slug": slug.current,
    tags[],
    testimonial,
    title,
    images[0...1]{
      _key,
      alt,
      caption,
      asset{
        asset->{
          _id,
          url,
          "urlGrid": url + "?w=1200&fit=max&auto=format&q=82",
          "urlLightbox": url + "?w=2200&fit=max&auto=format&q=82",
          metadata{
            dimensions
          }
        }
      }
    }
  }
`;

async function getProjects() {
  try {
    const projects = await client.fetch(
      galleryQuery,
      {},
      { next: { tags: ["sanity"] } },
    );

    return Array.isArray(projects) ? projects : [];
  } catch (error) {
    console.error("Error fetching gallery projects:", error);
    return [];
  }
}

async function getServiceAreas(projects) {
  const projectLocations = [
    ...new Set(
      (projects || []).map((project) => project.location).filter(Boolean),
    ),
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

export default async function ProjectGallery({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const category = resolvedSearchParams?.category || "all";

  const projects = await getProjects();
  const serviceAreas = await getServiceAreas(projects);

  return (
    <>
      <SchemaMarkup
        type="gallery"
        data={projects}
        serviceAreas={serviceAreas}
        currentUrl={PAGE_URL}
      />

      <main className={styles.main}>
        <header className={styles.galleryHero}>
          <div className={styles.container}>
            <p className={styles.kicker}>Project Gallery</p>
            <h1 className={styles.pageTitle}>
              Indianapolis Home Renovation, Construction and Millwork 
            </h1>
            <p className={styles.pageIntro}>
              Explore completed decks, outdoor living spaces, renovations,
              cabinetry, custom furniture, and millwork projects by Whale Creek
              Construction.
            </p>
          </div>
        </header>
        <FilterClient projects={projects} initialFilter={category} />
      </main>
    </>
  );
}
