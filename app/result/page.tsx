"use client";

import { useEffect, useState, useRef } from "react";
import { KNOWLEDGE_VERSION } from "@/lib/knowledgeVersion";

interface Category {
  name: string;
  grade: string;
  comment: string;
}

interface Recommendation {
  priority: number;
  title: string;
  impact: string;
  detail: string;
  caveat?: string;
}

interface DiagnosisResult {
  score: number;
  rank: string;
  rankEmoji: string;
  rankComment: string;
  lossAmount: number;
  lossComment: string;
  categories: Category[];
  recommendations: Recommendation[];
}

function CountUp({ target, duration = 2000 }: { target: number; duration?: number }) {
  const [value, setValue] = useState(0);
  const ref = useRef<number>(0);

  useEffect(() => {
    const startTime = Date.now();
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);
      setValue(current);
      if (progress < 1) {
        ref.current = requestAnimationFrame(animate);
      }
    };
    ref.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(ref.current);
  }, [target, duration]);

  return <>{value}</>;
}

function ShareButton({ score, rank }: { score: number; rank: string }) {
  const handleShare = () => {
    const text = encodeURIComponent(
      `私のおトク偏差値は${score}（${rank}）でした！あなたは？ #アルティメットおトク診断`
    );
    const url = encodeURIComponent(window.location.origin);
    window.open(
      `https://x.com/intent/tweet?text=${text}&url=${url}`,
      "_blank"
    );
  };

  return (
    <button
      onClick={handleShare}
      className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm transition-all hover:scale-105"
      style={{
        background: "linear-gradient(135deg, #1da1f2, #0d8bd9)",
        color: "#fff",
      }}
    >
      Xでシェア
    </button>
  );
}

export default function ResultPage() {
  const [result, setResult] = useState<DiagnosisResult | null>(null);
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const stored = localStorage.getItem("otokuResult");
    if (stored) {
      setResult(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    if (!result) return;
    const timers = [
      setTimeout(() => setPhase(1), 500),
      setTimeout(() => setPhase(2), 1200),
      setTimeout(() => setPhase(3), 2000),
      setTimeout(() => setPhase(4), 2800),
      setTimeout(() => setPhase(5), 3500),
    ];
    return () => timers.forEach(clearTimeout);
  }, [result]);

  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-[var(--text-dim)]">結果が見つかりません。診断を行ってください。</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-8 max-w-2xl mx-auto">
      {/* Phase 1: 診断完了 */}
      <div
        className={`text-center transition-all duration-700 ${
          phase >= 1 ? "opacity-100" : "opacity-0"
        }`}
      >
        <p className="text-sm tracking-widest text-[var(--gold-dim)] uppercase mb-2">
          Diagnosis Complete
        </p>
        <p className="text-lg text-[var(--text-dim)] mb-8">診断完了</p>
      </div>

      {/* Phase 2: ランク */}
      <div
        className={`text-center mb-8 transition-all duration-700 ${
          phase >= 2 ? "opacity-100 scale-100" : "opacity-0 scale-90"
        }`}
      >
        <p className="text-6xl mb-4">{result.rankEmoji}</p>
        <h1
          className="text-3xl sm:text-4xl font-black mb-2 shimmer-text"
        >
          {result.rank}
        </h1>
        <p className="text-[var(--text-dim)]">{result.rankComment}</p>
      </div>

      {/* Phase 3: スコア + 損失額 */}
      <div
        className={`grid grid-cols-2 gap-4 mb-10 transition-all duration-700 ${
          phase >= 3 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div
          className="rounded-2xl p-6 text-center"
          style={{ background: "var(--bg-card)", border: "1px solid #2a2a3e" }}
        >
          <p className="text-xs text-[var(--text-dim)] mb-1">おトク偏差値</p>
          <p className="text-4xl font-black" style={{ color: "var(--gold)" }}>
            <CountUp target={result.score} />
          </p>
        </div>
        <div
          className="rounded-2xl p-6 text-center"
          style={{ background: "var(--bg-card)", border: "1px solid #2a2a3e" }}
        >
          <p className="text-xs text-[var(--text-dim)] mb-1">年間の損失額</p>
          <p className="text-3xl font-black text-red-400">
            <CountUp target={Math.round(result.lossAmount / 10000)} />
            <span className="text-lg">万円</span>
          </p>
        </div>
      </div>

      {/* Phase 4: カテゴリ別グレード */}
      <div
        className={`mb-10 transition-all duration-700 ${
          phase >= 4 ? "opacity-100" : "opacity-0"
        }`}
      >
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
          <span style={{ color: "var(--gold)" }}>■</span>
          カテゴリ別評価
        </h2>
        <div className="flex flex-col gap-3">
          {result.categories.map((cat, i) => (
            <div
              key={cat.name}
              className="animate-slide-in flex items-start gap-3 rounded-xl p-4"
              style={{
                background: "var(--bg-card)",
                border: "1px solid #2a2a3e",
                animationDelay: `${i * 0.1}s`,
                opacity: 0,
                animationFillMode: "forwards",
              }}
            >
              <div className={`grade-badge grade-${cat.grade} flex-shrink-0`}>
                {cat.grade}
              </div>
              <div>
                <p className="font-bold text-sm mb-1">{cat.name}</p>
                <p className="text-xs text-[var(--text-dim)] leading-relaxed">
                  {cat.comment}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Phase 5: 推奨アクション */}
      <div
        className={`mb-10 transition-all duration-700 ${
          phase >= 5 ? "opacity-100" : "opacity-0"
        }`}
      >
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
          <span style={{ color: "var(--gold)" }}>■</span>
          おすすめアクション TOP5
        </h2>
        <div className="flex flex-col gap-4">
          {result.recommendations.map((rec) => (
            <div
              key={rec.priority}
              className="rounded-xl p-5 animate-fade-in-up"
              style={{
                background: "var(--bg-card)",
                border: "1px solid #2a2a3e",
                animationDelay: `${rec.priority * 0.15}s`,
                opacity: 0,
                animationFillMode: "forwards",
              }}
            >
              <div className="flex items-center gap-3 mb-2">
                <span
                  className="flex items-center justify-center w-7 h-7 rounded-full text-xs font-black"
                  style={{
                    background: "linear-gradient(135deg, #f5c842, #ffd700)",
                    color: "#0a0a0f",
                  }}
                >
                  {rec.priority}
                </span>
                <h3 className="font-bold text-sm">{rec.title}</h3>
              </div>
              <p
                className="text-xs font-bold mb-2 px-3 py-1 rounded-full inline-block"
                style={{
                  background: "rgba(245, 200, 66, 0.1)",
                  color: "var(--gold)",
                }}
              >
                {rec.impact}
              </p>
              <p className="text-xs text-[var(--text-dim)] leading-relaxed">
                {rec.detail}
              </p>
              {rec.caveat && (
                <p className="text-xs leading-relaxed mt-2 px-3 py-2 rounded-lg" style={{ background: "rgba(255,255,255,0.05)", color: "#aaa" }}>
                  ⚠ {rec.caveat}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* シェア + もう一度 */}
      <div
        className={`text-center mb-8 transition-all duration-700 ${
          phase >= 5 ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="flex flex-col items-center gap-4">
          <ShareButton score={result.score} rank={result.rank} />
          <a
            href="/shindan"
            className="text-sm text-[var(--text-dim)] hover:text-[var(--gold)] transition-colors"
          >
            もう一度診断する →
          </a>
        </div>
      </div>

      {/* フッター */}
      <footer className="text-center text-xs text-[var(--text-dim)] mt-10 pb-8">
        <p>
          情報バージョン: {KNOWLEDGE_VERSION.version}（{KNOWLEDGE_VERSION.updatedAt}更新）
        </p>
        <p>※制度改正・サービス変更により内容が変わる場合があります</p>
      </footer>
    </div>
  );
}
