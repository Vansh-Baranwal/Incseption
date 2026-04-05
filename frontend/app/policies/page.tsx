"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import Link from "next/link";
import { MoveRight } from "lucide-react";

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
    const mockPolicies: Policy[] = [
      { id: "1", title: "Audit Protocol", description: "Standard procedures for cryptographic logging and cross-node validation of document uploads.", link: "#" },
      { id: "2", title: "Privacy Framework", description: "Data integrity assurance without revealing underlying sensitive document contents.", link: "#" },
      { id: "3", title: "Chain-of-Custody Compliance", description: "Requirements for maintaining legal admissibility through timestamped blockchain audit trails.", link: "#" },
      { id: "4", title: "Whistleblower Protection", description: "Protocols protecting the identity of legal informants through cryptographic shielding.", link: "#" },
    ];

    apiFetch<Policy[]>("/policies", { requireAuth: false })
      .then((res) => setPolicies(res.length ? res : mockPolicies))
      .catch(() => setPolicies(mockPolicies))
      .finally(() => setLoading(false));
  }, []);

  const filtered = policies.filter(p => p.title.toLowerCase().includes(searchTerm.toLowerCase()) || p.description.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="min-h-screen bg-[#1a1410] text-[#e8e4df]">
      {/* Header */}
      <nav className="px-6 md:px-12 py-6 flex items-center justify-between border-b border-white/5">
        <Link href="/">
          <span className="text-lg font-serif text-white cursor-pointer">Objection.ai</span>
        </Link>
        <Link href="/login" className="text-sm text-white/40 hover:text-white transition-colors">
          Sign In
        </Link>
      </nav>

      <main className="max-w-4xl mx-auto px-6 py-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-serif text-white mb-3">Policies</h1>
            <p className="text-white/40">Platform governance and legal protocols.</p>
          </div>
          <input 
             value={searchTerm}
             onChange={e => setSearchTerm(e.target.value)}
             placeholder="Search..."
             className="w-full md:w-64 px-4 py-3 bg-white/5 border border-white/8 rounded-lg focus:outline-none focus:border-white/20 text-sm text-white placeholder:text-white/15 transition-colors"
          />
        </div>

        {loading ? (
           <div className="flex justify-center p-20">
             <div className="w-6 h-6 border-2 border-t-white/50 border-white/10 rounded-full animate-spin" />
           </div>
        ) : (
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filtered.length > 0 ? filtered.map((policy) => (
                <div key={policy.id} className="bg-white/5 border border-white/8 p-6 rounded-xl hover:bg-white/8 transition-colors flex flex-col gap-4 group">
                   <h3 className="text-lg font-medium text-white">{policy.title}</h3>
                   <p className="text-sm text-white/40 flex-1 leading-relaxed">{policy.description}</p>
                   <Link href={policy.link} className="inline-flex items-center gap-2 text-sm text-amber-600 hover:text-amber-500 transition-colors">
                      Read more <MoveRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                   </Link>
                </div>
              )) : (
                <div className="col-span-full py-16 text-center text-white/20">
                   No policies match your search.
                </div>
              )}
           </div>
        )}
      </main>
    </div>
  );
}
