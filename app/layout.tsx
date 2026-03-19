import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "アルティメットおトク診断",
  description:
    "クレカ・投資・節税・通信費・マイル。15の質問で、おトクの取りこぼしを完全診断。",
  openGraph: {
    title: "アルティメットおトク診断",
    description:
      "あなたは年間いくら、損してますか？AIがおトク偏差値を判定します。",
    images: [{ url: "/og.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
  },
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="antialiased">{children}</body>
    </html>
  );
}
