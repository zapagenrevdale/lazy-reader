import type { Metadata } from "next";

import { Toaster } from "@/components/ui/sonner"
import { Oxanium, Fira_Code } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css";

const oxaniumSans = Oxanium({
  variable: "--font-oxanium-sans",
  subsets: ["latin"],
});

const firaCodeMono = Fira_Code({
  variable: "--font-firacode-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LazyReader",
  description: "Summarize blogs and listen to them, because you dont read.",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${oxaniumSans.variable} ${firaCodeMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
