import Link from "next/link";
import { ShieldCheck, FileSearch, MessageSquare, Scale } from "lucide-react";

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

export default function HomeFooter() {
  return (
    <section className="relative bg-[#1a1410] text-[#e8e4df]">
      {/* Features */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-24">
        <div className="mb-16">
          <h2 className="text-3xl md:text-5xl font-serif mb-4">
            Why Objection.ai
          </h2>
          <p className="text-white/40 text-lg max-w-xl">
            The cryptographic foundation for modern justice.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <div key={f.title} className="flex flex-col gap-4">
                <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-white/5">
                  <Icon className="w-5 h-5 text-amber-600" />
                </div>
                <h3 className="text-lg font-medium">{f.title}</h3>
                <p className="text-sm text-white/40 leading-relaxed">
                  {f.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-[#231c15] border-y border-white/5">
        <div className="max-w-4xl mx-auto px-6 py-20 text-center flex flex-col items-center gap-8">
          <h2 className="text-2xl md:text-4xl font-serif italic text-white/90">
            &ldquo;In a world of deepfakes, trust the math.&rdquo;
          </h2>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/signup"
              className="px-8 py-3 bg-white text-[#1a1410] text-sm font-medium rounded-md hover:bg-white/90 transition-colors"
            >
              Get Started
            </Link>
            <Link
              href="/login"
              className="px-8 py-3 border border-white/15 text-white text-sm rounded-md hover:bg-white/5 transition-colors"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6 md:px-12 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <span className="text-lg font-serif text-white/80">Objection.ai</span>
          
          <div className="flex items-center gap-8 text-sm text-white/40">
            {["Verify", "Policies", "Sign In"].map(item => (
              <Link key={item} href={`/${item === "Sign In" ? "login" : item.toLowerCase()}`} className="hover:text-white transition-colors">
                {item}
              </Link>
            ))}
          </div>

          <div className="text-xs text-white/20">
            &copy; {new Date().getFullYear()} Objection.ai
          </div>
        </div>
      </footer>
    </section>
  );
}
