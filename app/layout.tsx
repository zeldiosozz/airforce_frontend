import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import WhatsAppButton from "./components/WhatsAppPopUp";
import Script from "next/script";
// import LanguageSwitcher from "./components/LanguageSwitcher";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://airforcebrand.vercel.app"),

  title: {
    default: "AIRFORCE",
    template: "%s | AIRFORCE",
  },

  description:
    "AIRFORCE — Official website for Airforce brand.",

  keywords: [
    "AIRFORCE",
    "AIRFORCE 1",
    "AIRFORCE 1 shoes",
    "AIRFORCE shoes",
    "Air force",
    "air force",
    "air force 1",
    "airforce 1",
    "air force 1 shoes",
    "airforce 1 shoes",
    "air force shoes",
    "airforce shoes",
    "Airforce",
    "Airforce Brand",
    "Airforce Egypt",
    "fashion",
    "streetwear",
    "clothing",
    "fashion brand",
    "streetwear brand",
    "Egyptian fashion",
    "Egypt fashion",
    "modern clothing",
    "premium clothing",
    "ايرفورس",
    "ايرفورس براند",
    "كوتشي ايرفورس",
    "كوتشي ايرفورس ستور",
    "ايرفورس ستور",
    "موقع ايرفورس",
    "موقع ايرفورس ستور",
    "كوتشيهات ايرفورس",
    "كوتشي ايرفور وان",
    "كوتشي ايرفور 1",
  ],

  authors: [
    {
      name: "AIRFORCE",
    },
  ],

  creator: "AIRFORCE",
  publisher: "AIRFORCE",

  alternates: {
    canonical: "https://airforcebrand.vercel.app",
  },

  openGraph: {
    title: "AIRFORCE",
    description:
      "AIRFORCE — Official website for Airforce brand.",
    url: "https://airforcebrand.vercel.app",
    siteName: "AIRFORCE",
    images: [
      {
        url: "/images/airforce_logo_b.jpg",
        width: 1200,
        height: 630,
        alt: "AIRFORCE",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "AIRFORCE",
    description:
      "AIRFORCE — Official website for Airforce brand.",
    images: ["/images/airforce_logo_b.jpg"],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">

        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-PD289T7V"
            height="0"
            width="0"
            style={{
              display: "none",
              visibility: "hidden",
            }}
          />
        </noscript>

        {/* Google Tag Manager */}
        <Script
          id="google-tag-manager"
          strategy="afterInteractive"
        >
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-PD289T7V');
          `}
        </Script>

        {children}

        <WhatsAppButton />
        {/* <LanguageSwitcher /> */}

      </body>
    </html>
  );
}