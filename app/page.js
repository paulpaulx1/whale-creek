// src/app/page.jsx

import styles from "./page.module.css";
import Hero from "./components/Hero";
import ServiceCardsSection from "./components/ServiceCardsSection";
import AboutContent from "./components/AboutContent";
import ClientInteractions from "./components/ClientInteractions";
import SchemaMarkup from './components/seo/SchemaMarkup';
import { generatePageMetadata } from './components/seo/generateMetadata';
import { client } from './lib/sanity';  // Fixed path!
import { headers } from 'next/headers';

const serviceAreasQuery = `*[_type == "project" && defined(location)].location`;

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

export async function generateMetadata() {
  const serviceAreas = await getServiceAreas();
  return generatePageMetadata({}, serviceAreas, 'https://whalecreek.co');
}

export default async function Home() {
  const serviceAreas = await getServiceAreas();
  
  const headersList = headers();
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
        <ServiceCardsSection />
        <AboutContent />
        <ClientInteractions />
      </main>
    </>
  );
}