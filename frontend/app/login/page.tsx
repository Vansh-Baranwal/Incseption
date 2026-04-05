"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";
import { Role, useAuthStore } from "@/store/useAuthStore";
import toast from "react-hot-toast";
import Link from "next/link";

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
      toast.success("Signed in successfully");

      const matchedRole = response.user.role;
      router.push(`/dashboard/${matchedRole}`);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#1a1410] p-6 text-[#e8e4df]">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <Link href="/">
             <h1 className="text-2xl font-serif text-white cursor-pointer mb-1">Objection.ai</h1>
          </Link>
          <p className="text-sm text-white/40">Sign in to your account</p>
        </div>

        <div className="bg-white/5 border border-white/8 rounded-xl p-8">
          <form onSubmit={handleLogin} className="flex flex-col gap-6">
            {/* Role selector */}
            <div className="flex bg-black/30 rounded-lg p-1 gap-1">
              {(["citizen", "lawyer", "admin"] as Role[]).map((r) => (
                 <button
                   key={r}
                   type="button"
                   onClick={() => setRole(r)}
                   className={`flex-1 py-2 text-sm capitalize rounded-md transition-all ${role === r ? "bg-white text-[#1a1410] font-medium" : "text-white/40 hover:text-white"}`}
                 >
                   {r}
                 </button>
              ))}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm text-white/50">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-black/30 border border-white/8 rounded-lg text-white text-sm focus:outline-none focus:border-white/20 transition-colors placeholder:text-white/15"
                placeholder="you@example.com"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm text-white/50">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-black/30 border border-white/8 rounded-lg text-white text-sm focus:outline-none focus:border-white/20 transition-colors placeholder:text-white/15"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-white text-[#1a1410] text-sm font-medium rounded-lg hover:bg-white/90 disabled:opacity-50 transition-colors"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-white/5 text-center">
            <p className="text-sm text-white/30">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="text-white/70 hover:text-white transition-colors">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
