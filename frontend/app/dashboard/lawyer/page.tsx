"use client";

import { useState } from "react";
import FileUpload from "@/components/FileUpload";
import QRViewer from "@/components/QRViewer";
import { apiFetch } from "@/lib/api";
import toast from "react-hot-toast";
import { Activity, Send, ShieldAlert, Lock, Clock, Calendar } from "lucide-react";

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
    <div className="flex flex-col gap-10 py-4">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-serif text-foreground mb-2">Lawyer Dashboard</h2>
          <p className="text-sm text-muted-foreground max-w-md italic">
            Configure automated legal protocols, manage cryptographic seals, and verify document integrity.
          </p>
        </div>
        <div className="flex items-center gap-3 bg-muted/50 px-4 py-2 rounded-lg border border-border">
          <ShieldAlert className="w-4 h-4 text-primary" />
          <span className="text-xs font-medium text-foreground/70 tracking-tight">Active Protocols: 2</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
         <div className="lg:col-span-12 xl:col-span-7 flex flex-col gap-8">
            {/* Document Upload */}
            <FileUpload 
              title="Secure Document Upload" 
              endpoint="/documents/upload" 
              onSuccess={handleDocumentSuccess} 
            />

            {/* QR Viewer & Metadata */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2 px-2">
                  <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">Verification QR</h3>
                </div>
                <QRViewer documentId={activeDocId} />
              </div>

              <div className="bg-card border border-border rounded-2xl p-6 shadow-sm flex flex-col gap-4 h-full">
                <div className="flex items-center justify-between">
                   <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">Chain of Custody</h3>
                   <Activity className="w-4 h-4 text-primary" />
                </div>
                
                {activeDocId ? (
                  <div className="flex flex-col gap-6 relative before:absolute before:left-[7px] before:top-2 before:bottom-2 before:w-[1px] before:bg-border">
                     <div className="flex items-start gap-4 relative">
                        <div className="w-4 h-4 rounded-full bg-emerald-500 border-4 border-background z-10" />
                        <div className="flex flex-col">
                           <span className="text-sm font-medium text-foreground">Document Created & Hashed</span>
                           <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">{new Date().toLocaleTimeString()}</span>
                        </div>
                     </div>
                     <div className="flex items-start gap-4 relative opacity-40">
                        <div className="w-4 h-4 rounded-full bg-muted border-4 border-background z-10" />
                        <div className="flex flex-col">
                           <span className="text-sm font-medium text-foreground">Awaiting Digital Signatures</span>
                           <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">STATION_ID: {activeDocId.substring(0, 8)}</span>
                        </div>
                     </div>
                  </div>
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground/30 gap-3 grayscale opacity-50">
                    <Activity className="w-8 h-8" />
                    <p className="text-xs font-medium italic">Upload a document to initialize the chain.</p>
                  </div>
                )}
              </div>
            </div>
         </div>

         {/* Right column: Protocols */}
         <div className="lg:col-span-12 xl:col-span-5 flex flex-col gap-8">
            {/* Dead Man's Switch */}
            <div className="bg-card border border-border rounded-2xl p-6 flex flex-col gap-6 shadow-sm">
               <div className="flex items-center justify-between">
                 <div className="flex items-center gap-2">
                   <Lock className="w-5 h-5 text-red-500" />
                   <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">Dead Man&apos;s Switch</h3>
                 </div>
               </div>
               <p className="text-xs text-muted-foreground leading-relaxed italic">
                 Automated document dispatch to designated recipients upon cryptographic heartbeat failure.
               </p>
               
               <div className="grid gap-4">
                 <div className="flex flex-col gap-2">
                   <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest ml-1">Heartbeat Interval (Days)</label>
                   <div className="relative">
                     <Clock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground/40" />
                     <input 
                       type="number" 
                       value={intervalDays} 
                       onChange={e => setIntervalDays(Number(e.target.value))} 
                       className="w-full pl-10 pr-4 py-2.5 bg-muted/50 border border-border rounded-xl text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-red-500/20 focus:border-red-500/40 transition-all font-mono" 
                     />
                   </div>
                 </div>

                 <div className="flex flex-col gap-2">
                   <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest ml-1">Trusted Recipients</label>
                   <input 
                     value={recipients} 
                     onChange={e => setRecipients(e.target.value)} 
                     type="text" 
                     className="w-full px-4 py-2.5 bg-muted/50 border border-border rounded-xl text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-red-500/20 focus:border-red-500/40 transition-all placeholder:text-muted-foreground/30" 
                     placeholder="lawyer@firm.com, backup@secure.io" 
                   />
                 </div>
               </div>

               <button 
                 disabled={switchLoading} 
                 onClick={handleDeadManSubmit} 
                 className="w-full py-3 bg-red-500 text-white text-sm font-bold rounded-xl hover:bg-red-600 disabled:opacity-30 transition-all shadow-sm shadow-red-500/10 active:scale-[0.98]"
               >
                  {switchLoading ? "Arming Protocol..." : "Arm Cryptographic Switch"}
               </button>
            </div>

            {/* Time Capsule */}
            <div className="bg-card border border-border rounded-2xl p-6 flex flex-col gap-6 shadow-sm">
               <div className="flex items-center justify-between">
                 <div className="flex items-center gap-2">
                   <Clock className="w-5 h-5 text-primary" />
                   <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">Time Capsule</h3>
                 </div>
               </div>
               <p className="text-xs text-muted-foreground leading-relaxed italic">
                 Encrypt documents with a verifiable release schedule. Locked until the specified date.
               </p>
               
               <div className="grid gap-4">
                 <div className="flex flex-col gap-2">
                   <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest ml-1">Encrypted Payload</label>
                   <div className="relative border border-dashed border-border rounded-xl p-4 text-center hover:bg-muted/30 transition-all cursor-pointer group">
                      <input 
                        onChange={e => setCapsuleFile(e.target.files?.[0] || null)} 
                        type="file" 
                        className="absolute inset-0 opacity-0 cursor-pointer z-10" 
                      />
                      <div className="flex items-center justify-center gap-3">
                        <Lock className={`w-4 h-4 transition-colors ${capsuleFile ? 'text-primary' : 'text-muted-foreground/30 group-hover:text-primary/60'}`} />
                        <span className="text-sm font-medium text-foreground/60">{capsuleFile ? capsuleFile.name : "Select vault file"}</span>
                      </div>
                   </div>
                 </div>

                 <div className="flex flex-col gap-2">
                   <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest ml-1">Release Date</label>
                   <div className="relative">
                      <Calendar className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground/40" />
                      <input 
                        value={unlockDate} 
                        onChange={e => setUnlockDate(e.target.value)} 
                        type="date" 
                        className="w-full pl-10 pr-4 py-2.5 bg-muted/50 border border-border rounded-xl text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary/20 focus:border-primary/40 transition-all dark:[color-scheme:dark]" 
                      />
                   </div>
                 </div>
               </div>

               <button 
                disabled={capsuleLoading} 
                onClick={handleTimeCapsule} 
                className="w-full py-3 bg-foreground text-background text-sm font-bold rounded-xl hover:opacity-90 disabled:opacity-30 transition-all flex items-center justify-center gap-2 shadow-sm"
               >
                  {capsuleLoading ? "Seal Encrypting..." : <><Send className="w-4 h-4" /> Initialize Time Lock</>}
               </button>
            </div>
         </div>
      </div>
    </div>
  );
}
