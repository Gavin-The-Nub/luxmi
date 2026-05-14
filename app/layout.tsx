import type { Metadata } from "next";
import "./globals.css";
import TransitionProvider from "./components/TransitionProvider";

export const metadata: Metadata = {
  title: "Lux-Mi Skin Wellness Aesthetics | Premium Skin & Beauty Treatments",
  description:
    "Experience luxury aesthetic treatments at Lux-Mi Skin Wellness Aesthetics. Facials, laser, HIFU, body contouring and more — all in an elevated, serene environment.",
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
