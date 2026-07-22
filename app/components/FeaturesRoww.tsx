"use client";
import React from "react";
import { Truck, RefreshCw, ShieldCheck, HeartHandshake } from "lucide-react";
import { motion } from "motion/react";

export default function FeaturesRow() {
  const features = [
    {
      icon: Truck,
      title: "Complimentary Delivery",
      desc: "Free standard shipping on all orders over $150. Shipped with express priority tracking.",
    },
    {
      icon: RefreshCw,
      title: "30-Day Fit Trial",
      desc: "Not the perfect shoe width? No problem. Ship them back within 30 days for an unconditional replacement.",
    },
    {
      icon: ShieldCheck,
      title: "Encrypted Payments",
      desc: "All transactions are fully certified and secured with industrial 256-bit encryption pipelines.",
    },
    {
      icon: HeartHandshake,
      title: "24/7 Concierge Support",
      desc: "Our responsive customer care desk is live around the clock to support size fittings and delivery status.",
    },
  ];

  return (
    <div className="bg-slate-900 text-white py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6">
          {features.map((feat, idx) => {
            const IconComponent = feat.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="space-y-3 p-4 hover:bg-slate-800/40 rounded-2xl transition-colors duration-200"
              >
                <div className="w-12 h-12 bg-orange-500 rounded-2xl flex items-center justify-center text-white shadow-md shadow-orange-500/20">
                  <IconComponent size={22} />
                </div>
                <div className="space-y-1">
                  <h4 className="font-display font-semibold text-white text-base">
                    {feat.title}
                  </h4>
                  <p className="text-xs text-slate-400 font-sans font-light leading-relaxed">
                    {feat.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
