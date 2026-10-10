import type { Metadata } from "next";
import { Space_Grotesk, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import { CustomCursor } from "@/components/CustomCursor";
import { GlobalGrid } from "@/components/GlobalGrid";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Debangi | Senior Software Engineer & AI Developer",
  description: "Debangi Choudhury is a Senior Software Engineer specializing in full-stack development, AI-powered products, backend architecture, and scalable systems.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${spaceGrotesk.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans tracking-tight">
        <ThemeProvider attribute="data-theme" defaultTheme="light">
          <GlobalGrid />
          <CustomCursor />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
