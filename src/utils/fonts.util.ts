import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";

// --- Google Fonts ---
const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

// --- Local Fonts (Commented out examples) ---

const rische = localFont({
  src: "../../public/fonts/rische.woff",
  variable: "--font-rische",
  weight: "100",
});

export function useFonts() {
  const fonts = [geist.variable, geistMono.variable, rische.variable];

  return fonts.join(" ");
}
