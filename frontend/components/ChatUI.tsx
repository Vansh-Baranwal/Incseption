"use client";

import { useState } from "react";
import { apiFetch } from "@/lib/api";
import { Send, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

interface Message {
  role: "user" | "bot";
  content: string;
}

export default function ChatUI() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", content: "Protocol Initialized. I am Nyaya Setu, your legal AI framework. Specify your inquiry identifier." }
  ]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = input;
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setInput("");
    setLoading(true);

    try {
      const res = await apiFetch<{ reply: string }>("/chat", {
        method: "POST",
        body: { message: userMessage },
      });

      setMessages((prev) => [...prev, { role: "bot", content: res.reply }]);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[550px] relative overflow-hidden">
      <div className="flex-1 overflow-y-auto p-8 flex flex-col gap-6 custom-scrollbar">
        <AnimatePresence>
          {messages.map((m, idx) => (
             <motion.div
               initial={{ opacity: 0, x: m.role === "user" ? 20 : -20 }}
               animate={{ opacity: 1, x: 0 }}
               key={idx}
               className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
             >
                <div className={`p-5 rounded-2xl max-w-[85%] text-[10px] uppercase tracking-[0.1em] font-bold leading-relaxed transition-all duration-500
                  ${m.role === "user" 
                    ? "bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/20 rounded-tr-none shadow-[0_0_20px_rgba(212,175,55,0.05)]" 
                    : "bg-white/5 text-[#F8FAFC]/60 border border-white/5 rounded-tl-none shadow-2xl"}`}>
                  {m.content}
                </div>
             </motion.div>
          ))}
        </AnimatePresence>
        {loading && (
          <div className="flex justify-start">
             <div className="p-4 bg-white/5 border border-white/5 rounded-2xl flex items-center gap-2">
               <div className="w-1 h-1 bg-[#D4AF37] rounded-full animate-bounce" />
               <div className="w-1 h-1 bg-[#D4AF37] rounded-full animate-bounce [animation-delay:0.2s]" />
               <div className="w-1 h-1 bg-[#D4AF37] rounded-full animate-bounce [animation-delay:0.4s]" />
             </div>
          </div>
        )}
      </div>

      <div className="p-8 border-t border-white/5 bg-black/40 backdrop-blur-2xl">
        <div className="relative group">
           <input
             className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-[10px] font-bold tracking-[0.2em] uppercase text-[#F8FAFC] focus:outline-none focus:border-[#D4AF37]/50 transition-all placeholder:text-white/10 pr-16"
             placeholder="Synchronize query identifier..."
             value={input}
             onChange={(e) => setInput(e.target.value)}
             onKeyDown={(e) => e.key === "Enter" && !loading && sendMessage()}
           />
           <button
             onClick={sendMessage}
             disabled={loading || !input.trim()}
             className="absolute right-3 top-1/2 -translate-y-1/2 p-3 bg-[#D4AF37] text-[#020617] rounded-xl hover:bg-[#F1D279] disabled:opacity-30 transition-all shadow-[0_0_15px_rgba(212,175,55,0.2)]"
           >
             <Send className="w-4 h-4" />
           </button>
        </div>
        <div className="mt-4 text-center">
           <span className="text-[8px] tracking-[0.3em] font-bold text-[#F8FAFC]/10 uppercase italic">Secured by Objection Neural Framework</span>
        </div>
      </div>
    </div>
  );
}
