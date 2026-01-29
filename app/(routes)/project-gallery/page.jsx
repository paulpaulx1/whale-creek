// app/project-gallery/page.jsx
import FilterClient from "./FilterClient";
import styles from "./Gallery.module.css";
import CTASection from "../../components/CTASection";
import SchemaMarkup from "../../components/seo/SchemaMarkup";
import { generateGalleryMetadata } from "../../components/seo/generateMetadata";
import { client } from "../../lib/sanity";
import { headers } from "next/headers";

export const revalidate = 300;

const PAGE_SIZE = 9;

const galleryQuery = `
{
  "total": count(*[_type == "project" && defined(slug.current)]),
  "items": *[_type == "project" && defined(slug.current)]
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

      // ✅ KEEP EXISTING SHAPE YOUR CLIENT EXPECTS:
      images[0...1]{
        _key,
        alt,
        caption,
        asset{
          asset->{
            _id,
            url,

            // ✅ Higher-fidelity grid + capped lightbox URLs
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
    const data = await client.fetch(galleryQuery, { start, end });
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
    return { items: [], total: 0, page: 1, pageSize: PAGE_SIZE, totalPages: 1 };
  }
}

async function getServiceAreas(projects) {
  const projectLocations = [
    ...new Set((projects || []).map((p) => p.location).filter(Boolean)),
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
  // lightweight: first page only
  const { items } = await getProjectsPage(1);
  const serviceAreas = await getServiceAreas(items);
  return generateGalleryMetadata(items, serviceAreas);
}

export default async function ProjectGallery({ searchParams }) {
  const page = Number(searchParams?.page || 1);
  const data = await getProjectsPage(page);

  const serviceAreas = await getServiceAreas(data.items);

  const headersList = await headers();
  const host = headersList.get("host") || "whalecreek.co";
  const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
  const currentUrl = `${protocol}://${host}/project-gallery?page=${data.page}`;

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
        />
        <CTASection />
      </main>
    </>
  );
}
