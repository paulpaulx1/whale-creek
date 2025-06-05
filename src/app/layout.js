import { Inter, Raleway } from "next/font/google";
import "./globals.css";
import Navigation from "./components/Navigation";
import KineticBackground from "./components/KineticBackground";

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-raleway",
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
      'Whale Creek Construction & Millwork | Indianapolis Premier Builders',
    template: '%s | Whale Creek Co',
  },
  description:
    "Indianapolis' trusted construction and millwork experts since 2019. Custom millwork, home construction, commercial projects, and renovation services in Indiana.",
  keywords: [
    'construction Indianapolis',
    'custom millwork',
    'home renovation',
    'commercial construction',
    'Indiana builders',
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
