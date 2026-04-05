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
    if (mounted && !token) {
      router.push("/login");
    }
  }, [token, router, mounted]);

  if (!mounted) {
    return <div className="min-h-screen bg-background" />;
  }

  if (!token) {
     return <div className="min-h-screen bg-background" />;
  }

  return (
    <div className="flex h-screen w-full bg-background text-foreground overflow-hidden transition-colors duration-300">
      <Sidebar />
      <div className="flex flex-col flex-1 min-w-0">
        <Navbar />
        <main className="flex-1 overflow-y-auto">
          <div className="p-6 md:p-8 lg:p-10 mx-auto max-w-7xl w-full">
             {children}
          </div>
        </main>
      </div>
    </div>
  );
}
