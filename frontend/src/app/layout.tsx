import type { Metadata } from "next";
import { Oxanium, Merriweather, Fira_Code } from "next/font/google";
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

// Merriweather({
//   weight: ["300", "400", "700", "900"]
// });

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
        </ThemeProvider>
      </body>
    </html>
  );
}
