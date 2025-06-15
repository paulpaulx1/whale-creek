// components/SEO/SchemaMarkup.jsx - Server Component for Schema Injection

import { 
    generateBaseSchema, 
    generateBlogSchema, 
    generateProjectGallerySchema 
  } from '../../lib/seo';
  
  export default function SchemaMarkup({ 
    type = 'page', 
    data = null, 
    serviceAreas = [], 
    currentUrl = '',
    customSchemas = []
  }) {
    // Always include base LocalBusiness schema
    const baseSchema = generateBaseSchema(serviceAreas);
    const schemas = [baseSchema];
  
    // Add content-specific schemas based on page type
    if (type === 'blog' && data) {
      const blogSchema = generateBlogSchema(data, currentUrl);
      schemas.push(blogSchema);
    }
  
    if (type === 'gallery' && Array.isArray(data)) {
      const gallerySchema = generateProjectGallerySchema(data, currentUrl);
      schemas.push(gallerySchema);
    }
  
    // Add any custom schemas (for service pages, etc.)
    if (customSchemas.length > 0) {
      schemas.push(...customSchemas);
    }
  
    return (
      <>
        {schemas.map((schema, index) => (
          <script
            key={index}
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(schema, null, 2)
            }}
          />
        ))}
      </>
    );
  }