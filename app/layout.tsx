import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trendora",
  description: "Trendora",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
