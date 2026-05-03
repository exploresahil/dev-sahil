import type { Metadata, Viewport } from "next";
import "./globals.scss";
import { useFonts } from "@/utils/fonts.util";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Sahil Satpute | Fullstack Designer",
    description:
      "Sahil Satpute is a full-stack designer and creative developer specializing in React, Next.js, GSAP animations, and immersive web experiences. View portfolio, projects, and skills.",
    keywords: [
      "full-stack designer",
      "frontend developer",
      "React developer",
      "Next.js developer",
      "TypeScript developer",
      "GSAP animation",
      "Three.js developer",
      "Node.js developer",
      "portfolio website",
      "creative developer",
      "UI/UX designer",
      "web developer",
      "JavaScript",
      "SCSS",
      "CSS",
      "HTML",
      "Figma",
      "Blender",
      "Three.js",
      "Framer Motion",
      "Apollo GraphQL",
      "Adobe XD",
      "Adobe Illustrator",
      "Adobe Photoshop",
      "Adobe After Effects",
      "Adobe Premiere Pro",
      "Adobe Dimension",
      "Adobe Lightroom",
      "React",
      "GraphQL",
      "animation developer",
      "web animations",
      "immersive web experiences",
      "creative portfolio",
    ],

    appleWebApp: {
      statusBarStyle: "black",
      capable: true,
    },
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: "rgba(0, 0, 0, 1)",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const fontClasses = useFonts();
  return (
    <html lang="en">
      <body className={fontClasses}>{children}</body>
    </html>
  );
}
