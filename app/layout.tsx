import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/components/providers/QueryProvider";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "OX Steak Lounge - Premium Steaks & Fine Dining | OX 牛扒廊 - 優質牛排及精緻餐飲",
  description: "Experience the finest selection of premium steaks in an atmosphere of refined elegance. Located in Tai Po, Hong Kong. | 在優雅的氛圍中體驗最優質的牛排。位於香港大埔。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased`}>
        <LanguageProvider>
          <QueryProvider>
            <Navbar />
            <main className="min-h-screen">
              {children}
            </main>
            <Footer />
          </QueryProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
