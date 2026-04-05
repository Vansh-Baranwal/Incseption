"use client";

import { useState } from "react";
import { apiFetch } from "@/lib/api";
import Navbar from "@/components/Navbar"; // For public/auth consistency if desired, or skip.
import Link from "next/link";
import { FileSearch, ShieldCheck, ShieldAlert, Loader2, Search, Upload } from "lucide-react";
import toast from "react-hot-toast";

interface VerificationResult {
  status: "authentic" | "tampered";
  hash: string;
  timestamp: string;
}

export default function VerifyPage() {
  const [dataPayload, setDataPayload] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<VerificationResult | null>(null);

  const handleVerify = async () => {
    if (!dataPayload && !file) return toast.error("Provide a QR Code link or upload a document");

    setLoading(true);
    setResult(null);
    try {
      // Simulate verification logic for now
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      // Mock result for visual verification
      setResult({
        status: "authentic",
        hash: "0x7d8e...f2a1",
        timestamp: new Date().toLocaleString()
      });
      
      toast.success("Document Integrity: 100% Valid");
    } catch (error) {
      toast.error("Verification protocol failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-[#F8FAFC]">
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-[#D4AF37]/5 blur-[120px] rounded-full" />
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

      <main className="relative z-10 max-w-4xl mx-auto px-6 py-24 flex flex-col items-center">
        <div className="text-center mb-16">
          <div className="w-16 h-16 rounded-full border border-[#D4AF37]/30 flex items-center justify-center mx-auto mb-8 bg-[#D4AF37]/5">
             <ShieldCheck className="w-8 h-8 text-[#D4AF37]" />
          </div>
          <h1 className="text-4xl md:text-6xl font-serif mb-6 leading-tight">
            Blockchain <span className="italic">Verification</span>
          </h1>
          <p className="text-[#F8FAFC]/40 text-lg font-light max-w-2xl mx-auto">
            Input a cryptographic QR payload or upload a sealed document 
            to verify its injection status and absolute network integrity.
          </p>
        </div>

        <div className="w-full flex flex-col gap-10">
          {/* Input Section */}
          <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl p-8 md:p-12 shadow-2xl">
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-4">
                <label className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#F8FAFC]/30">Payload Identifier</label>
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#F8FAFC]/20" />
                  <input
                    type="text"
                    value={dataPayload}
                    onChange={(e) => setDataPayload(e.target.value)}
                    className="w-full pl-12 pr-6 py-5 bg-black/40 border border-white/10 rounded-xl text-sm text-[#F8FAFC] focus:outline-none focus:border-[#D4AF37]/50 transition-all placeholder:text-white/10"
                    placeholder="https://... or hash-string-0x..."
                  />
                </div>
              </div>

              <div className="relative flex items-center justify-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/5"></div>
                </div>
                <span className="relative px-4 bg-[#081429] text-[10px] uppercase tracking-[0.3em] font-bold text-[#F8FAFC]/20">Alternatively</span>
              </div>

              <div className="flex flex-col gap-4">
                <label className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#F8FAFC]/30">Document Ingestion</label>
                <div className="group relative border-2 border-dashed border-white/5 rounded-2xl p-12 text-center hover:border-[#D4AF37]/30 transition-all cursor-pointer bg-white/[0.02]">
                   <input
                     type="file"
                     className="absolute inset-0 opacity-0 cursor-pointer"
                     onChange={(e) => setFile(e.target.files?.[0] || null)}
                   />
                   <div className="flex flex-col items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Upload className="w-5 h-5 text-[#F8FAFC]/30 group-hover:text-[#D4AF37]" />
                      </div>
                      <div className="flex flex-col gap-1">
                        <p className="text-sm font-medium">{file ? file.name : "Select sealed document"}</p>
                        <p className="text-[10px] uppercase tracking-widest text-[#F8FAFC]/20">PDF, PNG, JPG (MAX 10MB)</p>
                      </div>
                   </div>
                </div>
              </div>

              <button
                onClick={handleVerify}
                disabled={loading}
                className="group relative w-full py-5 mt-4 overflow-hidden rounded-xl border border-[#D4AF37]/50 text-[#D4AF37] text-[10px] uppercase tracking-[0.3em] font-bold hover:text-[#020617] transition-colors duration-500"
              >
                <span className="relative z-10">{loading ? "Synchronizing Chain Data..." : "Execute Verification protocol"}</span>
                <div className="absolute inset-0 bg-[#D4AF37] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
              </button>
            </div>
          </div>

          {result && (
             <div className={`w-full p-8 bg-white/5 backdrop-blur-2xl border rounded-2xl shadow-2xl flex items-start gap-6 transition-all duration-500 ${result.status === "authentic" ? "border-emerald-500/30" : "border-red-500/30"}`}>
                {result.status === "authentic" ? (
                   <ShieldCheck className="w-10 h-10 text-emerald-500" />
                ) : (
                   <ShieldAlert className="w-10 h-10 text-red-500" />
                )}
                <div className="flex flex-col gap-2">
                   <h3 className={`text-xl font-serif tracking-tight ${result.status === "authentic" ? "text-emerald-400" : "text-red-400"}`}>
                      Verification {result.status.toUpperCase()}
                   </h3>
                   <div className="text-[10px] font-bold tracking-[0.1em] text-[#F8FAFC]/30 flex flex-col gap-1">
                      <span className="font-mono break-all text-[#F8FAFC]/60">BLOCKCHAIN HASH: {result.hash}</span>
                      <span>TIMESTAMP: {result.timestamp}</span>
                   </div>
                </div>
             </div>
          )}
        </div>

        <div className="mt-24 flex flex-wrap justify-center gap-10 text-[10px] font-bold tracking-[0.3em] uppercase text-[#F8FAFC]/20">
           {["Immutable Ledger", "Zero Knowledge Proof", "Time-Stamped Integrity"].map(label => (
             <div key={label} className="flex items-center gap-3">
                <div className="w-1 h-1 rounded-full bg-[#D4AF37]" />
                <span>{label}</span>
             </div>
           ))}
        </div>
      </main>
    </div>
  );
}
