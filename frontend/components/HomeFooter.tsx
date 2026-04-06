"use client";

import Link from "next/link";
import { ShieldCheck, FileSearch, MessageSquare, Scale } from "lucide-react";
import { motion, Variants } from "framer-motion";

const features = [
  {
    icon: ShieldCheck,
    title: "Blockchain Sealed",
    description:
      "Every document is cryptographically hashed and stored on an immutable ledger, ensuring tamper-proof integrity.",
  },
  {
    icon: FileSearch,
    title: "Instant Verification",
    description:
      "Verify any document's authenticity in seconds using our QR-based verification engine.",
  },
  {
    icon: MessageSquare,
    title: "AI Legal Assistant",
    description:
      "Nyaya Setu provides instant legal guidance and helps navigate complex judicial processes.",
  },
  {
    icon: Scale,
    title: "Chain of Custody",
    description:
      "Full traceability from creation to courtroom — with timestamped audit trails.",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  show: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

export default function HomeFooter() {
  return (
    <section className="relative bg-background text-foreground transition-colors duration-300">
      {/* Features */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-24 relative z-10">
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-sans mb-4">
            Why Objection.ai
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl">
            The cryptographic foundation for modern justice.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div 
                key={f.title} 
                variants={itemVariants} 
                animate={{ y: [0, -8, 0] }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity, 
                  ease: "easeInOut",
                  delay: i * 0.2 
                }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="flex flex-col gap-4 group p-6 rounded-2xl bg-card border border-border shadow-sm hover:shadow-2xl hover:border-primary/40 transition-all cursor-default relative overflow-hidden z-10"
              >
                {/* Animated gradient background on hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  initial={false}
                />
                
                <motion.div 
                  className="w-10 h-10 flex items-center justify-center rounded-lg bg-muted group-hover:bg-primary/20 transition-all relative z-10"
                  whileHover={{ 
                    scale: 1.2, 
                    rotate: [0, -10, 10, -10, 0],
                    boxShadow: "0 0 20px rgba(245, 158, 11, 0.4)"
                  }}
                  transition={{ 
                    rotate: { duration: 0.5, ease: "easeInOut" },
                    scale: { duration: 0.3 }
                  }}
                >
                  <Icon className="w-5 h-5 text-primary" />
                </motion.div>
                
                <motion.h3 
                  className="text-lg font-medium group-hover:text-primary transition-colors relative z-10"
                  initial={{ x: 0 }}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  {f.title}
                </motion.h3>
                
                <p className="text-sm text-muted-foreground leading-relaxed transition-colors relative z-10">
                  {f.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* CTA */}
      <div className="bg-muted/30 border-y border-border relative z-10 overflow-hidden">
        <motion.div 
          className="absolute inset-0 bg-primary/5 blur-[100px]"
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="max-w-4xl mx-auto px-6 py-20 text-center flex flex-col items-center gap-8 relative z-20"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl md:text-4xl font-serif italic text-foreground/80">
            &ldquo;In a world of deepfakes, trust the math.&rdquo;
          </h2>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/signup">
              <motion.button
                whileHover={{ 
                  scale: 1.08,
                  boxShadow: "0 20px 40px -10px rgba(0, 0, 0, 0.3)"
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className="px-8 py-3 bg-foreground text-background text-sm font-medium rounded-md transition-all font-sans relative overflow-hidden group"
              >
                <span className="relative z-10">Get Started</span>
                <motion.div
                  className="absolute inset-0 bg-primary/30"
                  initial={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: 2, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  style={{ borderRadius: "50%" }}
                />
              </motion.button>
            </Link>
            
            <Link href="/login">
              <motion.button
                whileHover={{ 
                  scale: 1.05,
                  y: -3,
                  borderColor: "rgba(245, 158, 11, 0.6)"
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className="px-8 py-3 border border-border text-foreground text-sm rounded-md hover:bg-muted transition-all font-sans backdrop-blur-sm"
              >
                Sign In
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border relative z-10 bg-background/50 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-6 md:px-12 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <span className="text-lg font-serif text-foreground/80">Objection.ai</span>
          
          <div className="flex items-center gap-8 text-sm text-muted-foreground">
            {["Verify", "Policies", "Sign In"].map((item, idx) => (
              <Link key={item} href={`/${item === "Sign In" ? "login" : item.toLowerCase()}`}>
                <motion.span
                  className="hover:text-foreground transition-colors inline-block relative"
                  whileHover={{ scale: 1.1, y: -2 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{ transitionDelay: `${idx * 0.1}s` }}
                >
                  {item}
                  <motion.span
                    className="absolute -bottom-1 left-0 h-[1px] bg-primary"
                    initial={{ width: 0 }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.span>
              </Link>
            ))}
          </div>

          <div className="text-xs text-muted-foreground/40">
            &copy; {new Date().getFullYear()} Objection.ai
          </div>
        </div>
      </footer>
    </section>
  );
}
