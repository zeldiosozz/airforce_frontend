import {NextIntlClientProvider} from "next-intl";
import {getMessages} from "next-intl/server";
import LanguageSwitcher from "../components/LanguageSwitcher";
import { CartProvider } from "../context/CartContext";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const messages = await getMessages();

  const{ locale }= await params;
  const direction = locale === "ar" ? "rtl" : "ltr";

  return (
    <html
      lang={locale}
      dir={direction}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <NextIntlClientProvider messages={messages}>
          <CartProvider>
            {children}
            <LanguageSwitcher />
          </CartProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}