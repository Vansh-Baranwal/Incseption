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
    fetchVault();
  }, []);

  const fetchVault = async () => {
    try {
      setLoading(true);
      const res = await apiFetch<any[]>("/documents/user");
      setVaultDocs(res);
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleWhistleblowerSuccess = (data: any) => {
    // Show recovery key loudly if whistleblowing is successful
    toast.success(`Recover your submission using this KEY: ${data.recoveryKey || "N/A"}`, { duration: 10000 });
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="bg-[#1E293B] border border-[#334155] rounded-xl p-8 shadow-xl">
        <h2 className="text-3xl font-serif text-[#C6A75E] mb-2">Citizen Dashboard</h2>
        <p className="text-[#94A3B8]">Secure your documents, chat with the AI framework, and transmit information securely.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         <div className="flex flex-col gap-8">
            {/* Whistleblower Component */}
            <FileUpload 
               title="Secure Whistleblower Vault" 
               endpoint="/whistleblower/upload" 
               onSuccess={handleWhistleblowerSuccess} 
            />

            {/* Legal Vault Viewer */}
            <div className="bg-[#1E293B] border border-[#334155] rounded-xl p-6 shadow-lg flex flex-col h-[400px]">
               <h3 className="font-serif text-xl text-[#F8FAFC] pb-4 border-b border-[#334155]">My Legal Vault</h3>
               <div className="flex-1 overflow-y-auto pt-4 flex flex-col gap-2">
                 {loading ? (
                   <div className="flex justify-center items-center h-full"><Loader2 className="w-8 h-8 animate-spin text-[#C6A75E]" /></div>
                 ) : vaultDocs.length > 0 ? (
                   vaultDocs.map((doc, idx) => (
                     <div key={idx} className="flex items-center justify-between p-3 bg-[#020617]/50 border border-[#334155] rounded-lg hover:border-[#C6A75E] transition-colors cursor-pointer">
                        <div className="flex items-center gap-3">
                           <FileText className="w-5 h-5 text-[#94A3B8]" />
                           <div className="text-sm font-medium text-[#F8FAFC]">{doc.name || "Legal_Doc.pdf"}</div>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full ${doc.status === "Verified" ? "bg-emerald-500/10 text-emerald-500" : "bg-amber-500/10 text-amber-500"}`}>
                           {doc.status || "Pending"}
                        </span>
                     </div>
                   ))
                 ) : (
                   <div className="text-sm text-[#94A3B8] text-center mt-10">No documents found in your vault.</div>
                 )}
               </div>
            </div>
         </div>

         {/* Chat Interface aligned to the right grid */}
         <div className="flex flex-col">
            <ChatUI />
         </div>
      </div>
    </div>
  );
}
