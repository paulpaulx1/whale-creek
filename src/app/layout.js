import { Inter, Raleway } from "next/font/google";
import "./globals.css";
import Navigation from "./components/Navigation";
import KineticBackground from "./components/KineticBackground";

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-raleway",
});
export const metadata = {
  title: "Whale Creek Co",
  description: "Whale Creek Construction and Millwork - Serving Indiananapolis & Indiana since 2019",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={raleway.variable}>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Navigation></Navigation>
        <KineticBackground></KineticBackground>
        {children}
      </body>
    </html>
  );
}
