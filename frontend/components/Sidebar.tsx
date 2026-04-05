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
    { name: "Dashboard", href: "/dashboard/citizen", icon: ShieldAlert },
  ];

  const lawyerLinks = [
    { name: "Dashboard", href: "/dashboard/lawyer", icon: UploadCloud },
  ];

  const adminLinks = [
    { name: "Dashboard", href: "/dashboard/admin", icon: BarChart },
  ];

  let links: any[] = [];
  if (role === "citizen") links = citizenLinks;
  if (role === "lawyer") links = lawyerLinks;
  if (role === "admin") links = adminLinks;

  return (
    <aside className="flex flex-col h-full w-60 bg-[#15110d] border-r border-white/5">
      <div className="px-6 py-6 border-b border-white/5">
        <Link href="/">
           <h1 className="text-lg font-serif text-white cursor-pointer">Objection.ai</h1>
        </Link>
      </div>

      <nav className="flex flex-col flex-1 gap-0.5 p-3 overflow-y-auto">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;

          return (
            <Link
              key={link.name}
              href={link.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                isActive 
                  ? "bg-white/8 text-white" 
                  : "text-white/40 hover:text-white hover:bg-white/3"
              }`}
            >
              <Icon className="w-4 h-4" />
              {link.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/5">
        <div className="flex items-center gap-3 px-3 py-3 mb-3 rounded-lg bg-white/5">
           <div className="w-7 h-7 rounded-full bg-amber-800/30 flex items-center justify-center text-amber-200 text-xs font-medium">
             {userName?.charAt(0) || "U"}
           </div>
           <div className="flex flex-col truncate">
             <span className="text-sm text-white/80 truncate">{userName || "User"}</span>
             <span className="text-xs text-white/30 capitalize">{role}</span>
           </div>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center w-full gap-3 px-3 py-2.5 text-sm text-white/30 hover:text-red-400 transition-colors rounded-lg hover:bg-white/3"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
