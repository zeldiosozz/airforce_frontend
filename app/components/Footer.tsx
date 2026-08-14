"use client";

import React from "react";
import { Instagram, Facebook, Heart, MapPin, Phone, Mail } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";

interface FooterProps {
  onShopClick: () => void;
  onAboutClick: () => void;
  onContactClick: () => void;
}

export default function Footer({
  onShopClick,
  onAboutClick,
  onContactClick,
}: FooterProps) {
  const t = useTranslations("Footer");

  return (
    <footer className="bg-slate-950 text-white pt-16 pb-8 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-900">

          {/* Column 1: Brand Info */}
          <div className="lg:col-span-4 space-y-5">
            <div className="flex items-center gap-1.5">
              <div className="w-50 h-20 rounded-xl flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300">
                <Image
                  src="/images/airforce_logo_w_t.png"
                  alt="Airforce Sneakers Banner"
                  width={300}
                  height={200}
                  className="w-full h-auto rounded-xl"
                />
              </div>
            </div>

            <p className="text-xs text-slate-400 font-sans font-light leading-relaxed max-w-sm">
              {t("brandDescription")}
            </p>

            {/* Socials */}
            <div className="flex items-center gap-3">
              {[
                {
                  icon: Instagram,
                  link: "https://www.instagram.com/airforce_store200",
                  title: "Instagram",
                },
                {
                  icon: Facebook,
                  link: "https://www.facebook.com/share/1JwVU2tdod/",
                  title: "Facebook",
                },
              ].map((social, idx) => {
                const IconComponent = social.icon;

                return (
                  <a
                    key={idx}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-orange-500 hover:text-white text-slate-400 flex items-center justify-center transition-all"
                    title={social.title}
                  >
                    <IconComponent size={14} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-display font-bold text-xs text-slate-200 uppercase tracking-widest">
              {t("quickNav")}
            </h4>

            <ul className="space-y-2 text-xs text-slate-400 font-sans font-light">
              <li>
                <a
                  href="#"
                  className="hover:text-orange-500 transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                >
                  {t("homeMain")}
                </a>
              </li>

              <li>
                <a
                  href="#shop-section"
                  className="hover:text-orange-500 transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    onShopClick();
                  }}
                >
                  {t("shopSneakers")}
                </a>
              </li>

              <li>
                <a
                  href="#about-section"
                  className="hover:text-orange-500 transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    onAboutClick();
                  }}
                >
                  {t("ourHeritage")}
                </a>
              </li>

              <li>
                <a
                  href="#newsletter-section"
                  className="hover:text-orange-500 transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    onContactClick();
                  }}
                >
                  {t("newsletterClub")}
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Customer Care */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-display font-bold text-xs text-slate-200 uppercase tracking-widest">
              {t("customerSupport")}
            </h4>

            <ul className="space-y-2 text-xs text-slate-400 font-sans font-light">
              <li>
                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="hover:text-orange-500 transition-colors"
                >
                  {t("sizeGuideFitting")}
                </a>
              </li>

              <li>
                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="hover:text-orange-500 transition-colors"
                >
                  {t("trackDeliveryStatus")}
                </a>
              </li>

              <li>
                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="hover:text-orange-500 transition-colors"
                >
                  {t("returnTrialPolicy")}
                </a>
              </li>

              <li>
                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="hover:text-orange-500 transition-colors"
                >
                  {t("verifiedReviews")}
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Studio Location */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-display font-bold text-xs text-slate-200 uppercase tracking-widest">
              {t("airforceStudios")}
            </h4>

            <ul className="space-y-2.5 text-xs text-slate-400 font-sans font-light">
              <li className="flex gap-2.5 items-start">
                <MapPin
                  size={14}
                  className="text-orange-500 mt-0.5 flex-shrink-0"
                />
                <span>{t("address")}</span>
              </li>

              <li className="flex gap-2.5 items-center">
                <Phone
                  size={14}
                  className="text-orange-500 flex-shrink-0"
                />
                <span>{t("phone")}</span>
              </li>

              <li className="flex gap-2.5 items-center">
                <Mail
                  size={14}
                  className="text-orange-500 flex-shrink-0"
                />
                <span>{t("email")}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-4">
          <div className="flex items-center gap-1 font-sans">
            <span>
              {t("copyright", {
                year: new Date().getFullYear(),
              })}
            </span>
          </div>

          <div className="flex items-center gap-1 font-sans font-light">
            <span>{t("handcraftedWith")}</span>
            <Heart
              size={10}
              className="text-red-500 fill-red-500"
            />
            <span>{t("inAirforceEgypt")}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}