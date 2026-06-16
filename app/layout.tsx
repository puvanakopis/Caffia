import type { Metadata, Viewport } from "next";
import { Providers } from "./providers";
import "./lglobals.css";

export const metadata: Metadata = {
  title: "Caffia — Steeped in Flavor, Lovingly Served Daily",
  description: "A luxury boutique café crafting small-batch coffee, seasonal plates, and considered pastries. Visit our atelier or order online.",
  authors: [{ name: "Lovable" }],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap"
        />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
