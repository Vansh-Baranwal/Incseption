import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "@/components/ThemeProvider";

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
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <body className="m-0 p-0 overflow-x-hidden font-sans antialiased transition-colors duration-300">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          {children}
          <Toaster 
            position="top-right" 
            toastOptions={{ 
              style: { 
                background: "var(--card)", 
                color: "var(--foreground)", 
                border: "1px solid var(--border)", 
                fontSize: "14px" 
              } 
            }} 
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
