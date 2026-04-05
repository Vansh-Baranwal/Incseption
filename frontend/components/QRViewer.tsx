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
    if (!documentId) {
      setLoading(false);
      return;
    }
    
    // Simulate QR fetch block for visual demo
    setTimeout(() => {
      setQrSrc("https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=OBJECTION_VERIFY_" + documentId);
      setLoading(false);
    }, 1500);

    // Actual implementation (commented out until API is fully active)
    /*
    apiFetch<{ qrUrl: string }>(`/documents/${documentId}/qr`)
      .then((res) => {
        setQrSrc(res.qrUrl);
      })
      .catch((err) => toast.error("Failed to load generic QR data: " + err.message))
      .finally(() => setLoading(false));
    */
  }, [documentId]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[300px]">
      {loading ? (
        <div className="flex flex-col items-center gap-6">
           <div className="w-12 h-12 border-2 border-t-[#D4AF37] border-white/10 rounded-full animate-spin" />
           <span className="text-[8px] tracking-[0.4em] font-bold text-[#F8FAFC]/20 uppercase">Generating Fingerprint...</span>
        </div>
      ) : qrSrc ? (
        <div className="group relative">
           <div className="absolute -inset-4 bg-[#D4AF37]/10 blur-2xl rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
           <div className="relative p-4 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-2xl transition-all duration-500 hover:border-[#D4AF37]/30">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={qrSrc} alt="Verification QR" className="w-48 h-48 rounded-xl opacity-80 invert grayscale brightness-150" />
           </div>
           <div className="mt-8 text-center">
              <span className="text-[8px] tracking-[0.3em] font-bold text-[#D4AF37]/60 uppercase">Identity Hash: {documentId.substring(0, 12)}...</span>
           </div>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-6 opacity-20">
          <QrCode className="w-12 h-12 text-[#F8FAFC]" />
          <span className="text-[8px] tracking-[0.4em] font-bold uppercase">Pending Synchronization</span>
        </div>
      )}
    </div>
  );
}
