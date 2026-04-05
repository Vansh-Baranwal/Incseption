"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import toast from "react-hot-toast";
import { Users, FileStack, AlertTriangle } from "lucide-react";

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

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data for visual verification
    const mockStats = { usersCount: 1248, documentsCount: 5742, activeSwitches: 12 };
    const mockLogs = [
      { id: "0x7d...f2a1", action: "BLOCKCHAIN_INJECTION", user: "Node_77", timestamp: new Date().toISOString() },
      { id: "0x3a...e9c4", action: "PROTOCOL_ARMED", user: "Node_12", timestamp: new Date().toISOString() },
      { id: "0xf8...b0d2", action: "IDENTITY_SYNC", user: "Node_04", timestamp: new Date().toISOString() },
    ];

    apiFetch<Stats>("/admin/stats")
      .then((res) => setStats(res || mockStats))
      .catch(() => setStats(mockStats));

    apiFetch<ActivityLog[]>("/admin/activity")
      .then((res) => setLogs(res.length ? res : mockLogs))
      .catch(() => setLogs(mockLogs))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
     return (
       <div className="flex justify-center items-center h-96">
         <div className="w-12 h-12 border-2 border-t-[#D4AF37] border-white/10 rounded-full animate-spin" />
       </div>
     );
  }

  return (
    <div className="flex flex-col gap-10 pb-20">
      {/* Cinematic Header */}
      <div className="relative overflow-hidden bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-10 md:p-14 shadow-2xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/5 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="relative z-10 max-w-3xl">
          <div className="h-px w-12 bg-[#D4AF37]/40 mb-6" />
          <h2 className="text-3xl md:text-5xl font-serif text-[#F8FAFC] mb-4 leading-tight">
            Systems <span className="text-[#D4AF37] italic">Intelligence</span>
          </h2>
          <p className="text-[#F8FAFC]/40 text-lg font-light leading-relaxed">
            Centralized monitoring of the Objection.ai neural network. 
            Track document velocities, security protocols, and node-level activity.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { label: "CIVILIAN NODES", val: stats?.usersCount, icon: Users, color: "text-[#D4AF37]" },
          { label: "NETWORK INJECTIONS", val: stats?.documentsCount, icon: FileStack, color: "text-[#D4AF37]" },
          { label: "ARMED PROTOCOLS", val: stats?.activeSwitches, icon: AlertTriangle, color: "text-red-500" },
        ].map((stat, i) => (
          <div key={i} className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-2xl flex flex-col gap-6 group hover:border-white/20 transition-all">
             <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold tracking-[0.3em] text-[#F8FAFC]/30 uppercase">{stat.label}</span>
                <stat.icon className={`w-4 h-4 ${stat.color} opacity-50 group-hover:opacity-100 transition-opacity`} />
             </div>
             <div className="text-4xl font-serif text-[#F8FAFC]">{stat.val?.toLocaleString() || 0}</div>
          </div>
        ))}
      </div>

      <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden">
        <div className="px-10 py-8 border-b border-white/5 flex items-center justify-between bg-black/20">
           <h3 className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#F8FAFC]/40">Live Matrix Monitor</h3>
           <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
              <span className="text-[8px] tracking-[0.2em] uppercase text-[#D4AF37]/50">Synchronized</span>
           </div>
        </div>
        <div className="overflow-x-auto">
           <table className="w-full text-left text-[10px] tracking-wider uppercase font-bold text-[#F8FAFC]/40">
             <thead className="bg-black/40 text-[8px] tracking-[0.3em] font-black border-b border-white/5">
                <tr>
                   <th className="px-10 py-6">Protocol Hash</th>
                   <th className="px-10 py-6">Operation</th>
                   <th className="px-10 py-6">Node Identity</th>
                   <th className="px-10 py-6">Timestamp</th>
                </tr>
             </thead>
             <tbody className="divide-y divide-white/5">
                {logs.length > 0 ? logs.map((log) => (
                  <tr key={log.id} className="group hover:bg-white/[0.02] transition-colors">
                    <td className="px-10 py-6 font-mono text-[9px] text-[#F8FAFC]/60 group-hover:text-[#D4AF37] transition-colors">{log.id}</td>
                    <td className="px-10 py-6 text-[9px] group-hover:text-[#F8FAFC] transition-colors">{log.action}</td>
                    <td className="px-10 py-6 text-[9px] text-[#D4AF37]/80">{log.user}</td>
                    <td className="px-10 py-6 text-[9px] font-light">{new Date(log.timestamp).toLocaleString()}</td>
                  </tr>
                )) : (
                  <tr>
                     <td colSpan={4} className="px-10 py-20 text-center text-[#F8FAFC]/20 tracking-[0.4em]">
                        NULL_MATRIX_ACTIVITY
                     </td>
                  </tr>
                )}
             </tbody>
           </table>
        </div>
      </div>
    </div>
  );
}
