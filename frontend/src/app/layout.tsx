import type { Metadata } from "next";
import { Oxanium, Merriweather, Fira_Code } from "next/font/google";
import "./globals.css";

const oxaniumSans = Oxanium({
  variable: "--font-oxanium-sans",
  subsets: ["latin"],
});

const firaCodeMono = Fira_Code({
  variable: "--font-firacode-mono",
  subsets: ["latin"],
});

const merriweatherSerif = Merriweather({
  weight: ["300", "400", "700", "900"]
});

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
        className={`${oxaniumSans.variable} ${firaCodeMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
