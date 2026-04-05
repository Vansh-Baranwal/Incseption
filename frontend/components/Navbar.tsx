"use client";

import { useAuthStore } from "@/store/useAuthStore";
import { UserCircle } from "lucide-react";

export default function Navbar() {
  const { user } = useAuthStore();

  if (!user) return null;

  return (
    <header className="flex items-center justify-between px-8 py-5 bg-[#020617]/50 backdrop-blur-md border-b border-white/5 relative z-10">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-emerald-500/80">Secure Link Active</span>
        </div>
      </div>
      
      <div className="flex items-center gap-8 ml-auto">
        <div className="hidden md:flex flex-col text-right">
          <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#F8FAFC]/90">{user.name}</span>
          <span className="text-[8px] tracking-[0.3em] uppercase text-[#F8FAFC]/30">{user.role} Authorization</span>
        </div>
        
        <div className="relative group">
          <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center bg-white/5 group-hover:border-[#D4AF37]/50 transition-colors">
            <UserCircle className="w-5 h-5 text-[#F8FAFC]/40 group-hover:text-[#D4AF37]" />
          </div>
        </div>
      </div>
    </header>
  );
}
