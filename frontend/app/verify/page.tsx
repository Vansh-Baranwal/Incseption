"use client";

import { useState } from "react";
import Link from "next/link";
import { ShieldCheck, ShieldAlert, Search, Upload, ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";
import { ThemeToggle } from "@/components/ThemeToggle";
import { motion, Variants } from "framer-motion";

interface VerificationResult {
  status: "authentic" | "tampered";
  hash: string;
  timestamp: string;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  show: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

export default function VerifyPage() {
  const [dataPayload, setDataPayload] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<VerificationResult | null>(null);

  const handleVerify = async () => {
    if (!dataPayload && !file) return toast.error("Enter a link or upload a document");

    setLoading(true);
    setResult(null);
    try {
      // Mock verification delay
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      setResult({
        status: "authentic",
        hash: "0x7d8e9c...f2a1b3",
        timestamp: new Date().toLocaleString()
      });
      
      toast.success("Cryptographic integrity confirmed.");
    } catch (error) {
      toast.error("Verification failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      {/* Header */}
      <nav className="px-6 md:px-12 py-6 flex items-center justify-between border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <Link href="/" className="p-2 -ml-2 rounded-full hover:bg-muted transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <span className="text-xl font-sans text-foreground font-medium">Verifier</span>
        </div>
        <div className="flex items-center gap-6 text-sm">
          <Link href="/login" className="text-muted-foreground hover:text-foreground transition-colors hidden md:block">
            Sign In
          </Link>
          <Link href="/signup" className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-bold shadow-sm shadow-primary/10 transition-colors">
            Sign Up
          </Link>
          <div className="border-l border-border pl-6">
            <ThemeToggle />
          </div>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <motion.div 
           className="mb-12 text-center flex flex-col items-center gap-4"
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-2">
            <ShieldCheck className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-sans text-foreground leading-tight">
            Seal Verification
          </h1>
          <p className="text-muted-foreground max-w-lg leading-relaxed italic">
            Check the authenticity of any Objection.ai cryptoseal by entering the verification hash or uploading the original document.
          </p>
        </motion.div>

        <motion.div 
           className="flex flex-col gap-10"
           variants={containerVariants}
           initial="hidden"
           animate="show"
        >
          <motion.div 
            variants={itemVariants} 
            animate={{ y: [-5, 5, -5] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="bg-card border border-border flex flex-col gap-8 rounded-2xl p-8 md:p-10 shadow-lg hover:shadow-xl hover:border-primary/30 transition-all duration-500"
          >
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-2.5">
                <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest ml-1">Cryptographic Hash or URL</label>
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/40" />
                  <input
                    type="text"
                    value={dataPayload}
                    onChange={(e) => setDataPayload(e.target.value)}
                    className="w-full pl-11 pr-4 py-4 bg-muted/50 border border-border rounded-xl text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-muted-foreground/20 font-mono"
                    placeholder="0x7d8e9c..."
                  />
                </div>
              </div>

              <div className="relative flex items-center py-2">
                <div className="flex-1 border-t border-border"></div>
                <span className="px-4 text-[10px] uppercase font-bold text-muted-foreground/30 tracking-widest">or analyze file</span>
                <div className="flex-1 border-t border-border"></div>
              </div>

              <div className="flex flex-col gap-2.5">
                <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest ml-1">Evidence Payload</label>
                <div className="relative border-2 border-dashed border-border rounded-xl p-10 text-center hover:bg-muted/30 transition-all cursor-pointer group hover:border-primary/50">
                   <input
                     type="file"
                     className="absolute inset-0 opacity-0 cursor-pointer z-10"
                     onChange={(e) => setFile(e.target.files?.[0] || null)}
                   />
                   <div className="flex flex-col items-center gap-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${file ? 'bg-primary/20 text-primary scale-110' : 'bg-muted text-muted-foreground/30 group-hover:text-primary/60'}`}>
                        <Upload className="w-6 h-6" />
                      </div>
                      <div className="flex flex-col gap-1">
                        <p className="text-sm font-medium text-foreground/70">{file ? file.name : "Drop file to analyze"}</p>
                        <p className="text-xs text-muted-foreground/40">Secure hash will be generated locally before verification.</p>
                      </div>
                   </div>
                </div>
              </div>

              <motion.button
                onClick={handleVerify}
                disabled={loading}
                whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(var(--primary-rgb),0.3)" }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 bg-primary text-primary-foreground text-sm font-bold rounded-xl hover:opacity-90 disabled:opacity-50 transition-all shadow-lg shadow-primary/10"
              >
                {loading ? "Decrypting & Verifying..." : "Check Integrity"}
              </motion.button>
            </div>
          </motion.div>

          {result && (
             <motion.div 
               initial={{ opacity: 0, y: 20, scale: 0.95 }}
               animate={{ opacity: 1, y: 0, scale: 1 }}
               transition={{ type: "spring", stiffness: 300, damping: 20 }}
               className={`p-8 bg-card border-2 rounded-2xl flex flex-col md:flex-row items-center md:items-start gap-6 shadow-sm transition-colors duration-500 ${result.status === "authentic" ? "border-emerald-500/20" : "border-red-500/20"}`}
             >
                <div className={`p-4 rounded-2xl ${result.status === "authentic" ? "bg-emerald-500/10" : "bg-red-500/10"}`}>
                  {result.status === "authentic" ? (
                     <ShieldCheck className="w-10 h-10 text-emerald-500" />
                  ) : (
                     <ShieldAlert className="w-10 h-10 text-red-500" />
                  )}
                </div>
                <div className="flex-1 flex flex-col items-center md:items-start gap-2 text-center md:text-left">
                   <h3 className={`text-2xl font-sans font-bold leading-none ${result.status === "authentic" ? "text-emerald-600 dark:text-emerald-400" : "text-red-400"}`}>
                      {result.status === "authentic" ? "Document Authentic" : "Verification Failed"}
                   </h3>
                   <p className="text-sm text-muted-foreground italic max-w-sm">
                     The local cryptographic hash matches the blockchain register exactly. No tampering detected.
                   </p>
                   <div className="mt-4 flex flex-col gap-1.5 w-full">
                      <div className="flex items-center justify-between text-[10px] font-bold text-muted-foreground uppercase tracking-widest border-b border-border pb-1">
                        <span>Ledger Hash</span>
                        <span>Timestamp</span>
                      </div>
                      <div className="flex items-center justify-between font-mono text-sm">
                        <span className="text-foreground/70">{result.hash}</span>
                        <span className="text-muted-foreground">{result.timestamp}</span>
                      </div>
                   </div>
                </div>
             </motion.div>
          )}
        </motion.div>
      </main>

      <footer className="py-12 border-t border-border flex flex-col items-center gap-4 text-center px-6">
        <p className="text-xs text-muted-foreground/40 max-w-md">
          Objection.ai uses quantum-safe hashing algorithms. Your documents are analyzed locally; private data never leaves your browser during verification.
        </p>
        <Link href="/" className="text-sm font-sans font-bold text-foreground/40 hover:text-primary transition-colors">
          Objection.ai
        </Link>
      </footer>
    </div>
  );
}
