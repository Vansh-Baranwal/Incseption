import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Objection.ai — Legal Document Security",
  description: "Blockchain-powered legal document verification and security platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
       <body className="bg-[#1a1410] m-0 p-0 overflow-x-hidden font-sans antialiased text-[#e8e4df]">
        {children}
        <Toaster position="top-right" toastOptions={{ style: { background: "#2a2420", color: "#e8e4df", border: "1px solid rgba(255,255,255,0.08)", fontSize: "14px" } }} />
      </body>
    </html>
  );
}
