"use client";

import { useState } from "react";
import { apiFetch } from "@/lib/api";
import Navbar from "@/components/Navbar"; // For public/auth consistency if desired, or skip.
import Link from "next/link";
import { FileSearch, ShieldCheck, ShieldAlert, Loader2 } from "lucide-react";
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
      const formData = new FormData();
      if (file) formData.append("file", file);
      if (dataPayload) formData.append("qrData", dataPayload);

      const res = await apiFetch<VerificationResult>("/verify", {
        method: "POST",
        body: formData,
        requireAuth: false
      });

      setResult(res);
      toast.success("Verification check complete");
    } catch (err: any) {
      toast.error(err.message || "Cryptographic verification failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0F172A] text-[#F8FAFC] flex flex-col">
       <header className="flex items-center justify-between px-6 py-4 border-b border-[#334155] bg-[#020617]">
         <Link href="/">
           <h2 className="text-2xl font-serif text-[#C6A75E] tracking-tight">Objection.ai</h2>
         </Link>
         <Link href="/login" className="text-sm font-medium hover:text-[#C6A75E] transition-colors">Portal Access</Link>
       </header>

       <main className="flex-1 max-w-4xl w-full mx-auto p-4 md:p-8 flex flex-col gap-8 items-center justify-center">
          <div className="text-center flex flex-col items-center gap-4">
             <FileSearch className="w-16 h-16 text-[#C6A75E]" />
             <h1 className="text-4xl font-serif">Blockchain Verification Engine</h1>
             <p className="text-[#94A3B8] max-w-lg">
                Enter the Cryptographic QR payload string below or instantly upload a document directly to verify its injection status and absolute integrity on the network.
             </p>
          </div>

          <div className="w-full bg-[#1E293B] border border-[#334155] rounded-xl p-6 shadow-xl flex flex-col gap-6">
             <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-[#F8FAFC]">QR Content Payload String</label>
                <input 
                  value={dataPayload}
                  onChange={e => setDataPayload(e.target.value)}
                  type="text" 
                  className="w-full bg-[#020617] border border-[#334155] rounded-lg px-4 py-3 text-[#F8FAFC] focus:outline-none focus:border-[#C6A75E]"
                  placeholder="https://... or hash-string-0x..."
                />
             </div>
             
             <div className="flex items-center gap-4 text-sm text-[#94A3B8] font-medium">
                <div className="flex-1 h-px bg-[#334155]" />
                OR
                <div className="flex-1 h-px bg-[#334155]" />
             </div>

             <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-[#F8FAFC]">Document Upload</label>
                <input 
                  onChange={e => setFile(e.target.files?.[0] || null)}
                  type="file" 
                  className="w-full border border-dashed border-[#334155] rounded-lg p-6 text-center text-sm font-medium file:mr-4 file:bg-[#334155] file:text-[#F8FAFC] file:border-0 file:py-2 file:px-4 file:rounded-lg cursor-pointer bg-[#020617]"
                />
             </div>

             <button 
                onClick={handleVerify}
                disabled={loading}
                className="w-full py-4 bg-[#C6A75E] text-[#0F172A] font-bold text-lg rounded-lg hover:bg-opacity-90 transition-all flex items-center justify-center"
             >
                {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : "Verify Identity Integrity"}
             </button>
          </div>

          {result && (
             <div className={`w-full p-6 border rounded-xl shadow-xl flex items-start gap-4 transition-all duration-500 ${result.status === "authentic" ? "bg-emerald-900/20 border-emerald-500/50" : "bg-red-900/20 border-red-500/50"}`}>
                {result.status === "authentic" ? (
                   <ShieldCheck className="w-10 h-10 text-emerald-500 mt-1" />
                ) : (
                   <ShieldAlert className="w-10 h-10 text-red-500 mt-1" />
                )}
                <div className="flex flex-col">
                   <h3 className={`text-2xl font-serif mb-2 ${result.status === "authentic" ? "text-emerald-400" : "text-red-400"}`}>
                      {result.status.toUpperCase()}
                   </h3>
                   <div className="text-sm text-[#94A3B8] flex flex-col gap-1">
                      <span className="font-mono text-xs break-all text-[#F8FAFC]">Hash: {result.hash}</span>
                      <span>Registered at: {result.timestamp}</span>
                   </div>
                </div>
             </div>
          )}
       </main>
    </div>
  );
}
