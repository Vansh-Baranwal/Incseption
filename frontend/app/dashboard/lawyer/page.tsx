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
    toast.success("Document injected into the Blockchain network");
  };

  const handleDeadManSubmit = async () => {
    if (!recipients) return toast.error("Provide a recipient");
    setSwitchLoading(true);
    try {
      await apiFetch("/deadman/create", {
        method: "POST",
        body: { interval: intervalDays, recipients: recipients.split(",") }
      });
      toast.success("Switch Armed successfully");
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
      toast.success("Legal Time Capsule secured");
      setCapsuleFile(null);
      setUnlockDate("");
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setCapsuleLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-8 pb-10">
      <div className="bg-[#1E293B] border border-[#334155] rounded-xl p-8 shadow-xl">
        <h2 className="text-3xl font-serif text-[#C6A75E] mb-2">Lawyer Dashboard</h2>
        <p className="text-[#94A3B8]">Securely issue immutable documents, manage chains of custody, and build logic contracts.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         <div className="flex flex-col gap-8">
            <FileUpload 
               title="Blockchain Identity Seal Upload" 
               endpoint="/documents/upload" 
               onSuccess={handleDocumentSuccess} 
            />

            {/* QR Viewer block */}
            <QRViewer documentId={activeDocId} />

            {/* Chain of custody mini block placeholder */}
            <div className="bg-[#1E293B] border border-[#334155] rounded-xl p-6 shadow-lg">
               <h3 className="font-serif text-lg text-[#F8FAFC] pb-4 flex items-center justify-between border-b border-[#334155]">
                  Chain of Custody
                  <Activity className="w-5 h-5 text-[#C6A75E]" />
               </h3>
               {activeDocId ? (
                 <div className="mt-4 text-sm text-[#F8FAFC]">
                   <div className="pl-4 border-l-2 border-[#C6A75E] py-2 mb-2">Document Generated [{new Date().toLocaleTimeString()}]</div>
                   <div className="pl-4 border-l-2 border-[#334155] py-2 text-[#94A3B8]">Waiting for secondary signatures...</div>
                 </div>
               ) : (
                 <div className="mt-4 text-sm text-[#94A3B8] text-center">Upload a document to trace custody</div>
               )}
            </div>
         </div>

         {/* Advanced Features */}
         <div className="flex flex-col gap-8">
            {/* Dead Man's Switch */}
            <div className="bg-[#1E293B] border border-[#334155] rounded-xl p-6 shadow-lg flex flex-col gap-4">
               <h3 className="font-serif text-xl text-[#F8FAFC]">Dead Man&apos;s Switch</h3>
               <p className="text-xs text-[#94A3B8]">Automated immutable document dispatch executing securely based on heartbeat failure.</p>
               
               <div className="flex flex-col gap-2">
                 <label className="text-sm font-medium text-[#F8FAFC]">Heartbeat interval (days)</label>
                 <input type="number" value={intervalDays} onChange={e => setIntervalDays(Number(e.target.value))} className="bg-[#020617] border border-[#334155] text-sm text-[#F8FAFC] rounded-lg px-4 py-2" />
               </div>

               <div className="flex flex-col gap-2">
                 <label className="text-sm font-medium text-[#F8FAFC]">Recipient Emails (comma separated)</label>
                 <input value={recipients} onChange={e => setRecipients(e.target.value)} type="text" className="bg-[#020617] border border-[#334155] text-sm text-[#F8FAFC] rounded-lg px-4 py-2" placeholder="lawyer@firm.com" />
               </div>

               <button disabled={switchLoading} onClick={handleDeadManSubmit} className="bg-red-500/20 text-red-500 font-semibold text-sm rounded-lg py-3 mt-2 flex justify-center items-center hover:bg-red-500/30 transition-colors">
                  {switchLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Arm Dead Man's Switch"}
               </button>
            </div>

            {/* Legal Time Capsule */}
            <div className="bg-[#1E293B] border border-[#334155] rounded-xl p-6 shadow-lg flex flex-col gap-4">
               <h3 className="font-serif text-xl text-[#F8FAFC]">Legal Time Capsule</h3>
               <p className="text-xs text-[#94A3B8]">Lock documents under cryptographic timing logic that guarantees immunity from tampering.</p>
               
               <div className="flex flex-col gap-2">
                 <label className="text-sm font-medium text-[#F8FAFC]">Unlock Payload Document</label>
                 <input onChange={e => setCapsuleFile(e.target.files?.[0] || null)} type="file" className="text-sm text-[#F8FAFC] file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#334155] file:text-[#F8FAFC]" />
               </div>

               <div className="flex flex-col gap-2">
                 <label className="text-sm font-medium text-[#F8FAFC]">Release Date</label>
                 <input value={unlockDate} onChange={e => setUnlockDate(e.target.value)} type="date" className="bg-[#020617] w-full border border-[#334155] text-sm text-[#F8FAFC] rounded-lg px-4 py-2" />
               </div>

               <button disabled={capsuleLoading} onClick={handleTimeCapsule} className="bg-[#C6A75E] text-[#0F172A] font-semibold text-sm rounded-lg py-3 mt-2 flex justify-center items-center hover:bg-opacity-90 transition-colors">
                  {capsuleLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Send className="w-4 h-4 mr-2"/> Encrypt Capsule</>}
               </button>
            </div>
         </div>
      </div>
    </div>
  );
}
