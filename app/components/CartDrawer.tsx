"use client";
import React, { useState } from "react";
import { X, Trash2, ShoppingBag, CreditCard, ArrowRight, CheckCircle2, ShieldAlert } from "lucide-react";
import { Product } from "@/app/lib/data/products";
import { createOrder } from "@/app/lib/data/orders";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
export interface CartItem {
  id: string; // unique item id based on product + size + color
  product: Product;
  size: number;
  colorId: string;
  quantity: number;
}

interface CartDrawerProps {
  key?: React.Key;
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}: CartDrawerProps) {
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [address, setAddress] = useState("");
  const [googleMaps, setgoogleMaps] = useState("");
  const [phone, setPhone] = useState("");
    const [mapsError, setMapsError] = useState("");  // ✅ حالة جديدة لرسالة الخطأ

const isValidGoogleMapsLink = (value: string): boolean => {
  const trimmed = value.trim();
  
  // تحقق من الصيغة العامة للرابط الأول
  try {
    const url = new URL(trimmed);
    
    // تحقق إن الدومين فعلاً بتاع جوجل ماب
    const validDomains = [
      "maps.google.com",
      "www.google.com",
      "goo.gl",
      "maps.app.goo.gl",
    ];
    
    return validDomains.some((domain) => url.hostname.includes(domain));
  } catch {
    return false;
  }
};
  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const shippingFee : number = 80;
  const total = subtotal + shippingFee;

  // Color name dictionary
  const getColorName = (hex: string) => {
    switch (hex.toUpperCase()) {
      case "#EA580C": return "Orange";
      case "#000000": return "Black";
      case "#9CA3AF": return "Gray";
      case "#DC2626": return "Red";
      case "#1F2937": return "Dark Gray";
      case "#FFFFFF": return "White";
      case "#2563EB": return "Blue";
      case "#F3F4F6": return "Soft Gray";
      case "#22C55E": return "Neon Green";
      case "#4B5563": return "Slate";
      default: return "Custom";
    }
  };
const handleCheckoutSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsCheckingOut(true);
   if (!isValidGoogleMapsLink(googleMaps)) {
      setMapsError ("please enter valid google maps link .. for example: https://maps.app.goo.gl/...)");
      return;
    }
    setMapsError(""); 

  try {
    const payload = {
      address,
      google_maps_link: googleMaps,
      phone,
      items: cartItems.map((item) => ({
        product_id: Number(item.product.id),
        size: String(item.size),
        color: item.colorId,
        quantity: item.quantity,
      })),
    };

    await createOrder(payload);

    setIsCheckingOut(false);
    setIsSuccess(true);

    setTimeout(() => {
      onClearCart();
      setIsSuccess(false);
      onClose();
    }, 4000);

  } catch (error) {
    console.error("Order failed:", error);
    setIsCheckingOut(false);
    alert("Order failed try again :(");
  }
};
  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Background overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity"
      />

      {/* Sliding Drawer Container */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 220 }}
          className="w-screen max-w-md bg-white shadow-2xl flex flex-col h-full"
        >
          {/* Header */}
          <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="text-orange-500" size={20} />
              <h2 className="font-display font-bold text-lg text-slate-900">Your Shopping Bag</h2>
              <span className="bg-slate-100 text-slate-600 font-mono text-xs font-semibold px-2 py-0.5 rounded-full">
                {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
              </span>
            </div>
            <button
              id="cart-drawer-close-btn"
              onClick={onClose}
              className="text-slate-400 hover:text-slate-800 p-1.5 rounded-full hover:bg-slate-50 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto px-6 py-4">
            <AnimatePresence mode="popLayout">
              {isSuccess ? (
                /* Success screen */
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="h-full flex flex-col items-center justify-center text-center space-y-4"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-500 flex items-center justify-center mx-auto animate-bounce">
                    <CheckCircle2 size={36} />
                  </div>
                  <h3 className="font-display font-bold text-xl text-slate-900">Order Placed Successfully!</h3>
                  <p className="text-sm text-slate-500 max-w-xs font-light">
                    Your ShoeSpike premium sneakers are locked in. We've initiated express packing at our Kerala studio workshop.
                  </p>
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 w-full text-xs text-left space-y-1 font-mono">
                    <div className="text-slate-400 uppercase text-[9px] font-bold">Shipping Info</div>
                    <div className="text-slate-700 font-semibold truncate">Address: {address || "Express Delivery"}</div>
                    <div className="text-slate-700 font-semibold">Contact: {phone || "Verified Customer"}</div>
                    <div className="text-slate-700 font-semibold">Delivery Time: 48-72 Hours</div>
                  </div>
                  <span className="text-xs text-orange-500 animate-pulse font-medium">Auto-closing shopping bag...</span>
                </motion.div>
              ) : isCheckingOut ? (
                /* Checkout details screen */
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-6 pt-4"
                >
                  <h3 className="font-display font-semibold text-base text-slate-800 border-b pb-2">
                    Shipping & Payment Details
                  </h3>
                  <form onSubmit={handleCheckoutSubmit} className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-600 block">Deliver to Address</label>
                      <textarea
                        required
                        placeholder="House No, Road, City, Area, "
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-orange-500 outline-none min-h-[80px]"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-600 block">Google Maps Link Address</label>
                      <textarea
                        required
                        placeholder=" "
                        value={googleMaps}
                        onChange={(e) => setgoogleMaps(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-orange-500 outline-none min-h-[80px]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-600 block">Contact Phone Number</label>
                      <input
                        type="tel"
                        required
                        placeholder="+20 00000 00000"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-orange-500 outline-none"
                      />
                    </div>

                    <div className="bg-slate-50 p-4 rounded-xl space-y-2 border border-slate-100">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Payment Method</span>
                      <div className="flex items-center gap-2.5 text-xs text-slate-700 font-medium">
                        <CreditCard size={16} className="text-orange-500" />
                        <span>Cash on Delivery (COD)</span>
                      </div>
                    </div>

                    <button
                      type="submit"
                      id="checkout-confirm-btn"
                      className="w-full bg-slate-900 hover:bg-orange-500 text-white py-3.5 px-4 rounded-xl font-display font-semibold flex items-center justify-center gap-2 shadow-lg hover:shadow-orange-500/20 hover:-translate-y-0.5 transition-all"
                    >
                      <span>Complete Simulated Purchase — {total}.LE</span>
                      <ArrowRight size={18} />
                    </button>

                    <button
                      type="button"
                      id="checkout-cancel-btn"
                      onClick={() => setIsCheckingOut(false)}
                      className="w-full bg-slate-100 hover:bg-slate-200 text-slate-600 py-2 rounded-xl text-xs font-semibold transition-colors"
                    >
                      Back to Shopping Bag
                    </button>
                  </form>
                </motion.div>
              ) : cartItems.length === 0 ? (
                /* Empty bag screen */
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="h-full flex flex-col items-center justify-center text-center space-y-4"
                >
                  <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-300">
                    <ShoppingBag size={24} />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-slate-900 text-sm">Your bag is empty</h3>
                    <p className="text-xs text-slate-400 font-light mt-1 max-w-[200px]">
                      Add premium sneakers from our collection to fill it up.
                    </p>
                  </div>
                  <button
                    id="cart-drawer-continue-btn"
                    onClick={onClose}
                    className="bg-slate-900 hover:bg-orange-500 text-white px-5 py-2 rounded-lg text-xs font-semibold shadow-md transition-colors"
                  >
                    Explore Shoes
                  </button>
                </motion.div>
              ) : (
                /* Items List */
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -30 }}
                      className="flex gap-4 p-3 rounded-2xl hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all group"
                    >
                      {/* Product Thumbnail */}
                      <div className="w-20 h-20 bg-slate-50 rounded-xl flex items-center justify-center p-2 flex-shrink-0 relative overflow-hidden">
                        <Image
                          src={item.product.image.find(img => img.id === item.colorId)?.url ?? item.product.image[0].url}
                          alt={item.product.name}
                          fill
                          className={`w-full h-auto object-contain transform group-hover:scale-110 transition-transform ${
                            item.colorId === "#000000" || item.colorId === "#1F2937"
                              ? "grayscale contrast-125 brightness-75"
                              : item.colorId === "#9CA3AF" || item.colorId === "#F3F4F6"
                              ? "hue-rotate-180 saturate-50 brightness-110"
                              : ""
                          }`}
                          referrerPolicy="no-referrer"
                        />
                      </div>

                      {/* Item Details */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start">
                            <h4 className="font-display font-semibold text-sm text-slate-900 line-clamp-1">
                              {item.product.name}
                            </h4>
                            <button
                              id={`cart-remove-btn-${item.id}`}
                              onClick={() => onRemoveItem(item.id)}
                              className="text-slate-300 hover:text-red-500 p-1 rounded transition-colors"
                              title="Delete Item"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                          <div className="flex items-center gap-3 mt-1.5 text-[10px] font-semibold text-slate-500 font-mono">
                            <span>US Size: {item.size}</span>
                            <span className="flex items-center gap-1">
                              Color:
                              <span
                                className="w-2.5 h-2.5 rounded-full inline-block border border-slate-200"
                                style={{ backgroundColor: item.colorId }}
                              />
                              {getColorName(item.colorId)}
                            </span>
                          </div>
                        </div>

                        {/* Quantity and sub-price row */}
                        <div className="flex justify-between items-center pt-2">
                          <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white">
                            <button
                              onClick={() => onUpdateQuantity(item.id, -1)}
                              className="w-6 h-6 flex items-center justify-center hover:bg-slate-100 text-slate-500 font-bold text-sm"
                            >
                              -
                            </button>
                            <span className="w-8 text-center text-xs font-mono font-bold text-slate-800">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => onUpdateQuantity(item.id, 1)}
                              className="w-6 h-6 flex items-center justify-center hover:bg-slate-100 text-slate-500 font-bold text-sm"
                            >
                              +
                            </button>
                          </div>
                          <span className="font-mono text-sm font-bold text-slate-800">
                            {(item.product.price * item.quantity)}.LE
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </AnimatePresence>
          </div>

          {/* Footer - Checkout panel */}
          {!isSuccess && cartItems.length > 0 && (
            <div className="border-t border-slate-100 px-6 py-6 space-y-4 bg-slate-50/50">
              {/* Cost Calculations */}
              <div className="space-y-1.5 text-sm font-sans">
                <div className="flex justify-between text-slate-500">
                  <span>Bag Subtotal</span>
                  <span className="font-mono">{subtotal}.LE</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Express Shipping</span>
                  <span className="font-mono">
                    {shippingFee === 0 ? <span className="text-emerald-500">Free</span> : `${shippingFee}.LE`}
                  </span>
                </div>
                <div className="flex justify-between text-slate-900 font-bold pt-1 border-t border-slate-100 text-base">
                  <span>Total Due</span>
                  <span className="font-mono text-orange-500">{total}.LE</span>
                </div>
              </div>

              {/* Checkout Trigger */}
              {!isCheckingOut && (
                <button
                  id="cart-checkout-proceed-btn"
                  onClick={() => setIsCheckingOut(true)}
                  className="w-full bg-slate-900 hover:bg-orange-500 text-white py-3.5 px-4 rounded-xl font-display font-semibold flex items-center justify-center gap-2 shadow-lg shadow-slate-900/10 hover:shadow-orange-500/20 hover:-translate-y-0.5 transition-all duration-300"
                >
                  Proceed to Checkout
                  <ArrowRight size={18} />
                </button>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
