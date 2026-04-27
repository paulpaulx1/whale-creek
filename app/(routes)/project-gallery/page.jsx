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

const PAGE_SIZE = 9;

const galleryQuery = `
{
  "total": count(*[
    _type == "project" &&
    defined(slug.current) &&
    category != "underground"
  ]),
  "items": *[
    _type == "project" &&
    defined(slug.current) &&
    category != "underground"
  ]
    | order(featured desc, completedDate desc)
    [$start...$end]{
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
}
`;

async function getProjectsPage(page = 1) {
  const p = Math.max(1, Number(page) || 1);
  const start = (p - 1) * PAGE_SIZE;
  const end = start + PAGE_SIZE;

  try {
    const data = await client.fetch(
      galleryQuery,
      { start, end },
      { next: { tags: ["sanity"] } },
    );

    const total = data?.total || 0;

    return {
      items: data?.items || [],
      total,
      page: p,
      pageSize: PAGE_SIZE,
      totalPages: Math.max(1, Math.ceil(total / PAGE_SIZE)),
    };
  } catch (error) {
    console.error("Error fetching gallery page:", error);

    return {
      items: [],
      total: 0,
      page: 1,
      pageSize: PAGE_SIZE,
      totalPages: 1,
    };
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
  const { items } = await getProjectsPage(1);
  const serviceAreas = await getServiceAreas(items);

  return generateGalleryMetadata(items, serviceAreas);
}

export default async function ProjectGallery({ searchParams }) {
  const resolvedSearchParams = await searchParams;

  const page = Number(resolvedSearchParams?.page || 1);
  const category = resolvedSearchParams?.category || "all";

  const data = await getProjectsPage(page);
  const serviceAreas = await getServiceAreas(data.items);

  const currentUrl = data.page > 1 ? `${PAGE_URL}?page=${data.page}` : PAGE_URL;

  return (
    <>
      <SchemaMarkup
        type="gallery"
        data={data.items}
        serviceAreas={serviceAreas}
        currentUrl={currentUrl}
      />

      <main className={styles.main}>
        <FilterClient
          projects={data.items}
          page={data.page}
          totalPages={data.totalPages}
          initialFilter={category}
        />
      </main>
    </>
  );
}
