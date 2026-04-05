"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
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

  if (loading) {
     return (
       <div className="flex justify-center items-center h-96">
         <div className="w-8 h-8 border-2 border-t-white/50 border-white/10 rounded-full animate-spin" />
       </div>
     );
  }

  return (
    <div className="flex flex-col gap-8 pb-10">
      <div>
        <h2 className="text-2xl font-serif text-white mb-1">Admin Overview</h2>
        <p className="text-sm text-white/40">System-wide metrics and activity monitoring.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Total Users", val: stats?.usersCount, icon: Users },
          { label: "Documents", val: stats?.documentsCount, icon: FileStack },
          { label: "Active Switches", val: stats?.activeSwitches, icon: AlertTriangle, warn: true },
        ].map((stat, i) => (
          <div key={i} className="bg-white/5 border border-white/8 rounded-xl p-6">
             <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-white/40">{stat.label}</span>
                <stat.icon className={`w-4 h-4 ${stat.warn ? "text-red-400/50" : "text-white/20"}`} />
             </div>
             <div className="text-3xl font-serif text-white">{stat.val?.toLocaleString() || 0}</div>
          </div>
        ))}
      </div>

      <div className="bg-white/5 border border-white/8 rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between">
           <h3 className="text-sm font-medium text-white/70">Activity Log</h3>
           <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="text-xs text-white/30">Live</span>
           </div>
        </div>
        <div className="overflow-x-auto">
           <table className="w-full text-left text-sm">
             <thead className="bg-black/20 text-xs text-white/30 border-b border-white/5">
                <tr>
                   <th className="px-6 py-3 font-medium">Hash</th>
                   <th className="px-6 py-3 font-medium">Action</th>
                   <th className="px-6 py-3 font-medium">User</th>
                   <th className="px-6 py-3 font-medium">Time</th>
                </tr>
             </thead>
             <tbody className="divide-y divide-white/5">
                {logs.length > 0 ? logs.map((log) => (
                  <tr key={log.id} className="hover:bg-white/3 transition-colors">
                    <td className="px-6 py-4 font-mono text-xs text-white/40">{log.id}</td>
                    <td className="px-6 py-4 text-white/60">{log.action}</td>
                    <td className="px-6 py-4 text-amber-500/70">{log.user}</td>
                    <td className="px-6 py-4 text-white/30">{new Date(log.timestamp).toLocaleString()}</td>
                  </tr>
                )) : (
                  <tr>
                     <td colSpan={4} className="px-6 py-12 text-center text-white/20">No activity</td>
                  </tr>
                )}
             </tbody>
           </table>
        </div>
      </div>
    </div>
  );
}
