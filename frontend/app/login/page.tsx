"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";
import { Role, useAuthStore } from "@/store/useAuthStore";
import toast from "react-hot-toast";
import Link from "next/link";
import { Loader2 } from "lucide-react";

export default function LoginPage() {
  const [role, setRole] = useState<Role>("citizen");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const setAuth = useAuthStore((state) => state.login);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = { email, password, role };
      const response = await apiFetch<{ token: string; user: any }>("/auth/login", {
        method: "POST",
        body: payload,
        requireAuth: false,
      });

      setAuth(response.token, response.user);
      toast.success("Identity Verified");

      const matchedRole = response.user.role;
      router.push(`/dashboard/${matchedRole}`);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#020617] p-6 text-[#F8FAFC]">
      {/* Cinematic Background elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#D4AF37]/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 blur-[120px] rounded-full" />
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-12">
          <Link href="/">
             <h1 className="text-3xl font-serif text-[#D4AF37] font-bold tracking-[0.2em] uppercase cursor-pointer mb-2">Objection</h1>
          </Link>
          <div className="h-px w-12 bg-[#D4AF37]/30 mx-auto mb-4" />
          <p className="text-[#F8FAFC]/40 text-[10px] uppercase tracking-[0.3em] font-bold">Secure Portal Authentication</p>
        </div>

        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl p-10 shadow-2xl">
          <form onSubmit={handleLogin} className="flex flex-col gap-8">
            <div className="flex bg-black/40 rounded-full p-1 border border-white/5 gap-1">
              {(["citizen", "lawyer", "admin"] as Role[]).map((r) => (
                 <button
                   key={r}
                   type="button"
                   onClick={() => setRole(r)}
                   className={`flex-1 py-2 text-[10px] uppercase tracking-widest font-bold rounded-full transition-all duration-500 ${role === r ? "bg-[#D4AF37] text-[#020617]" : "text-[#F8FAFC]/40 hover:text-[#F8FAFC]"}`}
                 >
                   {r}
                 </button>
              ))}
            </div>

            <div className="flex flex-col gap-3">
              <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#F8FAFC]/30 ml-1">Identity Identifier</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl text-[#F8FAFC] text-sm focus:outline-none focus:border-[#D4AF37]/50 transition-all placeholder:text-white/10"
                placeholder="name@nexus.com"
              />
            </div>

            <div className="flex flex-col gap-3">
              <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#F8FAFC]/30 ml-1">Access Protocol</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl text-[#F8FAFC] text-sm focus:outline-none focus:border-[#D4AF37]/50 transition-all placeholder:text-white/10"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="group relative w-full py-4 mt-2 overflow-hidden rounded-xl border border-[#D4AF37]/50 text-[#D4AF37] text-[10px] uppercase tracking-[0.3em] font-bold hover:text-[#020617] transition-colors duration-500"
            >
              <span className="relative z-10">{loading ? "Validating..." : "Initialize Session"}</span>
              <div className="absolute inset-0 bg-[#D4AF37] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
            </button>
          </form>

          <div className="mt-10 pt-8 border-t border-white/5 text-center">
            <p className="text-[10px] font-bold tracking-[0.1em] text-[#F8FAFC]/20">
              New entity? <Link href="/signup" className="text-[#D4AF37] hover:text-[#F1D279] transition-colors ml-1 uppercase">Register Identity</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
