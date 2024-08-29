import Footer from "./Components/Footer";
import { Navbar } from "./Components/Navbar/Navbar";
import "./globals.scss";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: {
    default: "Let's Grow",
    template: "% | Let's Grow",
  },
  description: "event by Let's Grow",
  icons: {
    icon: "/images/logo.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        {children}
        {/* <Footer /> */}
      </body>
    </html>
  );
}
