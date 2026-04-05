"use client";

import { useEffect, useState } from "react";
import FileUpload from "@/components/FileUpload";
import ChatUI from "@/components/ChatUI";
import { apiFetch } from "@/lib/api";
import toast from "react-hot-toast";
import { FileText } from "lucide-react";

export default function CitizenDashboard() {
  const [vaultDocs, setVaultDocs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const mockDocs = [
      { id: "1", name: "Affidavit_01.pdf", status: "Verified", date: "Apr 1, 2024" },
      { id: "2", name: "Evidence_Log.zip", status: "Pending", date: "Apr 3, 2024" },
      { id: "3", name: "Identity_Proof.png", status: "Verified", date: "Mar 28, 2024" },
    ];

    apiFetch<any[]>("/documents/user")
      .then((res) => setVaultDocs(res.length ? res : mockDocs))
      .catch(() => setVaultDocs(mockDocs))
      .finally(() => setLoading(false));
  }, []);

  const handleWhistleblowerSuccess = (data: any) => {
    toast.success(`Recovery key: ${data.recoveryKey || data.id}`, { duration: 10000 });
  };

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h2 className="text-2xl font-serif text-white mb-1">Dashboard</h2>
        <p className="text-sm text-white/40">Manage your documents and communicate securely.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         <div className="flex flex-col gap-8">
            {/* Whistleblower upload */}
            <div className="bg-white/5 border border-white/8 rounded-xl p-6">
               <FileUpload 
                  title="Secure Upload" 
                  endpoint="/whistleblower/upload" 
                  onSuccess={handleWhistleblowerSuccess} 
               />
            </div>

            {/* Document list */}
            <div className="bg-white/5 border border-white/8 rounded-xl p-6 flex flex-col h-[400px]">
               <div className="flex items-center justify-between pb-4 border-b border-white/5 mb-4">
                  <h3 className="text-sm font-medium text-white/70">Your Documents</h3>
                  <span className="text-xs text-white/30">{vaultDocs.length} files</span>
               </div>
               
               <div className="flex-1 overflow-y-auto space-y-2">
                 {loading ? (
                   <div className="flex justify-center items-center h-full">
                     <div className="w-6 h-6 border-2 border-t-white/50 border-white/10 rounded-full animate-spin" />
                   </div>
                 ) : vaultDocs.length > 0 ? (
                   vaultDocs.map((doc, idx) => (
                     <div key={idx} className="flex items-center justify-between p-3 bg-white/3 border border-white/5 rounded-lg hover:bg-white/5 transition-colors cursor-pointer">
                        <div className="flex items-center gap-3">
                           <FileText className="w-4 h-4 text-white/20" />
                           <div>
                              <div className="text-sm text-white/80">{doc.name}</div>
                              <div className="text-xs text-white/25">{doc.date}</div>
                           </div>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded ${doc.status === "Verified" ? "bg-emerald-500/10 text-emerald-400" : "bg-amber-500/10 text-amber-400"}`}>
                           {doc.status}
                        </span>
                     </div>
                   ))
                 ) : (
                   <div className="text-sm text-white/20 text-center mt-16">No documents yet</div>
                 )}
               </div>
            </div>
         </div>

         {/* Chat */}
         <div className="bg-white/5 border border-white/8 rounded-xl overflow-hidden">
            <div className="px-5 py-4 border-b border-white/5">
               <h3 className="text-sm font-medium text-white/70">Nyaya Setu Chat</h3>
            </div>
            <ChatUI />
         </div>
      </div>
    </div>
  );
}
