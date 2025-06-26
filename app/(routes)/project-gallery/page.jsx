// src/app/project-gallery/page.js

import GalleryClient from './GalleryClient';
import SchemaMarkup from '../../components/seo/SchemaMarkup';
import { generateGalleryMetadata } from '../../components/seo/generateMetadata';
import { client } from '../../lib/sanity';
import { headers } from 'next/headers';

// Your existing gallery query
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
    console.error('Error fetching projects:', error);
    return [];
  }
}

async function getServiceAreas(projects) {
  // Extract service areas from project locations + hardcoded areas
  const projectLocations = [...new Set(projects.map(p => p.location).filter(Boolean))];
  const hardcodedAreas = [
    'Indianapolis, IN',
    'Meridian Hills, IN', 
    'Noblesville, IN',
    'Carmel, IN',
    'Fishers, IN',
    'Zionsville, IN',
    'Westfield, IN'
  ];
  
  return [...new Set([...projectLocations, ...hardcodedAreas])];
}

// Server-side metadata generation
export async function generateMetadata() {
  const projects = await getProjects();
  const serviceAreas = await getServiceAreas(projects);
  
  return generateGalleryMetadata(projects, serviceAreas);
}

export default async function ProjectGallery() {
  const projects = await getProjects();
  const serviceAreas = await getServiceAreas(projects);
  
  // Get current URL dynamically
  const headersList = await headers();
  const host = headersList.get('host') || 'whalecreek.co';
  const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
  const currentUrl = `${protocol}://${host}/project-gallery`;

  return (
    <>
      <SchemaMarkup 
        type="gallery"
        data={projects}
        serviceAreas={serviceAreas}
        currentUrl={currentUrl}
      />
      <GalleryClient projects={projects} />
    </>
  );
}