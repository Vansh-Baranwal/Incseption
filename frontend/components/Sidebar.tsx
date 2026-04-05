"use client";

import { useAuthStore } from "@/store/useAuthStore";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LogOut,
  ShieldAlert,
  UploadCloud,
  BarChart,
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
    <aside className="flex flex-col h-full w-60 bg-card border-r border-border transition-colors duration-300">
      <div className="px-6 py-6 border-b border-border">
        <Link href="/">
           <h1 className="text-lg font-serif text-foreground cursor-pointer">Objection.ai</h1>
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
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 ${
                isActive 
                  ? "bg-primary/10 text-primary font-medium" 
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              <Icon className="w-4 h-4" />
              {link.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-3 px-3 py-3 mb-3 rounded-xl bg-muted/30">
           <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs font-bold">
             {userName?.charAt(0) || "U"}
           </div>
           <div className="flex flex-col truncate">
             <span className="text-sm text-foreground/80 font-medium truncate">{userName || "User"}</span>
             <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">{role}</span>
           </div>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center w-full gap-3 px-3 py-2.5 text-sm text-muted-foreground hover:text-red-500 transition-colors rounded-lg hover:bg-red-500/5"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
