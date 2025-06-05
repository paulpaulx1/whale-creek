import { Inter, Raleway } from 'next/font/google';
import './globals.css';
import Navigation from './components/Navigation';
import KineticBackground from './components/KineticBackground';

const raleway = Raleway({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-raleway',
});
const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});
export const metadata = {
  title: {
    default:
      '  Whale Creek Construction & Millwork | Custom Homes, Renovations & Commercial Projects in Indianapolis',
    template: '%s | Whale Creek Co',
  },
  description:
    'Whale Creek Co provides expert construction, custom millwork, home renovations, and commercial building services in Indianapolis and Central Indiana. Trusted since 2019 for quality craftsmanship and exceptional service.',
  keywords: [
    'construction Indianapolis',
    'custom millwork',
    'custom cabinetry',
    'home renovation',
    'commercial construction',
    'Indiana builders',
    'kitchen remodeling',
    'bathroom renovation',
    'commercial millwork',
    'Indianapolis construction company',
    'general contractor Indianapolis',
  ],
  authors: [{ name: 'Pax Media' }],
  openGraph: {
    title: 'Whale Creek Construction & Millwork',
    description: "Indianapolis' Premier Construction & Millwork Company",
    url: 'https://whale-creek.vercel.app',
    siteName: 'Whale Creek Co',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang='en' className={`${raleway.variable} ${inter.variable}`}>
      <body>
        <Navigation></Navigation>
        <KineticBackground></KineticBackground>
        {children}
      </body>
    </html>
  );
}
