"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import Link from "next/link";
import { MoveRight, Shield, FileText, Search, ArrowLeft } from "lucide-react";
import { motion, Variants } from "framer-motion";

interface Policy {
  id: string;
  title: string;
  description: string;
  link: string;
  category: "Security" | "Privacy" | "Legal";
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

export default function PoliciesPage() {
  const [policies, setPolicies] = useState<Policy[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const mockPolicies: Policy[] = [
      { id: "1", title: "Audit Protocol", category: "Security", description: "Standard procedures for cryptographic logging and cross-node validation of document uploads.", link: "#" },
      { id: "2", title: "Privacy Framework", category: "Privacy", description: "Data integrity assurance without revealing underlying sensitive document contents.", link: "#" },
      { id: "3", title: "Chain-of-Custody Compliance", category: "Legal", description: "Requirements for maintaining legal admissibility through timestamped blockchain audit trails.", link: "#" },
      { id: "4", title: "Whistleblower Protection", category: "Security", description: "Protocols protecting the identity of legal informants through cryptographic shielding.", link: "#" },
      { id: "5", title: "Data Retention", category: "Privacy", description: "Standardized timelines for cryptographic hash persistence and local document deletion.", link: "#" },
      { id: "6", title: "Smart Contract Governance", category: "Legal", description: "Legal frameworks governing the execution of automated judicial switches.", link: "#" },
    ];

    apiFetch<Policy[]>("/policies", { requireAuth: false })
      .then((res) => setPolicies(res.length ? res : mockPolicies))
      .catch(() => setPolicies(mockPolicies))
      .finally(() => setLoading(false));
  }, []);

  const filtered = policies.filter(p => 
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      {/* Header */}
      <nav className="px-6 md:px-12 py-6 flex items-center justify-between border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <Link href="/" className="p-2 -ml-2 rounded-full hover:bg-muted transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <span className="text-xl font-sans font-bold text-foreground font-medium">Policy Center</span>
        </div>
        <div className="flex items-center gap-6">
          <Link href="/login" className="text-sm text-muted-foreground hover:text-foreground transition-colors hidden md:block">
            Sign In
          </Link>
          <Link href="/signup" className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-bold shadow-sm hover:opacity-90 transition-all">
            Join Platform
          </Link>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 py-16 md:py-24">
        <motion.div 
           className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8"
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.6 }}
        >
          <div className="max-w-xl">
            <h1 className="text-4xl md:text-5xl font-sans font-bold text-foreground mb-4 leading-tight">Governance & Protocols</h1>
            <p className="text-muted-foreground leading-relaxed italic">
              Our cryptographic foundation is built on absolute transparency. Explore the frameworks that govern document security and legal integrity.
            </p>
          </div>
          <div className="relative w-full md:w-80 group">
             <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/40 group-focus-within:text-primary transition-colors" />
             <input 
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                placeholder="Search protocols..."
                className="w-full pl-11 pr-4 py-3.5 bg-muted/50 border border-border rounded-xl focus:outline-none focus:ring-1 focus:ring-primary/20 focus:border-primary/50 text-sm text-foreground placeholder:text-muted-foreground/20 transition-all shadow-sm"
             />
          </div>
        </motion.div>

        {loading ? (
           <div className="flex flex-col items-center justify-center py-32 gap-4">
             <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
             <span className="text-xs text-muted-foreground animate-pulse">Syncing legal frameworks...</span>
           </div>
        ) : (
           <motion.div 
             className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10"
             variants={containerVariants}
             initial="hidden"
             animate="show"
           >
              {filtered.length > 0 ? filtered.map((policy, i) => (
                <motion.div 
                  key={policy.id} 
                  variants={itemVariants} 
                  animate={{ y: [0, -8, 0] }}
                  transition={{ 
                    duration: 5, 
                    repeat: Infinity, 
                    ease: "easeInOut",
                    delay: i * 0.2 // offset the floating animation
                  }}
                  whileHover={{ scale: 1.02, boxShadow: "0 20px 40px rgba(0,0,0,0.05)" }} 
                  className="bg-card border border-border p-8 rounded-3xl hover:border-primary/40 hover:bg-muted/30 transition-all flex flex-col gap-6 group shadow-sm cursor-default relative overflow-hidden"
                >
                   <div className="flex items-start justify-between relative z-10">
                      <div className="w-12 h-12 rounded-2xl bg-muted p-3 flex items-center justify-center group-hover:bg-primary/20 group-hover:scale-110 transition-all shadow-inner">
                        {policy.category === 'Security' ? <Shield className="w-6 h-6 text-primary" /> : <FileText className="w-6 h-6 text-primary" />}
                      </div>
                      <span className="text-[10px] font-bold text-muted-foreground/30 uppercase tracking-widest tabular-nums">{policy.id.padStart(3, '0')}</span>
                   </div>
                   <div className="flex flex-col gap-3 relative z-10">
                     <span className={`text-[10px] font-bold uppercase tracking-widest w-fit px-2.5 py-1 rounded-full border shadow-sm ${
                        policy.category === 'Security' ? 'bg-red-500/10 text-red-500 border-red-500/20 shadow-red-500/5' : 
                        policy.category === 'Privacy' ? 'bg-blue-500/10 text-blue-500 border-blue-500/20 shadow-blue-500/5' : 
                        'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 shadow-emerald-500/5'
                     }`}>
                        {policy.category}
                     </span>
                     <h3 className="text-2xl font-sans font-bold text-foreground group-hover:text-primary transition-colors leading-tight">{policy.title}</h3>
                   </div>
                   <p className="text-sm text-muted-foreground flex-1 leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity italic">{policy.description}</p>
                   <Link href={policy.link} className="inline-flex items-center gap-2 text-sm font-bold text-primary group-hover:translate-x-1 transition-all relative z-10">
                      Read full protocol <MoveRight className="w-4 h-4" />
                   </Link>
                   
                   {/* Decorative background gradient */}
                   <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                </motion.div>
              )) : (
                <motion.div variants={itemVariants} className="col-span-full py-32 text-center border-2 border-dashed border-border rounded-3xl flex flex-col items-center gap-6 text-muted-foreground/30 bg-muted/5 relative z-10">
                   <div className="p-6 bg-muted rounded-full">
                      <Search className="w-10 h-10" />
                   </div>
                   <div className="flex flex-col gap-2">
                      <p className="text-lg font-medium">No protocols match your criteria.</p>
                      <p className="text-sm">Try broader keywords or browse categories.</p>
                   </div>
                </motion.div>
              )}
           </motion.div>
        )}
      </main>

      <footer className="py-20 bg-muted/30 border-t border-border mt-20">
        <motion.div 
          className="max-w-6xl mx-auto px-6 text-center flex flex-col items-center gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
           <h2 className="text-2xl font-sans font-bold text-foreground/80 italic">&ldquo;Trust is a function of transparency.&rdquo;</h2>
           <div className="flex gap-8 text-xs font-bold text-muted-foreground uppercase tracking-widest">
              <Link href="#" className="hover:text-primary transition-colors">GDPR Compliance</Link>
              <Link href="#" className="hover:text-primary transition-colors">E-Evidence Regulation</Link>
              <Link href="#" className="hover:text-primary transition-colors">Audit Logs</Link>
           </div>
           <p className="text-[10px] text-muted-foreground/40 mt-4">&copy; {new Date().getFullYear()} Objection.ai Platform Governance</p>
        </motion.div>
      </footer>
    </div>
  );
}
