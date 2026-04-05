import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "@/components/ThemeProvider";
import { CustomCursor } from "@/components/CustomCursor";
import { AnimatedBackground } from "@/components/AnimatedBackground";

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
    <html lang="en" suppressHydrationWarning>
      <head>
        <link href="https://api.fontshare.com/v2/css?f[]=satoshi@900,700,500,400,300&display=swap" rel="stylesheet" />
      </head>
      <body className="m-0 p-0 overflow-x-hidden font-sans antialiased transition-colors duration-300 relative">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <CustomCursor imageUrl="/gavel.png" />
          <AnimatedBackground />
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
