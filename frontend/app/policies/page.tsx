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
    // Mock data for visual verification until API is ready
    const mockPolicies: Policy[] = [
      { id: "1", title: "Immutable Audit Protocol", description: "Standard operating procedures for cryptographic logging and cross-node validation of document injections.", link: "#" },
      { id: "2", title: "Zero-Knowledge Disclosure", description: "Privacy framework ensuring data integrity without revealing underlying sensitive document contents.", link: "#" },
      { id: "3", title: "Chain-of-Custody Compliance", description: "Rigid requirements for maintaining legal admissibility through timestamped blockchain audit trails.", link: "#" },
      { id: "4", title: "Whistleblower Identity Anonymity", description: "Cryptographic shielding protocols protecting the identity of high-stakes legal informants.", link: "#" },
    ];

    apiFetch<Policy[]>("/policies", { requireAuth: false })
      .then((res) => setPolicies(res.length ? res : mockPolicies))
      .catch(() => {
         setPolicies(mockPolicies);
      })
      .finally(() => setLoading(false));
  }, []);

  const filtered = policies.filter(p => p.title.toLowerCase().includes(searchTerm.toLowerCase()) || p.description.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="min-h-screen bg-[#020617] text-[#F8FAFC]">
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 right-0 w-[800px] h-[800px] bg-[#D4AF37]/5 blur-[150px] rounded-full" />
      </div>

      {/* Header */}
      <nav className="relative z-10 px-8 py-6 flex items-center justify-between border-b border-white/5 backdrop-blur-md">
        <Link href="/">
          <span className="text-xl font-serif font-bold text-[#D4AF37] tracking-[0.2em] uppercase cursor-pointer">Objection</span>
        </Link>
        <Link href="/login" className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#F8FAFC]/40 hover:text-[#D4AF37] transition-colors">
          Portal Access
        </Link>
      </nav>

      <main className="relative z-10 max-w-6xl mx-auto px-8 py-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-serif mb-6 leading-tight">
              Platform <span className="italic">Governance</span>
            </h1>
            <p className="text-[#F8FAFC]/40 text-lg font-light leading-relaxed">
              Explore the legal and cryptographic protocols governing the <br/>
              Objection.ai network infrastructure.
            </p>
          </div>
          <div className="w-full md:w-80">
            <input 
               value={searchTerm}
               onChange={e => setSearchTerm(e.target.value)}
               placeholder="Search protocol documents..."
               className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-[#D4AF37]/50 text-sm text-[#F8FAFC] placeholder:text-white/10 transition-all"
            />
          </div>
        </div>

        {loading ? (
           <div className="flex justify-center p-20">
             <div className="w-10 h-10 border-2 border-t-[#D4AF37] border-white/10 rounded-full animate-spin" />
           </div>
        ) : (
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
              {filtered.length > 0 ? filtered.map((policy) => (
                <div key={policy.id} className="group bg-white/5 backdrop-blur-2xl border border-white/10 p-10 rounded-2xl shadow-2xl hover:border-[#D4AF37]/30 transition-all duration-500 flex flex-col gap-6">
                   <div className="h-px w-8 bg-[#D4AF37]/40 group-hover:w-full transition-all duration-700" />
                   <h3 className="text-2xl font-serif tracking-tight">{policy.title}</h3>
                   <p className="text-sm text-[#F8FAFC]/40 flex-1 leading-relaxed font-light">{policy.description}</p>
                   <Link href={policy.link} className="inline-flex items-center gap-3 text-[10px] font-bold tracking-[0.2em] uppercase text-[#D4AF37] group-hover:text-[#F8FAFC] transition-colors">
                      Examination Protocol <MoveRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
                   </Link>
                </div>
              )) : (
                <div className="col-span-full py-20 text-center text-[#F8FAFC]/20">
                   No protocols match your active search terms.
                </div>
              )}
           </div>
        )}
      </main>
    </div>
  );
}
