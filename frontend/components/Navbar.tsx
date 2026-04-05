"use client";

import { useAuthStore } from "@/store/useAuthStore";
import { UserCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { user } = useAuthStore();
  const router = useRouter();

  if (!user) return null;

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-[#1E293B] border-b border-[#334155]">
      <h2 className="text-xl font-serif text-[#C6A75E] hidden md:block">
        Objection.ai Portal
      </h2>
      <div className="flex items-center gap-4 ml-auto">
        <div className="flex items-center gap-2">
          <UserCircle className="w-8 h-8 text-[#94A3B8]" />
          <div className="flex flex-col text-sm text-right">
            <span className="font-medium text-[#F8FAFC]">{user.name}</span>
            <span className="text-xs text-[#94A3B8] capitalize">{user.role}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
