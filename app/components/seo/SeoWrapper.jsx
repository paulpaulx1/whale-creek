// src/components/seo/SEOWrapper.jsx

import MetaTags from './MetaTags';
import StructuredData from './StructuredData';
import { pageConfigs } from '@/lib/seo/seoConfig';

export default function SEOWrapper({
  page = 'home',
  title,
  description,
  keywords = [],
  canonical,
  ogImage,
  ogType = 'website',
  noIndex = false,
  noFollow = false,
  customMeta = [],
  structuredDataType = 'default',
  pageData = {},
  customSchema = null,
  children
}) {
  
  // Get page-specific config if it exists
  const pageConfig = pageConfigs[page] || {};
  
  // Use provided values or fall back to page config or defaults
  const finalTitle = title || pageConfig.title;
  const finalDescription = description || pageConfig.description;
  const finalKeywords = keywords.length > 0 ? keywords : (pageConfig.keywords || []);
  const finalCanonical = canonical || pageConfig.canonical;

  return (
    <>
      <MetaTags
        title={finalTitle}
        description={finalDescription}
        keywords={finalKeywords}
        canonical={finalCanonical}
        ogImage={ogImage}
        ogType={ogType}
        noIndex={noIndex}
        noFollow={noFollow}
        customMeta={customMeta}
      />
      
      <StructuredData
        type={structuredDataType}
        pageData={pageData}
        customSchema={customSchema}
      />
      
      {children}
    </>
  );
}