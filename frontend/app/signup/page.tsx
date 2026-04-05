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
    <div className="flex min-h-screen items-center justify-center bg-background p-6 text-foreground transition-colors duration-300">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <Link href="/">
             <h1 className="text-2xl font-serif text-foreground cursor-pointer mb-1">Objection.ai</h1>
          </Link>
          <p className="text-sm text-muted-foreground">Create your account</p>
        </div>

        <div className="bg-card border border-border rounded-xl p-8 shadow-sm">
          <form onSubmit={handleSignup} className="flex flex-col gap-6">
            <div className="flex bg-muted rounded-lg p-1 gap-1">
              {(["citizen", "lawyer"] as Role[]).map((r) => (
                 <button
                   key={r}
                   type="button"
                   onClick={() => setFormData({ ...formData, role: r })}
                   className={`flex-1 py-2 text-sm capitalize rounded-md transition-all ${formData.role === r ? "bg-background text-foreground shadow-sm font-medium" : "text-muted-foreground hover:text-foreground"}`}
                 >
                   {r}
                 </button>
              ))}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm text-muted-foreground font-medium">Full Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 bg-muted/50 border border-border rounded-lg text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary/20 focus:border-primary/50 transition-all placeholder:text-muted-foreground/30"
                placeholder="John Doe"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm text-muted-foreground font-medium">Email</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 bg-muted/50 border border-border rounded-lg text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary/20 focus:border-primary/50 transition-all placeholder:text-muted-foreground/30"
                placeholder="you@example.com"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm text-muted-foreground font-medium">Password</label>
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-4 py-3 bg-muted/50 border border-border rounded-lg text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary/20 focus:border-primary/50 transition-all placeholder:text-muted-foreground/30"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:opacity-90 disabled:opacity-50 transition-all"
            >
              {loading ? "Creating account..." : "Create Account"}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-border text-center">
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link href="/login" className="text-foreground font-medium hover:underline transition-colors">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
