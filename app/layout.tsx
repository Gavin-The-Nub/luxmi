import type { Metadata } from "next";
import "./globals.css";
import TransitionProvider from "./components/TransitionProvider";

export const metadata: Metadata = {
  title: "Lux-Mi Skin Wellness Aesthetics | Premium Skin & Beauty Treatments",
  description:
    "Experience luxury aesthetic treatments at Lux-Mi Skin Wellness Aesthetics. Facials, laser, HIFU, body contouring and more — all in an elevated, serene environment.",
  keywords: [
    "Lux-Mi Aesthetics",
    "Luxmi Skin Wellness",
    "Best Skin Clinic Lipa City",
    "Aesthetics Clinic Batangas",
    "Premium Facial Lipa",
    "CO2 Fractional Laser Batangas",
    "Lipo Cavitation Lipa",
    "HIFU Treatment Lipa City",
    "Pico Diode Laser",
    "Diamond Peel Batangas",
    "Luxury Spa Lipa",
    "Acne Treatment Lipa",
    "Skin Tightening Lipa"
  ],
  authors: [{ name: "Lux-Mi Skin Wellness Aesthetics" }],
  metadataBase: new URL("https://luxmi-aesthetics.com"), // Update to your live domain when deployed!
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Lux-Mi Skin Wellness Aesthetics | Premium Skin & Beauty Treatments",
    description:
      "Experience luxury aesthetic treatments at Lux-Mi Skin Wellness Aesthetics. Facials, laser, HIFU, body contouring and more — all in an elevated, serene environment.",
    url: "https://luxmi-aesthetics.com",
    siteName: "Lux-Mi Skin Wellness Aesthetics",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Lux-Mi Skin Wellness Aesthetics - Premium Treatments",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lux-Mi Skin Wellness Aesthetics | Premium Skin & Beauty Treatments",
    description:
      "Experience luxury aesthetic treatments at Lux-Mi Skin Wellness Aesthetics. Facials, laser, HIFU, body contouring and more — all in an elevated, serene environment.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: [
      { url: "/icon.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Jost:wght@200;300;400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <TransitionProvider>
          {children}
        </TransitionProvider>
      </body>
    </html>
  );
}
