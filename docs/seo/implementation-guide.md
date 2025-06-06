SEO Implementation Guide for Whale Creek Construction
📁 Project File Structure
Create this directory structure in your Next.js project:
src/
├── lib/
│   └── seo/
│       ├── seoConfig.js           # Main SEO configuration
│       └── README.md              # This implementation guide
├── components/
│   └── seo/
│       ├── SEOWrapper.jsx         # Main SEO component
│       ├── MetaTags.jsx           # Meta tags component
│       ├── StructuredData.jsx     # JSON-LD schemas
│       └── README.md              # Component usage guide
└── app/
    ├── robots.txt/
    │   └── route.js               # Dynamic robots.txt
    ├── sitemap.xml/
    │   └── route.js               # Dynamic sitemap.xml
    └── [...your pages]

docs/
└── seo/
    ├── implementation-guide.md    # This file
    ├── keywords-research.md       # Keyword strategy
    ├── local-seo-checklist.md     # Local SEO tasks
    └── analytics-setup.md         # Analytics & tracking
🔧 Implementation Steps
Step 1: Copy All SEO Files

Create the directories shown above
Copy each component from the artifacts into the appropriate files
Update the import paths to match your project structure

Step 2: Environment Setup
Create or update your .env.local:
bash# .env.local
NEXT_PUBLIC_SITE_URL=https://www.whalecreekconstruction.com
GOOGLE_SITE_VERIFICATION=your_google_verification_code
BING_SITE_VERIFICATION=your_bing_verification_code
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
Step 3: Update Configuration
Edit src/lib/seo/seoConfig.js:

✅ Phone number (currently +13174312449)
✅ Business address (currently 2659 Shelby Street)
✅ Email addresses
✅ Social media URLs
✅ Domain URL
✅ Service descriptions
✅ Keywords for your market

Step 4: Implement on Pages
Replace your page components:
javascript// Before
export default function HomePage() {
  return <HeroSection />;
}

// After
import SEOWrapper from '@/components/seo/SEOWrapper';

export default function HomePage() {
  return (
    <SEOWrapper page="home">
      <HeroSection />
    </SEOWrapper>
  );
}
Step 5: Test & Verify

Local Testing: Run npm run dev and check localhost:3000/robots.txt
Structured Data: Use Google's Rich Results Test
Meta Tags: Check with browser dev tools or OpenGraph.xyz
Search Console: Add your site to Google Search Console

📋 Quick Reference
Page Types & Usage
Page TypeSEOWrapper UsageSpecial FeaturesHomepage<SEOWrapper page="home">LocalBusiness schema, all servicesAbout<SEOWrapper page="about">Organization schema, team infoServices<SEOWrapper page="services">Service schemas, FAQ supportGallery<SEOWrapper page="gallery">Project/CreativeWork schemasContact<SEOWrapper page="contact">ContactPoint schemaBlog PostsCustom title/descriptionArticle schema, breadcrumbs
Custom Page Example
javascriptconst pageData = {
  breadcrumbs: [
    { name: 'Home', url: '/' },
    { name: 'Services', url: '/services' },
    { name: 'Custom Millwork', url: '/services/millwork' }
  ],
  service: {
    name: 'Custom Millwork',
    description: 'Expert millwork services...'
  },
  faqs: [
    {
      question: 'What is custom millwork?',
      answer: 'Custom millwork refers to...'
    }
  ]
};

<SEOWrapper
  title="Custom Millwork Services | Indianapolis"
  description="Professional millwork services..."
  keywords={['custom millwork', 'Indianapolis millwork']}
  pageData={pageData}
>
  <MillworkPage />
</SEOWrapper>
🎯 Keyword Strategy
Primary Keywords (High Priority)

Indianapolis construction
Custom millwork Indianapolis
Woodworking Indianapolis
Home renovation Indianapolis
Custom cabinetry Indianapolis

Service Keywords (Target on service pages)

Indianapolis general contractor
Residential construction Indianapolis
Commercial construction Indianapolis
Custom cabinet maker Indianapolis
Home remodeling contractor Indianapolis

Long-Tail Keywords (Blog content)

Indianapolis custom millwork contractor
Best residential construction Indianapolis
Commercial renovation Indianapolis Indiana
Custom kitchen cabinets Indianapolis
Home addition contractor Indianapolis

📊 Local SEO Checklist
Immediate Tasks

 Claim Google Business Profile
 Verify business address with Google
 Add high-quality business photos
 Get initial customer reviews
 Submit to local directories

Ongoing Tasks

 Regular blog posts with local keywords
 Customer review management
 Local citation building
 Community involvement content
 Service area expansion content

🚀 Advanced Features
Dynamic Blog Posts
javascript// For blog posts from CMS
const blogPageData = {
  article: {
    title: post.title,
    description: post.excerpt,
    publishedDate: post.publishedAt,
    modifiedDate: post.updatedAt,
    image: post.featuredImage,
    slug: `/blog/${post.slug}`
  }
};
Project Portfolio
javascript// For project galleries
const galleryPageData = {
  projects: projects.map(project => ({
    title: project.name,
    description: project.description,
    image: project.mainImage,
    completedDate: project.completedDate,
    location: project.location
  }))
};
🔍 Monitoring & Analytics
Tools to Set Up

Google Search Console - Track search performance
Google Analytics 4 - Website traffic analysis
Google Business Profile - Local search visibility
Bing Webmaster Tools - Bing search optimization

Key Metrics to Track

Organic search traffic
Local search visibility
Keyword rankings for target terms
Click-through rates from search
Conversion rates from organic traffic

🆘 Troubleshooting
Common Issues

Structured Data Errors: Use Google's testing tool to validate
Missing Meta Tags: Check SEOWrapper implementation
Robots.txt Not Found: Ensure route.js is in correct directory
Sitemap Errors: Verify URL patterns match your routing

Testing URLs

yoursite.com/robots.txt - Should show robot instructions
yoursite.com/sitemap.xml - Should show XML sitemap
Use browser dev tools to check meta tags in <head>

📞 Support
This implementation guide covers the complete SEO setup. For questions:

Check the component README files
Review the seoConfig.js comments
Test with Google's SEO tools
Monitor Search Console for issues

Remember: SEO is a marathon, not a sprint. Consistent, quality content and proper technical setup will drive long-term results! 🎯