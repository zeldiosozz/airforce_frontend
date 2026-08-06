"use client";
import React, { useEffect, useState } from "react";
import { Star, ChevronLeft, ChevronRight, Quote, Sparkles } from "lucide-react";
import { Testimonial } from "@/app/lib/types";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { fetchTestimonials } from "../hooks/useTestimonials";

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([{id:0,name:"",role:"",comment:"",rating:"0",avatar:""}]);
  useEffect(()=>{
        async function loadTestimonials(){
            setTestimonials(await fetchTestimonials())
        }
        loadTestimonials()
    },[])
  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };
  if(testimonials){
    console.log("in testimonails.tsx testimonials is activated")
  }
  const current = testimonials[activeIndex];
  return (
    <section className="py-20 bg-slate-50 border-b border-slate-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center space-y-3 mb-12">
          <span className="text-xs font-bold text-orange-500 uppercase tracking-widest font-sans flex items-center justify-center gap-1.5">
            <Sparkles size={14} />
            VERIFIED testimonials
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-slate-900 tracking-tight">
            Loved by Elite Athletes & Collectors
          </h2>
          <p className="text-sm text-slate-500 max-w-md mx-auto font-light font-sans">
            Read stories from runners, coaches, and sneakers collectors experiencing the ShoeSpike difference.
          </p>
        </div>

        {/* Carousel Slide Container */}
        <div className="relative bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-slate-100/50">
          {/* Quote Mark Watermark */}
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
                {/* Rating stars */}
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

                {/* Comment */}
                <p className="text-base sm:text-lg text-slate-700 italic font-sans font-light leading-relaxed">
                  "{current.comment}"
                </p>

                {/* Profile Card */}
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
                    <p className="text-xs text-slate-500">{current.role}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Controls */}
          <div className="absolute right-8 bottom-8 flex gap-2">
            <button
              id="testimonial-prev-btn"
              onClick={handlePrev}
              className="bg-slate-50 hover:bg-orange-500 hover:text-white text-slate-600 p-2.5 rounded-xl border border-slate-200/60 hover:border-orange-500 transition-all duration-200 shadow-sm"
              title="Previous Review"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              id="testimonial-next-btn"
              onClick={handleNext}
              className="bg-slate-50 hover:bg-orange-500 hover:text-white text-slate-600 p-2.5 rounded-xl border border-slate-200/60 hover:border-orange-500 transition-all duration-200 shadow-sm"
              title="Next Review"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Bullet Progress Indicators */}
        <div className="flex items-center justify-center gap-2 mt-6">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                activeIndex === idx ? "w-8 bg-orange-500" : "w-2 bg-slate-300 hover:bg-slate-400"
              }`}
              title={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
