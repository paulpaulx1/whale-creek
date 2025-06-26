import { Raleway, Space_Grotesk } from 'next/font/google';
import './globals.css';
import Navigation from './components/Navigation';
import KineticBackground from './components/KineticBackground';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import CTASection from './components/CTASection';

const raleway = Raleway({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-raleway',
});
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-space',
  display: 'swap',
});

export const metadata = {
  title: {
    template: '%s | Whale Creek Construction'
  },
  authors: [{ name: 'Whale Creek Construction' }],
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang='en' className={`${raleway.variable} ${spaceGrotesk.variable}`}>
      <body>
        <Navigation />
        <KineticBackground />
        {children}
        <CTASection/>
        <Footer />
        <BackToTop/>
      </body>
    </html>
  );
}
