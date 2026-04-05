"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import { Users, FileStack, AlertTriangle, ShieldCheck, Activity, Search } from "lucide-react";
import { motion, Variants } from "framer-motion";

interface Stats {
  usersCount: number;
  documentsCount: number;
  activeSwitches: number;
}

interface ActivityLog {
  id: string;
  action: string;
  user: string;
  timestamp: string;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95, y: 10 },
  show: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

const rowVariants: Variants = {
  hidden: { opacity: 0, x: -10 },
  show: { opacity: 1, x: 0 }
};

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const mockStats = { usersCount: 1248, documentsCount: 5742, activeSwitches: 12 };
    const mockLogs = [
      { id: "0x7d...f2a1", action: "Document uploaded", user: "user_77", timestamp: new Date().toISOString() },
      { id: "0x3a...e9c4", action: "Switch armed", user: "user_12", timestamp: new Date().toISOString() },
      { id: "0xf8...b0d2", action: "Identity verified", user: "user_04", timestamp: new Date().toISOString() },
    ];

    apiFetch<Stats>("/admin/stats")
      .then((res) => setStats(res || mockStats))
      .catch(() => setStats(mockStats));

    apiFetch<ActivityLog[]>("/admin/activity")
      .then((res) => setLogs(res.length ? res : mockLogs))
      .catch(() => setLogs(mockLogs))
      .finally(() => setLoading(false));
  }, []);

  return (
    <motion.div 
      className="flex flex-col gap-10 py-4"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-sans font-bold text-foreground mb-2">Admin Control</h2>
          <p className="text-sm text-muted-foreground max-w-md italic">
            Monitor system-wide cryptographic health, track audit trails, and manage high-level protocol metrics.
          </p>
        </div>
        <div className="flex items-center gap-3 bg-muted/50 px-4 py-2 rounded-lg border border-border">
          <Activity className="w-4 h-4 text-emerald-500 animate-pulse" />
          <span className="text-xs font-medium text-foreground/70 tracking-tight">System Status: Nominal</span>
        </div>
      </motion.div>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10"
        variants={containerVariants}
      >
        {[
          { label: "Total Identities", val: stats?.usersCount, icon: Users, color: "text-blue-500", delay: 0 },
          { label: "Sealed Documents", val: stats?.documentsCount, icon: FileStack, color: "text-primary", delay: 0.2 },
          { label: "Active Protocols", val: stats?.activeSwitches, icon: AlertTriangle, color: "text-red-500", delay: 0.4 },
        ].map((stat, i) => (
          <motion.div 
            key={i} 
            variants={itemVariants}
            animate={{ y: [-4, 4, -4] }}
            transition={{ 
              y: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: stat.delay },
              opacity: { duration: 0.4 },
              scale: { duration: 0.4 }
            }}
            whileHover={{ scale: 1.02, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
            className="bg-card border border-border rounded-2xl p-6 shadow-sm flex flex-col gap-4 relative overflow-hidden transition-all hover:border-primary/20 cursor-default"
          >
             <div className="flex items-center justify-between relative z-10">
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest opacity-60">{stat.label}</span>
                <div className={`p-2 rounded-lg bg-muted/50 ${stat.color} shadow-inner`}>
                   <stat.icon className="w-4 h-4 animate-pulse" />
                </div>
             </div>
             <div className="text-4xl font-sans font-bold text-foreground leading-none relative z-10 tabular-nums">
               {stat.val?.toLocaleString() || 0}
             </div>
             <div className={`absolute -right-4 -bottom-4 opacity-[0.03] scale-150 rotate-12 transition-transform group-hover:rotate-0 ${stat.color}`}>
                <stat.icon className="w-24 h-24" />
             </div>
             <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
          </motion.div>
        ))}
      </motion.div>

      <motion.div 
        variants={itemVariants} 
        animate={{ y: [4, -4, 4] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden transition-colors duration-300 relative z-10 hover:shadow-2xl hover:border-primary/10 transition-all duration-700"
      >
        <div className="px-6 py-5 border-b border-border bg-muted/20 flex flex-col md:flex-row md:items-center justify-between gap-4">
           <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <ShieldCheck className="w-4 h-4 text-primary" />
              </div>
              <h3 className="text-sm font-semibold text-foreground tracking-tight uppercase tracking-widest opacity-80">Blockchain Audit Trail</h3>
           </div>
           <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground/40" />
              <input 
                type="text" 
                placeholder="Search audit hash..." 
                className="bg-background border border-border rounded-xl pl-9 pr-4 py-1.5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary/20 focus:border-primary/40 transition-all w-full md:w-64"
              />
           </div>
        </div>
        <div className="overflow-x-auto custom-scrollbar">
           <table className="w-full text-left text-sm border-spacing-0 border-collapse">
             <thead className="bg-muted/30 text-[10px] text-muted-foreground border-b border-border uppercase tracking-widest font-bold">
                <tr>
                   <th className="px-6 py-4 font-bold opacity-60">Identity Hash</th>
                   <th className="px-6 py-4 font-bold opacity-60">Operation</th>
                   <th className="px-6 py-4 font-bold opacity-60">Principal</th>
                   <th className="px-6 py-4 font-bold opacity-60">Timestamp</th>
                </tr>
             </thead>
             <motion.tbody 
               className="divide-y divide-border"
               variants={containerVariants}
               initial="hidden"
               animate="show"
             >
                {loading ? (
                   <motion.tr variants={rowVariants}>
                      <td colSpan={4} className="px-6 py-20 text-center">
                         <div className="flex flex-col items-center gap-3 text-muted-foreground/40">
                             <div className="w-6 h-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                             <span className="text-xs font-medium italic">Syncing Ledger...</span>
                         </div>
                      </td>
                   </motion.tr>
                ) : logs.length > 0 ? logs.map((log) => (
                  <motion.tr 
                    variants={rowVariants} 
                    key={log.id} 
                    className="hover:bg-muted/50 group transition-all cursor-default"
                  >
                    <td className="px-6 py-4 font-mono text-[10px] text-muted-foreground group-hover:text-primary transition-colors">{log.id}</td>
                    <td className="px-6 py-4">
                       <span className="text-sm font-medium text-foreground group-hover:pl-1 transition-all inline-block">{log.action}</span>
                    </td>
                    <td className="px-6 py-4">
                       <div className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary/20 group-hover:bg-primary transition-colors" />
                          <span className="text-sm font-semibold text-primary/70 group-hover:text-primary transition-colors">{log.user}</span>
                       </div>
                    </td>
                    <td className="px-6 py-4 text-[10px] text-muted-foreground font-mono uppercase tracking-tighter opacity-60">
                       {new Date(log.timestamp).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })}
                    </td>
                  </motion.tr>
                )) : (
                  <motion.tr variants={rowVariants}>
                     <td colSpan={4} className="px-6 py-20 text-center text-muted-foreground/20 italic">
                        No activity detected in the current epoch.
                     </td>
                  </motion.tr>
                )}
             </motion.tbody>
           </table>
        </div>
      </motion.div>
    </motion.div>
  );
}
