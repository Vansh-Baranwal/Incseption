"use client";

import { useAuthStore } from "@/store/useAuthStore";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  LogOut,
  ShieldAlert,
  UploadCloud,
  BarChart,
} from "lucide-react";
import { Logo } from "./Logo";

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
    <aside className="flex flex-col h-full w-60 bg-card border-r border-border transition-colors duration-300 relative z-20">
      <div className="px-6 py-6 border-b border-border">
        <Link href="/" className="flex items-center gap-3 group">
           <Logo size={36} />
           <motion.h1 
             className="text-lg font-sans font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent cursor-pointer"
             animate={{ 
               backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
             }}
             transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
             style={{ backgroundSize: "200% auto" }}
           >
             Objection.ai
           </motion.h1>
        </Link>
      </div>

      <nav className="flex flex-col flex-1 gap-1 p-3 overflow-y-auto">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;

          return (
            <Link
              key={link.name}
              href={link.href}
            >
              <motion.div
                whileHover={{ x: 6, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                animate={isActive ? {
                  boxShadow: [
                    "0 0 0 0 rgba(var(--primary-rgb), 0.4)",
                    "0 0 0 3px rgba(var(--primary-rgb), 0.1)",
                    "0 0 0 0 rgba(var(--primary-rgb), 0.4)"
                  ]
                } : {}}
                transition={isActive ? { duration: 2, repeat: Infinity } : {}}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 ${
                  isActive 
                    ? "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-xl shadow-primary/30 font-medium" 
                    : "text-muted-foreground hover:text-foreground hover:bg-gradient-to-r hover:from-muted hover:to-muted/50"
                }`}
              >
                <motion.div
                  animate={isActive ? { rotate: [0, 5, -5, 0] } : {}}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Icon className="w-4 h-4" />
                </motion.div>
                {link.name}
              </motion.div>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-border">
        <motion.div 
          animate={{ 
            scale: [1, 1.02, 1],
            boxShadow: [
              "0 0 0 0 rgba(var(--primary-rgb), 0)",
              "0 0 0 4px rgba(var(--primary-rgb), 0.1)",
              "0 0 0 0 rgba(var(--primary-rgb), 0)"
            ]
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="flex items-center gap-3 px-3 py-3 mb-3 rounded-xl bg-gradient-to-r from-muted/40 to-muted/20 border border-border/10 backdrop-blur-sm"
        >
           <motion.div 
             className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center text-primary text-xs font-bold shadow-lg"
             animate={{ rotate: [0, 5, -5, 0] }}
             transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
           >
             {userName?.charAt(0) || "U"}
           </motion.div>
           <div className="flex flex-col truncate">
             <span className="text-sm text-foreground/90 font-medium truncate">{userName || "User"}</span>
             <motion.span 
               className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold"
               animate={{ opacity: [0.6, 1, 0.6] }}
               transition={{ duration: 2, repeat: Infinity }}
             >
               {role}
             </motion.span>
           </div>
        </motion.div>

        <motion.button
          onClick={handleLogout}
          whileHover={{ scale: 1.02, x: -2 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center w-full gap-3 px-3 py-2.5 text-sm text-muted-foreground hover:text-red-500 transition-all rounded-lg hover:bg-gradient-to-r hover:from-red-500/10 hover:to-red-500/5 group"
        >
          <motion.div
            animate={{ rotate: [0, -5, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <LogOut className="w-4 h-4 group-hover:rotate-12 transition-transform" />
          </motion.div>
          <span>Sign Out</span>
        </motion.button>
      </div>
    </aside>
  );
}
