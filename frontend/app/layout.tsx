import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "@/components/ThemeProvider";
import { CustomCursor } from "@/components/CustomCursor";
import { AnimatedBackground } from "@/components/AnimatedBackground";

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700", "800"], variable: "--font-jakarta" });

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
    <html lang="en" suppressHydrationWarning className={jakarta.variable}>
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
