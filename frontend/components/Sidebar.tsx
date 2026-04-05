"use client";

import { useAuthStore } from "@/store/useAuthStore";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LogOut,
  ShieldAlert,
  MessageSquare,
  FileText,
  UploadCloud,
  QrCode,
  Activity,
  Archive,
  BarChart,
  List
} from "lucide-react";

export default function Sidebar() {
  const { role, logout, userName } = useAuthStore((state) => ({
    role: state.user?.role,
    userName: state.user?.name,
    logout: state.logout,
  }));
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const citizenLinks = [
    { name: "VAULT", href: "/dashboard/citizen", icon: ShieldAlert },
    { name: "NYAYA SETU", href: "/dashboard/citizen/chat", icon: MessageSquare },
    { name: "DOCUMENTS", href: "/dashboard/citizen/vault", icon: FileText },
  ];

  const lawyerLinks = [
    { name: "INGESTION", href: "/dashboard/lawyer", icon: UploadCloud },
    { name: "VERIFIER", href: "/dashboard/lawyer/qr", icon: QrCode },
    { name: "CUSTODY", href: "/dashboard/lawyer/timeline", icon: Activity },
    { name: "DEADMAN", href: "/dashboard/lawyer/deadman", icon: FileText },
    { name: "CAPSULE", href: "/dashboard/lawyer/timecapsule", icon: Archive },
  ];

  const adminLinks = [
    { name: "ANALYTICS", href: "/dashboard/admin", icon: BarChart },
    { name: "PROTOCOL LOGS", href: "/dashboard/admin/activity", icon: List },
  ];

  let links: any[] = [];
  if (role === "citizen") links = citizenLinks;
  if (role === "lawyer") links = lawyerLinks;
  if (role === "admin") links = adminLinks;

  return (
    <aside className="flex flex-col h-full w-72 bg-[#020617] border-r border-white/5 relative z-20">
      <div className="px-10 py-10 mb-4">
        <Link href="/">
           <h1 className="text-xl font-serif font-bold tracking-[0.2em] uppercase text-[#D4AF37] cursor-pointer">Objection</h1>
        </Link>
        <p className="text-[10px] tracking-[0.3em] font-bold text-[#F8FAFC]/20 mt-2">LEGAL PROTOCOL V.1.0</p>
      </div>

      <nav className="flex flex-col flex-1 gap-1 px-6 overflow-y-auto">
        <div className="text-[10px] font-bold tracking-[0.3em] text-[#F8FAFC]/20 uppercase mb-4 ml-4">Command Center</div>
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;

          return (
            <Link
              key={link.name}
              href={link.href}
              className={`group flex items-center gap-4 px-5 py-3.5 rounded-xl transition-all duration-300 relative
                ${isActive ? "bg-white/5 text-[#D4AF37] shadow-xl" : "text-[#F8FAFC]/40 hover:text-[#F8FAFC] hover:bg-white/[0.02]"}`}
            >
              <Icon className={`w-4 h-4 transition-colors ${isActive ? "text-[#D4AF37]" : "text-[#F8FAFC]/20 group-hover:text-[#D4AF37]/50"}`} />
              <span className="text-[10px] font-bold tracking-[0.3em] uppercase">{link.name}</span>
              {isActive && (
                <div className="absolute left-0 top-1/4 bottom-1/4 w-0.5 bg-[#D4AF37] rounded-full shadow-[0_0_10px_#D4AF37]" />
              )}
            </Link>
          );
        })}
      </nav>

      <div className="p-6 border-t border-white/5 bg-black/20">
        <div className="flex items-center gap-4 px-4 py-4 mb-4 rounded-xl bg-white/5 border border-white/5">
           <div className="w-8 h-8 rounded-full bg-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37] font-serif text-xs border border-[#D4AF37]/20">
             {userName?.charAt(0) || "U"}
           </div>
           <div className="flex flex-col truncate">
             <span className="text-[10px] font-bold tracking-widest uppercase text-[#F8FAFC]/80">{userName || "User Entity"}</span>
             <span className="text-[8px] tracking-[0.2em] uppercase text-[#F8FAFC]/30">{role || "Protocol Access"}</span>
           </div>
        </div>

        <button
          onClick={handleLogout}
          className="group flex items-center w-full gap-4 px-5 py-3.5 text-[10px] font-bold tracking-[0.3em] uppercase text-[#F8FAFC]/30 hover:text-[#EF4444] transition-all rounded-xl hover:bg-red-500/5"
        >
          <LogOut className="w-4 h-4 transition-colors" />
          Terminate Session
        </button>
      </div>
    </aside>
  );
}
