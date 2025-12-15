import type { Metadata, Viewport } from "next";
import "@/app/(client)/scss/globals.scss";
import { useFonts } from "./fonts";
import Header from "@/components/default/header/Header";
import Footer from "@/components/default/footer/Footer";
import { ErrorBoundary } from "react-error-boundary";
import ReactLenis from "lenis/react";
import "lenis/dist/lenis.css";

export const metadata: Metadata = {
 title: "Sahil Satpute | Full Stack designer",
  description:
    "full-stack designer, personal portfolio, Sahil Satpute, projects, front-end developer, react developer, next js developer, ui-ux developer",

  appleWebApp: {
    statusBarStyle: "black",
    capable: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const fontClasses = useFonts();

  return (
    <html lang="en">
      <ReactLenis root>
        <body className={fontClasses}>
          <ErrorBoundary fallback={<div>Something went wrong</div>}>
            <Header />
            <main>{children}</main>
            <Footer />
          </ErrorBoundary>
        </body>
      </ReactLenis>
    </html>
  );
}
