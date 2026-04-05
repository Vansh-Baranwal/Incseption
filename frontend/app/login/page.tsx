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
      toast.success("Login Successful");

      // Redirect payload specifies exact dashboard bounds
      const matchedRole = response.user.role;
      router.push(`/dashboard/${matchedRole}`);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0F172A] p-4 text-[#F8FAFC]">
      <div className="w-full max-w-md bg-[#1E293B] border border-[#334155] rounded-xl p-8 shadow-2xl">
        <div className="text-center mb-8">
          <Link href="/">
             <h1 className="text-3xl font-serif text-[#C6A75E] font-bold tracking-tight cursor-pointer">Objection.ai</h1>
          </Link>
          <p className="text-[#94A3B8] text-sm mt-2">Sign in to your legal portal</p>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-6">
          <div className="flex bg-[#020617] rounded-lg p-1 gap-1 border border-[#334155]">
            {(["citizen", "lawyer", "admin"] as Role[]).map((r) => (
               <button
                 key={r}
                 type="button"
                 onClick={() => setRole(r)}
                 className={`flex-1 py-2 text-sm capitalize font-medium rounded-md transition-all duration-300 ${role === r ? "bg-[#334155] text-[#F8FAFC]" : "text-[#94A3B8] hover:text-[#F8FAFC]"}`}
               >
                 {r}
               </button>
            ))}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[#94A3B8]">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-[#020617] border border-[#334155] rounded-lg text-[#F8FAFC] focus:outline-none focus:border-[#C6A75E] transition-colors"
              placeholder="name@example.com"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[#94A3B8]">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-[#020617] border border-[#334155] rounded-lg text-[#F8FAFC] focus:outline-none focus:border-[#C6A75E] transition-colors"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#C6A75E] text-[#0F172A] font-semibold rounded-lg hover:bg-opacity-90 transition-all flex justify-center items-center gap-2"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Sign In"}
          </button>
        </form>

        <p className="text-center text-sm text-[#94A3B8] mt-6">
          Don&apos;t have an account? <Link href="/signup" className="text-[#C6A75E] hover:underline">Register here</Link>
        </p>
      </div>
    </div>
  );
}
