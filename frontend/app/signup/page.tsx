"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";
import toast from "react-hot-toast";
import Link from "next/link";

type Role = "citizen" | "lawyer";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "citizen" as Role,
  });
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await apiFetch("/auth/signup", {
        method: "POST",
        body: formData,
        requireAuth: false,
      });

      toast.success("Account created successfully");
      router.push("/login");
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
          <p className="text-sm text-white/40">Create your account</p>
        </div>

        <div className="bg-white/5 border border-white/8 rounded-xl p-8">
          <form onSubmit={handleSignup} className="flex flex-col gap-6">
            <div className="flex bg-black/30 rounded-lg p-1 gap-1">
              {(["citizen", "lawyer"] as Role[]).map((r) => (
                 <button
                   key={r}
                   type="button"
                   onClick={() => setFormData({ ...formData, role: r })}
                   className={`flex-1 py-2 text-sm capitalize rounded-md transition-all ${formData.role === r ? "bg-white text-[#1a1410] font-medium" : "text-white/40 hover:text-white"}`}
                 >
                   {r}
                 </button>
              ))}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm text-white/50">Full Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 bg-black/30 border border-white/8 rounded-lg text-white text-sm focus:outline-none focus:border-white/20 transition-colors placeholder:text-white/15"
                placeholder="John Doe"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm text-white/50">Email</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 bg-black/30 border border-white/8 rounded-lg text-white text-sm focus:outline-none focus:border-white/20 transition-colors placeholder:text-white/15"
                placeholder="you@example.com"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm text-white/50">Password</label>
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-4 py-3 bg-black/30 border border-white/8 rounded-lg text-white text-sm focus:outline-none focus:border-white/20 transition-colors placeholder:text-white/15"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-white text-[#1a1410] text-sm font-medium rounded-lg hover:bg-white/90 disabled:opacity-50 transition-colors"
            >
              {loading ? "Creating account..." : "Create Account"}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-white/5 text-center">
            <p className="text-sm text-white/30">
              Already have an account?{" "}
              <Link href="/login" className="text-white/70 hover:text-white transition-colors">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
