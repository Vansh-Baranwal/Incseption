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
    if (!file) return toast.error("Please select a file first");

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      
      if (additionalPayload) {
        Object.entries(additionalPayload).forEach(([k, v]) => formData.append(k, String(v)));
      }

      const response = await apiFetch<any>(endpoint, {
        method: "POST",
        body: formData,
      });

      toast.success("Upload complete.");
      onSuccess(response);
      setFile(null);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#1E293B] border border-[#334155] rounded-xl p-6 flex flex-col gap-4 shadow-lg">
      <h3 className="font-serif text-xl text-[#F8FAFC]">{title}</h3>
      <div className="border-2 border-dashed border-[#334155] rounded-xl flex flex-col items-center justify-center p-8 bg-[#020617]/50 text-center relative overflow-hidden group hover:border-[#C6A75E] transition-colors">
        <UploadCloud className="w-10 h-10 text-[#94A3B8] mb-2 group-hover:text-[#C6A75E] transition-colors" />
        <span className="text-sm font-medium text-[#F8FAFC]">
          {file ? file.name : "Click to browse or drag and drop"}
        </span>
        <span className="text-xs text-[#94A3B8] mt-1">PDF, DOCX up to 10MB</span>
        <input
          type="file"
          className="absolute inset-0 opacity-0 cursor-pointer"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />
      </div>
      
      <button
        onClick={handleUpload}
        disabled={!file || loading}
        className="w-full flex justify-center items-center gap-2 py-3 bg-[#C6A75E] text-[#0F172A] rounded-lg font-semibold hover:bg-opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
      >
        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><File className="w-4 h-4" /> Secure Upload</>}
      </button>
    </div>
  );
}
