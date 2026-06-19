import React, { useState, useEffect, FormEvent } from "react";
import { Language, GuestRsvp } from "../types";
import { translations } from "../data";
import { motion, AnimatePresence } from "motion/react";
import { Shield, KeyRound, Search, Download, Trash2, X, Star, Calendar, MessageSquare } from "lucide-react";

interface AdminPanelProps {
  language: Language;
  onRefreshBlessings: () => void;
}

export default function AdminPanel({ language, onRefreshBlessings }: AdminPanelProps) {
  const t = translations[language];
  const [isOpen, setIsOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [blessings, setBlessings] = useState<GuestRsvp[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/admin/rsvps", {
        headers: {
          "x-admin-password": password
        }
      });

      if (!response.ok) {
        throw new Error("Invalid credentials");
      }

      const data = await response.json();
      setBlessings(data);
      setIsAuthorized(true);
      setErrorMsg("");
    } catch (err) {
      setErrorMsg(language === Language.ENGLISH ? "Invalid Administrator Key. Try 'sheethalwedsprathamesh'." : "ಅಮಾನ್ಯ ಕೀಲಿ ಸಂಖ್ಯೆ. 'sheethalwedsprathamesh' ಬಳಸಿ.");
    } finally {
      setIsLoading(false);
    }
  };

  const loadData = async () => {
    if (!isAuthorized) return;
    try {
      const response = await fetch("/api/admin/rsvps", {
        headers: {
          "x-admin-password": password
        }
      });
      if (response.ok) {
        const data = await response.json();
        setBlessings(data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const clearData = async () => {
    if (!window.confirm(language === Language.ENGLISH ? "Are you sure you want to delete ALL blessings?" : "ನೀವು ಎಲ್ಲಾ ಹಾರೈಕೆ ಸಂದೇಶಗಳನ್ನು ಸಂಪೂರ್ಣವಾಗಿ ಅಳಿಸಲು ಬಯಸುತ್ತೀರಾ?")) return;
    try {
      const response = await fetch("/api/admin/rsvps", {
        method: "DELETE",
        headers: {
          "x-admin-password": password
        }
      });
      if (response.ok) {
        setBlessings([]);
        onRefreshBlessings();
        alert(language === Language.ENGLISH ? "Cleared successfully!" : "ಯಶಸ್ವಿಯಾಗಿ ಅಳಿಸಲಾಗಿದೆ!");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const filteredBlessings = blessings.filter((b) =>
    b.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    b.blessing.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const downloadCsv = () => {
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Guest Name,Blessing Message,Received At\n";
    
    blessings.forEach((b) => {
      const row = [
        `"${b.name}"`,
        `"${b.blessing?.replace(/"/g, '""') || ""}"`,
        `"${b.createdAt || ""}"`
      ].join(",");
      csvContent += row + "\n";
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Blessings_Wall_Sheethal_Prathamesh.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full text-center mt-12 mb-6 font-sans">
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-2 text-xs font-semibold text-[#A67C1E] hover:text-amber-700 border border-amber-500/20 hover:border-amber-500/40 bg-white shadow-sm px-5 py-2.5 rounded-full cursor-pointer transition-all duration-300"
      >
        <Shield className="w-3.5 h-3.5" /> {language === Language.ENGLISH ? "Administrators Desk" : "ಆಡಳಿತ ಮಂಡಳಿ ಕನ್ಸೋಲ್"}
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 bg-[#2C2520]/60 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#FAF9F6] border border-amber-500/25 rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col relative text-left shadow-2xl"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-5 right-5 p-2 rounded-full hover:bg-stone-100 text-stone-500 hover:text-stone-800 transition-colors z-10 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {!isAuthorized ? (
                /* Admin Login Drawer */
                <div className="p-8 md:p-12 max-w-md mx-auto w-full flex flex-col justify-center py-16">
                  <div className="text-center mb-6">
                    <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto mb-4">
                      <KeyRound className="w-6 h-6 text-[#A67C1E]" />
                    </div>
                    <h3 className="text-2xl font-serif text-stone-850 font-medium">
                      {language === Language.ENGLISH ? "Auspicious Registry Lock" : "ಹಾರೈಕೆ ರಿಜಿಸ್ಟ್ರಾರ್ ಲಾಕ್"}
                    </h3>
                    <p className="text-xs text-stone-500 font-serif mt-1 italic">
                      {language === Language.ENGLISH 
                        ? "Enter the secure credentials to view and manage guest blessings." 
                        : "ಅತಿಥಿಗಳ ಹಾರೈಕೆ ಸಂದೇಶಗಳನ್ನು ನಿರ್ವಹಿಸಲು ಕೋಡ್ ನಮೂದಿಸಿ."}
                    </p>
                  </div>

                  <form onSubmit={handleLogin} className="space-y-4 font-sans">
                    {errorMsg && (
                      <p className="text-xs text-amber-800 bg-amber-50 p-2.5 rounded-lg border border-amber-200 text-center font-medium">
                        {errorMsg}
                      </p>
                    )}
                    <input
                      type="password"
                      placeholder="Enter Access Key"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-white border border-amber-500/20 rounded-xl px-4 py-3 text-sm text-stone-800 focus:border-amber-500/50 focus:outline-none focus:ring-1 focus:ring-amber-500/50 transition font-sans shadow-inner"
                      required
                    />
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full py-3 px-4 rounded-xl gold-button text-xs font-bold uppercase tracking-widest cursor-pointer select-none font-mono"
                    >
                      {isLoading ? "Unlocking Desk..." : "Authorize Access"}
                    </button>
                    <div className="text-center">
                      <span className="text-[10px] text-stone-400 font-mono">Use key: "sheethalwedsprathamesh"</span>
                    </div>
                  </form>
                </div>
              ) : (
                /* Authorized Admin Dashboard View - Gorgeous Ivory and Gold Light Aesthetic */
                <div className="flex flex-col h-full overflow-hidden p-6 md:p-8">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-amber-500/15 pb-5 mb-5 gap-4">
                    <div>
                      <span className="text-[10px] uppercase tracking-widest text-[#A67C1E] font-mono font-bold block">
                        ROYAL WEDDING REGISTRY
                      </span>
                      <h3 className="text-2xl md:text-3xl font-serif text-stone-850 font-medium mt-0.5">
                        {language === Language.ENGLISH ? "Auspicious blessings Register" : "ಶುಭ ಹರಕೆ ರಿಜಿಸ್ಟರ್ ಬೋರ್ಡ್"}
                      </h3>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={downloadCsv}
                        className="bg-white border border-amber-500/20 text-amber-700 hover:bg-amber-500/5 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all duration-300 cursor-pointer shadow-sm"
                      >
                        <Download className="w-3.5 h-3.5" /> {language === Language.ENGLISH ? "Export CSV" : "ಡೌನ್‌ಲೋಡ್ CSV"}
                      </button>
                      <button
                        onClick={clearData}
                        className="bg-rose-50 border border-rose-200 text-rose-700 hover:bg-rose-100/50 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all duration-300 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> {language === Language.ENGLISH ? "Reset Registry" : "ಅಳಿಸಿ ಹಾಕಿ"}
                      </button>
                    </div>
                  </div>

                  {/* Redesigned Bento Grid for simple clean registry counters */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 font-sans">
                    <div className="bg-white border border-amber-500/15 rounded-2xl p-5 flex items-center gap-4 shadow-sm">
                      <div className="p-3 bg-amber-500/5 border border-amber-500/20 rounded-xl text-[#A67C1E]">
                        <MessageSquare className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[10px] uppercase tracking-wider text-stone-400 font-bold font-mono block">
                          Total blessings Posted
                        </span>
                        <span className="text-2xl font-extrabold text-[#A67C1E] font-mono leading-none mt-1 block">
                          {blessings.length}
                        </span>
                      </div>
                    </div>

                    <div className="bg-white border border-amber-500/15 rounded-2xl p-5 flex items-center gap-4 shadow-sm">
                      <div className="p-3 bg-rose-500/5 border border-rose-500/20 rounded-xl text-rose-500">
                        <Star className="w-5 h-5 fill-rose-500/25" />
                      </div>
                      <div>
                        <span className="text-[10px] uppercase tracking-wider text-stone-400 font-bold font-mono block">
                          Couple Union
                        </span>
                        <span className="text-xs font-serif italic text-stone-700 font-medium leading-none mt-1 block">
                          Sheethal & Prathamesh
                        </span>
                      </div>
                    </div>

                    <div className="bg-white border border-amber-500/15 rounded-2xl p-5 flex items-center gap-4 shadow-sm">
                      <div className="p-3 bg-amber-500/5 border border-amber-500/20 rounded-xl text-amber-600">
                        <Calendar className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[10px] uppercase tracking-wider text-stone-400 font-bold font-mono block">
                          Wedding Date
                        </span>
                        <span className="text-xs font-serif italic text-[#A67C1E] font-bold mt-1 block leading-none">
                          Thursday, July 02, 2026
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Search bar */}
                  <div className="relative mb-4 font-sans">
                    <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      placeholder="Search blessings by name or text..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-white border border-amber-500/15 rounded-xl pl-10 pr-4 py-3 text-sm text-stone-800 placeholder-stone-400 focus:border-amber-500/50 focus:outline-none transition-all duration-300 font-sans shadow-inner"
                    />
                  </div>

                  {/* Guest Table Container wrapped in gorgeous classic paper layout */}
                  <div className="flex-1 overflow-y-auto border border-amber-500/15 rounded-2xl bg-white text-xs font-sans shadow-sm">
                    {filteredBlessings.length === 0 ? (
                      <div className="text-center py-12 text-stone-400 font-serif italic">
                        No blessings or guest entries found.
                      </div>
                    ) : (
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-[#FAF9F6] border-b border-amber-500/15 text-[10px] uppercase tracking-wider text-stone-500 font-bold font-mono">
                            <th className="p-4 w-1/4">Guest Full Name</th>
                            <th className="p-4 w-1/2">Heartfelt Blessing Message</th>
                            <th className="p-4 w-1/4">Date Shared</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-amber-500/10 text-stone-700">
                          {filteredBlessings.map((row) => (
                            <tr key={row.id} className="hover:bg-[#FAF9F6]/50 transition-colors">
                              <td className="p-4 font-serif font-medium text-[#A67C1E] text-sm">{row.name}</td>
                              <td className="p-4 italic font-serif leading-relaxed text-stone-800">{row.blessing}</td>
                              <td className="p-4 font-mono text-stone-400">
                                {row.createdAt ? new Date(row.createdAt).toLocaleDateString(undefined, {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                  hour: "2-digit",
                                  minute: "2-digit"
                                }) : "—"}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
