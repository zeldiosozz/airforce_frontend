import Ssection from "@/app/components/Ssection";
import { useTranslations } from "next-intl";

export default function BSsection() {
  const t = useTranslations("BSsection");

  const SsectionData = [
    {
      sparkl: t("everyStepAStatement"),
      title: t("iconicInEveryFrame"),
      desc: t("iconicInEveryFrameDesc"),
      vid: "a10.webm",
      alignx: "right",
      aligny: "center",
    },
    {
      sparkl: t("engineeredForEverydayExcellence"),
      title: t("aLegacyCaptured"),
      desc: t("aLegacyCapturedDesc"),
      vid: "a11.webm",
      alignx: "left",
      aligny: "center",
    },
    {
      sparkl: t("everyStepAStatementSecond"),
      title: t("iconicInEveryFrameSecond"),
      desc: t("iconicInEveryFrameSecondDesc"),
      vid: "a14.webm",
      alignx: "right",
      aligny: "center",
    },
  ];

  return (
    <section
      id="shop-section"
      className="py-20 bg-white border-b border-slate-100"
    >
      {SsectionData.map((item, index) => (
        <Ssection
          key={index}
          sparkl={item.sparkl}
          title={item.title}
          desc={item.desc}
          vid={item.vid}
          aligny={item.aligny}
          alignx={item.alignx}
        />
      ))}
    </section>
  );
}