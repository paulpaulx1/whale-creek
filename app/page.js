// src/app/page.jsx

import styles from "./page.module.css";
import Hero from "./components/Hero";
import HeroCarousel from "./components/home/HeroCarousel";
import FeaturedProjects from "./components/FeaturedProjects";
import ServiceCardsSection from "./components/ServiceCardsSection";
import AboutContent from "./components/AboutContent";
import ClientInteractions from "./components/ClientInteractions";
import SchemaMarkup from "./components/seo/SchemaMarkup";
import Reviews from "./components/Reviews";
import { generatePageMetadata } from "./components/seo/generateMetadata";
import { client } from "./lib/sanity";
import { headers } from "next/headers";

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

    // Combine and deduplicate
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

async function getProjects() {
  try {
    const projects = await client.fetch(projectsQuery);
    return projects || [];
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
}

async function getHeroSlides() {
  try {
    const slides = await client.fetch(carouselQuery);
    return Array.isArray(slides) ? slides : [];
  } catch (error) {
    console.error("Error fetching carousel slides:", error);
    return [];
  }
}

async function getReviews() {
  try {
    const reviews = await client.fetch(reviewsQuery);
    return Array.isArray(reviews) ? reviews : [];
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return [];
  }
}

export async function generateMetadata() {
  const serviceAreas = await getServiceAreas();
  return generatePageMetadata({}, serviceAreas, "https://whalecreek.co");
}

export default async function Home() {
  const serviceAreas = await getServiceAreas();
  const projects = await getProjects();
  const slides = await getHeroSlides();
  const reviews = await getReviews();

  const headersList = await headers();
  const host = headersList.get("host") || "whalecreek.co";
  const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
  const currentUrl = `${protocol}://${host}`;

  return (
    <>
      <SchemaMarkup
        type="page"
        serviceAreas={serviceAreas}
        currentUrl={currentUrl}
      />
      <main className={styles.main} role="main">
        {/* NEW: Content-managed carousel */}
        <HeroCarousel slides={slides} />

        {/* OLD: Static hero - keeping for now to compare */}
        {/* <Hero /> */}
        <AboutContent  />
        <FeaturedProjects projects={projects} maxProjects={2} />
        <ServiceCardsSection />
        <Reviews reviews={reviews}/>
        <ClientInteractions />
      </main>
    </>
  );
}
