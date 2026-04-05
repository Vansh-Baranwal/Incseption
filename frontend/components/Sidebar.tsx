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
  const { role, logout } = useAuthStore((state) => ({
    role: state.user?.role,
    logout: state.logout,
  }));
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const citizenLinks = [
    { name: "Whistleblower Vault", href: "/dashboard/citizen", icon: ShieldAlert },
    { name: "Nyaya Setu Chat", href: "/dashboard/citizen/chat", icon: MessageSquare },
    { name: "Legal Vault", href: "/dashboard/citizen/vault", icon: FileText },
  ];

  const lawyerLinks = [
    { name: "Document Upload", href: "/dashboard/lawyer", icon: UploadCloud },
    { name: "QR Verifier Engine", href: "/dashboard/lawyer/qr", icon: QrCode },
    { name: "Chain of Custody", href: "/dashboard/lawyer/timeline", icon: Activity },
    { name: "Dead Man's Switch", href: "/dashboard/lawyer/deadman", icon: FileText },
    { name: "Time Capsule", href: "/dashboard/lawyer/timecapsule", icon: Archive },
  ];

  const adminLinks = [
    { name: "System Overview", href: "/dashboard/admin", icon: BarChart },
    { name: "Activity Logs", href: "/dashboard/admin/activity", icon: List },
  ];

  let links: any[] = [];
  if (role === "citizen") links = citizenLinks;
  if (role === "lawyer") links = lawyerLinks;
  if (role === "admin") links = adminLinks;

  return (
    <aside className="flex flex-col h-full w-64 bg-[#0F172A] border-r border-[#334155]">
      <div className="flex items-center justify-center py-6 border-b border-[#334155]">
        <Link href="/">
           <h1 className="text-2xl font-serif font-bold tracking-tight text-[#C6A75E]">Objection.ai</h1>
        </Link>
      </div>

      <nav className="flex flex-col flex-1 gap-2 p-4 overflow-y-auto">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;

          return (
            <Link
              key={link.name}
              href={link.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors font-sans text-sm
                ${isActive ? "bg-[#1E293B] text-[#C6A75E] border-l-2 border-[#C6A75E]" : "text-[#94A3B8] hover:bg-[#1E293B]/50 hover:text-[#F8FAFC]"}`}
            >
              <Icon className="w-5 h-5" />
              {link.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-[#334155]">
        <button
          onClick={handleLogout}
          className="flex items-center w-full gap-3 px-4 py-3 text-sm text-[#EF4444] transition-colors rounded-lg hover:bg-[#1E293B]/50"
        >
          <LogOut className="w-5 h-5" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
