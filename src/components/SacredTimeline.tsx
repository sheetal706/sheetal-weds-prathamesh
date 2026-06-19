import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { Language, WeddingEvent } from "../types";
import { translations, weddingEvents } from "../data";
import { 
  Calendar, 
  Clock, 
  Heart, 
  Sparkles, 
  Flower, 
  Flame, 
  Droplets, 
  Music,
  MapPin,
  ExternalLink
} from "lucide-react";

interface SacredTimelineProps {
  language: Language;
}

export default function SacredTimeline({ language }: SacredTimelineProps) {
  const t = translations[language];

  return (
    <section 
      id="details-section"
      className="py-28 sm:py-40 w-full flex flex-col items-center justify-center px-4 relative overflow-hidden bg-[#FCFAF5]"
    >
      {/* Background Subtle Watermark & Glowing Aura */}
      <div className="absolute inset-0 bg-[radial-gradient(#C5A059_1px,transparent_1px)] opacity-[0.03] [background-size:32px_32px] pointer-events-none" />
      
      <div className="absolute top-[15%] right-[-10%] w-[45%] h-[55%] rounded-full bg-gradient-to-br from-[#C5A059]/10 via-[#8A151B]/5 to-transparent blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-15%] w-[45%] h-[55%] rounded-full bg-gradient-to-tr from-[#8A151B]/8 via-[#C5A059]/5 to-transparent blur-[120px] pointer-events-none" />

      {/* Floating Sparkle Microparticles */}
      {[...Array(15)].map((_, i) => {
        const size = Math.random() * 4 + 2;
        const initialX = Math.random() * 100;
        const initialY = Math.random() * 100;
        const dur = Math.random() * 15 + 10;
        return (
          <motion.div
            key={i}
            className="absolute rounded-full bg-[#C5A059]/20 pointer-events-none"
            style={{
              width: size,
              height: size,
              left: `${initialX}%`,
              top: `${initialY}%`,
            }}
            animate={{
              y: [0, -80, 0],
              opacity: [0.15, 0.6, 0.15],
              scale: [1, 1.4, 1],
            }}
            transition={{
              duration: dur,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        );
      })}
      
      {/* Title Header with Elite Royal Flair */}
      <div className="text-center mb-28 sm:mb-32 max-w-2xl px-4 relative z-10 select-none">
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 text-[#8A151B] text-xs font-mono tracking-[0.3em] font-extrabold uppercase mb-4"
        >
          <Sparkles className="w-4 h-4 text-[#8A151B] animate-pulse" />
          {language === Language.ENGLISH ? "WEDDING ITINERARY" : "ಶುಭ ಲಗ್ನದ ಮಹೂರ್ತಗಳು"}
        </motion.div>
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-3xl sm:text-5xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-[#8A151B] via-[#C5A059] to-[#8A151B] font-extrabold tracking-tight leading-normal pb-2"
        >
          {t.timelineTitle}
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-xs sm:text-sm text-stone-500 font-medium font-sans tracking-wide mt-3 max-w-lg mx-auto leading-relaxed"
        >
          {t.timelineSubtitle}
        </motion.p>

        <div className="flex items-center justify-center gap-3 mt-6">
          <div className="h-[1px] bg-gradient-to-r from-transparent to-[#C5A059]/40 w-16" />
          <Heart className="w-3.5 h-3.5 text-[#8A151B] fill-[#8A151B]/10 animate-pulse" />
          <div className="h-[1px] bg-gradient-to-l from-transparent to-[#C5A059]/40 w-16" />
        </div>
      </div>

      {/* Actual Timeline Tree container */}
      <div className="relative max-w-4xl w-full flex flex-col gap-12 sm:gap-14 px-2 sm:px-4">
        {weddingEvents.map((event: WeddingEvent, index: number) => (
          <TimelineItem 
            key={index} 
            event={event} 
            index={index} 
            language={language} 
            total={weddingEvents.length} 
          />
        ))}
      </div>

      {/* Decorative Traditional Footer Ornament */}
      <div className="flex flex-col items-center mt-24 select-none opacity-85">
        <div className="w-40 h-[1px] bg-gradient-to-r from-transparent via-[#C5A059]/30 to-transparent" />
        <div className="w-2.5 h-2.5 rounded-full border border-dashed border-[#8A151B]/50 bg-[#8A151B]/5 mt-4 rotate-45 animate-spin-slow" />
      </div>
    </section>
  );
}

interface TimelineItemProps {
  key?: number;
  event: WeddingEvent;
  index: number;
  language: Language;
  total: number;
}

function TimelineItem({ event, index, language, total }: TimelineItemProps) {
  const itemRef = useRef<HTMLDivElement>(null);
  const isEven = index % 2 === 0;

  // Track the scrolling of this specific timeline item in the viewport
  const { scrollYProgress } = useScroll({
    target: itemRef,
    offset: ["start end", "center center"],
  });

  // Create a smoothed spring progression
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 85,
    damping: 24,
    restDelta: 0.001
  });

  // 1. Line Progress - draws line downwards to this node
  const lineScaleY = useTransform(smoothProgress, [0, 0.45], [0, 1]);

  // 2. Node scale - medallions bloom open once line makes contact
  const nodeScale = useTransform(smoothProgress, [0.35, 0.6], [0, 1]);
  const nodeRotate = useTransform(smoothProgress, [0.35, 0.8], [-60, 0]);

  // 3. Card scale, slide, & glow fade-in matching the timeline link sequence
  const cardOpacity = useTransform(smoothProgress, [0.45, 0.85], [0.1, 1]);
  const cardX = useTransform(smoothProgress, [0.45, 0.85], [isEven ? -40 : 40, 0]);
  const cardScale = useTransform(smoothProgress, [0.45, 0.9], [0.94, 1]);

  // Glowing laser trace bar indicator
  const borderProgress = useTransform(smoothProgress, [0.6, 1], ["0%", "100%"]);

  // Pick Event Illustrative Icon and Gold gradient based on event title/index
  const getEventIcon = (idx: number) => {
    switch (idx) {
      case 0:
        return <Flower className="w-5 h-5 text-[#8A151B]" />;
      case 1:
        return <Flame className="w-5 h-5 text-amber-600 animate-pulse" />;
      case 2:
        return <Droplets className="w-5 h-5 text-[#8A151B]" />;
      case 3:
        return <Music className="w-5 h-5 text-[#C5A059]" />;
      default:
        return <Heart className="w-5 h-5 text-[#8A151B]" />;
    }
  };

  return (
    <div 
      ref={itemRef} 
      className="relative w-full min-h-[220px] md:min-h-[260px] flex flex-col md:flex-row items-stretch"
    >
      {/* ================= VERTICAL TRACKER ================= */}
      {/* Base background connector line slot */}
      {index < total - 1 && (
        <div className="absolute left-6 md:left-1/2 top-10 bottom-0 w-[1.5px] bg-stone-200/60 transform -translate-x-1/2 pointer-events-none hidden md:block" />
      )}

      {/* Golden illuminated flow line connecting sequentially */}
      {index < total - 1 && (
        <motion.div 
          style={{ scaleY: lineScaleY, originY: 0 }}
          className="absolute left-6 md:left-1/2 top-10 bottom-0 w-[2px] bg-gradient-to-b from-[#C5A059] to-[#8A151B]/70 transform -translate-x-1/2 pointer-events-none hidden md:block z-10 origin-top shadow-[0_0_10px_rgba(197,160,89,0.3)]"
        />
      )}

      {/* ================= MEDALLION GRAPHIC ================= */}
      <div className="absolute left-6 md:left-1/2 top-10 -translate-y-1/2 -translate-x-1/2 z-20 pointer-events-none hidden md:block">
        <motion.div 
          style={{ scale: nodeScale, rotate: nodeRotate }}
          className="w-14 h-14 rounded-full border-[1.5px] border-[#C5A059] bg-white shadow-[0_10px_35px_rgba(138,100,20,0.06)] flex items-center justify-center relative select-none"
        >
          {/* Subtle outer rotating dashed halo thread */}
          <div className="absolute -inset-[3.5px] rounded-full border border-dashed border-[#C5A059]/25 animate-spin-slow pointer-events-none" />
          
          {/* Heart/flourish breathing ring */}
          <div className="absolute inset-1 rounded-full border border-double border-[#8A151B]/20 flex items-center justify-center bg-gradient-to-br from-white to-[#FCFAF5]">
            {getEventIcon(index)}
          </div>
        </motion.div>
      </div>

      {/* Custom decorative horizontal linking beam bridging node to active Card */}
      <motion.div 
        style={{ scaleX: nodeScale, originX: isEven ? 1 : 0 }}
        className={`absolute top-10 h-[1px] bg-gradient-to-r from-transparent via-[#C5A059]/30 to-transparent w-[8%] hidden md:block pointer-events-none z-10 ${
          isEven ? "left-[42%]" : "right-[42%]"
        }`}
      />

      {/* Event Dot helper for Mobile view */}
      <motion.div 
        style={{ scale: nodeScale }}
        className="absolute left-6 top-10 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full border border-[#C5A059]/40 bg-white md:hidden z-20 flex items-center justify-center p-1 shadow-md select-none"
      >
        <div className="w-full h-full rounded-full border border-dashed border-[#8A151B]/35 flex items-center justify-center bg-[#8A151B]/5">
          {getEventIcon(index)}
        </div>
      </motion.div>

      {/* ================= EVENT DESCRIPTION CONTENT BLOCK ================= */}
      <div className={`w-full md:w-[45%] pl-12 md:pl-0 flex flex-col justify-center ${
        isEven ? "md:mr-auto text-left" : "md:ml-auto text-left"
      }`}>
        
        {/* Scroll Scale and Entry wrapper */}
        <motion.div
          style={{ 
            opacity: cardOpacity, 
            x: cardX,
            scale: cardScale
          }}
          className="w-full"
        >
          {/* The Animated High-End Editorial Interactive Card */}
          <motion.div
            whileHover={{ 
              y: -8,
              borderColor: "rgba(138, 21, 27, 0.55)",
              boxShadow: "0 30px 65px rgba(138, 100, 20, 0.07), inset 0 0 50px rgba(255, 255, 255, 1)"
            }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="w-full relative flex flex-col justify-between bg-white border border-[#C5A059]/30 shadow-[0_15px_45px_rgba(138,100,20,0.02)] transition-all duration-500 rounded-[28px] p-7 sm:p-9 group overflow-hidden cursor-pointer"
          >
            {/* Soft Warm Romantic Glow Backdrop */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#8A151B]/[0.015] via-transparent to-[#C5A059]/8 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

            {/* Laser Border Tracer linked to scrolling element state */}
            <motion.div 
              style={{ width: borderProgress }}
              className="absolute top-0 left-0 h-[2.5px] bg-gradient-to-r from-transparent via-[#8A151B] to-transparent shadow-[0_1px_8px_rgba(138,21,27,0.3)]" 
            />

            {/* Elegant Floating Love spark on Hover */}
            <Heart className="absolute -bottom-6 -right-6 w-16 h-16 text-[#8A151B]/5 group-hover:text-[#8A151B]/8 group-hover:-translate-y-8 group-hover:-translate-x-8 transition-all duration-700 ease-out pointer-events-none stroke-1 fill-[#8A151B]/[0.01]" />

            {/* Golden corner trim accents */}
            <div className="absolute top-4.5 left-4.5 w-4 h-4 border-t border-l border-amber-500/15 group-hover:border-[#8A151B]/40 transition-colors duration-500" />
            <div className="absolute top-4.5 right-4.5 w-4 h-4 border-t border-r border-amber-500/15 group-hover:border-[#8A151B]/40 transition-colors duration-500" />
            <div className="absolute bottom-4.5 left-4.5 w-4 h-4 border-b border-l border-amber-500/15 group-hover:border-[#8A151B]/40 transition-colors duration-500" />
            <div className="absolute bottom-4.5 right-4.5 w-4 h-4 border-b border-r border-amber-500/15 group-hover:border-[#8A151B]/40 transition-colors duration-500" />

            {/* Thin internal gold margins */}
            <div className="absolute inset-2.5 border border-dashed border-[#C5A059]/10 group-hover:border-[#C5A059]/25 transition-colors duration-500 pointer-events-none rounded-[20px]" />

            <div className="z-10">
              {/* Header: Pure Premium English Date + Index */}
              <div className="flex items-start justify-between pb-3.5 border-b border-[#C5A059]/15 select-none pointer-events-none">
                <div className="flex flex-col gap-1 text-[#8A151B]">
                  <span className="text-[11px] sm:text-xs font-mono tracking-[0.2em] font-extrabold uppercase flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-[#8A151B] animate-pulse shrink-0" />
                    <span>{event.dateEn}</span>
                  </span>
                </div>

                <span className="text-xl font-serif font-black italic text-[#C5A059]/25 group-hover:text-[#8A151B]/45 transition-colors duration-700">
                  0{index + 1}
                </span>
              </div>

              {/* Event Typography with Elite Saffron/Ruby balance */}
              <div className="mt-5 flex flex-col gap-1.5">
                <h3 className="text-xl sm:text-2xl font-serif font-extrabold text-stone-900 group-hover:text-[#8A151B] transition-colors duration-500 tracking-wide leading-tight">
                  {event.titleEn}
                </h3>
                <h4 className="text-sm font-sans font-bold text-[#8A151B]/90 group-hover:text-[#8A151B] transition-colors duration-500 tracking-wide leading-relaxed">
                  {event.titleKn}
                </h4>
              </div>

              {/* Event Description (High-End Editorial Layout) */}
              <div className="mt-3.5 text-xs sm:text-sm text-stone-500 font-sans leading-relaxed group-hover:text-stone-700 transition-colors duration-500 space-y-1.5">
                <p className="font-semibold italic text-stone-600">
                  &ldquo; {event.descriptionEn} &rdquo;
                </p>
              </div>

              {/* Pure Premium Timing badge in English */}
              <div className="flex items-center gap-2 mt-5 select-none pointer-events-none">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#8A151B]/5 border border-[#8A151B]/15 rounded-full shadow-[0_2px_8px_rgba(138,21,27,0.03)] group-hover:bg-[#8A151B]/10 group-hover:border-[#8A151B]/30 transition-all duration-500">
                  <Clock className="w-3.5 h-3.5 text-[#8A151B]" />
                  <span className="font-mono font-black text-[#8A151B] tracking-widest text-[10px] sm:text-xs uppercase">
                    {event.timeEn}
                  </span>
                </div>
              </div>
            </div>

          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
