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
    <div className="flex min-h-screen items-center justify-center bg-background p-6 text-foreground transition-colors duration-300">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <Link href="/">
             <h1 className="text-2xl font-serif text-foreground cursor-pointer mb-1">Objection.ai</h1>
          </Link>
          <p className="text-sm text-muted-foreground">Sign in to your account</p>
        </div>

        <div className="bg-card border border-border rounded-xl p-8 shadow-sm">
          <form onSubmit={handleLogin} className="flex flex-col gap-6">
            {/* Role selector */}
            <div className="flex bg-muted rounded-lg p-1 gap-1">
              {(["citizen", "lawyer", "admin"] as Role[]).map((r) => (
                 <button
                   key={r}
                   type="button"
                   onClick={() => setRole(r)}
                   className={`flex-1 py-2 text-sm capitalize rounded-md transition-all ${role === r ? "bg-background text-foreground shadow-sm font-medium" : "text-muted-foreground hover:text-foreground"}`}
                 >
                   {r}
                 </button>
              ))}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm text-muted-foreground font-medium">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-muted/50 border border-border rounded-lg text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary/20 focus:border-primary/50 transition-all placeholder:text-muted-foreground/30"
                placeholder="you@example.com"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm text-muted-foreground font-medium">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-muted/50 border border-border rounded-lg text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary/20 focus:border-primary/50 transition-all placeholder:text-muted-foreground/30"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:opacity-90 disabled:opacity-50 transition-all"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-border text-center">
            <p className="text-sm text-muted-foreground">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="text-foreground font-medium hover:underline transition-colors">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
