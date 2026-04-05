"use client";

import { useState } from "react";
import { apiFetch } from "@/lib/api";
import { UploadCloud, File } from "lucide-react";
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
    if (!file) return toast.error("Please select a file");

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

      toast.success("Upload complete");
      onSuccess({ id: "doc_" + Math.random().toString(36).substr(2, 9) });
      setFile(null);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
         <h3 className="text-sm font-medium text-white/70">{title}</h3>
         <UploadCloud className="w-4 h-4 text-white/20" />
      </div>
      
      <div className="relative border border-dashed border-white/10 rounded-lg p-10 text-center hover:border-white/20 transition-colors cursor-pointer bg-white/3">
        <input
          type="file"
          className="absolute inset-0 opacity-0 cursor-pointer z-10"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />
        <div className="flex flex-col items-center gap-3">
           <File className="w-6 h-6 text-white/20" />
           <p className="text-sm text-white/50">{file ? file.name : "Click to select file"}</p>
           <p className="text-xs text-white/20">PDF, PNG, JPG up to 10MB</p>
        </div>
      </div>
      
      <button
        onClick={handleUpload}
        disabled={!file || loading}
        className="w-full py-3 bg-white text-[#1a1410] text-sm font-medium rounded-lg hover:bg-white/90 disabled:opacity-30 transition-colors"
      >
        {loading ? "Uploading..." : "Upload"}
      </button>
    </div>
  );
}
