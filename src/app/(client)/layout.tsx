import ReactLenis from "lenis/react";
import "./scss/globals.scss";
import type { Viewport } from "next";
import Footer from "@/components/default/footer/Footer.footer";
import Header from "@/components/default/header/Header.header";
import PageTransition from "@/context/pageTransition/PageTransition.context";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
};

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReactLenis root>
      <PageTransition>
        <Header />
        <main>{children}</main>
        <Footer />
      </PageTransition>
    </ReactLenis>
  );
}
