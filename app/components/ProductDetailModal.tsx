"use client";
import React, { useState } from "react";
import { X, Star, ShoppingCart, Shield, Truck, RotateCcw, Heart } from "lucide-react";
import { Product } from "@/app/lib/data/products";
import { motion } from "motion/react";
import Image from "next/image";
interface ProductDetailModalProps {
  key?: React.Key;
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, size: number, color: string) => void;
}

export default function ProductDetailModal({
  product,
  onClose,
  onAddToCart,
}: ProductDetailModalProps) {
  if (!product) return null;

  const [selectedSize, setSelectedSize] = useState<number>(product.sizes[2] || product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState<string>(product.colors[0]);
  const [quantity, setQuantity] = useState<number>(1);
  const [isLiked, setIsLiked] = useState<boolean>(false);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      onAddToCart(product, selectedSize, selectedColor);
    }
    onClose();
  };

  // Color name dictionary
  const getColorName = (hex: string) => {
    switch (hex.toUpperCase()) {
      case "#EA580C": return "Solar Flare Orange";
      case "#000000": return "Carbon Stealth Black";
      case "#9CA3AF": return "Aero Platinum Gray";
      case "#DC2626": return "Crimson Red";
      case "#1F2937": return "Dark Obsidian Gray";
      case "#FFFFFF": return "Pure Summit White";
      case "#2563EB": return "Electric Blue";
      case "#F3F4F6": return "Minimalist Soft Gray";
      case "#22C55E": return "Hyper Neon Green";
      case "#4B5563": return "Slate Gray";
      default: return "Custom Colorway";
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Dark Blur Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
      />

      {/* Modal Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: "spring", duration: 0.4 }}
        className="relative bg-white w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl border border-slate-100 z-10 max-h-[90vh] flex flex-col md:flex-row"
      >
        {/* Close Button */}
        <button
          id="modal-close-btn"
          onClick={onClose}
          className="absolute top-4 right-4 bg-white hover:bg-slate-100 border border-slate-100 text-slate-700 p-2.5 rounded-full z-20 hover:scale-105 transition-all"
          title="Close details"
        >
          <X size={18} />
        </button>

        {/* Modal Left: Product Graphic (Responsive background) */}
        <div className="w-full md:w-1/2 bg-slate-50/75 p-6 sm:p-12 flex flex-col items-center justify-center relative border-b md:border-b-0 md:border-r border-slate-100">
          {/* Accent decoration rings */}
          <div className="absolute w-64 h-64 rounded-full border border-orange-500/10 -z-0" />
          <div className="absolute w-80 h-80 rounded-full bg-gradient-to-tr from-orange-100/10 to-orange-500/5 -z-0 blur-xl" />

          {/* Dynamic Image Display with rotation/floating look */}
          <div className="relative z-10 max-w-[240px] sm:max-w-[320px] py-6 select-none">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className={`w-full h-auto drop-shadow-[0_20px_30px_rgba(0,0,0,0.15)] hover:rotate-6 transition-all duration-500 ${
                selectedColor === "#000000" || selectedColor === "#1F2937"
                  ? "grayscale contrast-125 brightness-75"
                  : selectedColor === "#9CA3AF" || selectedColor === "#F3F4F6"
                  ? "hue-rotate-180 saturate-50 brightness-110"
                  : ""
              }`}
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Trust badges below product image */}
          <div className="grid grid-cols-3 gap-2 w-full mt-4 text-center z-10">
            <div className="bg-white/80 p-2 rounded-xl border border-slate-100">
              <Truck size={14} className="mx-auto text-orange-500 mb-1" />
              <span className="text-[9px] font-semibold text-slate-600 block">Free Shipping</span>
            </div>
            <div className="bg-white/80 p-2 rounded-xl border border-slate-100">
              <RotateCcw size={14} className="mx-auto text-orange-500 mb-1" />
              <span className="text-[9px] font-semibold text-slate-600 block">30 Day Returns</span>
            </div>
            <div className="bg-white/80 p-2 rounded-xl border border-slate-100">
              <Shield size={14} className="mx-auto text-orange-500 mb-1" />
              <span className="text-[9px] font-semibold text-slate-600 block">Secure Payment</span>
            </div>
          </div>
        </div>

        {/* Modal Right: Configurator Form */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 overflow-y-auto max-h-[50vh] md:max-h-[90vh] flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            {/* Category and ratings */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-orange-500 uppercase tracking-widest font-sans">
                {product.category} Collection
              </span>
              <div className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1 rounded-full border border-slate-100">
                <div className="flex text-amber-400">
                  <Star size={12} className="fill-amber-400" />
                </div>
                <span className="font-mono text-xs font-bold text-slate-700">{product.rating}</span>
                <span className="text-[10px] text-slate-400">({product.reviewsCount} reviews)</span>
              </div>
            </div>

            {/* Product Title & Price */}
            <div>
              <h3 className="font-display font-bold text-2xl sm:text-3xl text-slate-900">
                {product.name}
              </h3>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="font-mono text-2xl font-extrabold text-slate-900">
                  ${product.price.toFixed(2)}
                </span>
                <span className="text-xs text-slate-400">Includes all GST</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-slate-600 font-sans font-light leading-relaxed">
              {product.description}
            </p>

            {/* Color variant Selector */}
            <div className="space-y-2">
              <span className="text-xs font-semibold text-slate-700 block">
                Select Color: <span className="text-slate-500 font-normal">{getColorName(selectedColor)}</span>
              </span>
              <div className="flex gap-2">
                {product.colors.map((hex) => (
                  <button
                    key={hex}
                    onClick={() => setSelectedColor(hex)}
                    style={{ backgroundColor: hex }}
                    className={`w-8 h-8 rounded-full border-2 transition-all relative ${
                      selectedColor === hex
                        ? "border-orange-500 scale-110 shadow-sm"
                        : "border-transparent hover:scale-105"
                    }`}
                    title={getColorName(hex)}
                  >
                    {selectedColor === hex && (
                      <span className="absolute inset-0 flex items-center justify-center text-white text-xs font-bold font-sans">
                        ✓
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selector */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs font-semibold text-slate-700 block">Select US Size</span>
                <a href="#" onClick={(e) => e.preventDefault()} className="text-[10px] text-orange-500 hover:underline">
                  Size Chart Guide
                </a>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`h-10 rounded-xl text-xs font-semibold font-mono flex items-center justify-center border transition-all ${
                      selectedSize === size
                        ? "bg-slate-900 text-white border-slate-900 shadow-md"
                        : "bg-white hover:bg-slate-50 text-slate-700 border-slate-200"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="space-y-2">
              <span className="text-xs font-semibold text-slate-700 block">Quantity</span>
              <div className="flex items-center border border-slate-200 rounded-xl w-32 bg-slate-50 overflow-hidden">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-colors font-bold text-lg"
                >
                  -
                </button>
                <span className="flex-1 text-center font-mono font-bold text-sm text-slate-800">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-colors font-bold text-lg"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Checkout triggers */}
          <div className="flex gap-3 pt-4 border-t border-slate-100">
            <button
              id="modal-like-toggle"
              onClick={() => setIsLiked(!isLiked)}
              className="border border-slate-200 hover:border-slate-300 text-slate-400 p-3.5 rounded-2xl flex items-center justify-center hover:bg-slate-50 transition-colors"
            >
              <Heart size={20} className={isLiked ? "text-red-500 fill-red-500" : ""} />
            </button>
            <button
              id="modal-add-to-cart-btn"
              onClick={handleAddToCart}
              className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3.5 px-6 rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20 hover:-translate-y-0.5 transition-all duration-200"
            >
              <ShoppingCart size={18} />
              Add to Shopping Cart — ${(product.price * quantity).toFixed(2)}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
