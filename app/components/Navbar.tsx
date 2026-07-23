"use client";
import React, { useState, useEffect } from "react";
import { Search, ShoppingBag, Menu, X, ArrowRight, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Product } from "@/app/lib/data/products";
import Image from "next/image";
interface NavbarProps {
  cartItemsCount: number;
  onCartClick: () => void;
  onShopClick: () => void;
  onAboutClick: () => void;
  onContactClick: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export default function Navbar({
  cartItemsCount,
  onCartClick,
  onShopClick,
  onAboutClick,
  onContactClick,
  searchQuery,
  setSearchQuery,
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 backdrop-blur-md shadow-sm border-b border-slate-100 py-3"
          : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center">
            <a
              href="#"
              className="flex items-center gap-1.5 group"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              <div className="w-50 h-20 rounded-xl flex items-center justify-center  transform group-hover:rotate-12 transition-transform duration-300">
              <Image
              src="/images/airforce_logo_b_t.png"
              alt="Airforce Sneakers Banner"
              width={300}
              height={200}
              className="w-full h-auto rounded-xl"
            ></Image>
              </div>

            </a>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8">
            <a
              href="#"
              className="text-sm font-medium text-slate-800 hover:text-orange-500 transition-colors"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              Home
            </a>
            <a
              href="#shop-section"
              className="text-sm font-medium text-slate-800 hover:text-orange-500 transition-colors"
              onClick={(e) => {
                e.preventDefault();
                onShopClick();
              }}
            >
              Features
            </a>
            <a
              href="#about-section"
              className="text-sm font-medium text-slate-800 hover:text-orange-500 transition-colors"
              onClick={(e) => {
                e.preventDefault();
                onAboutClick();
              }}
            >
              Our Story
            </a>
            <a
              href="#newsletter-section"
              className="text-sm font-medium text-slate-800 hover:text-orange-500 transition-colors"
              onClick={(e) => {
                e.preventDefault();
                onContactClick();
              }}
            >
              Newsletter
            </a>
          </nav>

          {/* Desktop Right Actions */}
          <div className="hidden md:flex items-center gap-4">
            {/* Search Bar */}

            {/* Shopping Cart Trigger */}
            <button
              id="navbar-cart-btn"
              onClick={onCartClick}
              className="p-2 rounded-full hover:bg-slate-100 text-slate-700 hover:text-orange-500 relative transition-all"
              title="View Shopping Cart"
            >
              <ShoppingBag size={20} className="h-5 w-5" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-500 text-white font-bold text-[10px] w-5 h-5 rounded-full flex items-center justify-center animate-pulse border-2 border-white shadow-sm">
                  {cartItemsCount}
                </span>
              )}
            </button>

            {/* Primary Action Button */}
            <button
              id="navbar-shop-now-btn"
              onClick={onShopClick}
              className="bg-slate-900 hover:bg-orange-500 text-white font-display text-sm font-semibold px-5 py-2.5 rounded-xl flex items-center gap-1.5 shadow-md shadow-slate-900/10 hover:shadow-orange-500/20 hover:-translate-y-0.5 transition-all duration-300"
            >
              Shop Now
              <ArrowRight size={16} />
            </button>
          </div>

          {/* Mobile Right Actions */}
          <div className="flex md:hidden items-center gap-2">
            <button
              id="mobile-search-toggle"
              onClick={() => {
                setIsSearchExpanded(!isSearchExpanded);
                if (isMobileMenuOpen) setIsMobileMenuOpen(false);
              }}
              className="p-2 rounded-full hover:bg-slate-100 text-slate-700"
            >
              <Search size={20} />
            </button>

            <button
              id="mobile-cart-toggle"
              onClick={onCartClick}
              className="p-2 rounded-full hover:bg-slate-100 text-slate-700 relative"
            >
              <ShoppingBag size={20} />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-500 text-white font-bold text-[10px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
                  {cartItemsCount}
                </span>
              )}
            </button>

            <button
              id="mobile-menu-toggle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-full hover:bg-slate-100 text-slate-800"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Search Input Row */}
        {isSearchExpanded && (
          <div className="md:hidden mt-2 px-1">
            <input
              type="text"
              placeholder="Search premium sneakers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-100 border border-slate-200 rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-orange-500 outline-none text-slate-800"
            />
          </div>
        )}
      </div>

      {/* Mobile Drawer Overlay Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white border-b border-slate-100 shadow-lg overflow-hidden absolute left-0 right-0"
          >
            <div className="px-4 pt-2 pb-6 space-y-3">
              <a
                href="#"
                className="block px-3 py-2.5 rounded-xl text-base font-medium text-slate-900 hover:bg-orange-50 hover:text-orange-500 transition-colors"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                Home
              </a>
              <a
                href="#shop-section"
                className="block px-3 py-2.5 rounded-xl text-base font-medium text-slate-900 hover:bg-orange-50 hover:text-orange-500 transition-colors"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onShopClick();
                }}
              >
                Shop Sneakers
              </a>
              <a
                href="#about-section"
                className="block px-3 py-2.5 rounded-xl text-base font-medium text-slate-900 hover:bg-orange-50 hover:text-orange-500 transition-colors"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onAboutClick();
                }}
              >
                Our Story
              </a>
              <a
                href="#newsletter-section"
                className="block px-3 py-2.5 rounded-xl text-base font-medium text-slate-900 hover:bg-orange-50 hover:text-orange-500 transition-colors"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onContactClick();
                }}
              >
                Newsletter
              </a>
              <div className="pt-4 border-t border-slate-100 px-3">
                <button
                  id="mobile-drawer-shop-btn"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onShopClick();
                  }}
                  className="w-full bg-slate-900 hover:bg-orange-500 text-white py-3 px-4 rounded-xl font-display font-semibold flex items-center justify-center gap-2 shadow-md transition-colors"
                >
                  Shop Collection
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
