"use client";
import React, { useState } from "react";
import { X, Trash2, ShoppingBag, CreditCard, ArrowRight, CheckCircle2} from "lucide-react";
import { createOrder } from "@/app/lib/data/orders";
import { Cart } from "@/app/lib/types";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";
interface CartDrawerProps {
  key?: React.Key;
  isOpen: boolean;
  onClose: () => void;
  cart: Cart;
  onUpdateQuantity: (id: number, action: string) => void;
  onRemoveItem: (id: number) => void;
  onClearCart: () => void;
  updatingId:number | null;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  updatingId,
}: CartDrawerProps) {
  const t = useTranslations("CartDrawer");
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [fullName, setFullName] = useState("")
  const [address, setAddress] = useState("")
  const [googleMapsLink, setgoogleMapsLink] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  if (!isOpen) return null;

const handleCheckoutSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsCheckingOut(true);

  try {

    await createOrder({
      full_name: fullName,
      address,
      google_maps_link: googleMapsLink,
      phone_number: phoneNumber,
    });

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
              <h2 className="font-display font-bold text-lg text-slate-900">{t("yourShoppingBag")}</h2>
              <span className="bg-slate-100 text-slate-600 font-mono text-xs font-semibold px-2 py-0.5 rounded-full">
                {cart.total_items}
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
                  <h3 className="font-display font-bold text-xl text-slate-900">{t("orderPlacedSuccessfully")}</h3>
                  <p className="text-sm text-slate-500 max-w-xs font-light">
                   {t("orderSuccessMessage")}
                  </p>
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 w-full text-xs text-left space-y-1 font-mono">
                    <div className="text-slate-400 uppercase text-[9px] font-bold">{t("shippingInfo")}</div>
                    <div className="text-slate-700 font-semibold truncate">{t("address")}: {address || t("expressDelivery")}</div>
                    <div className="text-slate-700 font-semibold">{t("contact")}: {phoneNumber || t("verifiedCustomer")}</div>
                    <div className="text-slate-700 font-semibold">{t("deliveryTime4872Hours")}</div>
                  </div>
                  <span className="text-xs text-orange-500 animate-pulse font-medium">{t("autoClosingShoppingBag")}</span>
                </motion.div>
              ) : isCheckingOut ? (
                /* Checkout details screen */
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-6 pt-4"
                >
                  <h3 className="font-display font-semibold text-base text-slate-800 border-b pb-2">
                    {t("shippingPaymentDetails")}
                  </h3>
                  <form onSubmit={handleCheckoutSubmit} className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-600 block">{t("name")}</label>
                      <input
                        required
                        placeholder={t("yourName")}
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-orange-500 outline-none min-h-[5px]"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-600 block">{t("deliverToAddress")}</label>
                      <textarea
                        required
                        placeholder={t("houseNoRoadCityArea")}
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-orange-500 outline-none min-h-[80px]"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-600 block">{t("googleMapsLinkAddress")}</label>
                      <textarea
                        required
                        placeholder=" "
                        value={googleMapsLink}
                        onChange={(e) => setgoogleMapsLink(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-orange-500 outline-none min-h-[80px]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-600 block">{t("contactPhoneNumber")}</label>
                      <input
                        type="tel"
                        required
                        placeholder="+201090012503"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-orange-500 outline-none"
                      />
                    </div>

                    <div className="bg-slate-50 p-4 rounded-xl space-y-2 border border-slate-100">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">{t("paymentMethod")}</span>
                      <div className="flex items-center gap-2.5 text-xs text-slate-700 font-medium">
                        <CreditCard size={16} className="text-orange-500" />
                        <span>{t("cashOnDeliveryCod")}</span>
                      </div>
                    </div>

                    <button
                      type="submit"
                      id="checkout-confirm-btn"
                      className="w-full bg-slate-900 hover:bg-orange-500 text-white py-3.5 px-4 rounded-xl font-display font-semibold flex items-center justify-center gap-2 shadow-lg hover:shadow-orange-500/20 hover:-translate-y-0.5 transition-all"
                    >
                      <span>{t("completeSimulatedPurchase")} — {cart.total_price + Number(cart.shipping_fee)}.LE</span>
                      <ArrowRight size={18} />
                    </button>

                    <button
                      type="button"
                      id="checkout-cancel-btn"
                      onClick={() => setIsCheckingOut(false)}
                      className="w-full bg-slate-100 hover:bg-slate-200 text-slate-600 py-2 rounded-xl text-xs font-semibold transition-colors"
                    >
                      {t("backToShoppingBag")}
                    </button>
                  </form>
                </motion.div>
              ) : cart.total_items === 0 ? (
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
                    <h3 className="font-display font-semibold text-slate-900 text-sm">{t("yourBagIsEmpty")}</h3>
                    <p className="text-xs text-slate-400 font-light mt-1 max-w-[200px]">
                    {t("emptyBagMessage")}
                    </p>
                  </div>
                  <button
                    id="cart-drawer-continue-btn"
                    onClick={onClose}
                    className="bg-slate-900 hover:bg-orange-500 text-white px-5 py-2 rounded-lg text-xs font-semibold shadow-md transition-colors"
                  >
                    {t("exploreShoes")}
                  </button>
                </motion.div>
              ) : (
                /* Items List */
                <div className="space-y-4">
                  {cart.items.map((item) => (
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
                          src={`/api/image${item.image}`}
                          alt={item.product_name}
                          fill
                          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
                          className={`w-full h-auto object-contain transform group-hover:scale-110 transition-transform ${
                            item.color === "#000000" || item.color === "#1F2937"
                              ? "grayscale contrast-125 brightness-75"
                              : item.color === "#9CA3AF" || item.color === "#F3F4F6"
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
                              {item.product_name}
                            </h4>
                            <button
                              id={`cart-remove-btn-${item.id}`}
                              onClick={() => onRemoveItem(item.id)}
                              className="text-slate-300 hover:text-red-500 p-1 rounded transition-colors"
                              title={t("deleteItem")}
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                          <div className="flex items-center gap-3 mt-1.5 text-[10px] font-semibold text-slate-500 font-mono">
                            <span>{t("usSize")}: {item.size}</span>
                            <span className="flex items-center gap-1">
                            {t("color")}:
                              <span
                                className="w-2.5 h-2.5 rounded-full inline-block border border-slate-200"
                                style={{ backgroundColor: item.color }}
                              />
                              {(item.color)}
                            </span>
                          </div>
                        </div>

                        {/* Quantity and sub-price row */}
                        <div className="flex justify-between items-center pt-2">
                          <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white">
                            <button
                              disabled={item.id === updatingId}
                              onClick={() => onUpdateQuantity(item.id, "decrement")}
                              className="w-6 h-6 flex items-center justify-center hover:bg-slate-100 text-slate-500 font-bold text-sm"
                            >
                              -
                            </button>
                            <span className="w-8 text-center text-xs font-mono font-bold text-slate-800">
                              {item.quantity}
                            </span>
                            <button
                              disabled={item.id === updatingId}
                              onClick={() => onUpdateQuantity(item.id, "increment")}
                              className="w-6 h-6 flex items-center justify-center hover:bg-slate-100 text-slate-500 font-bold text-sm"
                            >
                              +
                            </button>
                          </div>
                          <span className="font-mono text-sm font-bold text-slate-800">
                            {item.subtotal}.LE
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
          {!isSuccess && cart.total_items > 0 && (
            <div className="border-t border-slate-100 px-6 py-6 space-y-4 bg-slate-50/50">
              {/* Cost Calculations */}
              <div className="space-y-1.5 text-sm font-sans">
                <div className="flex justify-between text-slate-500">
<span>{t("bagSubtotal")}</span>
                  <span className="font-mono">{Number(cart.total_price)}.LE</span>
                </div>
                <div className="flex justify-between text-slate-500">
<span>{t("expressShipping")}</span>
                  <span className="font-mono">
                    {Number(cart.shipping_fee) === 0 ? <span className="text-emerald-500">{t("free")}</span> : `${cart.shipping_fee}.LE`}
                  </span>
                </div>
                <div className="flex justify-between text-slate-900 font-bold pt-1 border-t border-slate-100 text-base">
                  <span>{t("totalDue")}</span>
                  <span className="font-mono text-orange-500">{Number(cart.total_price) + Number(cart.shipping_fee)}.LE</span>
                </div>
              </div>

              {/* Checkout Trigger */}
              {!isCheckingOut && (
                <button
                  id="cart-checkout-proceed-btn"
                  onClick={() => setIsCheckingOut(true)}
                  className="w-full bg-slate-900 hover:bg-orange-500 text-white py-3.5 px-4 rounded-xl font-display font-semibold flex items-center justify-center gap-2 shadow-lg shadow-slate-900/10 hover:shadow-orange-500/20 hover:-translate-y-0.5 transition-all duration-300"
                >
                  {t("proceedToCheckout")}
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
