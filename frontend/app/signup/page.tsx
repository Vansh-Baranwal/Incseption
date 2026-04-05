"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";
import toast from "react-hot-toast";
import Link from "next/link";
import { Loader2 } from "lucide-react";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [aadhaar, setAadhaar] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = { name, email, aadhaar, password };
      // Explicitly define as citizen sign up since role checks map implicitly for now
      await apiFetch("/auth/signup", {
        method: "POST",
        body: payload,
        requireAuth: false,
      });

      toast.success("Registration Successful!");
      router.push(`/login`);
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
          <p className="text-[#94A3B8] text-sm mt-2">Register a new citizen account</p>
        </div>

        <form onSubmit={handleSignup} className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[#94A3B8]">Full Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 bg-[#020617] border border-[#334155] rounded-lg text-[#F8FAFC] focus:outline-none focus:border-[#C6A75E] transition-colors"
              placeholder="John Doe"
            />
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
            <label className="text-sm font-medium text-[#94A3B8]">Aadhaar Number</label>
            <input
              type="text"
              required
              value={aadhaar}
              onChange={(e) => setAadhaar(e.target.value)}
              className="w-full px-4 py-3 bg-[#020617] border border-[#334155] rounded-lg text-[#F8FAFC] focus:outline-none focus:border-[#C6A75E] transition-colors"
              placeholder="1234 5678 9012"
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
            className="w-full py-3 bg-[#C6A75E] text-[#0F172A] font-semibold rounded-lg hover:bg-opacity-90 transition-all flex justify-center items-center gap-2 mt-2"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Complete Registration"}
          </button>
        </form>

        <p className="text-center text-sm text-[#94A3B8] mt-6">
          Already have an account? <Link href="/login" className="text-[#C6A75E] hover:underline">Sign In</Link>
        </p>
      </div>
    </div>
  );
}
