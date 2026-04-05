"use client";

import { useEffect, useState } from "react";
import FileUpload from "@/components/FileUpload";
import ChatUI from "@/components/ChatUI";
import { apiFetch } from "@/lib/api";
import toast from "react-hot-toast";
import { FileText, Clock, ShieldCheck, Search } from "lucide-react";
import { motion, Variants } from "framer-motion";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

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
    <motion.div 
      className="flex flex-col gap-10 py-4"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-sans font-bold text-foreground mb-2">Citizen Dashboard</h2>
          <p className="text-sm text-muted-foreground max-w-md italic">
            Manage your cryptographic identities and communicate securely through the Nyaya Setu pipeline.
          </p>
        </div>
        <div className="flex items-center gap-3 bg-muted/50 px-4 py-2 rounded-lg border border-border">
          <Clock className="w-4 h-4 text-primary" />
          <span className="text-xs font-medium text-foreground/70 tracking-tight">Last verified: Today, 2:45 PM</span>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
         <div className="lg:col-span-12 xl:col-span-7 flex flex-col gap-8">
            {/* Whistleblower upload */}
            <motion.div variants={itemVariants}>
              <FileUpload 
                title="Secure Whistleblower Vault" 
                endpoint="/whistleblower/upload" 
                onSuccess={handleWhistleblowerSuccess} 
              />
            </motion.div>

            {/* Document list */}
            <motion.div 
              variants={itemVariants} 
              animate={{ y: [-4, 4, -4] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:border-primary/20 transition-all duration-500"
            >
               <div className="px-6 py-5 border-b border-border bg-muted/20 flex flex-col md:flex-row md:items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold text-foreground tracking-tight">Your Digital Vault</h3>
                    <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-bold">{vaultDocs.length} FILES</span>
                  </div>
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground/40" />
                    <input 
                      type="text" 
                      placeholder="Search vault..." 
                      className="bg-background border border-border rounded-lg pl-9 pr-4 py-1.5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary/20 focus:border-primary/40 transition-all w-full md:w-48"
                    />
                  </div>
               </div>
               
               <div className="p-4 max-h-[450px] overflow-y-auto custom-scrollbar">
                 {loading ? (
                   <div className="flex flex-col justify-center items-center py-20 gap-3">
                     <div className="w-6 h-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                     <span className="text-xs text-muted-foreground animate-pulse">Syncing vault...</span>
                   </div>
                 ) : vaultDocs.length > 0 ? (
                   <motion.div 
                     className="grid gap-2"
                     variants={containerVariants}
                     initial="hidden"
                     animate="show"
                   >
                     {vaultDocs.map((doc, idx) => (
                       <motion.div 
                          key={idx} 
                          variants={itemVariants}
                          whileHover={{ x: 6, transition: { duration: 0.2 } }}
                          className="group flex items-center justify-between p-3.5 bg-background border border-border rounded-xl hover:border-primary/30 hover:bg-muted/30 transition-all cursor-pointer"
                       >
                          <div className="flex items-center gap-4">
                             <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                               <FileText className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                             </div>
                             <div>
                                <div className="text-sm font-medium text-foreground/90 leading-none mb-1 group-hover:text-primary transition-colors">{doc.name}</div>
                                <div className="text-[10px] text-muted-foreground uppercase tracking-wider font-bold">{doc.date}</div>
                             </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                              doc.status === "Verified" 
                                ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20" 
                                : "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20"
                            }`}>
                               {doc.status}
                            </span>
                            {doc.status === "Verified" && <ShieldCheck className="w-4 h-4 text-emerald-500/50" />}
                          </div>
                       </motion.div>
                     ))}
                   </motion.div>
                 ) : (
                   <div className="flex flex-col items-center justify-center py-20 text-muted-foreground/30 gap-4">
                      <div className="p-4 bg-muted rounded-full">
                        <FileText className="w-10 h-10" />
                      </div>
                      <div className="flex flex-col items-center">
                        <p className="text-sm font-medium">No documents yet</p>
                        <p className="text-xs">Your cryptographically sealed documents will appear here.</p>
                      </div>
                   </div>
                 )}
               </div>
            </motion.div>
         </div>

         {/* Chat */}
         <motion.div 
           variants={itemVariants} 
           animate={{ y: [4, -4, 4] }}
           transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
           className="lg:col-span-12 xl:col-span-5 flex flex-col gap-6"
         >
            <div className="flex items-center justify-between">
               <div className="flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
                 <h3 className="text-sm font-semibold text-foreground tracking-tight uppercase tracking-wider">Nyaya Setu AI</h3>
               </div>
               <span className="text-[10px] text-muted-foreground font-medium bg-muted px-2 py-1 rounded uppercase border border-border/50">Legal Expert Mode</span>
            </div>
            <div className="bg-card border border-border shadow-sm rounded-2xl overflow-hidden hover:shadow-lg hover:border-primary/20 transition-all duration-500">
              <ChatUI />
            </div>
            
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="p-5 bg-primary/5 border border-primary/10 rounded-2xl flex items-start gap-4 shadow-sm"
            >
               <ShieldCheck className="w-5 h-5 text-primary mt-0.5 shrink-0" />
               <div className="flex flex-col gap-1">
                  <p className="text-xs font-semibold text-primary/80">Quantum-Safe Communication</p>
                  <p className="text-[10px] text-muted-foreground leading-relaxed">
                    All messages in this session are end-to-end encrypted and automatically purged after 24 hours of inactivity.
                  </p>
               </div>
            </motion.div>
         </motion.div>
      </div>
    </motion.div>
  );
}
