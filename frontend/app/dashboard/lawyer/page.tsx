"use client";

import { useState } from "react";
import FileUpload from "@/components/FileUpload";
import QRViewer from "@/components/QRViewer";
import { apiFetch } from "@/lib/api";
import toast from "react-hot-toast";
import { Loader2, Activity, Send } from "lucide-react";

export default function LawyerDashboard() {
  const [activeDocId, setActiveDocId] = useState<string>("");
  const [intervalDays, setIntervalDays] = useState(7);
  const [recipients, setRecipients] = useState("");
  const [unlockDate, setUnlockDate] = useState("");
  const [capsuleFile, setCapsuleFile] = useState<File | null>(null);
  
  const [switchLoading, setSwitchLoading] = useState(false);
  const [capsuleLoading, setCapsuleLoading] = useState(false);

  const handleDocumentSuccess = (data: any) => {
    setActiveDocId(data.id || "sample_id");
    toast.success("Identity injected into Blockchain network");
  };

  const handleDeadManSubmit = async () => {
    if (!recipients) return toast.error("Provide a recipient");
    setSwitchLoading(true);
    try {
      await apiFetch("/deadman/create", {
        method: "POST",
        body: { interval: intervalDays, recipients: recipients.split(",") }
      });
      toast.success("Protocol Armed");
      setRecipients("");
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setSwitchLoading(false);
    }
  };

  const handleTimeCapsule = async () => {
    if (!unlockDate || !capsuleFile) return toast.error("Provide a date and file");
    setCapsuleLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", capsuleFile);
      formData.append("unlockDate", unlockDate);

      await apiFetch("/timecapsule/create", {
        method: "POST",
        body: formData
      });
      toast.success("Capsule Secured");
      setCapsuleFile(null);
      setUnlockDate("");
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setCapsuleLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-10 pb-20">
      {/* Cinematic Header */}
      <div className="relative overflow-hidden bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-10 md:p-14 shadow-2xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/5 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="relative z-10 max-w-3xl">
          <div className="h-px w-12 bg-[#D4AF37]/40 mb-6" />
          <h2 className="text-3xl md:text-5xl font-serif text-[#F8FAFC] mb-4 leading-tight">
            Counsel <span className="text-[#D4AF37] italic">Ingestion</span> Hub
          </h2>
          <p className="text-[#F8FAFC]/40 text-lg font-light leading-relaxed">
            Securely execute immutable document injections, manage complex chain-of-custody protocols, 
            and initialize autonomous legal logic contracts.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
         <div className="flex flex-col gap-10">
            {/* Document Ingestion */}
            <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-10 shadow-2xl">
               <FileUpload 
                  title="RECORDS_INGESTION" 
                  endpoint="/documents/upload" 
                  onSuccess={handleDocumentSuccess} 
               />
            </div>

            {/* QR Viewer block */}
            <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-10 shadow-2xl">
               <div className="flex items-center justify-between pb-6 border-b border-white/5 mb-6">
                  <h3 className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#F8FAFC]/40">Verification Fingerprint</h3>
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse shadow-[0_0_8px_#3b82f6]" />
               </div>
               <QRViewer documentId={activeDocId} />
            </div>

            {/* Chain of custody */}
            <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-10 shadow-2xl">
               <div className="flex items-center justify-between pb-6 border-b border-white/5 mb-6">
                  <h3 className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#F8FAFC]/40">Active Chain Statistics</h3>
                  <Activity className="w-4 h-4 text-[#D4AF37]/50" />
               </div>
               {activeDocId ? (
                 <div className="space-y-6">
                    <div className="flex items-start gap-4">
                       <div className="w-2 h-2 rounded-full bg-[#D4AF37] mt-1 shadow-[0_0_8px_#D4AF37]" />
                       <div className="flex flex-col">
                          <span className="text-xs font-medium text-[#F8FAFC]/80">Document Generated</span>
                          <span className="text-[8px] uppercase tracking-widest text-[#F8FAFC]/20 mt-1">{new Date().toLocaleTimeString()}</span>
                       </div>
                    </div>
                    <div className="flex items-start gap-4 opacity-50">
                       <div className="w-2 h-2 rounded-full bg-white/10 mt-1" />
                       <div className="flex flex-col">
                          <span className="text-xs font-medium text-[#F8FAFC]/40">Secondary Validation</span>
                          <span className="text-[8px] uppercase tracking-widest text-[#F8FAFC]/20 mt-1">Pending Sync...</span>
                       </div>
                    </div>
                 </div>
               ) : (
                 <div className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#F8FAFC]/20 text-center py-10">
                    IDLE_SYSTEM_PENDING_INPUT
                 </div>
               )}
            </div>
         </div>

         {/* Advanced Logic Contracts */}
         <div className="flex flex-col gap-10">
            {/* Dead Man's Switch */}
            <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-10 shadow-2xl flex flex-col gap-8">
               <div className="flex items-center justify-between">
                  <h3 className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#F8FAFC]/40">Protocol: Dead Man Switch</h3>
                  <span className="text-[8px] tracking-[0.2em] uppercase text-red-500/50">High_Security</span>
               </div>
               
               <div className="flex flex-col gap-4">
                 <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#F8FAFC]/30 ml-1">Heartbeat Delta (Days)</label>
                 <input type="number" value={intervalDays} onChange={e => setIntervalDays(Number(e.target.value))} className="w-full px-5 py-4 bg-black/40 border border-white/10 rounded-xl text-sm text-[#F8FAFC] focus:outline-none focus:border-[#D4AF37]/50 transition-all" />
               </div>

               <div className="flex flex-col gap-4">
                 <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#F8FAFC]/30 ml-1">Relay Nodes (Emails)</label>
                 <input value={recipients} onChange={e => setRecipients(e.target.value)} type="text" className="w-full px-5 py-4 bg-black/40 border border-white/10 rounded-xl text-sm text-[#F8FAFC] focus:outline-none focus:border-[#D4AF37]/50 transition-all placeholder:text-white/10" placeholder="lawyer@firm.com" />
               </div>

               <button disabled={switchLoading} onClick={handleDeadManSubmit} className="group relative w-full py-5 mt-4 overflow-hidden rounded-xl border border-red-500/30 text-red-400 text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-red-500/10 transition-colors duration-500">
                  <span className="relative z-10">{switchLoading ? "ARMING_PROTOCOL..." : "Initialize Protocol Switch"}</span>
               </button>
            </div>

            {/* Legal Time Capsule */}
            <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-10 shadow-2xl flex flex-col gap-8">
               <div className="flex items-center justify-between">
                  <h3 className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#F8FAFC]/40">Protocol: Time Capsule</h3>
                  <span className="text-[8px] tracking-[0.2em] uppercase text-blue-500/50">Encryption_Locked</span>
               </div>
               
               <div className="flex flex-col gap-4">
                 <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#F8FAFC]/30 ml-1">Ingestion Payload</label>
                 <div className="group relative border border-dashed border-white/10 rounded-xl p-6 text-center hover:border-[#D4AF37]/30 transition-all cursor-pointer bg-white/[0.02]">
                    <input onChange={e => setCapsuleFile(e.target.files?.[0] || null)} type="file" className="absolute inset-0 opacity-0 cursor-pointer" />
                    <span className="text-[10px] font-bold tracking-widest text-[#F8FAFC]/30 uppercase">{capsuleFile ? capsuleFile.name : "Select Document"}</span>
                 </div>
               </div>

               <div className="flex flex-col gap-4">
                 <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#F8FAFC]/30 ml-1">Release Protocol Date</label>
                 <input value={unlockDate} onChange={e => setUnlockDate(e.target.value)} type="date" className="w-full px-5 py-4 bg-black/40 border border-white/10 rounded-xl text-sm text-[#F8FAFC] focus:outline-none focus:border-[#D4AF37]/50 transition-all font-mono" />
               </div>

               <button disabled={capsuleLoading} onClick={handleTimeCapsule} className="group relative w-full py-5 mt-4 overflow-hidden rounded-xl border border-[#D4AF37]/50 text-[#D4AF37] text-[10px] uppercase tracking-[0.3em] font-bold hover:text-[#020617] transition-colors duration-500">
                  <span className="relative z-10">{capsuleLoading ? "ENCRYPTING_PAYLOAD..." : "Initialize Capsule Sequence"}</span>
                  <div className="absolute inset-0 bg-[#D4AF37] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
               </button>
            </div>
         </div>
      </div>
    </div>
  );
}
