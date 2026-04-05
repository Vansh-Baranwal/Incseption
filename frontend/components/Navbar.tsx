"use client";

import { useAuthStore } from "@/store/useAuthStore";
import { UserCircle } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

export default function Navbar() {
  const { user } = useAuthStore();

  if (!user) return null;

  return (
    <header className="flex items-center justify-between px-6 md:px-8 py-4 bg-background border-b border-border">
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-emerald-500" />
        <span className="text-xs text-muted-foreground">System Online</span>
      </div>
      
      <div className="flex items-center gap-4">
        <ThemeToggle />
        <div className="h-4 w-[1px] bg-border mx-1" />
        <div className="hidden md:flex flex-col text-right">
          <span className="text-sm text-foreground/80 font-medium">{user.name}</span>
          <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-bold">{user.role}</span>
        </div>
        <UserCircle className="w-8 h-8 text-muted-foreground/30" />
      </div>
    </header>
  );
}
