import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BackgroundCanvas } from "@/components/layout/BackgroundCanvas";

export const metadata: Metadata = {
  title: "Data Science Job-Ready Academy | Practice, Assess, and Build Portfolio Evidence",
  description:
    "A 6-month project-driven practical training and assessment platform for learners with Data Science fundamentals. Hands-on challenges, real-world datasets, exams, and instructor feedback.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-slate-50/70 text-slate-900 selection:bg-teal-500 selection:text-white relative">
        <BackgroundCanvas />
        <Navbar />
        <main className="flex-1 relative z-10">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
