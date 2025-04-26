import localFont from "next/font/local";
import { Roboto, Geist_Mono, Geist } from "next/font/google";

const helveticaBold = localFont({
  src: "../app/(client)/fonts/HelveticaNowDisplay-Bold.woff",
  variable: "--font-helvetica-bold",
});

const helveticaLight = localFont({
  src: "../app/(client)//fonts/HelveticaNowDisplay-Light.woff",
  variable: "--font-helvetica-light",
});
const helveticaMedium = localFont({
  src: "../app/(client)/fonts/HelveticaNowDisplay-Medium.woff",
  variable: "--font-helvetica-medium",
});
const helveticaRegular = localFont({
  src: "../app/(client)/fonts/HelveticaNowDisplay-Regular.woff",
  variable: "--font-helvetica-regular",
});
const rische = localFont({
  src: "../app/(client)/fonts/rische.woff",
  variable: "--font-rische",
  weight: "100",
});

const roboto = Roboto({
  weight: ["400", "500", "700"], // all weights
  subsets: ["latin"],
  variable: "--font-roboto",
});

const geistMono = Geist_Mono({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

const geist = Geist({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-geist",
});

export function useFonts() {
  const fonts = [
    helveticaBold.variable,
    helveticaLight.variable,
    helveticaMedium.variable,
    helveticaRegular.variable,
    geistMono.variable,
    geist.variable,
    rische.variable,
    roboto.variable
  ];

  return fonts.join(" ");
}