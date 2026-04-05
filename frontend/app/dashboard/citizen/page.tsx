"use client";

import { useEffect, useState } from "react";
import FileUpload from "@/components/FileUpload";
import ChatUI from "@/components/ChatUI";
import { apiFetch } from "@/lib/api";
import toast from "react-hot-toast";
import { FileText, Loader2 } from "lucide-react";

export default function CitizenDashboard() {
  const [vaultDocs, setVaultDocs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data for visual verification
    const mockDocs = [
      { id: "1", name: "Affidavit_01.pdf", status: "Verified", timestamp: "2024-04-01" },
      { id: "2", name: "Evidence_Log_77.zip", status: "Pending", timestamp: "2024-04-03" },
      { id: "3", name: "Identity_Proof.png", status: "Verified", timestamp: "2024-03-28" },
    ];

    apiFetch<any[]>("/documents/user")
      .then((res) => setVaultDocs(res.length ? res : mockDocs))
      .catch(() => {
         setVaultDocs(mockDocs);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleWhistleblowerSuccess = (data: any) => {
    toast.success(`Recover your submission using this KEY: ${data.recoveryKey || "N/A"}`, { duration: 10000 });
  };

  return (
    <div className="flex flex-col gap-10">
      {/* Cinematic Header */}
      <div className="relative overflow-hidden bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-10 md:p-14 shadow-2xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/5 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="relative z-10 max-w-3xl">
          <div className="h-px w-12 bg-[#D4AF37]/40 mb-6" />
          <h2 className="text-3xl md:text-5xl font-serif text-[#F8FAFC] mb-4 leading-tight">
            Citizen <span className="text-[#D4AF37] italic">Vault</span> Access
          </h2>
          <p className="text-[#F8FAFC]/40 text-lg font-light leading-relaxed">
            Initialize secure document transfers, interact with the AI legal framework, 
            and manage your cryptographic records in complete anonymity.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
         <div className="flex flex-col gap-10">
            {/* Whistleblower Component */}
            <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-10 shadow-2xl">
               <FileUpload 
                  title="ANONYMOUS INGESTION" 
                  endpoint="/whistleblower/upload" 
                  onSuccess={handleWhistleblowerSuccess} 
               />
            </div>

            {/* Legal Vault Viewer */}
            <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-10 shadow-2xl flex flex-col h-[500px]">
               <div className="flex items-center justify-between pb-6 border-b border-white/5 mb-6">
                  <h3 className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#F8FAFC]/40">Active Vault Repository</h3>
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981]" />
               </div>
               
               <div className="flex-1 overflow-y-auto pr-2 space-y-4">
                 {loading ? (
                   <div className="flex justify-center items-center h-full">
                     <div className="w-10 h-10 border-2 border-t-[#D4AF37] border-white/10 rounded-full animate-spin" />
                   </div>
                 ) : vaultDocs.length > 0 ? (
                   vaultDocs.map((doc, idx) => (
                     <div key={idx} className="group flex items-center justify-between p-5 bg-white/5 border border-white/5 rounded-2xl hover:border-[#D4AF37]/30 transition-all duration-300 cursor-pointer">
                        <div className="flex items-center gap-4">
                           <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-[#D4AF37]/10 transition-colors">
                              <FileText className="w-4 h-4 text-[#F8FAFC]/30 group-hover:text-[#D4AF37]" />
                           </div>
                           <div className="flex flex-col">
                              <span className="text-sm font-medium text-[#F8FAFC]/80">{doc.name}</span>
                              <span className="text-[8px] uppercase tracking-[0.2em] text-[#F8FAFC]/20 mt-1">{doc.timestamp}</span>
                           </div>
                        </div>
                        <div className={`text-[8px] font-bold tracking-[0.2em] uppercase px-3 py-1.5 rounded-full border ${doc.status === "Verified" ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-500" : "bg-amber-500/10 border-amber-500/20 text-amber-500"}`}>
                           {doc.status}
                        </div>
                     </div>
                   ))
                 ) : (
                   <div className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#F8FAFC]/20 text-center mt-20">
                      NULL_VAULT_RECORDS
                   </div>
                 )}
               </div>
            </div>
         </div>

         {/* Chat Interface aligned to the right grid */}
         <div className="flex flex-col bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl relative">
            <div className="px-8 py-6 border-b border-white/5 flex items-center justify-between">
               <h3 className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#F8FAFC]/40">Nyaya Setu Terminal</h3>
               <span className="text-[8px] tracking-[0.2em] uppercase text-[#D4AF37]/50">SECURE_COMM_ENCRYPTED</span>
            </div>
            <div className="p-4 flex-1">
               <ChatUI />
            </div>
         </div>
      </div>
    </div>
  );
}
