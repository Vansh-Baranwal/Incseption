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
    { role: "bot", content: "Hello, I am Nyaya Setu, your legal AI assistant. How can I help you today?" }
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
    <div className="bg-[#1E293B] border border-[#334155] rounded-xl flex flex-col h-[500px] shadow-lg">
      <div className="p-4 border-b border-[#334155] bg-[#020617]/50 rounded-t-xl">
        <h3 className="font-serif text-xl text-[#F8FAFC]">Nyaya Setu Chatbot</h3>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
        <AnimatePresence>
          {messages.map((m, idx) => (
             <motion.div
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               key={idx}
               className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
             >
                <div className={`p-3 rounded-xl max-w-[80%] text-sm ${m.role === "user" ? "bg-[#334155] text-[#F8FAFC]" : "bg-[#020617] text-[#94A3B8] border border-[#334155]"}`}>
                  {m.content}
                </div>
             </motion.div>
          ))}
        </AnimatePresence>
        {loading && (
          <div className="flex justify-start">
             <div className="p-3 bg-[#020617] border border-[#334155] rounded-xl flex items-center gap-2">
               <Loader2 className="w-4 h-4 animate-spin text-[#C6A75E]" />
             </div>
          </div>
        )}
      </div>

      <div className="p-4 border-t border-[#334155] bg-[#020617]/50 rounded-b-xl flex gap-2">
        <input
          className="flex-1 bg-transparent border border-[#334155] rounded-lg px-4 py-2 text-sm text-[#F8FAFC] focus:outline-none focus:border-[#C6A75E] transition-colors"
          placeholder="Ask a legal query..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && !loading && sendMessage()}
        />
        <button
          onClick={sendMessage}
          disabled={loading || !input.trim()}
          className="p-2 bg-[#C6A75E] text-[#0F172A] rounded-lg hover:bg-opacity-90 disabled:opacity-50 transition-colors"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
