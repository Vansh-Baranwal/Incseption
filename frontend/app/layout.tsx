import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

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
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="bg-[#0F172A] m-0 p-0 overflow-x-hidden font-sans antialiased text-[#F8FAFC]">
        {children}
        <Toaster position="top-right" toastOptions={{ style: { background: "#1E293B", color: "#F8FAFC", border: "1px solid #334155" } }} />
      </body>
    </html>
  );
}
