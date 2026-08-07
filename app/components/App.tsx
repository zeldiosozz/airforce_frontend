"use client";
import React, { useState} from "react";
import { AnimatePresence } from "framer-motion";

// Components
import Navbar from "@/app/components/Navbar";
import Hero from "@/app/components/Hero";
import CartDrawer from "@/app/components/CartDrawer";
import BrandStory from "@/app/components/BrandStory";
import Testimonials from "@/app/components/Testimonials";
import Newsletter from "@/app/components/Newsletter";
import Footer from "@/app/components/Footer";
import BSsection from "@/app/bigcomponents/BSsection";
// Data
import useCart from "@/app/hooks/useCartt";
import useProducts from "../hooks/useProducts";

export default function App() {
  // Global React States
  const {
     cart,
     isCartOpen,
     setIsCartOpen,
     handleAddToCart,
     handleClearCart,
     handleRemoveItem, 
     handleUpdateQuantity,
     updatingId,
    } = useCart();  
const {products} = useProducts();
// const {testimonials} = useTestimonials();
  const [searchQuery, setSearchQuery] = useState("");

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
        cartItemsCount={cart["items"].reduce((acc, item) => acc + item.quantity, 0)}
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
        PRODUCTS={products}
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

      <AnimatePresence>
        {isCartOpen && (
          <CartDrawer
            key="cart-drawer"
            isOpen={isCartOpen}
            onClose={() => setIsCartOpen(false)}
            cart={cart}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            onClearCart={handleClearCart}
            updatingId={updatingId}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
