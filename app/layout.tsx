import type { Metadata } from "next";
import "./globals.css";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://votre-app.vercel.app";

export const metadata: Metadata = {
  title: "Bitcoin Supply Tracker",
  description: "Suivi en temps réel du nombre de Bitcoin en circulation",
  metadataBase: new URL(BASE_URL),
  openGraph: {
    title: "Bitcoin Supply Tracker",
    description: "Suivi en temps réel du nombre de Bitcoin en circulation",
    images: [`${BASE_URL}/og-image.png`],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bitcoin Supply Tracker",
    description: "Suivi en temps réel du nombre de Bitcoin en circulation",
    images: [`${BASE_URL}/og-image.png`],
  },
  other: {
    "fc:frame": "vNext",
    "fc:frame:image": `${BASE_URL}/og-image.png`,
    "fc:frame:image:aspect_ratio": "1:1",
    "fc:frame:button:1": "🔄 Actualiser",
    "fc:frame:button:1:action": "post",
    "fc:frame:post_url": `${BASE_URL}/api/frame`,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
