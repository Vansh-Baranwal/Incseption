"use client";

import { useAuthStore } from "@/store/useAuthStore";
import { UserCircle } from "lucide-react";

export default function Navbar() {
  const { user } = useAuthStore();

  if (!user) return null;

  return (
    <header className="flex items-center justify-between px-6 md:px-8 py-4 bg-[#1a1410] border-b border-white/5">
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-emerald-500" />
        <span className="text-xs text-white/40">Connected</span>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="hidden md:flex flex-col text-right">
          <span className="text-sm text-white/80">{user.name}</span>
          <span className="text-xs text-white/30 capitalize">{user.role}</span>
        </div>
        <UserCircle className="w-8 h-8 text-white/20" />
      </div>
    </header>
  );
}
