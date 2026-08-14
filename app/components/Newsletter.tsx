"use client";

import React, { useState } from "react";
import { Mail, CheckCircle, Sparkles, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";

export default function Newsletter() {
  const t = useTranslations("Newsletter");

  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !email.includes("@")) {
      setIsError(true);

      setTimeout(() => setIsError(false), 2000);

      return;
    }

    setIsSubmitted(true);
    setEmail("");
  };

  return (
    <section
      id="newsletter-section"
      className="py-20 bg-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Bold visual background block */}
        <div className="relative bg-gradient-to-br from-slate-900 to-slate-950 rounded-[40px] px-6 py-12 sm:p-16 lg:p-20 overflow-hidden shadow-2xl">

          {/* Abstract accent graphics */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl -z-0" />

          <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl -z-0" />

          <div className="relative z-10 max-w-2xl mx-auto text-center space-y-8">

            <div className="space-y-3">

              <span className="text-[10px] sm:text-xs font-bold text-orange-400 uppercase tracking-widest font-mono flex items-center justify-center gap-1">
                <Sparkles size={12} />
                {t("innerCircle")}
              </span>

              <h2 className="font-display font-bold text-3xl sm:text-4xl text-white tracking-tight leading-tight">
                {t("title")}
              </h2>

              <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto font-sans font-light leading-relaxed">
                {t("description")}
              </p>

            </div>

            {/* Form capture */}
            <AnimatePresence mode="wait">

              {isSubmitted ? (

                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-emerald-500/10 border border-emerald-500/30 p-6 rounded-2xl max-w-md mx-auto flex flex-col items-center gap-2"
                >

                  <CheckCircle className="text-emerald-400 w-8 h-8 animate-bounce" />

                  <h4 className="text-white font-semibold font-display text-sm">
                    {t("welcomeToTheClub")}
                  </h4>

                  <p className="text-xs text-slate-300 font-light text-center">
                    {t("successMessage")}
                  </p>

                  <button
                    id="newsletter-reset-btn"
                    onClick={() => setIsSubmitted(false)}
                    className="text-[10px] text-orange-400 font-mono hover:underline mt-2"
                  >
                    {t("subscribeAnotherEmail")}
                  </button>

                </motion.div>

              ) : (

                <motion.form
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="max-w-md mx-auto"
                >

                  <div
                    className={`flex flex-col sm:flex-row gap-3 p-1.5 bg-slate-800/80 border rounded-2xl shadow-inner transition-all ${
                      isError
                        ? "border-red-500 ring-2 ring-red-500/20"
                        : "border-slate-700/80 focus-within:border-orange-500 focus-within:ring-2 focus-within:ring-orange-500/20"
                    }`}
                  >

                    <div className="flex items-center gap-2 px-3 flex-1 py-2 sm:py-0">

                      <Mail className="text-slate-500 w-4 h-4" />

                      <input
                        type="email"
                        placeholder={t("emailPlaceholder")}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-transparent border-none outline-none text-white text-xs w-full font-sans font-light placeholder:text-slate-500"
                      />

                    </div>

                    <button
                      type="submit"
                      id="newsletter-submit-btn"
                      className="bg-orange-500 hover:bg-orange-600 text-white font-display text-xs font-semibold py-3 px-6 rounded-xl flex items-center justify-center gap-1.5 shadow-lg shadow-orange-500/20 transition-all duration-200"
                    >
                      {t("subscribe")}

                      <ArrowRight size={14} />
                    </button>

                  </div>

                  {isError && (
                    <span className="text-[10px] text-red-400 font-mono mt-2 block animate-shake">
                      {t("invalidEmail")}
                    </span>
                  )}

                </motion.form>
              )}

            </AnimatePresence>

            {/* Privacy */}
            <span className="text-[9px] text-slate-500 block">
              {t("privacy")}
            </span>

          </div>
        </div>
      </div>
    </section>
  );
}