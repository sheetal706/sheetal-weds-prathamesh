import React, { useState, FormEvent, ChangeEvent } from "react";
import { Language, GuestRsvp } from "../types";
import { translations } from "../data";
import { motion } from "motion/react";
import { CheckCircle2, Send, Heart, Sparkles } from "lucide-react";

interface BlessingFormProps {
  language: Language;
  onBlessingSuccess: () => void;
}

export default function BlessingForm({ language, onBlessingSuccess }: BlessingFormProps) {
  const t = translations[language];

  const [formData, setFormData] = useState({
    name: "",
    blessing: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setErrorMsg("");
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setErrorMsg(language === Language.ENGLISH ? "Your Name is required" : "ನಿಮ್ಮ ಹೆಸರು ಅತ್ಯಗತ್ಯ");
      return false;
    }
    if (!formData.blessing.trim()) {
      setErrorMsg(language === Language.ENGLISH ? "Blessing message is required" : "ಹಾರೈಕೆ ಸಂದೇಶ ಅತ್ಯಗತ್ಯ");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    // Send blessing payload to the same API, using appropriate default parameters for RSVP backend integrity
    const payload: GuestRsvp = {
      name: formData.name.trim(),
      phone: "0000000000", // Silent default to bypass backend requirements
      attending: "yes",     // Defaults to attending for public blessings list
      guestsCount: 1,
      foodPreference: "veg",
      blessing: formData.blessing.trim()
    };

    try {
      const response = await fetch("/api/rsvp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error("Server error or bad request");
      }

      setIsSubmitted(true);
      onBlessingSuccess(); // Refresh blessings wall instantly
      
      setFormData({
        name: "",
        blessing: ""
      });
    } catch (err) {
      console.error(err);
      setErrorMsg(language === Language.ENGLISH ? "Failed to send blessings. Please check network." : "ಆಶೀರ್ವಾದ ಸಲ್ಲಿಸಲು ಸಾಧ್ಯವಾಗಿಲ್ಲ. ದಯವಿಟ್ಟು ನೆಟ್‌ವರ್ಕ್ ಪರಿಶೀಲಿಸಿ.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-xl px-4 md:px-0" id="wedding-blessing-form-container">
      <motion.div
        initial={{ opacity: 0, scale: 0.98, y: 25 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="glass-card rounded-3xl p-8 md:p-10 shadow-xl border border-amber-500/20 relative overflow-hidden gold-border-corner gold-border-corner-tl"
      >
        {/* Subtle decorative corners */}
        <div className="absolute top-0 right-0 w-12 h-12 border-t border-r border-amber-500/10 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-12 h-12 border-b border-l border-amber-500/10 pointer-events-none" />

        {isSubmitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center text-center py-6"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="w-14 h-14 rounded-full bg-amber-500/10 border border-amber-500/35 flex items-center justify-center mb-5"
            >
              <CheckCircle2 className="w-7 h-7 text-amber-600" />
            </motion.div>
            
            <h3 className="text-2xl font-serif text-[#A67C1E] font-medium mb-2">
              {language === Language.ENGLISH ? "Blessings Received" : "ನಿಮಗೆ ಹೃತ್ಪೂರ್ವಕ ಧನ್ಯವಾದಗಳು"}
            </h3>
            
            <p className="text-xs font-sans text-stone-600 leading-relaxed max-w-xs mb-8">
              {language === Language.ENGLISH 
                ? "Your warm feelings and wishes have been captured on our live Blessings Wall. Thank you for sharing your love with us!" 
                : "ನಿಮ್ಮ ಪ್ರೀತಿಯ ಮಧುರ ಹಾರೈಕೆಗಳು ನಮ್ಮ ಲೈವ್ ಬೋರ್ಡ್ ನಲ್ಲಿ ಸುಂದರವಾಗಿ ಮೂಡಿಬಂದಿದೆ. ನಿಮ್ಮ ಆಶೀರ್ವಾದಕ್ಕೆ ಧನ್ಯವಾದಗಳು!"}
            </p>

            <button
              onClick={() => setIsSubmitted(false)}
              className="text-[10px] uppercase tracking-widest font-bold text-amber-700 hover:text-amber-800 flex items-center gap-2 border border-amber-500/20 px-5 py-2.5 rounded-full hover:bg-amber-500/5 transition-all duration-300 font-sans cursor-pointer bg-white shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-pulse" /> {language === Language.ENGLISH ? "Write another note" : "ಮತ್ತೊಂದು ಸಂದೇಶ ಬರೆಯಿರಿ"}
            </button>
          </motion.div>
        ) : (
          <div>
            <div className="text-center mb-8">
              <span className="text-[#A67C1E] text-xs font-mono tracking-[0.25em] uppercase font-bold flex items-center justify-center gap-1.5">
                <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500/20 animate-pulse" /> SHUBH AASHIRWAD
              </span>
              <h2 className="text-3xl md:text-4xl font-display text-transparent bg-clip-text bg-gradient-to-r from-amber-900 via-[#8A6414] to-amber-900 font-extrabold tracking-tight mt-2 pb-1">
                {language === Language.ENGLISH ? "Wedding Blessings" : "ಶುಭ ಹರಕೆ ಹಾಗೂ ಆಶೀರ್ವಾದ"}
              </h2>
              <p className="text-xs text-stone-500 font-serif italic mt-1.5 leading-relaxed">
                {language === Language.ENGLISH 
                  ? "Share your loving wishes to help Sheethal and Prathamesh spark their new journey." 
                  : "ಶೀತಲ್ ಮತ್ತು ಪ್ರಥಮೇಶ ಅವರ ಸುಂದರ ನವ ಜೀವನದ ಪಯಣಕ್ಕೆ ನಿಮ್ಮ ನವಿರಾದ ಪ್ರೀತಿಯ ಹಾರೈಕೆಗಳನ್ನು ತಿಳಿಸಿ."}
              </p>
              <div className="h-px bg-gradient-to-r from-transparent via-amber-500/25 to-transparent w-full mt-4" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 font-sans">
              {errorMsg && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-amber-50 border border-amber-200 text-amber-700 text-xs px-4 py-2.5 rounded-xl text-center font-medium font-sans"
                >
                  ⚠️ {errorMsg}
                </motion.div>
              )}

              {/* Guest Name */}
              <div className="flex flex-col text-left">
                <label htmlFor="name" className="text-[10px] uppercase tracking-wider font-bold text-stone-600 mb-1.5 font-mono">
                  {language === Language.ENGLISH ? "Your Full Name" : "ನಿಮ್ಮ ಪೂರ್ಣ ಹೆಸರು"} <span className="text-amber-600">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="bg-[#FAF9F6] border border-amber-500/15 rounded-xl px-4 py-3 text-sm text-stone-800 focus:border-amber-500/50 focus:outline-none focus:ring-1 focus:ring-amber-500/50 transition duration-300 placeholder-stone-400 font-sans shadow-inner"
                  placeholder={language === Language.ENGLISH ? "e.g. Anand Kumar" : "ಉದಾ. ಆನಂದ್ ಕುಮಾರ್"}
                  required
                />
              </div>

              {/* Blessing Message */}
              <div className="flex flex-col text-left">
                <label htmlFor="blessing" className="text-[10px] uppercase tracking-wider font-bold text-stone-600 mb-1.5 font-mono">
                  {language === Language.ENGLISH ? "Heartfelt Wish & Blessing" : "ಶುಭ ಹಾರೈಕೆಯ ನುಡಿಮುತ್ತುಗಳು"} <span className="text-amber-600">*</span>
                </label>
                <textarea
                  id="blessing"
                  name="blessing"
                  value={formData.blessing}
                  onChange={handleInputChange}
                  rows={4}
                  className="bg-[#FAF9F6] border border-amber-500/15 rounded-xl px-4 py-3 text-sm text-stone-800 focus:border-amber-500/50 focus:outline-none focus:ring-1 focus:ring-amber-500/50 transition duration-300 placeholder-stone-400 font-sans resize-none shadow-inner"
                  placeholder={language === Language.ENGLISH ? "Write a warm wish or blessing..." : "ದಂಪತಿಗಳ ಉಜ್ವಲ ಭವಿಷ್ಯಕ್ಕೆ ಪ್ರೀತಿಯ ಶುಭ ಹಾರೈಕೆ..."}
                  required
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-6 rounded-xl gold-button text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-2 cursor-pointer select-none shadow-md mt-4 font-mono"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    Sending...
                  </span>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" /> {language === Language.ENGLISH ? "Send Blessings" : "ಆಶೀರ್ವದಿಸಿ ಹಾರೈಸಿ"}
                  </>
                )}
              </button>
            </form>
          </div>
        )}
      </motion.div>
    </div>
  );
}
