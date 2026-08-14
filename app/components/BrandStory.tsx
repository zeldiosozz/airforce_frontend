"use client";

import React from "react";
import {
  Compass,
  Hammer,
  Sparkles,
  Feather,
} from "lucide-react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export default function BrandStory() {
  const t = useTranslations("BrandStory");

  const coreValues = [
    {
      icon: Feather,
      title: t("weightlessComfort"),
      desc: t("weightlessComfortDesc"),
    },
    {
      icon: Hammer,
      title: t("artisanalCraftsmanship"),
      desc: t("artisanalCraftsmanshipDesc"),
    },
    {
      icon: Compass,
      title: t("sustainableDirection"),
      desc: t("sustainableDirectionDesc"),
    },
  ];

  return (
    <section
      id="about-section"
      className="py-20 lg:py-28 bg-white border-b border-slate-100"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Visual Column */}
          <div className="lg:col-span-5 relative">

            <div className="absolute -top-6 -left-6 w-32 h-32 bg-orange-500/10 rounded-3xl -z-10" />

            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-slate-100 rounded-3xl -z-10" />

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative rounded-3xl overflow-hidden shadow-2xl border border-orange-500 group"
            >
              <video
                src="/videos/a12.webm"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-auto rounded-xl shadow-lg"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <div className="text-white">
                  <div className="text-xs text-orange-400 font-bold uppercase tracking-wider font-mono">
                    {t("airforceWorkshopStudio")}
                  </div>

                  <div className="text-sm font-semibold">
                    {t("whereScienceMeetsFootwearCraftsmanship")}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Floating Stat */}
            <div className="absolute -bottom-4 -left-4 sm:-left-8 bg-slate-900 text-white p-5 rounded-2xl shadow-xl space-y-1">
              <div className="text-2xl font-bold font-mono text-orange-400">
                100%
              </div>

              <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
                {t("handDraftedDesigns")}
              </div>
            </div>
          </div>

          {/* Narrative Column */}
          <div className="lg:col-span-7 space-y-8">

            <div className="space-y-3">

              <span className="text-xs font-bold text-orange-500 uppercase tracking-widest font-sans flex items-center gap-2">
                <Sparkles size={14} />
                {t("airforceHeritage")}
              </span>

              <h2 className="font-display font-bold text-3xl sm:text-4xl text-slate-900 tracking-tight leading-tight">
                {t("craftingFuture")}
              </h2>

              <p className="text-sm sm:text-base text-slate-600 font-light leading-relaxed font-sans">
                {t("heritageDescription")}
              </p>
            </div>

            {/* Core Values */}
            <div className="space-y-6">
              {coreValues.map((val, idx) => {
                const IconComponent = val.icon;

                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.5,
                      delay: idx * 0.1,
                    }}
                    className="flex gap-4"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center text-orange-500 flex-shrink-0 border border-orange-100">
                      <IconComponent size={20} />
                    </div>

                    <div className="space-y-1">
                      <h4 className="font-display font-semibold text-slate-900 text-base">
                        {val.title}
                      </h4>

                      <p className="text-xs sm:text-sm text-slate-500 font-sans font-light leading-relaxed">
                        {val.desc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}