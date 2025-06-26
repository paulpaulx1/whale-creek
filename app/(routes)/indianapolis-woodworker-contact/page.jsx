// app/contact/page.jsx (Server Component)
import ContactClient from './ContactClient';
import SchemaMarkup from '../../components/seo/SchemaMarkup';
import { generatePageMetadata } from '../../components/seo/generateMetadata';
import { pageConfigs } from '../../lib/seo/seoConfig'; // Adjust path as needed
import { headers } from 'next/headers';

// Generate metadata using your existing system
export async function generateMetadata() {
  const contactConfig = pageConfigs.contact;

  return generatePageMetadata(
    contactConfig,
    [], // No service areas needed for contact page
    'https://whalecreek.co/contact'
  );
}

export default async function ContactPage() {
  // Get current URL for schema markup
  const headersList = await headers();
  const host = headersList.get('host') || 'whalecreek.co';
  const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
  const currentUrl = `${protocol}://${host}/contact`;

  return (
    <>
      <SchemaMarkup
        type='page'
        currentUrl={currentUrl}
        customSchemas={[
          {
            '@context': 'https://schema.org',
            '@type': 'ContactPage',
            name: 'Contact Whale Creek Construction',
            url: currentUrl,
            mainEntity: {
              '@type': 'LocalBusiness',
              name: 'Whale Creek Construction',
              telephone: '(317) 431-2449',
              email: 'dave@whalecreek.co',
            },
          },
        ]}
      />
      <ContactClient />
    </>
  );
}
