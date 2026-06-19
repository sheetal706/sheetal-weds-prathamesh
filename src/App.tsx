import { useState, useEffect } from "react";
import { Language } from "./types";
import { translations, weddingEvents } from "./data";
import MandalaCanvas from "./components/MandalaCanvas";
import Countdown from "./components/Countdown";
import AdminPanel from "./components/AdminPanel";
import HorizontalGallery from "./components/HorizontalGallery";
import SacredTimeline from "./components/SacredTimeline";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { Calendar, MapPin, Sparkles, Clock, ArrowDown, ExternalLink, Heart } from "lucide-react";

export default function App() {
  const [language, setLanguage] = useState<Language>(Language.ENGLISH);
  const [blessings, setBlessings] = useState<any[]>([]);
  const [isBlessingsLoading, setIsBlessingsLoading] = useState(false);
  const [imageSrc, setImageSrc] = useState("https://lh3.googleusercontent.com/d/1rlnzzeSOgPzS5GcipEFSTNe8oOtvFXl1");

  // Royal curtain state mapping to sessionStorage so subsequent visits bypass it optionally, but refresh allows testing!
  const [hasOpened, setHasOpened] = useState(() => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("royal_invitation_opened") === "true";
    }
    return false;
  });

  const handleOpenInvitation = () => {
    setHasOpened(true);
    if (typeof window !== "undefined") {
      sessionStorage.setItem("royal_invitation_opened", "true");
    }
  };

  const t = translations[language];

  // Framer Motion native Parallax coordinate hooks
  const { scrollY } = useScroll();
  const yHeroContent = useTransform(scrollY, [0, 800], [0, -60]);
  const yPhotoFrame = useTransform(scrollY, [0, 800], [0, 45]);
  const opacityHeroFade = useTransform(scrollY, [0, 500], [1, 0]);
  const scalePhoto = useTransform(scrollY, [0, 800], [1, 1.05]);

  // Language toggler
  const toggleLanguage = () => {
    setLanguage((prev) => (prev === Language.ENGLISH ? Language.KANNADA : Language.ENGLISH));
  };

  // Fetch blessings from backend server API
  const fetchBlessings = async () => {
    setIsBlessingsLoading(true);
    try {
      const response = await fetch("/api/rsvp");
      if (response.ok) {
        const data = await response.json();
        setBlessings(data);
      }
    } catch (e) {
      console.error("Could not fetch blessings from Express API:", e);
    } finally {
      setIsBlessingsLoading(false);
    }
  };

  useEffect(() => {
    fetchBlessings();
  }, []);

  return (
    <div className="relative min-h-screen font-sans bg-[#FCFAF5] text-[#2D2621] selection:bg-amber-100 selection:text-stone-900">

      <AnimatePresence mode="wait">
        {!hasOpened ? (
          <motion.div
            key="royal-portal-curtain"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 w-full h-full z-[100] flex flex-col items-center justify-center p-4 overflow-hidden bg-black"
          >
            {/* Left Splitting Door Velvet Curtain with elegant gold accents */}
            <motion.div
              initial={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 1.6, ease: [0.76, 0, 0.24, 1] }}
              className="absolute left-0 top-0 bottom-0 w-1/2 z-0 border-r-2 border-amber-500/20"
              style={{
                background: "linear-gradient(90deg, #1A0303 0%, #300606 60%, #1c0404 100%)",
                boxShadow: "inset -15px 0 50px rgba(0,0,0,0.85)"
              }}
            >
              {/* Traditional gold pattern watermark on left page */}
              <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#C5A059_2px,transparent_2px)] [background-size:30px_30px] pointer-events-none" />
              {/* Gold tassel drop on screen center line */}
              <div className="absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-amber-500/40 via-amber-200/50 to-transparent pointer-events-none" />
              <div className="absolute right-2 top-10 pointer-events-none text-amber-500/25 rotate-95 text-xs font-serif uppercase tracking-[0.3em]">
                SHUBH SNEHA
              </div>
            </motion.div>

            {/* Right Splitting Door Velvet Curtain with elegant gold accents */}
            <motion.div
              initial={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 1.6, ease: [0.76, 0, 0.24, 1] }}
              className="absolute right-0 top-0 bottom-0 w-1/2 z-0 border-l-2 border-amber-500/20"
              style={{
                background: "linear-gradient(270deg, #1A0303 0%, #300606 60%, #1c0404 100%)",
                boxShadow: "inset 15px 0 50px rgba(0,0,0,0.85)"
              }}
            >
              {/* Traditional gold pattern watermark on right page */}
              <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#C5A059_2px,transparent_2px)] [background-size:30px_30px] pointer-events-none" />
              {/* Gold tassel drop on screen center line */}
              <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-amber-500/40 via-amber-200/50 to-transparent pointer-events-none" />
              <div className="absolute left-2 bottom-10 pointer-events-none text-amber-500/25 -rotate-95 text-xs font-serif uppercase tracking-[0.3em]">
                VIVAHA UTSAV
              </div>
            </motion.div>

            {/* Glowing Golden Mandala rotating background for the center content box */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] sm:w-[700px] h-[550px] sm:h-[700px] border border-amber-500/10 rounded-full animate-spin-slow opacity-35 pointer-events-none z-1" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[450px] h-[350px] sm:h-[450px] border border-dashed border-amber-500/15 rounded-full animate-spin-slow opacity-45 pointer-events-none z-1" style={{ animationDirection: "reverse" }} />
            
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0, filter: "blur(12px)" }}
              transition={{ delay: 0.1, duration: 0.8 }}
              className="relative max-w-lg w-full text-center p-8 sm:p-12 border-2 border-amber-500/35 bg-gradient-to-b from-[#2A0606]/95 to-[#1c0404]/98 rounded-[36px] backdrop-blur-xl shadow-[0_0_80px_rgba(197,160,89,0.35)] gold-border-corner gold-border-corner-tl z-10"
            >
              {/* Extra elegant gold frame design */}
              <div className="absolute inset-3 border border-amber-500/25 rounded-[28px] pointer-events-none gold-border-frame-all" />
              <div className="absolute inset-4.5 border border-dashed border-amber-500/15 rounded-[26px] pointer-events-none" />
              
              {/* Royal Seal Badge */}
              <div className="mb-6 inline-flex items-center gap-1.5 border border-amber-500/35 px-4.5 py-1.5 rounded-full bg-amber-500/10 text-[#C5A059] font-mono text-[9px] uppercase tracking-[0.3em] font-extrabold animate-pulse">
                <Sparkles className="w-3 h-3 text-amber-400" />
                {language === Language.ENGLISH ? "REGAL INVITATION" : "ರಾಜವಂಶದ ಆಮಂತ್ರಣ"}
              </div>

              {/* Shubh Vivah Stamp Ganesha Vector */}
              <div className="flex justify-center mb-6 text-[#E5C158]">
                <div className="w-16 h-16 rounded-full border border-double border-[#C5A059]/40 flex items-center justify-center bg-[#330C0C]/80 shadow-[0_0_15px_rgba(197,160,89,0.2)]">
                  <Heart className="w-7 h-7 fill-[#C5A059]/10 text-[#C5A059]" />
                </div>
              </div>

              {/* Majestic Kannada Title header with legendary calligraphy drop shadow */}
              <h2 className="text-4xl sm:text-5xl font-kannada font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#F7E5C0] via-[#C5A059] to-[#F7E5C0] leading-tight select-none mb-1 drop-shadow-[0_4px_16px_rgba(197,160,89,0.25)] filter saturate-125">
                ಶುಭ ವಿವಾಹ
              </h2>
              
              {/* Small script connector */}
              <p className="text-amber-500/70 font-script text-2xl sm:text-3xl my-3 italic select-none">
                the royal union of
              </p>

              {/* English names with luxurious spacing */}
              <h1 className="text-2xl sm:text-4xl font-display text-transparent bg-clip-text bg-gradient-to-r from-[#FFFEEF] via-[#E2C27F] to-[#E5C158] uppercase tracking-[0.22em] font-black select-none leading-none drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]">
                Sheethal
              </h1>
              <span className="text-stone-400 font-serif lowercase italic text-base my-1.5 block">
                &
              </span>
              <h1 className="text-2xl sm:text-4xl font-display text-transparent bg-clip-text bg-gradient-to-r from-[#FFFEEF] via-[#E2C27F] to-[#E5C158] uppercase tracking-[0.22em] font-black select-none leading-none drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)] mb-8">
                Prathamesh
              </h1>

              {/* Invitation Entrance Button */}
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleOpenInvitation}
                className="w-full py-4 px-8 bg-gradient-to-r from-[#A67C1E] via-[#C5A059] to-[#8A6414] hover:from-[#C5A059] hover:to-[#A67C1E] text-stone-900 border border-[#FFFAD0]/30 font-display font-bold text-xs uppercase tracking-[0.25em] rounded-full shadow-[0_8px_30px_rgba(197,160,89,0.3)] hover:shadow-[0_12px_40px_rgba(197,160,89,0.5)] cursor-pointer text-white flex items-center justify-center gap-2 group transition-all duration-300 select-none pb-4.5"
              >
                <span>{language === Language.ENGLISH ? "Open Invitation" : "ಲಗ್ನ ಪತ್ರಿಕೆ ತೆರೆಯಿರಿ"}</span>
                <Sparkles className="w-4 h-4 text-white group-hover:animate-spin" />
              </motion.button>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="royal-wedding-invitation-main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="w-full"
          >
            {/* 1. Procedural interactive canvas element drawing gold mandalas and drifting jasmine/saffron petals */}
            <div className="fixed inset-0 w-full h-full pointer-events-none z-0">
              <MandalaCanvas />
            </div>

            {/* Background cinematic grid overlay simulating moving shimmering elements */}
            <div className="fixed inset-0 w-full h-full bg-grid-reflection opacity-5 pointer-events-none z-0" />

            {/* Core Website Flow */}
            <div className="relative z-10 flex flex-col items-center w-full min-h-screen">

          {/* ================= HERO SECTION ================= */}
        <section 
          id="hero-section"
          className="min-h-screen w-full flex flex-col items-center justify-center text-center relative px-4 overflow-hidden pt-20"
        >
          {/* Parallax bottom fade-in transition to background */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#FCFAF5]/98 pointer-events-none z-1" />

          {/* PARALLAX HERO CONTAINER */}
          <motion.div
            style={{ y: yHeroContent, opacity: opacityHeroFade }}
            className="flex flex-col items-center w-full max-w-4xl relative z-10"
          >
            {/* Elegant Royal Stamp Badge */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, delay: 0.1 }}
              className="mb-4 inline-flex items-center gap-2 border-double border-2 border-[#8A151B]/40 px-5 py-1.5 rounded-full bg-white/75 backdrop-blur-sm shadow-sm font-mono text-[9px] uppercase tracking-[0.3em] text-[#8A151B] font-extrabold"
            >
              <Sparkles className="w-3 h-3 text-amber-500 animate-pulse animate-spin" />
              {language === Language.ENGLISH ? "Save The Date" : "ದಿನಾಂಕವನ್ನು ಉಳಿಸಿ"}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.2 }}
              className="mb-4 max-w-xl"
            >
              <span className="text-[#8A151B] font-serif italic text-sm tracking-wide block mb-1">
                {t.welcome}
              </span>
              <div className="h-[1px] bg-gradient-to-r from-transparent via-[#C5A059]/40 to-transparent w-full" />
            </motion.div>

            {/* Bilingual Couple Title Headings in Elite Typography */}
            <div className="my-2 relative py-2">
              {/* Background glowing aura */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none animate-pulse-gold" />

              {/* Traditional Shubh Vivah Ganesha Heart Icon */}
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="flex justify-center mb-3 text-[#8A151B]"
              >
                <Heart className="w-5 h-5 animate-pulse-gold fill-[#8A151B]/10" />
              </motion.div>

              {/* Kannada Header - Rendered with cinematic-header with drop shadow and gold shimmers */}
              <motion.h1 
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, delay: 0.4 }}
                className="text-4xl md:text-6xl font-sans font-black pb-2 bg-gradient-to-r from-[#A67C1E] via-[#C5A059] to-[#8A151B] bg-clip-text text-transparent leading-tight px-2 drop-shadow-sm select-none"
              >
                ಶೀತಲ್ <span className="text-2xl md:text-3xl font-serif text-[#C5A059] mx-2 block md:inline-block md:align-middle my-1 md:my-0 font-light italic">weds</span> ಪ್ರಥಮೇಶ
              </motion.h1>

              {/* Stacked English Names with beautiful vintage serif & love-focused ampersand */}
              <div id="hero-stacked-names" className="flex flex-col items-center mt-6 select-none">
                {/* Sheethal Name */}
                <motion.span
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.2, delay: 0.5 }}
                  className="text-4xl md:text-6.5xl font-serif text-[#8A151B] font-extrabold uppercase tracking-[0.22em] drop-shadow-sm leading-none"
                >
                  Sheethal
                </motion.span>
                
                {/* Premium gold ampersand & delicate loving filigree ornament */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1.4, delay: 0.7, type: "spring" }}
                  className="my-3 flex items-center justify-center gap-5 text-[#C5A059] relative"
                >
                  <div className="h-[1px] w-14 bg-gradient-to-r from-transparent via-[#C5A059]/65 to-transparent" />
                  <div className="relative flex items-center justify-center w-10 h-10">
                    <Heart className="absolute w-8 h-8 text-[#8A151B]/15 fill-[#8A151B]/8 animate-pulse-gold scale-125" />
                    <span className="font-serif italic text-3xl md:text-4xl font-light text-[#C5A059] leading-none select-none z-10">
                      &
                    </span>
                  </div>
                  <div className="h-[1px] w-14 bg-gradient-to-l from-transparent via-[#C5A059]/65 to-transparent" />
                </motion.div>
                
                {/* Prathamesh Name */}
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.2, delay: 0.9 }}
                  className="text-4xl md:text-6.5xl font-serif text-[#8A151B] font-extrabold uppercase tracking-[0.22em] drop-shadow-sm leading-none"
                >
                  Prathamesh
                </motion.span>
              </div>

              {/* Flourish Line Ornament */}
              <div className="flex items-center justify-center gap-3 mt-6">
                <div className="h-[1px] bg-gradient-to-r from-transparent to-[#C5A059]/40 w-16" />
                <div className="w-2.5 h-2.5 rotate-45 border border-[#8A151B] bg-[#FCFAF5]" />
                <div className="h-[1px] bg-gradient-to-l from-transparent to-[#C5A059]/40 w-16" />
              </div>
            </div>
          </motion.div>

          {/* Luxury Framed Couple Portrait - Classical Love-Themed Imperial Royal Palace Window Frame */}
          <motion.div
            style={{ y: yPhotoFrame, scale: scalePhoto }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.4, delay: 0.8, type: "spring", stiffness: 45 }}
            className="my-12 relative group z-10"
            id="couple-portrait-gallery-frame"
          >
            {/* Highly Premium Floating Hearts Halo & Sunbeams */}
            <div className="absolute inset-x-0 -inset-y-12 bg-gradient-to-tr from-[#8A151B]/15 via-rose-500/10 to-[#C5A059]/20 rounded-[120px] blur-3xl transform scale-110 opacity-90 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />

            {/* Glowing Golden Arch Silhouette Vector in background on hover */}
            <div className="absolute inset-0 bg-[#C5A059]/5 rounded-[56px] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />

            {/* Premium Symmetrical Love Badges (Intricately Animated Hearts) */}
            <motion.div 
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-4 left-6 z-30 select-none pointer-events-none"
            >
              <Heart className="w-7 h-7 text-[#8A151B] fill-[#8A151B]/20 drop-shadow-[0_4px_12px_rgba(138,21,27,0.4)]" />
            </motion.div>
            <motion.div 
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3.5, delay: 0.7, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-4 right-6 z-30 select-none pointer-events-none"
            >
              <Heart className="w-6 h-6 text-[#C5A059] fill-[#C5A059]/25 drop-shadow-[0_4px_12px_rgba(197,160,89,0.4)]" />
            </motion.div>

            {/* Decorative Floating Sparkle Dots strictly inside the frame viewport zone */}
            <div className="absolute -left-6 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-6 opacity-60 group-hover:opacity-100 transition-opacity duration-500">
              <Sparkles className="w-4 h-4 text-[#C5A059] animate-spin" style={{ animationDuration: '6s' }} />
              <Heart className="w-3.5 h-3.5 text-[#8A151B] animate-pulse" />
            </div>
            <div className="absolute -right-6 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-6 opacity-60 group-hover:opacity-100 transition-opacity duration-500">
              <Heart className="w-3.5 h-3.5 text-[#8A151B] animate-pulse" />
              <Sparkles className="w-4 h-4 text-[#C5A059] animate-spin" style={{ animationDuration: '8s' }} />
            </div>
            
            {/* Multi-layered Gilded Imperial Window Frame - Royal Palace Edition */}
            <div className="relative p-8 sm:p-10 rounded-[56px] bg-white border-2 border-[#C5A059]/40 shadow-[0_25px_70px_rgba(138,100,20,0.12)] group-hover:shadow-[0_40px_100px_rgba(138,100,20,0.22)] border-double group-hover:border-[#8A151B]/40 transition-all duration-700 max-w-[330px] sm:max-w-[400px] mx-auto overflow-hidden">
              
              {/* Inner Crimson Royal Filigree Corner Brackets */}
              <div className="absolute top-6 left-6 text-[#8A151B]/40 group-hover:text-[#8A151B] transition-colors duration-500">
                <Heart className="w-5 h-5 fill-current animate-pulse" />
              </div>
              <div className="absolute top-6 right-6 text-[#8A151B]/40 group-hover:text-[#8A151B] transition-colors duration-500">
                <Heart className="w-5 h-5 fill-current animate-pulse" />
              </div>
              <div className="absolute bottom-6 left-6 text-[#8A151B]/40 group-hover:text-[#8A151B] transition-colors duration-500">
                <Heart className="w-5 h-5 fill-current animate-pulse" />
              </div>
              <div className="absolute bottom-6 right-6 text-[#8A151B]/40 group-hover:text-[#8A151B] transition-colors duration-500">
                <Heart className="w-5 h-5 fill-current animate-pulse" />
              </div>

              {/* Exquisite layered golden dashed lines */}
              <div className="absolute inset-5 border border-dashed border-[#C5A059]/30 group-hover:border-[#8A151B]/40 rounded-[46px] pointer-events-none transition-colors duration-500" />
              <div className="absolute inset-6 border border-stone-100 rounded-[42px] pointer-events-none" />
              
              {/* Classical Museum Ivory Mounting Matboard */}
              <div className="relative p-2.5 rounded-[36px] bg-[#FCFAF5] border border-[#C5A059]/25 shadow-inner">
                {/* Image Vessel with Soft Gold Frame Highlights */}
                <div className="relative overflow-hidden rounded-[28px] aspect-[3/4] bg-[#FAF6EE] shadow-lg border border-[#C5A059]/20">
                  <img
                    src={imageSrc}
                    alt="Sheethal & Prathamesh - Auspicious Union"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transform duration-1000 ease-out group-hover:scale-[1.05] filter brightness-[1.01] contrast-[1.02]"
                    onError={() => {
                      if (imageSrc === "https://lh3.googleusercontent.com/d/1rlnzzeSOgPzS5GcipEFSTNe8oOtvFXl1") {
                        setImageSrc("https://drive.google.com/uc?export=view&id=1rlnzzeSOgPzS5GcipEFSTNe8oOtvFXl1");
                      } else {
                        setImageSrc("https://images.unsplash.com/photo-1607190074257-dd4b7af0309f?auto=format&fit=crop&w=800&q=80");
                      }
                    }}
                  />
                  
                  {/* Subtle loving crimson vignette overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#8A151B]/20 via-transparent to-transparent pointer-events-none mix-blend-multiply" />
                  
                  {/* Dynamic Shimmering Shines */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 opacity-70 pointer-events-none" />
                </div>
              </div>

              {/* Royal Seal Inscription - Sacred Bond */}
              <div className="pt-6 pb-2 text-center select-none flex flex-col items-center gap-1.5">
                <div className="flex items-center gap-2 font-mono text-[10px] tracking-[0.25em] text-[#8A151B] font-bold uppercase">
                  <span className="text-[#C5A059]">✦</span>
                  <span>SHUBH VIVAH</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8A151B]/40" />
                  <span>ಶುಭ ವಿವಾಹ</span>
                  <span className="text-[#C5A059]">✦</span>
                </div>
                <span className="text-[11px] font-serif text-stone-500 italic block">
                  {language === Language.ENGLISH ? "A Celestial Union of Dual Souls" : "ಪ್ರೀತಿಯ ಹಾರ್ದಿಕ ಕಲ್ಯಾಣ ಮಹೋತ್ಸವ"}
                </span>
              </div>
            </div>
          </motion.div>
        </section>

        {/* ================= GREETING & TIMER ================= */}
        <section 
          id="greeting-section"
          className="py-16 w-full flex flex-col items-center justify-center text-center px-4 relative bg-[#FCFAF5]/50"
        >
          <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#FCFAF5] to-transparent pointer-events-none" />
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="max-w-3xl w-full p-8 md:p-14 rounded-[32px] relative overflow-hidden flex flex-col items-center bg-white/75 backdrop-blur-xl border border-[#C5A059]/35 shadow-[0_25px_60px_rgba(138,100,20,0.06)] select-none group transition-all duration-300 hover:shadow-[0_35px_70px_rgba(138,100,20,0.12)] hover:border-[#8A151B]/45"
            style={{
              boxShadow: "inset 0 0 40px rgba(255, 255, 255, 0.45), 0 25px 60px rgba(138,100,20,0.06)"
            }}
          >
            {/* Glowing golden background accent colors inside card to enhance glassmorphism depth */}
            <div className="absolute -top-16 -left-16 w-48 h-48 bg-amber-200/15 rounded-full blur-3xl pointer-events-none group-hover:bg-amber-300/20 transition-all duration-700" />
            <div className="absolute -bottom-16 -right-16 w-48 h-48 bg-amber-100/15 rounded-full blur-3xl pointer-events-none group-hover:bg-amber-200/25 transition-all duration-700" />

            {/* Premium Gold Corner Accents */}
            <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-[#8A151B]/25 rounded-tl-lg pointer-events-none group-hover:border-[#8A151B]/50 transition-colors duration-500" />
            <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-[#8A151B]/25 rounded-tr-lg pointer-events-none group-hover:border-[#8A151B]/50 transition-colors duration-500" />
            <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-[#8A151B]/25 rounded-bl-lg pointer-events-none group-hover:border-[#8A151B]/50 transition-colors duration-500" />
            <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-[#8A151B]/25 rounded-br-lg pointer-events-none group-hover:border-[#8A151B]/50 transition-colors duration-500" />

            {/* Double dashed thin inner frame */}
            <div className="absolute inset-2.5 border border-dashed border-[#C5A059]/15 rounded-[24px] pointer-events-none" />

            {/* Traditional ornate mandala vector wrapper */}
            <div className="w-16 h-16 border border-dashed border-[#8A151B]/25 rounded-full flex items-center justify-center mb-6 animate-spin-slow bg-white/70 shadow-sm relative z-10 transition-transform duration-500 group-hover:scale-105">
              <Sparkles className="w-6 h-6 text-[#8A151B] animate-pulse" />
            </div>

            {/* Elegant Symmetrical Floral dividers */}
            <div className="flex items-center gap-3 mb-4 select-none pointer-events-none relative z-10">
              <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#8A151B]/35" />
              <Heart className="w-4 h-4 text-[#8A151B] fill-[#8A151B]/10 animate-pulse" />
              <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#8A151B]/35" />
            </div>

            <h3 className="text-xl sm:text-2xl font-serif font-extrabold tracking-wide text-[#8A151B] mb-5 relative z-10 text-center max-w-lg leading-snug">
              {t.greetings}
            </h3>

            <p className="text-sm sm:text-base md:text-lg font-serif text-stone-700 italic leading-relaxed max-w-2xl font-normal px-4 relative z-10 text-center pb-1">
              &ldquo; {t.invitationNote} &rdquo;
            </p>

            <div className="h-[1px] bg-gradient-to-r from-transparent via-[#C5A059]/30 to-transparent w-full my-6 relative z-10" />

            <p className="text-[10px] text-stone-500 uppercase tracking-[0.3em] font-sans mb-1 font-bold relative z-10">
              {language === Language.ENGLISH ? "Wedding Invitation" : "ವಿವಾಹ ಆಮಂತ್ರಣ ಪತ್ರ"}
            </p>
            <p className="text-base md:text-lg font-display font-extrabold text-[#8A151B] tracking-wider relative z-10">
              {t.weddingDateLong}
            </p>
          </motion.div>

          {/* Dynamic countdown block */}
          <Countdown language={language} />
        </section>

        {/* ================= HORIZONTAL JOURNEY SCROLL GALLERY ================= */}
        <HorizontalGallery language={language} />

        {/* ================= SACRED TIMELINE ================= */}
        <SacredTimeline language={language} />



        {/* ================= VENUE & GOOGLE MAPS SECTION ================= */}
        <section 
          id="venue-section"
          className="py-16 w-full flex flex-col items-center justify-center px-4 relative bg-gradient-to-b from-[#FAF9F6]/20 to-[#FAF9F6]/40 overflow-hidden"
        >
          {/* Subtle decorative background glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="max-w-3xl w-full p-6 sm:p-10 rounded-[32px] relative overflow-hidden flex flex-col items-center bg-white/45 backdrop-blur-xl border border-white/65 shadow-[0_25px_60px_rgba(138,100,20,0.08)] group"
          >
            {/* Ornate corner lines */}
            <div className="absolute top-4 left-4 w-6 h-6 border-t border-l border-amber-550/25 pointer-events-none" />
            <div className="absolute top-4 right-4 w-6 h-6 border-t border-r border-amber-550/25 pointer-events-none" />
            <div className="absolute bottom-4 left-4 w-6 h-6 border-b border-l border-amber-550/25 pointer-events-none" />
            <div className="absolute bottom-4 right-4 w-6 h-6 border-b border-r border-amber-550/25 pointer-events-none" />

            {/* Title Header */}
            <div className="text-center mb-6 z-10">
              <span className="text-[9px] font-mono tracking-[0.25em] text-amber-600 uppercase font-black block mb-2">
                {language === Language.ENGLISH ? "DIRECTIONS & VENUE" : "ಮಾರ್ಗಸೂಚಿ ಮತ್ತು ಸ್ಥಳ"}
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif text-[#8A6414] font-bold tracking-wide">
                {language === Language.ENGLISH ? "The Wedding Venue" : "ಮದುವೆಯ ದಿವ್ಯ ಮಂಟಪ"}
              </h2>
            </div>

            {/* Address Details Card */}
            <div className="w-full text-center mb-6 z-10 px-4">
              <p className="text-base sm:text-lg font-serif text-amber-900 font-semibold mb-1">
                {language === Language.ENGLISH ? "Rani Channamma Samudaya Bhavan - Mangala Karyalaya" : "ರಾಣಿ ಚೆನ್ನಮ್ಮ ಸಮುದಾಯ ಭವನ - ಮಂಗಳ ಕಾರ್ಯಾಲಯ"}
              </p>
              <p className="text-xs sm:text-sm font-sans text-stone-600 leading-relaxed font-semibold">
                {language === Language.ENGLISH 
                  ? "Near Solapur Road, Vijayapura, Karnataka 586101" 
                  : "ಸೋಲಾಪುರ ರಸ್ತೆ ಹತ್ತಿರ, ವಿಜಯಪುರ, ಕರ್ನಾಟಕ ೫೮೬೧೦೧"}
              </p>
            </div>

            {/* Interactive Google Map Frame */}
            <div className="w-full aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden border border-amber-500/20 shadow-lg relative bg-stone-100 z-10 group-hover:border-amber-500/40 transition-colors duration-500">
              <iframe
                title="Rani Channamma Samudaya Bhavan - Mangala Karyalaya Address Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3814.770956976527!2d75.7198754!3d16.8378564!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc6ffae74ccb70d%3A0xe21ba68fc1b913cc!2sRani%20Channamma%20Mangala%20Karyalaya!5e0!3m2!1sen!2sin!4v1718390000000!5m2!1sen!2sin"
                className="w-full h-full border-0 grayscale-[10%] brightness-[98%] contrast-[102%]"
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Premium Gold Action Button to open maps app */}
            <motion.a
              href="https://maps.app.goo.gl/Sd6uFvk6VVUR5USe6?g_st=ac"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="mt-6 z-10 px-6 py-2.5 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-550 hover:to-amber-650 text-white font-sans text-xs sm:text-xs font-bold tracking-wider uppercase rounded-full shadow-[0_4px_20px_rgba(197,160,89,0.25)] flex items-center gap-2 border border-amber-400/20 select-none cursor-pointer duration-300"
            >
              <MapPin className="w-4 h-4 text-amber-100 animate-bounce animate-duration-1000" />
              <span>
                {language === Language.ENGLISH ? "Navigate with Google Maps" : "ಗೂಗಲ್ ಮ್ಯಾಪ್ಸ್‌ನಲ್ಲಿ ವೀಕ್ಷಿಸಿ"}
              </span>
            </motion.a>

          </motion.div>
        </section>

        {/* ================= FOOTER LANDING ================= */}
        <footer className="w-full border-t border-amber-500/10 bg-white py-16 px-6 flex flex-col items-center relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border border-amber-500/20 bg-white flex items-center justify-center shadow-sm">
            <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />
          </div>

          <div className="text-center max-w-lg mb-8 px-4 flex flex-col items-center select-none">
            <h3 className="text-lg font-serif text-[#8A6414] font-bold mb-3 tracking-wide">
              {language === Language.ENGLISH ? "Welcome to our Celebration" : "ನಮ್ಮ ವಿವಾಹ ಮಹೋತ್ಸವಕ್ಕೆ ಆದರದ ಸುಸ್ವಾಗತ"}
            </h3>
            <p className="text-xs sm:text-sm font-serif text-stone-600 italic leading-relaxed max-w-md">
              {language === Language.ENGLISH 
                ? "“With hearts full of love, joy, and gratitude, we welcome you to share the beginning of our lifetime journey. Your smiles, laughter, and presence are our most cherished gifts.”" 
                : "“ನಮ್ಮ ಜೀವನದ ಹೊಸ ಸುಂದರ ಅಧ್ಯಾಯದ ಆರಂಭಕ್ಕೆ ನಿಮ್ಮನ್ನು ಪ್ರೀತಿಯಿಂದ ಬರಮಾಡಿಕೊಳ್ಳುತ್ತೇವೆ. ನಿಮ್ಮ ಸಮ್ಮುಖವೇ ನಮಗೆ ಅತ್ಯಂತ ಅಮೂಲ್ಯವಾದ ಆಶೀರ್ವಾದ.”"}
            </p>
          </div>

          <div className="text-center max-w-sm mb-2">
            <h4 className="text-base font-serif text-[#A67C1E] font-semibold">
              {language === Language.ENGLISH ? "Sheethal & Prathamesh" : "ಶೀತಲ್ ಮತ್ತು ಪ್ರಥಮೇಶ"}
            </h4>
          </div>
        </footer>

      </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
