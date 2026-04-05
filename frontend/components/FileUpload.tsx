"use client";

import { useState } from "react";
import { apiFetch } from "@/lib/api";
import { UploadCloud, Loader2, File } from "lucide-react";
import toast from "react-hot-toast";

interface FileUploadProps {
  endpoint: string;
  title: string;
  onSuccess: (data: any) => void;
  additionalPayload?: Record<string, any>;
}

export default function FileUpload({ endpoint, title, onSuccess, additionalPayload }: FileUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) return toast.error("Select ingestion payload");

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      
      if (additionalPayload) {
        Object.entries(additionalPayload).forEach(([k, v]) => formData.append(k, String(v)));
      }

      await apiFetch<any>(endpoint, {
        method: "POST",
        body: formData,
      });

      toast.success("Ingestion Protocol Successful");
      onSuccess({ id: "mock_id_" + Math.random().toString(36).substr(2, 9) }); // Mock for visual demo
      setFile(null);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
         <h3 className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#F8FAFC]/40">{title}</h3>
         <UploadCloud className="w-4 h-4 text-[#D4AF37]/50" />
      </div>
      
      <div className="group relative border-2 border-dashed border-white/5 rounded-2xl p-12 text-center hover:border-[#D4AF37]/30 transition-all cursor-pointer bg-white/[0.02]">
        <input
          type="file"
          className="absolute inset-0 opacity-0 cursor-pointer z-10"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />
        <div className="flex flex-col items-center gap-4">
           <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
             <File className="w-5 h-5 text-[#F8FAFC]/30 group-hover:text-[#D4AF37]" />
           </div>
           <div className="flex flex-col gap-1">
             <p className="text-sm font-medium text-[#F8FAFC]/80">{file ? file.name : "Select sealed document"}</p>
             <p className="text-[10px] uppercase tracking-widest text-[#F8FAFC]/20">PDF, PNG, JPG (MAX 10MB)</p>
           </div>
        </div>
      </div>
      
      <button
        onClick={handleUpload}
        disabled={!file || loading}
        className="group relative w-full py-5 mt-2 overflow-hidden rounded-xl border border-[#D4AF37]/50 text-[#D4AF37] text-[10px] uppercase tracking-[0.3em] font-bold hover:text-[#020617] transition-colors duration-500 disabled:opacity-30"
      >
        <span className="relative z-10">{loading ? "Synchronizing Ingestion..." : "Execute Secure Injection"}</span>
        <div className="absolute inset-0 bg-[#D4AF37] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
      </button>
    </div>
  );
}
