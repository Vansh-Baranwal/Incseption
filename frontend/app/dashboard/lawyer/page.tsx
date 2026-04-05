"use client";

import { useState } from "react";
import FileUpload from "@/components/FileUpload";
import QRViewer from "@/components/QRViewer";
import { apiFetch } from "@/lib/api";
import toast from "react-hot-toast";
import { Activity, Send } from "lucide-react";

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
    toast.success("Document uploaded successfully");
  };

  const handleDeadManSubmit = async () => {
    if (!recipients) return toast.error("Please provide a recipient");
    setSwitchLoading(true);
    try {
      await apiFetch("/deadman/create", {
        method: "POST",
        body: { interval: intervalDays, recipients: recipients.split(",") }
      });
      toast.success("Switch armed");
      setRecipients("");
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setSwitchLoading(false);
    }
  };

  const handleTimeCapsule = async () => {
    if (!unlockDate || !capsuleFile) return toast.error("Please provide a date and file");
    setCapsuleLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", capsuleFile);
      formData.append("unlockDate", unlockDate);

      await apiFetch("/timecapsule/create", {
        method: "POST",
        body: formData
      });
      toast.success("Time capsule created");
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
      <div>
        <h2 className="text-2xl font-serif text-white mb-1">Lawyer Dashboard</h2>
        <p className="text-sm text-white/40">Upload documents, manage custody chains, and configure automated protocols.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         <div className="flex flex-col gap-8">
            {/* Document Upload */}
            <div className="bg-white/5 border border-white/8 rounded-xl p-6">
               <FileUpload 
                  title="Document Upload" 
                  endpoint="/documents/upload" 
                  onSuccess={handleDocumentSuccess} 
               />
            </div>

            {/* QR Viewer */}
            <div className="bg-white/5 border border-white/8 rounded-xl p-6">
               <h3 className="text-sm font-medium text-white/70 mb-4">Verification QR</h3>
               <QRViewer documentId={activeDocId} />
            </div>

            {/* Chain of custody */}
            <div className="bg-white/5 border border-white/8 rounded-xl p-6">
               <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-white/70">Chain of Custody</h3>
                  <Activity className="w-4 h-4 text-white/20" />
               </div>
               {activeDocId ? (
                 <div className="space-y-3">
                    <div className="flex items-start gap-3">
                       <div className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5" />
                       <div>
                          <div className="text-sm text-white/70">Document Created</div>
                          <div className="text-xs text-white/25">{new Date().toLocaleTimeString()}</div>
                       </div>
                    </div>
                    <div className="flex items-start gap-3 opacity-40">
                       <div className="w-2 h-2 rounded-full bg-white/20 mt-1.5" />
                       <div>
                          <div className="text-sm text-white/40">Awaiting signatures</div>
                       </div>
                    </div>
                 </div>
               ) : (
                 <p className="text-sm text-white/20 text-center py-6">Upload a document to track custody</p>
               )}
            </div>
         </div>

         {/* Right column */}
         <div className="flex flex-col gap-8">
            {/* Dead Man's Switch */}
            <div className="bg-white/5 border border-white/8 rounded-xl p-6 flex flex-col gap-5">
               <h3 className="text-sm font-medium text-white/70">Dead Man&apos;s Switch</h3>
               <p className="text-xs text-white/30">Automated document dispatch on heartbeat failure.</p>
               
               <div className="flex flex-col gap-1.5">
                 <label className="text-sm text-white/40">Interval (days)</label>
                 <input type="number" value={intervalDays} onChange={e => setIntervalDays(Number(e.target.value))} className="w-full px-4 py-3 bg-black/30 border border-white/8 rounded-lg text-sm text-white focus:outline-none focus:border-white/20 transition-colors" />
               </div>

               <div className="flex flex-col gap-1.5">
                 <label className="text-sm text-white/40">Recipients (comma-separated)</label>
                 <input value={recipients} onChange={e => setRecipients(e.target.value)} type="text" className="w-full px-4 py-3 bg-black/30 border border-white/8 rounded-lg text-sm text-white focus:outline-none focus:border-white/20 transition-colors placeholder:text-white/15" placeholder="lawyer@firm.com" />
               </div>

               <button disabled={switchLoading} onClick={handleDeadManSubmit} className="w-full py-3 bg-red-500/15 text-red-400 text-sm font-medium rounded-lg hover:bg-red-500/25 transition-colors disabled:opacity-30">
                  {switchLoading ? "Arming..." : "Arm Switch"}
               </button>
            </div>

            {/* Time Capsule */}
            <div className="bg-white/5 border border-white/8 rounded-xl p-6 flex flex-col gap-5">
               <h3 className="text-sm font-medium text-white/70">Time Capsule</h3>
               <p className="text-xs text-white/30">Lock documents with a release date.</p>
               
               <div className="flex flex-col gap-1.5">
                 <label className="text-sm text-white/40">Document</label>
                 <div className="relative border border-dashed border-white/10 rounded-lg p-4 text-center hover:border-white/20 transition-colors cursor-pointer bg-white/3">
                    <input onChange={e => setCapsuleFile(e.target.files?.[0] || null)} type="file" className="absolute inset-0 opacity-0 cursor-pointer" />
                    <span className="text-sm text-white/30">{capsuleFile ? capsuleFile.name : "Select file"}</span>
                 </div>
               </div>

               <div className="flex flex-col gap-1.5">
                 <label className="text-sm text-white/40">Release Date</label>
                 <input value={unlockDate} onChange={e => setUnlockDate(e.target.value)} type="date" className="w-full px-4 py-3 bg-black/30 border border-white/8 rounded-lg text-sm text-white focus:outline-none focus:border-white/20 transition-colors" />
               </div>

               <button disabled={capsuleLoading} onClick={handleTimeCapsule} className="w-full py-3 bg-white text-[#1a1410] text-sm font-medium rounded-lg hover:bg-white/90 disabled:opacity-30 transition-colors flex items-center justify-center gap-2">
                  {capsuleLoading ? "Encrypting..." : <><Send className="w-4 h-4" /> Create Capsule</>}
               </button>
            </div>
         </div>
      </div>
    </div>
  );
}
