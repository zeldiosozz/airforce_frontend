"use client";

import { useEffect, useState } from "react";
import {
  Star,
  ChevronLeft,
  ChevronRight,
  Quote,
  Sparkles,
} from "lucide-react";
import { Testimonial } from "@/app/lib/types";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { fetchTestimonials } from "../hooks/useTestimonials";
import { useTranslations } from "next-intl";
import TestimonialsSkelton from "./skeltons/TestimonialsSkelton";

export default function Testimonials() {
  const t = useTranslations("Testimonials");

  const [activeIndex, setActiveIndex] = useState(0);

  const [testimonials, setTestimonials] = useState<Testimonial[] | null>(null);

useEffect(() => {
  async function loadTestimonials() {
    try {
      const data = await fetchTestimonials();
      setTestimonials(data);
    } catch (error) {
      console.error("Failed to load testimonials:", error);
      setTestimonials([]);
    }
  }

  loadTestimonials();
}, []);

if (testimonials === null) {
  return (
    <TestimonialsSkelton />
  );
}
if (testimonials.length === 0) {
  return null;
}

const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActiveIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  const current = testimonials[activeIndex];

  return (
    <section className="py-20 bg-slate-50 border-b border-slate-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center space-y-3 mb-12">
          <span className="text-xs font-bold text-orange-500 uppercase tracking-widest font-sans flex items-center justify-center gap-1.5">
            <Sparkles size={14} />
            {t("verifiedTestimonials")}
          </span>

          <h2 className="font-display font-bold text-3xl sm:text-4xl text-slate-900 tracking-tight">
            {t("lovedByEliteAthletesAndCollectors")}
          </h2>

          <p className="text-sm text-slate-500 max-w-md mx-auto font-light font-sans">
            {t("readStoriesFromRunnersCoachesAndSneakerCollectors")}
          </p>
        </div>

        <div className="relative bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-slate-100/50">
          <div className="absolute top-6 left-6 text-slate-100 select-none pointer-events-none">
            <Quote size={80} className="opacity-40" />
          </div>

          <div className="relative min-h-[180px] flex flex-col justify-between">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={
                        i < Math.floor(Number(current.rating))
                          ? "text-amber-400 fill-amber-400"
                          : "text-slate-200"
                      }
                    />
                  ))}
                </div>

                <p className="text-base sm:text-lg text-slate-700 italic font-sans font-light leading-relaxed">
                  &quot;{current.comment}&quot;
                </p>

                <div className="flex items-center gap-4 pt-4 border-t border-slate-100">
                  <Image
                    src={`/api/image${current.avatar}`}
                    alt={current.name}
                    width={48}
                    height={48}
                    className="w-12 h-12 rounded-full object-cover border-2 border-orange-100"
                    referrerPolicy="no-referrer"
                  />

                  <div>
                    <h4 className="font-display font-semibold text-slate-900 text-sm">
                      {current.name}
                    </h4>

                    <p className="text-xs text-slate-500">
                      {current.role}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="absolute right-8 bottom-8 flex gap-2">
            <button
              id="testimonial-prev-btn"
              onClick={handlePrev}
              className="bg-slate-50 hover:bg-orange-500 hover:text-white text-slate-600 p-2.5 rounded-xl border border-slate-200/60 hover:border-orange-500 transition-all duration-200 shadow-sm"
              title={t("previousReview")}
              aria-label={t("previousReview")}
            >
              <ChevronLeft size={16} />
            </button>

            <button
              id="testimonial-next-btn"
              onClick={handleNext}
              className="bg-slate-50 hover:bg-orange-500 hover:text-white text-slate-600 p-2.5 rounded-xl border border-slate-200/60 hover:border-orange-500 transition-all duration-200 shadow-sm"
              title={t("nextReview")}
              aria-label={t("nextReview")}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 mt-6">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                activeIndex === idx
                  ? "w-8 bg-orange-500"
                  : "w-2 bg-slate-300 hover:bg-slate-400"
              }`}
              title={`${t("goToSlide")} ${idx + 1}`}
              aria-label={`${t("goToSlide")} ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}