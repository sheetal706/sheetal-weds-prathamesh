import { useEffect, useState } from "react";
import { Language } from "../types";
import { translations } from "../data";
import { motion, AnimatePresence } from "motion/react";
import { Heart, RefreshCw, Star } from "lucide-react";

interface Blessing {
  id: string;
  name: string;
  blessing: string;
  createdAt?: string;
}

interface BlessingsWallProps {
  language: Language;
  blessings: Blessing[];
  onRefresh: () => void;
  isLoading: boolean;
}

export default function BlessingsWall({ language, blessings, onRefresh, isLoading }: BlessingsWallProps) {
  const t = translations[language];

  return (
    <div className="w-full max-w-4xl px-6 flex flex-col items-center" id="wedding-blessings-wall">
      <div className="text-center mb-8 relative">
        <span className="text-[#A67C1E] font-mono text-xs tracking-[0.25em] uppercase font-bold block">
          ✨ GRACE & BLOSSOMS ✨
        </span>
        <h2 className="text-3xl md:text-5xl font-display text-transparent bg-clip-text bg-gradient-to-r from-amber-900 via-[#8A6414] to-amber-900 font-extrabold tracking-tight mt-1 pb-1">
          {t.blessingsTitle}
        </h2>
        <p className="text-xs text-stone-500/80 font-serif italic mt-1 max-w-lg mx-auto leading-relaxed">
          {t.blessingsDesc}
        </p>
        
        {/* Refresh button */}
        <button
          onClick={onRefresh}
          className="absolute right-0 md:-right-12 top-1.5 p-2 rounded-full border border-amber-500/20 text-[#A67C1E] hover:text-amber-600 hover:border-amber-500/40 bg-white shadow-sm hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
          title="Refresh Blessings"
          disabled={isLoading}
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin" : ""}`} />
        </button>
      </div>

      {blessings.length === 0 ? (
        <div className="py-12 px-6 rounded-2xl border border-dashed border-amber-500/20 text-center glass-card font-sans text-xs text-stone-400 w-full max-w-lg">
          No blessings submitted yet. Be the first to leave a blessing! 💮
        </div>
      ) : (
        <div className="w-full relative">
          {/* Slider content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            <AnimatePresence mode="popLayout">
              {blessings.map((item, idx) => (
                <motion.div
                  key={item.id || idx}
                  initial={{ opacity: 0, scale: 0.95, y: 15 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: Math.min(idx * 0.1, 0.4) }}
                  className="glass-card border border-amber-500/20 hover:border-amber-500/40 rounded-2xl p-6 relative flex flex-col justify-between hover:shadow-md transition-all duration-300 group"
                >
                  {/* Glowing background on hover */}
                  <div className="absolute inset-0 bg-radial-gradient from-amber-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  <div className="relative z-10">
                    <div className="flex items-center gap-1.5 mb-3 text-amber-600/80">
                      <Star className="w-3.5 h-3.5 fill-amber-500" />
                      <span className="text-[10px] uppercase font-mono tracking-widest font-semibold text-stone-405">
                        GUEST BLESSING
                      </span>
                    </div>

                    <p className="text-sm italic font-serif leading-relaxed text-stone-700 pr-2">
                      &ldquo;{item.blessing}&rdquo;
                    </p>
                  </div>

                  <div className="border-t border-amber-500/10 pt-4 mt-5 flex items-center justify-between text-xs font-sans relative z-10">
                    <span className="font-serif font-semibold text-[#A67C1E]">
                      — {item.name}
                    </span>
                    <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500/10 group-hover:scale-125 transition-transform duration-300" />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      )}
    </div>
  );
}
