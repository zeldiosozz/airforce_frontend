import { Sparkles, SlidersHorizontal, ShoppingBag, Eye, HelpCircle } from "lucide-react";
type Props = Record<"alignx" | "aligny" | "vid" | "sparkl" | "title" | "desc",
string>;
export default function Ssection({aligny, alignx, vid, sparkl, title, desc}:Props){
    return(
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Section Header Controls */}
          <div className={`flex flex-col ${
            alignx === "right"
            ? "md:flex-row-reverse"
            :alignx === "left"
            ? "md:flex-row"
            : "md:flex-row"
          } ${ 
            aligny === "center"
            ? "md:items-center"
            : aligny === "start"
            ? "md:items-start"
            : "md:items-end"
          } justify-between gap-6 pb-6 border-b border-slate-100/80`}>
            <div className="space-y-2 max-w-lg">
              <span className="text-[10px] font-extrabold text-orange-500 uppercase tracking-widest font-mono flex items-center gap-1.5">
                <Sparkles size={12} />
                {sparkl}
              </span>
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-slate-900 tracking-tight">
                {title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 font-sans font-light leading-relaxed">
                {desc}
              </p>
            </div>
            <div>
            <video
            src={`videos/${vid}`}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-auto rounded-xl shadow-lg"
          >

            </video>
          </div>
          </div>


        </div>

    )
}