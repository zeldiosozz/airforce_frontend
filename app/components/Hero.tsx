"use client";
import React, { useState } from "react";
import { ArrowRight, Star, ShoppingCart, Sparkles, ShieldCheck, Heart } from "lucide-react";
import { motion } from "framer-motion";
import { Products, ProductVariants, VariantSize} from "@/app/lib/types";
import { fetchProducts, transformProducts } from "@/app/lib/data/products";
import Image from "next/image";
interface HeroProps {
  key?: React.Key;
  onShopClick: () => void;
  onQuickAdd: (variant_size: number) => void;
  PRODUCTS: Products[];

}

export default function Hero({ onShopClick, onQuickAdd, PRODUCTS}: HeroProps) {
  const product = PRODUCTS.find((p) => p.slug === "air-force-1");

  const [selectedVariant, setSelectedVariant] = useState<ProductVariants | null>(product?.variants[0] ?? null);
  const [selectedVariantSize, setSelectedVariantSize] = useState<VariantSize | null>(null);
  const [isLiked, setIsLiked] = useState<boolean>(false);

  const handleQuickAdd = () => {
    if(selectedVariant == null){alert("PLease select a color !!"); return;}
    if(selectedVariantSize == null){alert("PLease select a size !!"); return;}
    if (product) {
      onQuickAdd(product.variants.find((v) => v.id === selectedVariant.id)?.sizes.find((s) => s.id === selectedVariantSize.id)?.id ?? 0);
    }
  };

  return (
    <section
      id="hero-section"
      className="relative pt-24 pb-16 md:pt-32 md:pb-24 lg:pt-36 lg:pb-32 overflow-hidden bg-gradient-to-b from-orange-50/50 via-white to-white"
    >
      {/* Abstract Background Accents */}
      <div className="absolute top-1/4 left-10 w-72 h-72 bg-orange-200/20 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-slate-100/60 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
<div className="grid grid-cols-12 gap-4 sm:gap-8 items-center">          
  {/* Hero Left Content Column */}
<div className="col-span-6 z-10" style={{ gap: "clamp(0.75rem, 3vw, 2rem)", display: "flex", flexDirection: "column" }}>
              {/* Tagline */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-100 text-orange-600 text-xs font-semibold uppercase tracking-wider"
            >
              <Sparkles size={14} className="animate-spin" />
              Revolutionary Airforce Sneaker Craft
            </motion.div>

            {/* Headline */}
            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="font-display font-bold text-slate-900 leading-[1.1] tracking-tight"
                style={{ fontSize: "clamp(1.5rem, 5vw, 3.75rem)" }}>
                Step Into<br />
                <span className="text-orange-500 relative">
                  Forcing Style
                  <span className="absolute left-0 bottom-1 w-full h-2 bg-orange-200/50 -z-10" />
                </span>{" "}
                ..
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-slate-600 max-w-xl font-sans font-light leading-relaxed"
                style={{ fontSize: "clamp(0.7rem, 1.8vw, 1.125rem)" }}              >
                Engineered for maximum velocity, styled for urban aesthetics. Inspired by minimalist design
                with an energetic burst of high-performance sole plate technology. Handcrafted comfort with premium materials.
              </motion.p>
            </div>

            {/* Live Configurator Card (Aesthetic Detail) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white rounded-2xl shadow-xl shadow-slate-100 border border-slate-100/80 max-w-md space-y-2 sm:space-y-4"
              style={{ padding: "clamp(0.75rem, 2.5vw, 1.5rem)" }}            >
              <div className="flex justify-between items-center">
                <span className="font-display font-semibold text-slate-900">AirForce</span>
                <span className="font-mono text-lg font-bold text-orange-500">450 EGP</span>
              </div>

              {/* Size Select */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="font-medium text-slate-500">Select Size</span>
                  <span className="text-slate-400">Fits true to size</span>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {selectedVariant?.sizes.map((size) => (
                    <button
                      key={size.id}
                      onClick={() => setSelectedVariantSize(size)}
                      style={{ width: "clamp(1.75rem, 6vw, 2.5rem)", height: "clamp(1.75rem, 6vw, 2.5rem)" }}
                      className={`rounded-lg text-xs font-semibold font-mono flex items-center justify-center transition-all 
                        ${selectedVariantSize === size
                          ? "bg-slate-900 text-white shadow-md shadow-slate-900/10"
                          : "bg-slate-50 hover:bg-slate-100 text-slate-700"
                      }`}
                    >
                      {size.size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Interactive Colors */}
              <div className="space-y-2">
                <span className="text-xs font-medium text-slate-500">Color Variant</span>
                <div className="flex items-center gap-3">
                  {product?.variants.map((variant) => (
                    <button
                      key={variant.id}
                      onClick={() => setSelectedVariant(variant)}
                      className={`w-6 h-6 rounded-full ${variant.color.name == "black" ? "bg-slate-900" : "bg-slate-300"} ring-offset-2 transition-all duration-300 ${
                        selectedVariant?.color.name === variant.color.name ? "ring-2 ring-orange-500 scale-110" : "opacity-80 hover:opacity-100"
                      }`}
                      title={variant.color.name}
                    />
                  ))}
                  <span className="text-xs font-medium text-slate-600 capitalize ml-1">
                    {product?.name}
                  </span>
                </div>
              </div>

              {/* Dual CTA Buttons inside Configurator */}
              <div className="flex gap-3 pt-2">
                <button
                  id="hero-add-to-cart-btn"
                  onClick={handleQuickAdd}
                  className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl py-3 px-4 flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20 hover:-translate-y-0.5 transition-all duration-200"
                >
                  <ShoppingCart size={18} />
                  Add to Cart
                </button>
                <button
                  id="hero-view-details-btn"
                  onClick={onShopClick}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold rounded-xl px-4 flex items-center justify-center transition-colors"
                  title="Explore all"
                >
                  <ArrowRight size={18} />
                </button>
              </div>
            </motion.div>

            {/* Quick trust trust indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="flex items-center gap-6 text-xs text-slate-500"
            >
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="text-emerald-500 w-4 h-4" />
                <span>100% Authentic Guarantee</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Star className="text-amber-400 fill-amber-400 w-4 h-4" />
                <span>4.9 Star Verified Reviews</span>
              </div>
            </motion.div>
          </div>

          {/* Hero Right Visual Column */}
            <div className="col-span-6 flex items-center justify-center relative">            
          {/* Concentric Geometric Background Rings (Behance reference design elements) */}
            <div className="absolute w-[320px] h-[320px] sm:w-[450px] sm:h-[450px] rounded-full border-2 border-dashed border-slate-100 flex items-center justify-center -z-10 animate-[spin_60s_linear_infinite]">
              <div className="w-[240px] h-[240px] sm:w-[350px] sm:h-[350px] rounded-full border border-orange-100 flex items-center justify-center">
                <div className="w-[160px] h-[160px] sm:w-[250px] sm:h-[250px] rounded-full bg-gradient-to-br from-orange-100/40 to-orange-500/10" />
              </div>
            </div>

            {/* Giant Watermark Text behind shoe */}
            <div className="absolute select-none font-display font-extrabold text-[100px] sm:text-[140px] text-slate-100/60 leading-none tracking-tighter -z-20 font-bold uppercase pointer-events-none transform -rotate-12">
              SPIKE
            </div>

            {/* Floating Hero Shoe Image with interactive color filter overlays */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -15 }}
              animate={{ opacity: 1, scale: 1, rotate: -12 }}
              transition={{ type: "spring", stiffness: 60, delay: 0.1 }}
              className="relative w-full max-w-[400px] sm:max-w-[460px] cursor-pointer group"            >
              {/* Dynamic Image Wrapper */}
              <div className="animate-shoe-float transition-all duration-500">
                <Image
                  src={selectedVariant?.color.name === "black" ?"/images/a00.png" : "/images/a0.png"}
                  alt="Airforce 1"
                  width={460}
                  height={460}
                  className={`w-full h-auto drop-shadow-[0_25px_35px_rgba(249,115,22,0.35)] transition-all duration-700 ${
                    selectedVariant?.color.name === "black"
                      ? "grayscale contrast-125 brightness-75"
                      : selectedVariant?.color.name === "silver"
                      ? "hue-rotate-180 saturate-50 contrast-90 brightness-110"
                      : ""
                  }`}
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Premium Interactive Heart Badge */}
              <button
                id="hero-like-button"
                onClick={() => setIsLiked(!isLiked)}
                className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm p-3 rounded-full shadow-lg border border-slate-100 hover:scale-110 transition-all duration-200 z-20 group/heart"
              >
                <Heart
                  size={20}
                  className={`transition-colors duration-300 ${
                    isLiked ? "fill-red-500 text-red-500" : "text-slate-400 group-hover/heart:text-red-500"
                  }`}
                />
              </button>

              {/* Info Badges around the Floating Shoe */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="absolute bottom-4 -right-2 sm:-right-8 bg-white/95 backdrop-blur-sm px-2 py-1.5 sm:px-4 sm:py-3 rounded-xl sm:rounded-2xl shadow-xl border border-slate-100 flex items-center gap-1.5 sm:gap-3 z-10"              >
                <div className="w-6 h-6 sm:w-10 sm:h-10 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center font-bold font-sans text-[10px] sm:text-xs">                  4.9
                </div>
                <div>
                  <div className="text-[8px] sm:text-[10px] text-slate-400 uppercase font-semibold font-sans">User Rating</div>
                  <div className="text-[10px] sm:text-xs font-bold text-slate-900 font-sans">Superb Comfort</div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
                className="absolute top-1/3 -left-2 sm:-left-8 bg-white/95 backdrop-blur-sm px-2 py-1.5 sm:px-4 sm:py-3 rounded-xl sm:rounded-2xl shadow-xl border border-slate-100 flex items-center gap-1.5 sm:gap-3 z-10"              >
                <div className="w-6 h-6 sm:w-9 sm:h-9 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-xs sm:text-base">⚡</div>
                <div>
                  <div className="text-[8px] sm:text-[10px] text-slate-400 uppercase font-semibold font-sans">Tech Spec</div>
                  <div className="text-[10px] sm:text-xs font-bold text-slate-900 font-sans">Carbon Spring</div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
