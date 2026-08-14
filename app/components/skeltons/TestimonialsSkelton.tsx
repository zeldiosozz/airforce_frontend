import { Quote } from "lucide-react";

export default function TestimonialsSkelton(){
    return(    <section className="py-20 bg-slate-50 border-b border-slate-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">

        {/* Header Skeleton */}
        <div className="text-center space-y-3 mb-12">
          <div className="h-4 w-40 mx-auto bg-slate-200 rounded-full animate-pulse" />

          <div className="h-10 w-3/4 max-w-lg mx-auto bg-slate-200 rounded-xl animate-pulse" />

          <div className="h-4 w-2/3 max-w-md mx-auto bg-slate-200 rounded-full animate-pulse" />
        </div>

        {/* Testimonial Skeleton */}
        <div className="relative bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-slate-100/50">

          <div className="absolute top-6 left-6">
            <Quote
              size={80}
              className="text-slate-100 opacity-40"
            />
          </div>

          <div className="relative min-h-[180px] space-y-6">

            {/* Stars */}
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="w-4 h-4 bg-slate-200 rounded animate-pulse"
                />
              ))}
            </div>

            {/* Comment */}
            <div className="space-y-3">
              <div className="h-5 w-full bg-slate-200 rounded animate-pulse" />
              <div className="h-5 w-5/6 bg-slate-200 rounded animate-pulse" />
              <div className="h-5 w-2/3 bg-slate-200 rounded animate-pulse" />
            </div>

            {/* Profile */}
            <div className="flex items-center gap-4 pt-4 border-t border-slate-100">
              <div className="w-12 h-12 rounded-full bg-slate-200 animate-pulse" />

              <div className="space-y-2">
                <div className="h-3 w-24 bg-slate-200 rounded animate-pulse" />
                <div className="h-3 w-16 bg-slate-200 rounded animate-pulse" />
              </div>
            </div>

          </div>
        </div>

        {/* Dots Skeleton */}
        <div className="flex justify-center gap-2 mt-6">
          <div className="h-2 w-8 bg-slate-200 rounded-full animate-pulse" />
          <div className="h-2 w-2 bg-slate-200 rounded-full animate-pulse" />
          <div className="h-2 w-2 bg-slate-200 rounded-full animate-pulse" />
        </div>

      </div>
    </section>
);
}