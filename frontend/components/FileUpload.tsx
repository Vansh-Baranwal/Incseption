"use client";

import { useState } from "react";
import { apiFetch } from "@/lib/api";
import { UploadCloud, File, X } from "lucide-react";
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
      onSuccess({ id: "doc_" + Math.random().toString(36).substr(2, 9), name: file.name, size: file.size });
      setFile(null);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-5 p-6 bg-card border border-border rounded-2xl shadow-sm transition-all duration-300">
      <div className="flex items-center justify-between">
         <h3 className="text-sm font-semibold text-foreground/80 tracking-tight">{title}</h3>
         <UploadCloud className="w-5 h-5 text-muted-foreground/30" />
      </div>
      
      <div className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 bg-muted/30 group ${file ? 'border-primary/30 bg-primary/5' : 'border-border hover:border-primary/40 hover:bg-muted/50'}`}>
        {!file && (
          <input
            type="file"
            className="absolute inset-0 opacity-0 cursor-pointer z-10"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />
        )}
        
        <div className="flex flex-col items-center gap-3">
           <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${file ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground/40 group-hover:bg-primary/10 group-hover:text-primary/60'}`}>
             <File className="w-6 h-6" />
           </div>
           
           <div className="flex flex-col gap-1">
             <p className="text-sm font-medium text-foreground/70">
               {file ? file.name : "Drop file or click to browse"}
             </p>
             <p className="text-xs text-muted-foreground/50">
               {file ? `${(file.size / 1024 / 1024).toFixed(2)} MB` : "PDF, PNG, JPG up to 10MB"}
             </p>
           </div>

           {file && (
             <button 
               onClick={(e) => { e.stopPropagation(); setFile(null); }}
               className="mt-2 p-1.5 rounded-full hover:bg-muted text-muted-foreground hover:text-red-500 transition-all shadow-sm"
             >
               <X className="w-3.5 h-3.5" />
             </button>
           )}
        </div>
      </div>
      
      <button
        onClick={handleUpload}
        disabled={!file || loading}
        className="w-full py-3 bg-primary text-primary-foreground text-sm font-semibold rounded-xl hover:opacity-90 disabled:opacity-30 disabled:grayscale transition-all shadow-sm shadow-primary/10 active:scale-[0.98]"
      >
        {loading ? "Uploading..." : "Secure Upload"}
      </button>
    </div>
  );
}
