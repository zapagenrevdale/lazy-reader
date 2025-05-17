import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Levels Learning",
  description: "Learn in anyting in 5 level of difficulties",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="antialiased"
      >
        {children}
      </body>
    </html>
  );
}
