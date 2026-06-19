import { useState, useEffect } from "react";
import { Language } from "../types";
import { translations } from "../data";
import { motion, AnimatePresence } from "motion/react";
import { Clock } from "lucide-react";

interface CountdownProps {
  language: Language;
}

export default function Countdown({ language }: CountdownProps) {
  const t = translations[language];
  
  // Wedding target date: July 2, 2026, at 09:15 AM
  const targetDate = new Date("2026-07-02T09:15:00");

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isCompleted: false
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +targetDate - +new Date();
      let newTimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0, isCompleted: false };

      if (difference <= 0) {
        newTimeLeft.isCompleted = true;
      } else {
        newTimeLeft = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
          isCompleted: false
        };
      }
      setTimeLeft(newTimeLeft);
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, []);

  const timeBlocks = [
    { label: t.countdownDays, value: timeLeft.days },
    { label: t.countdownHours, value: timeLeft.hours },
    { label: t.countdownMins, value: timeLeft.minutes },
    { label: t.countdownSecs, value: timeLeft.seconds }
  ];

  return (
    <div className="w-full flex flex-col items-center justify-center font-sans mt-12 mb-6" id="wedding-countdown-timer">
      {/* Sleek, High-End Title Header */}
      <div className="text-center mb-10 max-w-lg px-4 select-none">
        <div className="inline-flex items-center gap-2 mb-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#8A151B] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#8A151B]"></span>
          </span>
          <span className="text-[11px] font-mono tracking-[0.3em] font-extrabold text-[#8A151B] uppercase">
            {timeLeft.isCompleted 
              ? (language === Language.ENGLISH ? "AUSPICIOUS DAY ARRIVED" : "ಶುಭ ದಿನ ಬಂದಿದೆ") 
              : (language === Language.ENGLISH ? "THE SACRED HOUR APPROACHES" : "ಪವಿತ್ರ ಮುಹೂರ್ತದ ನಿರೀಕ್ಷೆ")}
          </span>
        </div>
        
        <p className="text-xs text-stone-500 font-sans tracking-wide">
          {t.countdownBefore}
        </p>

        {/* Delicate minimal line */}
        <div className="w-16 h-[1.5px] bg-[#8A151B]/25 mx-auto mt-4" />
      </div>

      {/* Modern, Borderless Minimalist Layout (Pure Premium Typography) */}
      <div className="grid grid-cols-4 divide-x divide-stone-200/50 max-w-2xl w-full px-4 select-none">
        {timeBlocks.map((block, i) => (
          <motion.div
            key={block.label}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: i * 0.08, ease: "easeOut" }}
            viewport={{ once: true }}
            className="flex flex-col items-center justify-center py-4 px-2 group"
          >
            {/* Elegant large serif numbers */}
            <span className="text-4xl sm:text-6xl font-serif font-light text-stone-900 tracking-tight group-hover:text-[#8A151B] transition-colors duration-500">
              {String(block.value).padStart(2, "0")}
            </span>
            
            {/* Clean minimalist text label */}
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] font-medium mt-3 text-stone-400 font-sans">
              {block.label}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
