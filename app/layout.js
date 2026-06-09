import localFont from "next/font/local";
import "./globals.css";

const satoshi = localFont({
  src: [
    {
      path: "../public/fonts/satoshi/Satoshi-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/satoshi/Satoshi-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/satoshi/Satoshi-Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/satoshi/Satoshi-Black.otf",
      weight: "900",
      style: "normal",
    },
    {
      path: "../public/fonts/satoshi/Satoshi-Variable.ttf",
      style: "normal",
    },
  ],
  variable: "--font-satoshi",
});

const manrope = localFont({
  src: [
    {
      path: "../public/fonts/Manrope/static/Manrope-ExtraLight.ttf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../public/fonts/Manrope/static/Manrope-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/Manrope/static/Manrope-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Manrope/static/Manrope-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/Manrope/static/Manrope-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/Manrope/static/Manrope-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/Manrope/static/Manrope-ExtraBold.ttf",
      weight: "800",
      style: "normal",
    },
  ],
  variable: "--font-manrope",
});

export const metadata = {
  title: "ModuleWings",
  description: "ModuleWings Landing Page",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${satoshi.variable} ${manrope.variable} font-sans h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
