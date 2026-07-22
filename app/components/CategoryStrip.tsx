"use client";
import React from "react";
import { Zap, Sparkles, Smile, Trophy, Dumbbell } from "lucide-react";

interface CategoryStripProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  productCounts: { [key: string]: number };
}

export default function CategoryStrip({
  activeCategory,
  onCategoryChange,
  productCounts,
}: CategoryStripProps) {
  // Categories linked to matching icons for brand identity
  const categories = [
    { id: "All", label: "All Sneakers", icon: Sparkles, color: "hover:text-orange-500" },
    { id: "Running", label: "Running / Speed", icon: Zap, color: "hover:text-red-500" },
    { id: "Casual", label: "Casual / Lifestyle", icon: Smile, color: "hover:text-blue-500" },
    { id: "Basketball", label: "Basketball / Court", icon: Trophy, color: "hover:text-emerald-500" },
    { id: "Training", label: "Gym / Training", icon: Dumbbell, color: "hover:text-amber-500" },
  ];

  return (
    <div className="bg-slate-50 border-y border-slate-100 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Header section in the strip */}
          <div className="space-y-1 text-center md:text-left">
            <span className="text-[10px] text-orange-500 font-bold uppercase tracking-wider font-sans">
              Discover Collections
            </span>
            <h3 className="font-display font-bold text-lg text-slate-900">
              Filter by Performance Class
            </h3>
          </div>

          {/* Scrolling horizontal container for the category pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none w-full md:w-auto justify-start md:justify-end">
            {categories.map((cat) => {
              const IconComponent = cat.icon;
              const isActive = activeCategory === cat.id;
              const count = productCounts[cat.id] ?? 0;

              return (
                <button
                  key={cat.id}
                  id={`category-pill-${cat.id.toLowerCase()}`}
                  onClick={() => onCategoryChange(cat.id)}
                  className={`flex items-center gap-2 px-5 py-3 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-300 ${
                    isActive
                      ? "bg-slate-900 text-white shadow-lg shadow-slate-900/15 scale-105"
                      : `bg-white text-slate-600 border border-slate-200/80 ${cat.color} hover:border-slate-300 hover:shadow-sm`
                  }`}
                >
                  <IconComponent size={14} className={isActive ? "text-orange-400" : "text-slate-400"} />
                  <span>{cat.label}</span>
                  {cat.id !== "Training" && (
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono ${
                        isActive ? "bg-orange-500 text-white" : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
