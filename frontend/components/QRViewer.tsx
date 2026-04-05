"use client";

import { useEffect, useState } from "react";
import { QrCode, Loader2 } from "lucide-react";

interface QRViewerProps {
  documentId: string;
}

export default function QRViewer({ documentId }: QRViewerProps) {
  const [qrSrc, setQrSrc] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!documentId) return;
    setLoading(true);
    
    // Generate QR for demo - using a reliable public API for generation
    // In production this would come from the backend response
    setTimeout(() => {
      setQrSrc(`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=OBJECTION_${documentId}&bgcolor=ffffff&color=1a1410&margin=10`);
      setLoading(false);
    }, 1000);
  }, [documentId]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[260px] p-6 bg-card border border-border rounded-2xl shadow-sm transition-all duration-300">
      {loading ? (
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
          <p className="text-xs text-muted-foreground animate-pulse">Generating Secure QR...</p>
        </div>
      ) : qrSrc ? (
        <div className="flex flex-col items-center gap-6">
           <div className="p-3 bg-white rounded-xl shadow-lg border border-border/50">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={qrSrc} alt="Verification QR" className="w-44 h-44 rounded-lg mix-blend-multiply" />
           </div>
           
           <div className="flex flex-col items-center gap-1">
             <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest font-sans">Document ID</span>
             <span className="text-sm font-mono text-foreground/80 bg-muted px-2 py-0.5 rounded border border-border">
               {documentId}
             </span>
           </div>
           
           <p className="text-[10px] text-center text-muted-foreground leading-relaxed max-w-[200px]">
             Use our mobile app or the public verifier to check cryptographic integrity.
           </p>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4 text-muted-foreground/30 py-8">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
            <QrCode className="w-8 h-8" />
          </div>
          <div className="flex flex-col items-center gap-1">
            <span className="text-sm font-medium text-foreground/40">No QR Generated</span>
            <span className="text-xs text-center max-w-[180px]">Upload a valid document to receive a cryptographic seal.</span>
          </div>
        </div>
      )}
    </div>
  );
}
