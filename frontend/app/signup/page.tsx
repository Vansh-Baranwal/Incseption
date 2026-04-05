"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";
import toast from "react-hot-toast";
import Link from "next/link";
import { motion } from "framer-motion";

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
      <motion.div 
        className="w-full max-w-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="text-center mb-10">
          <Link href="/">
             <h1 className="text-2xl font-serif text-foreground cursor-pointer mb-1">Objection.ai</h1>
          </Link>
          <p className="text-sm text-muted-foreground">Create your account</p>
        </div>

        <motion.div 
           className="bg-card border border-border rounded-xl p-8 shadow-sm relative overflow-hidden"
           initial={{ opacity: 0, scale: 0.95 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
        >
          <form onSubmit={handleSignup} className="flex flex-col gap-6 relative z-10">
            <motion.div 
              className="flex bg-muted rounded-lg p-1 gap-1"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
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
            </motion.div>

            <motion.div 
              className="flex flex-col gap-1.5"
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.25 }}
            >
              <label className="text-sm text-muted-foreground font-medium">Full Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 bg-muted/50 border border-border rounded-lg text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary/20 focus:border-primary/50 transition-all placeholder:text-muted-foreground/30"
                placeholder="John Doe"
              />
            </motion.div>

            <motion.div 
              className="flex flex-col gap-1.5"
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <label className="text-sm text-muted-foreground font-medium">Email</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 bg-muted/50 border border-border rounded-lg text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary/20 focus:border-primary/50 transition-all placeholder:text-muted-foreground/30"
                placeholder="you@example.com"
              />
            </motion.div>

            <motion.div 
              className="flex flex-col gap-1.5"
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.35 }}
            >
              <label className="text-sm text-muted-foreground font-medium">Password</label>
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-4 py-3 bg-muted/50 border border-border rounded-lg text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary/20 focus:border-primary/50 transition-all placeholder:text-muted-foreground/30"
                placeholder="••••••••"
              />
            </motion.div>

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="w-full py-3 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:opacity-90 disabled:opacity-50 transition-all shadow-sm"
            >
              {loading ? "Creating account..." : "Create Account"}
            </motion.button>
          </form>

          <motion.div 
            className="mt-8 pt-6 border-t border-border text-center relative z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link href="/login" className="text-foreground font-medium hover:underline transition-colors">
                Sign in
              </Link>
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
