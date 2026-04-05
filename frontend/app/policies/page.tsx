"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import Link from "next/link";
import { MoveRight, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

interface Policy {
  id: string;
  title: string;
  description: string;
  link: string;
}

export default function PoliciesPage() {
  const [policies, setPolicies] = useState<Policy[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    apiFetch<Policy[]>("/policies", { requireAuth: false })
      .then((res) => setPolicies(res))
      .catch((err) => {
         // Graceful fallback for demo
         toast.error("Network issue loading policies", { id: "pol-error" });
      })
      .finally(() => setLoading(false));
  }, []);

  const filtered = policies.filter(p => p.title.toLowerCase().includes(searchTerm.toLowerCase()) || p.description.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="min-h-screen bg-[#0F172A] text-[#F8FAFC] flex flex-col">
       <header className="flex items-center justify-between px-6 py-4 border-b border-[#334155] bg-[#020617]">
         <Link href="/">
           <h2 className="text-2xl font-serif text-[#C6A75E] tracking-tight">Objection.ai</h2>
         </Link>
       </header>

       <main className="flex-1 max-w-5xl w-full mx-auto p-4 md:p-10 flex flex-col gap-10">
          <div className="flex flex-col gap-4">
            <h1 className="text-5xl font-serif text-[#F8FAFC]">Platform Policies</h1>
            <p className="text-[#94A3B8] text-lg">Read through the rigid compliance rules governing Objection.ai&apos;s network injections.</p>
          </div>

          <input 
             value={searchTerm}
             onChange={e => setSearchTerm(e.target.value)}
             placeholder="Search policies..."
             className="w-full md:w-96 px-6 py-4 bg-[#1E293B] border border-[#334155] rounded-xl focus:outline-none focus:border-[#C6A75E] text-[#F8FAFC]"
          />

          {loading ? (
             <div className="flex justify-center p-20"><Loader2 className="w-12 h-12 text-[#C6A75E] animate-spin" /></div>
          ) : (
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filtered.length > 0 ? filtered.map((policy) => (
                  <div key={policy.id} className="bg-[#1E293B] border border-[#334155] p-6 rounded-xl shadow-lg hover:border-[#C6A75E] transition-colors flex flex-col gap-4">
                     <h3 className="text-xl font-serif">{policy.title}</h3>
                     <p className="text-sm text-[#94A3B8] flex-1 leading-relaxed">{policy.description}</p>
                     <Link href={policy.link} className="inline-flex items-center gap-2 text-[#C6A75E] hover:text-white transition-colors text-sm font-semibold max-w-max">
                        Read Document <MoveRight className="w-4 h-4" />
                     </Link>
                  </div>
                )) : (
                  <div className="col-span-full py-20 text-center text-[#94A3B8]">
                     No policies match your search.
                  </div>
                )}
             </div>
          )}
       </main>
    </div>
  );
}
