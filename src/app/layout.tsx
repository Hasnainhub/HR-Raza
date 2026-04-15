import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import LoadingScreen from "@/components/LoadingScreen";
import SmoothScroll from "@/components/SmoothScroll";
import ScrollProgress from "@/components/ScrollProgress";
import CursorGlow from "@/components/CursorGlow";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hasnain Raza | CTO & Full Stack Developer",
  description: "Premium portfolio of Hasnain Raza, a CTO and Full Stack Developer specializing in React, Next.js, and modern web architectures.",
  openGraph: {
    title: "Hasnain Raza | CTO & Full Stack Developer",
    description: "Premium portfolio of Hasnain Raza, a CTO and Full Stack Developer specializing in React, Next.js, and modern web architectures.",
    type: "website",
    locale: "en_US",
    url: "https://hasnain-raza.vercel.app",
    siteName: "Hasnain Raza Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Hasnain Raza | CTO & Full Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hasnain Raza | CTO & Full Stack Developer",
    description: "Premium portfolio of Hasnain Raza, a CTO and Full Stack Developer specializing in React, Next.js, and modern web architectures.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SmoothScroll>
          <LoadingScreen />
          <CursorGlow />
          <ScrollProgress />
          <Navbar />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
