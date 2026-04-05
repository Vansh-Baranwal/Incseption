"use client";

import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const token = useAuthStore((state) => state.token);

  useEffect(() => {
    setMounted(true);
    if (!token) {
      router.push("/login");
    }
  }, [token, router]);

  if (!mounted || !token) {
    return <div className="min-h-screen bg-[#020617]" />; // Safe hydration wrapper
  }

  return (
    <div className="flex h-screen w-full bg-[#020617] text-[#F8FAFC] overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 min-w-0">
        <Navbar />
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="mx-auto max-w-6xl w-full">
             {children}
          </div>
        </main>
      </div>
    </div>
  );
}
