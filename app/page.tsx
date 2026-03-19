import Link from "next/link";
import { KNOWLEDGE_VERSION } from "@/lib/knowledgeVersion";

function Particles() {
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 6}s`,
    size: `${2 + Math.random() * 4}px`,
  }));

  return (
    <div className="particles-bg">
      {particles.map((p) => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: p.left,
            animationDelay: p.delay,
            width: p.size,
            height: p.size,
          }}
        />
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4">
      <Particles />

      <main className="relative z-10 text-center max-w-2xl mx-auto">
        <div className="mb-6">
          <span className="inline-block text-sm tracking-widest text-[var(--gold-dim)] uppercase mb-4">
            Ultimate Otoku Diagnosis
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black leading-tight mb-6 gold-glow" style={{ color: "var(--gold)" }}>
          あなたは年間いくら、
          <br />
          損してますか？
        </h1>

        <p className="text-base sm:text-lg text-[var(--text-dim)] mb-10 leading-relaxed">
          クレカ・投資・節税・通信費・マイル。
          <br />
          15の質問で、おトクの取りこぼしを完全診断。
        </p>

        <Link
          href="/shindan"
          className="inline-block px-10 py-4 text-lg font-bold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(245,200,66,0.3)]"
          style={{
            background: "linear-gradient(135deg, #f5c842, #ffd700)",
            color: "#0a0a0f",
          }}
        >
          診断スタート（無料・2分）
        </Link>

        <p className="mt-12 text-xs text-[var(--text-dim)]">
          情報バージョン: {KNOWLEDGE_VERSION.version}（{KNOWLEDGE_VERSION.updatedAt}更新）
          <br />
          ※制度改正・サービス変更により内容が変わる場合があります
        </p>
      </main>
    </div>
  );
}
