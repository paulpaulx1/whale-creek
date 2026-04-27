// src/app/page.jsx

import styles from "./page.module.css";
import HeroCarousel from "./components/home/HeroCarousel";
import FeaturedProjects from "./components/FeaturedProjects";
import ServiceCardsSection from "./components/ServiceCardsSection";
import AboutContent from "./components/AboutContent";
import ClientInteractions from "./components/ClientInteractions";
import SchemaMarkup from "./components/seo/SchemaMarkup";
import Reviews from "./components/Reviews";
import { generatePageMetadata } from "./components/seo/generateMetadata";
import { client } from "./lib/sanity";

const SITE_URL = "https://www.whalecreek.co";

const serviceAreasQuery = `*[_type == "project" && defined(location)].location`;

const projectsQuery = `
  *[_type == "project"] | order(defined(order) desc, order asc, featured desc, completedDate desc) {
    _id,
    category,
    client,
    completedDate,
    description,
    order,
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
    title,
    slug
  }
`;

const carouselQuery = `
  *[_type == "carouselItem" && active == true] | order(order asc) {
    _id,
    title,
    description,
    services,
    mediaType,
    mediaSource,
    "imageUrl": select(
      mediaSource == "file" => image.asset->url + "?w=1920&fit=crop&auto=format",
      mediaSource == "url" => imageUrl
    ),
    "videoUrl": select(
      mediaSource == "file" => video.asset->url,
      mediaSource == "url" => videoUrl
    ),
    "posterImageUrl": select(
      mediaSource == "file" && defined(posterImage.asset) => posterImage.asset->url + "?w=1920&fit=crop&auto=format",
      mediaSource == "url" && defined(posterImageUrl) => posterImageUrl,
      null
    ),
    "featuredProject": featuredProject->{
      title,
      location,
      "slug": slug.current
    }
  }
`;

const reviewsQuery = `
  *[_type == "review" && featured == true] | order(order asc) {
    _id,
    author,
    rating,
    timeAgo,
    text
  }
`;

async function getServiceAreas() {
  try {
    const locations = await client.fetch(
      serviceAreasQuery,
      {},
      { next: { tags: ["sanity"] } },
    );

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

async function getProjects() {
  try {
    const projects = await client.fetch(
      projectsQuery,
      {},
      { next: { tags: ["sanity"] } },
    );

    return projects || [];
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
}

async function getHeroSlides() {
  try {
    const slides = await client.fetch(
      carouselQuery,
      {},
      { next: { tags: ["sanity"] } },
    );

    return Array.isArray(slides) ? slides : [];
  } catch (error) {
    console.error("Error fetching carousel slides:", error);
    return [];
  }
}

async function getReviews() {
  try {
    const reviews = await client.fetch(
      reviewsQuery,
      {},
      { next: { tags: ["sanity"] } },
    );

    return Array.isArray(reviews) ? reviews : [];
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return [];
  }
}

export async function generateMetadata() {
  const serviceAreas = await getServiceAreas();

  return generatePageMetadata({}, serviceAreas, SITE_URL);
}

export default async function Home() {
  const [serviceAreas, projects, slides, reviews] = await Promise.all([
    getServiceAreas(),
    getProjects(),
    getHeroSlides(),
    getReviews(),
  ]);

  return (
    <>
      <SchemaMarkup
        type="page"
        serviceAreas={serviceAreas}
        currentUrl={SITE_URL}
      />

      <main className={styles.main} role="main">
        <HeroCarousel slides={slides} />
        <AboutContent />
        <FeaturedProjects projects={projects} maxProjects={2} />
        <ServiceCardsSection />
        <Reviews reviews={reviews} />
        <ClientInteractions />
      </main>
    </>
  );
}
