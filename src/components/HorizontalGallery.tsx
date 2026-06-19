import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Language } from "../types";
import { Sparkles, Camera, Heart, ArrowRight } from "lucide-react";

interface GalleryItem {
  id: number;
  image: string;
  titleEn: string;
  titleKn: string;
  descEn: string;
  descKn: string;
  tagEn: string;
  tagKn: string;
}

const galleryItems: GalleryItem[] = [
  {
    id: 1,
    image: "https://lh3.googleusercontent.com/d/1r2J0PIflY4UsPCY93zRIFJcAB9QGWePj",
    titleEn: "Cherished Moments I",
    titleKn: "ಪ್ರೀತಿಯ ಕ್ಷಣಗಳು ೧",
    tagEn: "Love",
    tagKn: "ಪ್ರೀತಿ",
    descEn: "A timeless capture of devotion, happiness, and our unique path of absolute unison.",
    descKn: "ಪರಸ್ಪರ ಒಲವಿನ ಕಲ್ಯಾಣ ಸಂಕೇತವಾಗಿ ಮಧುಮಗಳ ಹಸ್ತಗಳಿಗೆ ರಂಗು ತುಂಬುವ ಪ್ರೇಮಮಯ ಕಲಾ ಸಂಭ್ರಮ."
  },
  {
    id: 2,
    image: "https://lh3.googleusercontent.com/d/1ERf80BNtuZ79OOw5kgomKMH4VpH-PYQo",
    titleEn: "Cherished Moments II",
    titleKn: "ಪ್ರೀತಿಯ ಕ್ಷಣಗಳು ೨",
    tagEn: "Journey",
    tagKn: "ಪಯಣ",
    descEn: "Blessed paths and sweet blossoms preparing our souls for a golden lifetime adventure.",
    descKn: "ಮಂಗಳಕರ ಹೂಗಳೊಂದಿಗೆ ನವದಂಪತಿಗಳ ಮೈಗೆ ಹಳದಿ ಹಚ್ಚುವ ಮಧುರ ಹಾಗೂ ಪ್ರವಿತ್ರ ಕ್ಷಣ."
  },
  {
    id: 3,
    image: "https://lh3.googleusercontent.com/d/18iJ76YbwCtYxl4ouZQojPmb0AI-igt8N",
    titleEn: "Cherished Moments III",
    titleKn: "ಪ್ರೀತಿಯ ಕ್ಷಣಗಳು ೩",
    tagEn: "Union",
    tagKn: "ಬಂಧನ",
    descEn: "With pure hearts as witness, exchanging prayers for unconditional love and shared destiny.",
    descKn: "ದ್ವಿಗುಣ ವೇದ ಮಂತ್ರಗಳ ಪವಿತ್ರ ಘೋಷದ ಸಾಕ್ಷಿಯಾಗಿ ಸಾಗುವ ಸಪ್ತಪದಿ ಮತ್ತು ಕಲ್ಯಾಣ ಸಂಭ್ರಮ."
  },
  {
    id: 4,
    image: "https://lh3.googleusercontent.com/d/1rlnzzeSOgPzS5GcipEFSTNe8oOtvFXl1",
    titleEn: "Cherished Moments IV",
    titleKn: "ಪ್ರೀತಿಯ ಕ್ಷಣಗಳು ೪",
    tagEn: "Eternity",
    tagKn: "ಅನಂತ",
    descEn: "Beginning our beautiful life together in pure unison, harmony, and eternal joy.",
    descKn: "ಪರಸ್ಪರ ಒಪ್ಪಿಗೆ ಹಾಗೂ ಪ್ರೀತಿಯ ಸಂಕೇತವಾಗಿ ಪರಿಮಳಯುಕ್ತ ವರಮಾಲೆಯನ್ನು ಕಂಠಕ್ಕೆ ಧರಿಸುವ ಮಹೂರ್ತ."
  }
];

export default function HorizontalGallery({ language }: { language: Language }) {
  const targetRef = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const [scrollRange, setScrollRange] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  // Track vertical page scroll within the gallery container
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Dynamically calculate the precise horizontal distance required to view every pixel of the cards row
  useEffect(() => {
    const updateScrollRange = () => {
      if (rowRef.current) {
        // We subtract window.innerWidth and add fine horizontal padding (e.g. 48px / 96px)
        const range = rowRef.current.scrollWidth - window.innerWidth;
        setScrollRange(range > 0 ? range : 0);
      }
    };

    updateScrollRange();
    
    // Wire up events and a safety interval to handle dynamic layout and image loading sizes
    window.addEventListener("resize", updateScrollRange);
    
    const timer1 = setTimeout(updateScrollRange, 100);
    const timer2 = setTimeout(updateScrollRange, 800);
    const timer3 = setTimeout(updateScrollRange, 2000);

    return () => {
      window.removeEventListener("resize", updateScrollRange);
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  // Map vertical progression (0 to 1) to absolute pixel horizontal translation using a dynamic transformer function
  const x = useTransform(scrollYProgress, (progress) => progress * -scrollRange);
  
  // Progress tracker value for minimalist UI indicator
  const scaleProgress = useTransform(scrollYProgress, [0, 1], [0.1, 1]);

  // Live scroll listener monitoring which frame is perfectly focused center-stage
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      // Map progress [0, 1] directly to the card index list dynamically
      const totalElements = galleryItems.length + 1; // 4 items + 1 ending card
      const index = Math.min(
        Math.max(Math.round(latest * (totalElements - 1)), 0),
        galleryItems.length
      );
      setActiveIndex(index);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  return (
    <div 
      ref={targetRef} 
      className="relative h-[300vh] sm:h-[420vh] w-full"
      style={{
        background: "transparent" // Let the beautiful interactive jasmine & gold mandala canvas render behind our cards!
      }}
      id="royal-scroll-gallery"
    >
      {/* Ambient Premium Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Subtle patterned watermark dot grid */}
        <div className="absolute inset-0 bg-[radial-gradient(#C5A059_1px,transparent_1px)] opacity-[0.02] [background-size:32px_32px]" />

        {/* Large slow shifting light beams */}
        <div className="absolute top-[20%] left-[-10%] w-[50%] h-[60%] rounded-full bg-gradient-to-tr from-amber-500/5 to-transparent blur-[120px] animate-pulse duration-[8s]" />
        <div className="absolute bottom-[20%] right-[-10%] w-[50%] h-[60%] rounded-full bg-gradient-to-bl from-[#8A151B]/5 to-transparent blur-[120px] animate-pulse duration-[12s]" />

        {/* Slow-rotating golden orbits */}
        <motion.div 
          className="absolute top-[15%] right-[10%] w-96 h-96 border border-amber-550/5 rounded-full flex items-center justify-center opacity-25"
          animate={{ rotate: 360 }}
          transition={{ duration: 75, repeat: Infinity, ease: "linear" }}
        >
          <div className="w-80 h-80 border border-dashed border-amber-550/5 rounded-full shadow-inner" />
          <div className="w-64 h-64 border border-amber-550/3 rounded-full" />
        </motion.div>

        <motion.div 
          className="absolute bottom-[15%] left-[5%] w-120 h-120 border border-amber-550/4 rounded-full flex items-center justify-center opacity-15"
          animate={{ rotate: -360 }}
          transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
        >
          <div className="w-100 h-100 border border-dashed border-amber-550/3 rounded-full" />
          <div className="w-80 h-80 border border-[#C5A059]/2 rounded-full" />
        </motion.div>

        {/* Dynamic animated floating golden particles (Bokeh) */}
        {[...Array(15)].map((_, i) => {
          const size = Math.random() * 5 + 3; // 3px to 8px
          const initialX = Math.random() * 100; 
          const initialY = Math.random() * 100;
          const duration = Math.random() * 15 + 15; // 15s to 30s
          const moveRangeX = Math.random() * 120 - 60; // -60px to 60px
          const moveRangeY = Math.random() * 140 - 70; // -70px to 70px
          
          return (
            <motion.div
              key={i}
              className="absolute rounded-full bg-[#C5A059]/15 filter blur-[1px] select-none pointer-events-none"
              style={{
                width: size,
                height: size,
                left: `${initialX}%`,
                top: `${initialY}%`,
              }}
              animate={{
                x: [0, moveRangeX, -moveRangeX, 0],
                y: [0, moveRangeY, -moveRangeY, 0],
                opacity: [0.1, 0.45, 0.15, 0.4, 0.1],
                scale: [1, 1.25, 0.85, 1.15, 1],
              }}
              transition={{
                duration: duration,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          );
        })}
      </div>

      {/* Sticky Panel Viewport */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden z-25">
        
        {/* Dynamic Minimalist Timeline Header */}
        <div className="absolute top-10 left-12 right-12 z-30 flex items-center justify-between pointer-events-none select-none">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#8A151B] animate-pulse" />
          </div>

          <div className="flex flex-col items-end gap-1.5">
            <div className="w-24 sm:w-36 h-[1.5px] bg-[#8A151B]/15 rounded-full relative overflow-hidden">
              <motion.div 
                style={{ scaleX: scaleProgress, originX: 0 }}
                className="absolute inset-y-0 left-0 right-0 bg-gradient-to-r from-[#8A151B] to-[#C5A059]" 
              />
            </div>
          </div>
        </div>

        {/* Cinematic Subtle Background Text */}
        <div className="absolute inset-x-0 bottom-12 pointer-events-none opacity-[0.012] select-none text-center">
          <h2 className="text-[13vw] font-display font-bold uppercase tracking-[0.2em] text-[#8A151B]">
            ETHEREAL
          </h2>
        </div>

        {/* Sleek Editorial Header Title */}
        <div className="px-6 md:px-16 pt-12 select-none max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-1.5 text-[#8A151B]/80 text-xs font-mono tracking-[0.3em] font-bold uppercase mb-2">
            <Camera className="w-3.5 h-3.5 text-[#8A151B]" />
            {language === Language.ENGLISH ? "VISUAL MEMORIES" : "ರಮಣೀಯ ಸಂಭ್ರಮದ ಒಲವು"}
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif text-stone-900 font-bold tracking-tight leading-tight select-none">
            {language === Language.ENGLISH ? "Journey of Our Union" : "ನಮ್ಮ ಒಲವಿನ ದಾಂಪತ್ಯ ಪಯಣ"}
          </h2>
        </div>

        {/* Horizontal Moving Window Container */}
        <div className="relative mt-10 sm:mt-14 flex items-center z-10 cursor-grab active:cursor-grabbing">
          <motion.div 
            ref={rowRef}
            style={{ x }} 
            className="flex gap-8 sm:gap-12 px-8 sm:px-24"
          >
            {galleryItems.map((item, index) => {
              const isActive = activeIndex === index;
              return (
                <div 
                  key={item.id} 
                  className="w-[280px] sm:w-[380px] shrink-0 pb-8 transition-all duration-700 ease-out transform"
                  style={{
                    filter: isActive ? "none" : "blur(4px)",
                    opacity: isActive ? 1 : 0.35,
                    transform: isActive ? "scale(1.025)" : "scale(0.92)"
                  }}
                >
                  {/* Premium Ornate Luxury Wedding Frame */}
                  <div className={`relative bg-white p-4 sm:p-5 border transition-all duration-700 rounded-2xl group select-none ${isActive ? 'border-[#8A151B]/60 shadow-[0_25px_60px_rgba(138,100,20,0.12)]' : 'border-[#C5A059]/25 shadow-[0_15px_30px_rgba(138,100,20,0.03)]'}`}>
                    
                    {/* Subtle inner decorative dash frame list styling */}
                    <div className="absolute inset-2 border border-dashed border-[#C5A059]/10 group-hover:border-[#8A151B]/25 rounded pointer-events-none transition-colors duration-500" />
                    
                    {/* Classic Ivory Mount / Matting */}
                    <div className="relative bg-[#FCFAF5] p-1.5 rounded-lg border border-[#C5A059]/20 shadow-inner overflow-hidden">
                      <div className="relative aspect-[3/3.8] overflow-hidden rounded-md bg-[#FAF6EE]">
                        <img 
                          src={item.image} 
                          alt="Wedding Celebration Memory"
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover filter brightness-[0.98] contrast-[1.01] transform duration-1000 ease-out group-hover:scale-[1.04]" 
                          onError={(e) => {
                            const target = e.currentTarget;
                            if (target.src.startsWith("https://lh3.googleusercontent.com/d/")) {
                              const id = target.src.split("/").pop();
                              target.src = `https://drive.google.com/uc?export=view&id=${id}`;
                            } else {
                              target.src = "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=1000&q=80";
                            }
                          }}
                          onLoad={() => {
                            if (rowRef.current) {
                              const range = rowRef.current.scrollWidth - window.innerWidth;
                              setScrollRange(range > 0 ? range : 0);
                            }
                          }}
                        />
                        {/* Gentle inner shadow on photo */}
                        <div className="absolute inset-0 bg-gradient-to-t from-white/10 via-transparent to-white/5 pointer-events-none" />
                      </div>
                    </div>

                    {/* High-End Metal Plaque with centered Heart Seal medallion */}
                    <div className="mt-4 flex flex-col items-center justify-center relative">
                      <div className="flex items-center gap-3">
                        <div className="h-[1px] w-12 bg-gradient-to-l from-[#C5A059]/30 to-transparent" />
                        <div className={`w-8 h-8 rounded-full bg-[#FCFAF5] border flex items-center justify-center shadow-sm transform duration-500 group-hover:scale-110 ${isActive ? 'border-[#8A151B]/60' : 'border-[#C5A059]/40'}`}>
                          <Heart className={`w-3.5 h-3.5 animate-pulse ${isActive ? 'text-[#8A151B] fill-[#8A151B]/80' : 'text-[#C5A059] fill-[#C5A059]/10'}`} />
                        </div>
                        <div className="h-[1px] w-12 bg-gradient-to-r from-[#C5A059]/30 to-transparent" />
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}

            {/* Ending Minimalist Editorial Card - Guides back to flow cleanly */}
            {(() => {
              const isEndingActive = activeIndex === galleryItems.length;
              return (
                <div 
                  className="w-[280px] sm:w-[340px] shrink-0 flex flex-col justify-between p-8 border border-[#C5A059]/25 rounded-2xl bg-white text-left shadow-lg relative select-none mr-12 sm:mr-20 transition-all duration-700 ease-out transform"
                  style={{
                    filter: isEndingActive ? "none" : "blur(4px)",
                    opacity: isEndingActive ? 1 : 0.35,
                    transform: isEndingActive ? "scale(1.025)" : "scale(0.92)"
                  }}
                >
                  <div className="pt-4">
                    <div className="w-10 h-10 rounded-full bg-[#8A151B]/5 flex items-center justify-center text-[#8A151B] mb-6 border border-[#8A151B]/15">
                      <Heart className="w-4 h-4 text-[#8A151B] fill-[#8A151B]/15" />
                    </div>
                    
                    <span className="text-[9px] font-mono tracking-[0.25em] uppercase text-stone-500 font-bold">
                      {language === Language.ENGLISH ? "UP NEXT" : "ಕಾರ್ಯಕ್ರಮ ವಿವರಗಳು"}
                    </span>
                    
                    <h4 className="text-2xl font-serif text-stone-900 font-bold tracking-wide mt-2 mb-3">
                      {language === Language.ENGLISH ? "Explore the Venues" : "ಮಹೂರ್ತ ಮತ್ತು ಸ್ಥಳಗಳು"}
                    </h4>
                    
                    <p className="text-xs text-stone-600 font-medium leading-relaxed font-sans">
                      {language === Language.ENGLISH 
                        ? "Discover the exact map locations, traditional timings, and celebrations detailed below." 
                        : "ಶುಭ ಮುಹೂರ್ತ, ಸ್ಥಳದ ವಿಳಾಸ ಹಾಗು ಗೂಗಲ್ ನಕ್ಷೆಗಳ ಮಾಹಿತಿಯನ್ನು ಕೆಳಗೆ ನೀಡಲಾಗಿದೆ."}
                    </p>
                  </div>
                  
                  <div className="mt-8 flex items-center justify-between">
                    <div className="h-[1px] w-full bg-[#C5A059]/25" />
                  </div>
                </div>
              );
            })()}
          </motion.div>
        </div>

        {/* Minimal Bottom footer decoration */}
        <div className="absolute bottom-6 left-12 pointer-events-none opacity-45 select-none">
          <p className="text-[9px] font-mono uppercase tracking-[0.3em] text-stone-550 font-bold">
            {language === Language.ENGLISH ? "© AUSPICIOUS UNION" : "© ಶುಭ ವಿವಾಹ"}
          </p>
        </div>
      </div>
    </div>
  );
}
