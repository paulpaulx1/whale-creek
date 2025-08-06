// src/app/page.jsx

import styles from "./page.module.css";
import Hero from "./components/Hero";
import FeaturedProjects from "./components/FeaturedProjects";
import ServiceCardsSection from "./components/ServiceCardsSection";
import AboutContent from "./components/AboutContent";
import ClientInteractions from "./components/ClientInteractions";
import SchemaMarkup from './components/seo/SchemaMarkup';
import { generatePageMetadata } from './components/seo/generateMetadata';
import { client } from './lib/sanity';
import { headers } from 'next/headers';

const serviceAreasQuery = `*[_type == "project" && defined(location)].location`;

const projectsQuery = `
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
    title,
  }
`;

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
      'Westfield, IN'
    ];
    
    // Combine and deduplicate
    const allAreas = [...new Set([...dynamicAreas, ...hardcodedAreas])];
    return allAreas;
  } catch (error) {
    console.error('Error fetching service areas:', error);
    return [
      'Indianapolis, IN',
      'Meridian Hills, IN', 
      'Noblesville, IN',
      'Carmel, IN',
      'Fishers, IN'
    ];
  }
}

async function getProjects() {
  try {
    const projects = await client.fetch(projectsQuery);
    return projects || [];
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
}

export async function generateMetadata() {
  const serviceAreas = await getServiceAreas();
  return generatePageMetadata({}, serviceAreas, 'https://whalecreek.co');
}

export default async function Home() {
  const serviceAreas = await getServiceAreas();
  const projects = await getProjects();
  
  const headersList = await headers();
  const host = headersList.get('host') || 'whalecreek.co';
  const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
  const currentUrl = `${protocol}://${host}`;

  return (
    <>
      <SchemaMarkup 
        type="page"
        serviceAreas={serviceAreas}
        currentUrl={currentUrl}
      />
      <main className={styles.main} role='main'>
        <Hero/>
        <FeaturedProjects projects={projects} maxProjects={2} />
        <AboutContent />
        <ServiceCardsSection />
        <ClientInteractions />
      </main>
    </>
  );
}