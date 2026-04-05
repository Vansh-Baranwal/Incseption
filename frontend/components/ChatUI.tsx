"use client";

import { useState } from "react";
import { apiFetch } from "@/lib/api";
import { Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

interface Message {
  role: "user" | "bot";
  content: string;
}

export default function ChatUI() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", content: "Hello, I'm Nyaya Setu — your legal AI assistant. How can I help you today?" }
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
    <div className="flex flex-col h-[500px]">
      <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-3">
        <AnimatePresence>
          {messages.map((m, idx) => (
             <motion.div
               initial={{ opacity: 0, y: 6 }}
               animate={{ opacity: 1, y: 0 }}
               key={idx}
               className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
             >
                <div className={`px-4 py-3 rounded-xl max-w-[80%] text-sm leading-relaxed ${
                  m.role === "user" 
                    ? "bg-white/10 text-white rounded-br-sm" 
                    : "bg-white/5 text-white/70 border border-white/5 rounded-bl-sm"
                }`}>
                  {m.content}
                </div>
             </motion.div>
          ))}
        </AnimatePresence>
        {loading && (
          <div className="flex justify-start">
             <div className="px-4 py-3 bg-white/5 border border-white/5 rounded-xl flex items-center gap-1.5">
               <div className="w-1.5 h-1.5 bg-white/30 rounded-full animate-bounce" />
               <div className="w-1.5 h-1.5 bg-white/30 rounded-full animate-bounce [animation-delay:0.15s]" />
               <div className="w-1.5 h-1.5 bg-white/30 rounded-full animate-bounce [animation-delay:0.3s]" />
             </div>
          </div>
        )}
      </div>

      <div className="p-4 border-t border-white/5">
        <div className="relative">
           <input
             className="w-full bg-white/5 border border-white/8 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-white/20 transition-colors placeholder:text-white/20 pr-12"
             placeholder="Ask a legal question..."
             value={input}
             onChange={(e) => setInput(e.target.value)}
             onKeyDown={(e) => e.key === "Enter" && !loading && sendMessage()}
           />
           <button
             onClick={sendMessage}
             disabled={loading || !input.trim()}
             className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-white/30 hover:text-white disabled:opacity-30 transition-colors"
           >
             <Send className="w-4 h-4" />
           </button>
        </div>
      </div>
    </div>
  );
}
