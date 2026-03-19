import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://otoku-shindan.vercel.app"),
  title: "アルティメットおトク診断",
  description:
    "クレカ・投資・節税・通信費・マイル。20の質問で、おトクの取りこぼしを完全診断。",
  openGraph: {
    title: "アルティメットおトク診断",
    description:
      "あなたは年間いくら、損してますか？AIがおトク偏差値を判定します。",
    images: [
      {
        url: "https://og-api-self.vercel.app/api/og?title=%E3%82%A2%E3%83%AB%E3%83%86%E3%82%A3%E3%83%A1%E3%83%83%E3%83%88%E3%81%8A%E3%83%88%E3%82%AF%E8%A8%BA%E6%96%AD&category=AI%20Tools",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
  },
  icons: {
    icon: "/favicon.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#f5c842" />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
