import { Inter, Space_Grotesk, Bebas_Neue } from "next/font/google";
import "./globals.css";
import Navigation from "./components/Navigation";
import KineticBackground from "./components/KineticBackground";
import Footer from "./components/Footer";
import BackToTop from "./components/BackToTop";
import CTASection from "./components/CTASection";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-space",
  display: "swap",
});

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: "400", // Bebas Neue only has one weight
  variable: "--font-bebas",
  display: "swap",
});

export const metadata = {
  title: {
    template: "%s | Whale Creek Construction",
  },
  authors: [{ name: "Whale Creek Construction" }],
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${bebasNeue.variable}`}
    >
      <body>
        <Navigation />
        {/* <KineticBackground /> */}
        {children}
        {/* <CTASection/> */}
        <Footer />
        <BackToTop />
      </body>
    </html>
  );
}
