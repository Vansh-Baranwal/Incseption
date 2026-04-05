import type { Metadata } from "next";
import { Outfit, Libre_Baskerville } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const sans = Outfit({ subsets: ["latin"], weight: ["300", "400", "500", "600"], variable: "--font-outfit" });
const serif = Libre_Baskerville({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-libre" });

export const metadata: Metadata = {
  title: "Objection.ai - Justice, Delivered",
  description: "Premium Legal-Tech Document Security",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable}`}>
       <body className="bg-[#020617] m-0 p-0 overflow-x-hidden font-sans antialiased text-[#F8FAFC]">
        {children}
        <Toaster position="top-right" toastOptions={{ style: { background: "#1E293B", color: "#F8FAFC", border: "1px solid #334155" } }} />
      </body>
    </html>
  );
}
