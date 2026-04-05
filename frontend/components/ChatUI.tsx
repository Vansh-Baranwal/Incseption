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
    <div className="flex flex-col h-[500px] bg-card rounded-2xl border border-border overflow-hidden shadow-sm transition-all duration-300">
      <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-4">
        <AnimatePresence initial={false}>
          {messages.map((m, idx) => (
             <motion.div
               initial={{ opacity: 0, y: 10, scale: 0.95 }}
               animate={{ opacity: 1, y: 0, scale: 1 }}
               key={idx}
               className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
             >
                <div className={`px-4 py-2.5 rounded-2xl max-w-[85%] text-sm leading-relaxed transition-colors duration-300 ${
                  m.role === "user" 
                    ? "bg-primary text-primary-foreground rounded-br-none shadow-sm" 
                    : "bg-muted text-foreground border border-border rounded-bl-none"
                }`}>
                  {m.content}
                </div>
             </motion.div>
          ))}
        </AnimatePresence>
        {loading && (
          <div className="flex justify-start">
             <div className="px-4 py-3 bg-muted border border-border rounded-2xl flex items-center gap-1.5">
               <div className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce" />
               <div className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce [animation-delay:0.15s]" />
               <div className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce [animation-delay:0.3s]" />
             </div>
          </div>
        )}
      </div>

      <div className="p-4 bg-muted/20 border-t border-border">
        <div className="relative group">
           <input
             className="w-full bg-muted/50 border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary/30 focus:border-primary transition-all placeholder:text-muted-foreground/40 pr-12"
             placeholder="Ask a legal question..."
             value={input}
             onChange={(e) => setInput(e.target.value)}
             onKeyDown={(e) => e.key === "Enter" && !loading && sendMessage()}
           />
           <button
             onClick={sendMessage}
             disabled={loading || !input.trim()}
             className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 text-muted-foreground hover:text-primary disabled:opacity-20 transition-all rounded-lg hover:bg-primary/5"
           >
             <Send className="w-4 h-4" />
           </button>
        </div>
      </div>
    </div>
  );
}
