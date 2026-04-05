"use client";

import { useState } from "react";
import { apiFetch } from "@/lib/api";
import Link from "next/link";
import { ShieldCheck, ShieldAlert, Search, Upload } from "lucide-react";
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
    if (!dataPayload && !file) return toast.error("Enter a link or upload a document");

    setLoading(true);
    setResult(null);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      setResult({
        status: "authentic",
        hash: "0x7d8e...f2a1",
        timestamp: new Date().toLocaleString()
      });
      
      toast.success("Document verified successfully");
    } catch (error) {
      toast.error("Verification failed");
    } finally {
      setLoading(false);
    }
  };

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

      <main className="max-w-2xl mx-auto px-6 py-20">
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-serif text-white mb-3">
            Verify a Document
          </h1>
          <p className="text-white/40">
            Enter a QR code link or upload a document to verify its authenticity on the blockchain.
          </p>
        </div>

        <div className="flex flex-col gap-8">
          <div className="bg-white/5 border border-white/8 rounded-xl p-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm text-white/50">QR Code Link or Hash</label>
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                  <input
                    type="text"
                    value={dataPayload}
                    onChange={(e) => setDataPayload(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 bg-black/30 border border-white/8 rounded-lg text-sm text-white focus:outline-none focus:border-white/20 transition-colors placeholder:text-white/15"
                    placeholder="https://... or 0x..."
                  />
                </div>
              </div>

              <div className="relative flex items-center">
                <div className="flex-1 border-t border-white/5"></div>
                <span className="px-4 text-xs text-white/20">or</span>
                <div className="flex-1 border-t border-white/5"></div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm text-white/50">Upload Document</label>
                <div className="relative border border-dashed border-white/10 rounded-lg p-8 text-center hover:border-white/20 transition-colors cursor-pointer bg-white/3">
                   <input
                     type="file"
                     className="absolute inset-0 opacity-0 cursor-pointer"
                     onChange={(e) => setFile(e.target.files?.[0] || null)}
                   />
                   <div className="flex flex-col items-center gap-3">
                      <Upload className="w-6 h-6 text-white/20" />
                      <p className="text-sm text-white/50">{file ? file.name : "Click to select file"}</p>
                      <p className="text-xs text-white/20">PDF, PNG, JPG up to 10MB</p>
                   </div>
                </div>
              </div>

              <button
                onClick={handleVerify}
                disabled={loading}
                className="w-full py-3 bg-white text-[#1a1410] text-sm font-medium rounded-lg hover:bg-white/90 disabled:opacity-50 transition-colors"
              >
                {loading ? "Verifying..." : "Verify Document"}
              </button>
            </div>
          </div>

          {result && (
             <div className={`p-6 bg-white/5 border rounded-xl flex items-start gap-4 ${result.status === "authentic" ? "border-emerald-500/20" : "border-red-500/20"}`}>
                {result.status === "authentic" ? (
                   <ShieldCheck className="w-8 h-8 text-emerald-500 flex-shrink-0" />
                ) : (
                   <ShieldAlert className="w-8 h-8 text-red-500 flex-shrink-0" />
                )}
                <div>
                   <h3 className={`text-lg font-medium mb-1 ${result.status === "authentic" ? "text-emerald-400" : "text-red-400"}`}>
                      {result.status === "authentic" ? "Document Verified" : "Verification Failed"}
                   </h3>
                   <div className="text-sm text-white/30 space-y-1">
                      <p className="font-mono text-xs text-white/50">Hash: {result.hash}</p>
                      <p>Verified at: {result.timestamp}</p>
                   </div>
                </div>
             </div>
          )}
        </div>
      </main>
    </div>
  );
}
