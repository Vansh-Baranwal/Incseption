"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import { QrCode, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

interface QRViewerProps {
  documentId: string;
}

export default function QRViewer({ documentId }: QRViewerProps) {
  const [qrSrc, setQrSrc] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!documentId) return;
    
    // Simulating QR fetch block
    // the backend dictates QR response could be img URL or data URI. Assuming raw URL string response.
    apiFetch<{ qrUrl: string }>(`/documents/${documentId}/qr`)
      .then((res) => {
        setQrSrc(res.qrUrl);
      })
      .catch((err) => toast.error("Failed to load generic QR data: " + err.message))
      .finally(() => setLoading(false));
  }, [documentId]);

  return (
    <div className="bg-[#1E293B] border border-[#334155] rounded-xl p-6 flex flex-col items-center justify-center min-h-[250px] shadow-lg">
      <h3 className="font-serif text-lg text-[#F8FAFC] mb-4">Verifiability QR Code</h3>
      
      {loading ? (
        <Loader2 className="w-10 h-10 animate-spin text-[#C6A75E]" />
      ) : qrSrc ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={qrSrc} alt="Verification QR" className="w-48 h-48 rounded bg-white p-2" />
      ) : (
        <div className="flex flex-col items-center gap-2 text-[#94A3B8]">
          <QrCode className="w-12 h-12" />
          <span className="text-sm">QR Code unavailable</span>
        </div>
      )}
    </div>
  );
}
