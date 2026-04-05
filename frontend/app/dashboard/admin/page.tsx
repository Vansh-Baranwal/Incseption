"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import toast from "react-hot-toast";
import { Users, FileStack, AlertTriangle, Loader2 } from "lucide-react";

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
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    try {
      setLoading(true);
      const [statsRes, logsRes] = await Promise.all([
        apiFetch<Stats>("/admin/stats").catch(() => ({ usersCount: 0, documentsCount: 0, activeSwitches: 0 })),
        apiFetch<ActivityLog[]>("/admin/activity").catch(() => [])
      ]);
      
      setStats(statsRes);
      setLogs(logsRes);
    } catch (err: any) {
      toast.error(err.message || "Failed to load admin metrics");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
     return <div className="flex justify-center items-center h-96"><Loader2 className="w-12 h-12 text-[#C6A75E] animate-spin" /></div>;
  }

  return (
    <div className="flex flex-col gap-8">
       <div className="bg-[#1E293B] border border-[#334155] rounded-xl p-8 shadow-xl">
        <h2 className="text-3xl font-serif text-[#C6A75E] mb-2">Systems Overview</h2>
        <p className="text-[#94A3B8]">Administrative God&apos;s-eye view over Objection.ai networks.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#1E293B] border border-[#334155] rounded-xl p-6 shadow-lg flex flex-col justify-between">
           <div className="flex items-center justify-between">
              <span className="text-[#94A3B8] font-medium text-sm">Total Citizens</span>
              <Users className="w-6 h-6 text-[#C6A75E]" />
           </div>
           <div className="text-4xl font-serif text-[#F8FAFC] mt-4">{stats?.usersCount || 0}</div>
        </div>

        <div className="bg-[#1E293B] border border-[#334155] rounded-xl p-6 shadow-lg flex flex-col justify-between">
           <div className="flex items-center justify-between">
              <span className="text-[#94A3B8] font-medium text-sm">Blockchain Injections</span>
              <FileStack className="w-6 h-6 text-[#C6A75E]" />
           </div>
           <div className="text-4xl font-serif text-[#F8FAFC] mt-4">{stats?.documentsCount || 0}</div>
        </div>

        <div className="bg-[#1E293B] border border-[#334155] rounded-xl p-6 shadow-lg flex flex-col justify-between">
           <div className="flex items-center justify-between">
              <span className="text-[#94A3B8] font-medium text-sm">Armed Logic Switches</span>
              <AlertTriangle className="w-6 h-6 text-red-500" />
           </div>
           <div className="text-4xl font-serif text-[#F8FAFC] mt-4">{stats?.activeSwitches || 0}</div>
        </div>
      </div>

      <div className="bg-[#1E293B] border border-[#334155] rounded-xl shadow-lg flex flex-col overflow-hidden">
        <div className="p-6 border-b border-[#334155] bg-[#020617]/50">
           <h3 className="font-serif text-xl text-[#F8FAFC]">Live Activity Monitor</h3>
        </div>
        <div className="overflow-x-auto">
           <table className="w-full text-left text-sm text-[#94A3B8]">
             <thead className="bg-[#020617] text-xs uppercase border-b border-[#334155]">
               <tr>
                 <th className="px-6 py-4 font-medium text-[#F8FAFC]">Action Hash</th>
                 <th className="px-6 py-4 font-medium text-[#F8FAFC]">Event Type</th>
                 <th className="px-6 py-4 font-medium text-[#F8FAFC]">User Node</th>
                 <th className="px-6 py-4 font-medium text-[#F8FAFC]">Timestamp</th>
               </tr>
             </thead>
             <tbody>
               {logs.length > 0 ? logs.map((log) => (
                 <tr key={log.id} className="border-b border-[#334155] bg-[#1E293B] hover:bg-[#020617]/50 transition-colors">
                   <td className="px-6 py-4 font-mono text-xs">{log.id}</td>
                   <td className="px-6 py-4">{log.action}</td>
                   <td className="px-6 py-4 text-[#C6A75E]">{log.user}</td>
                   <td className="px-6 py-4">{new Date(log.timestamp).toLocaleString()}</td>
                 </tr>
               )) : (
                 <tr>
                    <td colSpan={4} className="px-6 py-8 text-center text-[#94A3B8]">No activities logged in the current matrix.</td>
                 </tr>
               )}
             </tbody>
           </table>
        </div>
      </div>
    </div>
  );
}
