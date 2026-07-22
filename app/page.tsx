"use client";
import React, { useState, useMemo } from "react";
import { Sparkles, SlidersHorizontal, ShoppingBag, Eye, HelpCircle } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

// Components
import Navbar from "@/app/components/Navbar";
import Hero from "@/app/components/Hero";
import CategoryStrip from "@/app/components/CategoryStrip";
import ProductCard from "@/app/components/ProductCard";
import ProductDetailModal from "@/app/components/ProductDetailModal";
import CartDrawer, { CartItem } from "@/app/components/CartDrawer";
import BrandStory from "@/app/components/BrandStory";
import FeaturesRow from "@/app/components/FeaturesRow";
import Testimonials from "@/app/components/Testimonials";
import Newsletter from "@/app/components/Newsletter";
import Footer from "@/app/components/Footer";
import BSsection from "@/app/bigcomponents/BSsection";
import Image from "next/image";
// Data
import { PRODUCTS, Product } from "@/app/lib/data/products";

export default function App() {
  // Global React States
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("default"); // default, price-asc, price-desc, rating

  // Memoized product counts per category for the CategoryStrip filter counters
  const productCounts = useMemo(() => {
    const counts: { [key: string]: number } = { All: PRODUCTS.length };
    PRODUCTS.forEach((p) => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    return counts;
  }, []);

  // Filter & Sort Pipeline
  const filteredAndSortedProducts = useMemo(() => {
    let result = [...PRODUCTS];

    // 1. Filter by Category
    if (activeCategory !== "All") {
      result = result.filter((p) => p.category === activeCategory);
    }

    // 2. Filter by Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    // 3. Apply Sorting
    if (sortBy === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [activeCategory, searchQuery, sortBy]);

  // Cart Handlers
const handleAddToCart = (product: Product, size: number, colorId: string) => {
  const itemId = `${product.id}-${size}-${colorId.replace("#", "")}`;

  setCartItems((prevItems) => {
    const existingIdx = prevItems.findIndex((item) => item.id === itemId);
    if (existingIdx > -1) {
      return prevItems.map((item, idx) =>
        idx === existingIdx
          ? { ...item, quantity: item.quantity + 1 } // ✅ object جديد تمامًا
          : item
      );
    } else {
      return [...prevItems, { id: itemId, product, size, colorId, quantity: 1 }];
    }
  });

  setIsCartOpen(true);
};
  const handleUpdateQuantity = (itemId: string, delta: number) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) => {
          if (item.id === itemId) {
            const nextQty = item.quantity + delta;
            return { ...item, quantity: nextQty };
          }
          return item;
        })
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveItem = (itemId: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Scroll to anchor helpers
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -90; // account for fixed header
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col font-sans antialiased text-slate-900 selection:bg-orange-500 selection:text-white">
      {/* Navigation Header */}
      <Navbar
        cartItemsCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
        onCartClick={() => setIsCartOpen(true)}
        onShopClick={() => scrollToSection("shop-section")}
        onAboutClick={() => scrollToSection("about-section")}
        onContactClick={() => scrollToSection("newsletter-section")}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Hero Header Area */}
      <Hero
        onShopClick={() => scrollToSection("shop-section")}
        onQuickAdd={handleAddToCart}
      />

      {/* Core Shopping Grid Section */}
      <BSsection />
      {/* Brand Heritage Section */}
      <BrandStory />
            <section id="shop-section" className="py-20 bg-white border-b border-slate-100">
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <video
            src="/videos/a15.webm"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-auto rounded-xl shadow-lg"
          >

            </video>
      </div>
      </section>
      {/* Features Row / USP Banner */}

      {/* Athlete Testimonials Review Slider */}
      <Testimonials />

      {/* Newsletter signup Area */}
      <Newsletter />

      {/* Footer Area */}
      <Footer
        onShopClick={() => scrollToSection("shop-section")}
        onAboutClick={() => scrollToSection("about-section")}
        onContactClick={() => scrollToSection("newsletter-section")}
      />

      {/* Dialog Modals using framer-motion AnimatePresence */}
      <AnimatePresence>
        {selectedProduct && (
          <ProductDetailModal
            key="product-modal"
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
            onAddToCart={handleAddToCart}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isCartOpen && (
          <CartDrawer
            key="cart-drawer"
            isOpen={isCartOpen}
            onClose={() => setIsCartOpen(false)}
            cartItems={cartItems}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            onClearCart={handleClearCart}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
