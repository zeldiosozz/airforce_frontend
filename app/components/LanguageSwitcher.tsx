"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = () => {
    const newLocale = locale === "ar" ? "en" : "ar";

    const pathnameWithoutLocale = pathname.replace(
      new RegExp(`^/${locale}`),
      ""
    );

    router.push(
      `/${newLocale}${pathnameWithoutLocale || ""}`
    );
  };

  return (
    <button
      onClick={switchLocale}
      aria-label={
        locale === "ar"
          ? "Switch to English"
          : "التبديل إلى العربية"
      }
      className="
        fixed
        right-4
        top-1/2
        -translate-y-1/2
        z-50
        w-11
        h-20
        rounded-2xl
        bg-slate-900
        text-white
        shadow-xl
        border
        border-slate-700
        flex
        flex-col
        items-center
        justify-center
        gap-1
        hover:bg-orange-500
        transition-all
        duration-300
        hover:scale-105
      "
    >
      <span className="text-[10px] opacity-50">
        {locale === "ar" ? "AR" : "EN"}
      </span>

      <span className="text-[10px] font-bold">
        {locale === "ar" ? "EN" : "AR"}
      </span>
    </button>
  );
}
