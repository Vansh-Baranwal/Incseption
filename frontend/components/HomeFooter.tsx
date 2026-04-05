import Link from "next/link";
import { ShieldCheck, FileSearch, MessageSquare, Scale } from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "Blockchain Sealed",
    description:
      "Every document is cryptographically hashed and stored on an immutable ledger, ensuring absolute tamper-proof integrity.",
  },
  {
    icon: FileSearch,
    title: "Instant Verification",
    description:
      "Verify any document's authenticity in seconds using our QR-based verification engine — no intermediaries needed.",
  },
  {
    icon: MessageSquare,
    title: "AI Legal Assistant",
    description:
      "Nyaya Setu, our AI-powered chatbot, provides instant legal guidance and helps navigate complex judicial processes.",
  },
  {
    icon: Scale,
    title: "Chain of Custody",
    description:
      "Full traceability for every document — from creation to courtroom — with timestamped audit trails you can trust.",
  },
];

export default function HomeFooter() {
  return (
    <section className="relative bg-[#020617] text-[#F8FAFC]">
      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-8 md:px-16 py-32">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-6xl font-serif mb-6 leading-tight">
              The Standard for <br/> <span className="text-[#D4AF37] italic">Legal Integrity.</span>
            </h2>
            <p className="text-[#F8FAFC]/50 text-lg font-light leading-relaxed">
              Objection.ai provides the cryptographic foundation for modern justice. 
              We eliminate ambiguity through immutable document security.
            </p>
          </div>
          <Link href="/verify" className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#D4AF37] border-b border-[#D4AF37]/30 pb-2 hover:border-[#D4AF37] transition-all">
            Verify System Integrity
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <div
                key={f.title}
                className="group flex flex-col gap-6"
              >
                <div className="w-12 h-12 flex items-center justify-center rounded-full border border-white/10 group-hover:border-[#D4AF37]/50 transition-colors duration-500">
                  <Icon className="w-5 h-5 text-[#D4AF37]" />
                </div>
                <div className="flex flex-col gap-3">
                  <h3 className="text-xl font-serif tracking-tight">{f.title}</h3>
                  <p className="text-sm text-[#F8FAFC]/40 leading-relaxed font-light">
                    {f.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* CTA Banner - Minimalist */}
      <div className="bg-[#081429] border-y border-white/5">
        <div className="max-w-5xl mx-auto px-8 py-24 text-center flex flex-col items-center gap-10">
          <h2 className="text-3xl md:text-5xl font-serif tracking-tight italic">
            "In a world of deepfakes, <br/> trust the math."
          </h2>
          <div className="flex flex-wrap gap-6 justify-center">
            <Link
              href="/signup"
              className="px-10 py-4 bg-[#D4AF37] text-[#020617] font-bold text-xs tracking-[0.2em] uppercase rounded-full hover:bg-[#F1D279] transition-all"
            >
              Initialize Vault
            </Link>
            <Link
              href="/login"
              className="px-10 py-4 border border-white/10 text-[#F8FAFC] font-bold text-xs tracking-[0.2em] uppercase rounded-full hover:border-[#D4AF37] transition-all"
            >
              Access Portal
            </Link>
          </div>
        </div>
      </div>

      {/* Footer Links - Minimalist */}
      <footer className="bg-[#020617]">
        <div className="max-w-7xl mx-auto px-8 md:px-16 py-16 flex flex-col md:flex-row items-center justify-between gap-10 border-t border-white/5">
          <div className="flex flex-col gap-2">
            <span className="text-lg font-serif font-bold text-[#D4AF37] tracking-[0.2em] uppercase">
              Objection
            </span>
            <span className="text-[10px] text-[#F8FAFC]/20 tracking-[0.1em]">
              Precision Legal Infrastructure
            </span>
          </div>
          
          <div className="flex items-center gap-10 text-[10px] font-bold tracking-[0.2em] uppercase text-[#F8FAFC]/40">
            {["Verify", "Policies", "Portal"].map(item => (
              <Link key={item} href={`/${item === "Portal" ? "login" : item.toLowerCase()}`} className="hover:text-[#D4AF37] transition-colors">
                {item}
              </Link>
            ))}
          </div>

          <div className="text-[10px] text-[#F8FAFC]/20 tracking-[0.1em]">
            &copy; {new Date().getFullYear()} OBJECTION.AI — IMMUTABLE JUSTICE.
          </div>
        </div>
      </footer>
    </section>
  );
}
