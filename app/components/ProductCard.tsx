"use client";
import React from "react";
import { Star, ShoppingCart, Eye, Sparkles } from "lucide-react";
import { Product } from "@/app/lib/data/products";
import { motion } from "motion/react";
import Image from "next/image";
interface ProductCardProps {
  key?: React.Key;
  product: Product;
  onAddToCart: (product: Product, size: number, color: string) => void;
  onSelectProduct: (product: Product) => void;
}

export default function ProductCard({
  product,
  onAddToCart,
  onSelectProduct,
}: ProductCardProps) {
  // Star rating rendering helper
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(
          <Star key={i} size={12} className="text-amber-400 fill-amber-400" />
        );
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(
          <div key={i} className="relative">
            <Star size={12} className="text-slate-200" />
            <div className="absolute top-0 left-0 overflow-hidden w-1/2">
              <Star size={12} className="text-amber-400 fill-amber-400" />
            </div>
          </div>
        );
      } else {
        stars.push(<Star key={i} size={12} className="text-slate-200" />);
      }
    }
    return stars;
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Default size is first size, default color is first color
    const defaultSize = product.sizes[2] || product.sizes[0];
    const defaultColor = product.colors[0];
    onAddToCart(product, defaultSize, defaultColor);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      id={`product-card-${product.id}`}
      onClick={() => onSelectProduct(product)}
      className="group bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-xl hover:border-slate-200/80 transition-all duration-300 cursor-pointer flex flex-col h-full relative"
    >
      {/* Visual Badge */}
      {product.badge && (
        <span className="absolute top-4 left-4 z-10 bg-slate-900/90 backdrop-blur-sm text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1">
          <Sparkles size={8} className="text-orange-400" />
          {product.badge}
        </span>
      )}

      {/* Heart/Like Indicator (Client Aesthetic Only) */}
      <span className="absolute top-4 right-4 z-10 bg-white/90 backdrop-blur-sm text-slate-400 hover:text-red-500 w-8 h-8 rounded-full flex items-center justify-center shadow-sm border border-slate-100 hover:scale-105 transition-all duration-200">
        ♥
      </span>

      {/* Product Image Frame */}
      <div className="aspect-square bg-slate-50/50 p-6 flex items-center justify-center overflow-hidden relative">
        {/* Color gradients behind image on hover */}
        <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/0 via-orange-500/0 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <Image
          src={product.image}
          alt={product.name}
          fill
          className="w-4/5 h-auto object-contain transform group-hover:scale-115 group-hover:-rotate-6 transition-all duration-500 ease-out drop-shadow-md group-hover:drop-shadow-xl"
          referrerPolicy="no-referrer"
        />

        {/* Hover Action Overlay panel (Behance design inspired) */}
        <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex justify-center gap-2">
          <button
            id={`product-quick-view-btn-${product.id}`}
            onClick={(e) => {
              e.stopPropagation();
              onSelectProduct(product);
            }}
            className="bg-white hover:bg-slate-900 hover:text-white text-slate-800 p-2.5 rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-[50ms]"
            title="Quick View"
          >
            <Eye size={18} />
          </button>
          <button
            id={`product-quick-add-btn-${product.id}`}
            onClick={handleQuickAdd}
            className="bg-orange-500 hover:bg-orange-600 text-white p-2.5 rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-[100ms]"
            title="Instant Add to Cart"
          >
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>

      {/* Product Details Section */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-sans">
              {product.category}
            </span>
            <div className="flex items-center gap-1 font-mono text-xs font-semibold text-slate-700">
              <span className="text-amber-400">★</span>
              <span>{product.rating}</span>
            </div>
          </div>

          <h4 className="font-display font-semibold text-slate-900 text-base group-hover:text-orange-500 transition-colors line-clamp-1">
            {product.name}
          </h4>
        </div>

        {/* Foot of the Details section */}
        <div className="flex items-center justify-between pt-1 border-t border-slate-100/80">
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-400 font-sans">Price</span>
            <span className="font-mono text-base font-bold text-slate-900">
              ${product.price.toFixed(2)}
            </span>
          </div>

          {/* Fallback add to cart button shown clearly on mobile */}
          <button
            id={`product-add-to-cart-btn-${product.id}`}
            onClick={handleQuickAdd}
            className="bg-slate-50 group-hover:bg-orange-500 text-slate-700 group-hover:text-white p-2 rounded-xl transition-all duration-300 md:opacity-90 flex items-center justify-center"
            title="Add to cart"
          >
            <ShoppingCart size={16} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
