"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { getActiveQuestions } from "@/lib/questions";
import { KNOWLEDGE_VERSION } from "@/lib/knowledgeVersion";

export default function ShindanPage() {
  const router = useRouter();
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [slideDirection, setSlideDirection] = useState<"enter" | "exit">("enter");

  const activeQuestions = useMemo(() => getActiveQuestions(answers), [answers]);
  const currentQuestion = activeQuestions[currentStep];
  const totalSteps = activeQuestions.length;
  const progress = ((currentStep + 1) / totalSteps) * 100;

  const handleChoice = async (choice: string) => {
    const newAnswers = { ...answers, [currentQuestion.id]: choice };
    setAnswers(newAnswers);

    const nextActiveQuestions = getActiveQuestions(newAnswers);

    if (currentStep >= nextActiveQuestions.length - 1) {
      setIsLoading(true);
      try {
        const res = await fetch("/api/diagnose", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            answers: newAnswers,
            knowledgeVersion: KNOWLEDGE_VERSION.version,
          }),
        });

        if (!res.ok) throw new Error("API error");

        const result = await res.json();
        localStorage.setItem("otokuResult", JSON.stringify(result));
        router.push("/result");
      } catch {
        setIsLoading(false);
        alert("診断中にエラーが発生しました。もう一度お試しください。");
      }
      return;
    }

    setSlideDirection("exit");
    setTimeout(() => {
      setCurrentStep((prev) => prev + 1);
      setSlideDirection("enter");
    }, 200);
  };

  const handleBack = () => {
    if (currentStep === 0) return;
    setSlideDirection("exit");
    setTimeout(() => {
      setCurrentStep((prev) => prev - 1);
      setSlideDirection("enter");
    }, 200);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4">
        <div className="spinner mb-6" />
        <p className="text-lg text-[var(--gold)] font-bold mb-2">
          AIがあなたのお金の状況を分析中...
        </p>
        <p className="text-sm text-[var(--text-dim)]">
          最適なアドバイスを生成しています
        </p>
      </div>
    );
  }

  if (!currentQuestion) return null;

  return (
    <div className="min-h-screen flex flex-col px-4 py-8 max-w-lg mx-auto">
      {/* プログレスバー */}
      <div className="mb-2">
        <div className="flex justify-between text-xs text-[var(--text-dim)] mb-1">
          <span>
            {currentQuestion.chapter}: {currentQuestion.chapterTitle}
          </span>
          <span>
            {currentStep + 1} / {totalSteps}
          </span>
        </div>
        <div className="progress-bar-track">
          <div
            className="progress-bar-fill"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* 質問エリア */}
      <div className="flex-1 flex flex-col justify-center">
        <div
          key={currentQuestion.id}
          className={`transition-all duration-300 ${
            slideDirection === "enter"
              ? "opacity-100 translate-x-0"
              : "opacity-0 translate-x-8"
          }`}
        >
          <p className="text-xs text-[var(--gold-dim)] tracking-wider uppercase mb-2">
            {currentQuestion.id.toUpperCase()}
          </p>
          <h2 className="text-xl sm:text-2xl font-bold mb-8 leading-relaxed">
            {currentQuestion.text}
          </h2>

          <div className="flex flex-col gap-3">
            {currentQuestion.choices.map((choice) => (
              <button
                key={choice}
                className={`choice-btn ${
                  answers[currentQuestion.id] === choice ? "selected" : ""
                }`}
                onClick={() => handleChoice(choice)}
              >
                {choice}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 戻るボタン */}
      <div className="mt-8">
        {currentStep > 0 && (
          <button
            onClick={handleBack}
            className="text-sm text-[var(--text-dim)] hover:text-[var(--gold)] transition-colors"
          >
            ← 前の質問に戻る
          </button>
        )}
      </div>
    </div>
  );
}
