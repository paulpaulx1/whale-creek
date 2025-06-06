// src/components/seo/MetaTags.jsx

import Head from 'next/head';
import { siteConfig } from '@/lib/seo/seoConfig';

export default function MetaTags({
  title,
  description,
  keywords = [],
  canonical,
  ogImage,
  ogType = 'website',
  noIndex = false,
  noFollow = false,
  customMeta = []
}) {
  
  // Build full title
  const fullTitle = title 
    ? `${title} | ${siteConfig.name}`
    : siteConfig.name;
  
  // Use provided description or default
  const metaDescription = description || siteConfig.description;
  
  // Combine keywords with defaults
  const allKeywords = [...new Set([...keywords, ...siteConfig.keywords])];
  
  // Build canonical URL
  const canonicalUrl = canonical 
    ? `${siteConfig.url}${canonical}`
    : siteConfig.url;
  
  // Use provided image or default
  const imageUrl = ogImage 
    ? (ogImage.startsWith('http') ? ogImage : `${siteConfig.url}${ogImage}`)
    : `${siteConfig.url}${siteConfig.ogImage}`;
  
  // Build robots content
  const robotsContent = [
    noIndex ? 'noindex' : 'index',
    noFollow ? 'nofollow' : 'follow'
  ].join(', ');

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="keywords" content={allKeywords.join(', ')} />
      <meta name="robots" content={robotsContent} />
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Viewport and Character Set */}
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
      
      {/* Site Verification */}
      {siteConfig.defaultMetadata.googleSiteVerification && (
        <meta 
          name="google-site-verification" 
          content={siteConfig.defaultMetadata.googleSiteVerification} 
        />
      )}
      {siteConfig.defaultMetadata.bingVerification && (
        <meta 
          name="msvalidate.01" 
          content={siteConfig.defaultMetadata.bingVerification} 
        />
      )}
      
      {/* Open Graph Tags */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:alt" content={`${title || siteConfig.name} - ${metaDescription}`} />
      <meta property="og:site_name" content={siteConfig.name} />
      <meta property="og:locale" content={siteConfig.defaultMetadata.ogLocale} />
      
      {/* Twitter Card Tags */}
      <meta name="twitter:card" content={siteConfig.defaultMetadata.twitterCard} />
      <meta name="twitter:site" content={siteConfig.defaultMetadata.twitterSite} />
      <meta name="twitter:creator" content={siteConfig.defaultMetadata.twitterCreator} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={imageUrl} />
      <meta name="twitter:image:alt" content={`${title || siteConfig.name} - ${metaDescription}`} />
      
      {/* Business-Specific Meta Tags */}
      <meta name="geo.region" content="US-IN" />
      <meta name="geo.placename" content="Indianapolis" />
      <meta name="geo.position" content={`${siteConfig.business.geo.latitude};${siteConfig.business.geo.longitude}`} />
      <meta name="ICBM" content={`${siteConfig.business.geo.latitude}, ${siteConfig.business.geo.longitude}`} />
      
      {/* Contact Information */}
      <meta name="contact" content={siteConfig.business.phone} />
      <meta name="author" content={siteConfig.business.name} />
      <meta name="designer" content={siteConfig.business.name} />
      <meta name="owner" content={siteConfig.business.name} />
      
      {/* Theme and App Icons */}
      <meta name="theme-color" content="#263238" />
      <meta name="msapplication-navbutton-color" content="#263238" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      
      {/* Favicons */}
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/site.webmanifest" />
      
      {/* DNS Prefetch for Performance */}
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//www.google-analytics.com" />
      <link rel="dns-prefetch" href="//www.googletagmanager.com" />
      
      {/* Preconnect for Critical Resources */}
      <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      
      {/* Custom Meta Tags */}
      {customMeta.map((meta, index) => (
        <meta key={index} {...meta} />
      ))}
    </Head>
  );
}