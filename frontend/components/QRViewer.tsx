"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import { QrCode } from "lucide-react";
import toast from "react-hot-toast";

interface QRViewerProps {
  documentId: string;
}

export default function QRViewer({ documentId }: QRViewerProps) {
  const [qrSrc, setQrSrc] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!documentId) return;
    setLoading(true);
    
    // Generate QR for demo
    setTimeout(() => {
      setQrSrc("https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=OBJECTION_" + documentId);
      setLoading(false);
    }, 1000);
  }, [documentId]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[200px]">
      {loading ? (
        <div className="w-8 h-8 border-2 border-t-white/50 border-white/10 rounded-full animate-spin" />
      ) : qrSrc ? (
        <div className="flex flex-col items-center gap-4">
           {/* eslint-disable-next-line @next/next/no-img-element */}
           <img src={qrSrc} alt="Verification QR" className="w-40 h-40 rounded-lg" />
           <span className="text-xs text-white/30 font-mono">{documentId}</span>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-3 text-white/20">
          <QrCode className="w-10 h-10" />
          <span className="text-sm">Upload a document to generate QR</span>
        </div>
      )}
    </div>
  );
}
