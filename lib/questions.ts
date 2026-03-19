export interface Question {
  id: string;
  chapter: string;
  chapterTitle: string;
  text: string;
  choices: string[];
  skipIf?: (answers: Record<string, string>) => boolean;
}

export const questions: Question[] = [
  // CHAPTER 1: あなたのキホン（Q1〜Q4）
  {
    id: "q1",
    chapter: "CHAPTER 1",
    chapterTitle: "あなたのキホン",
    text: "就労形態は？",
    choices: [
      "会社員",
      "フリーランス・個人事業主",
      "経営者・役員",
      "それ以外（学生・主婦など）",
    ],
  },
  {
    id: "q2",
    chapter: "CHAPTER 1",
    chapterTitle: "あなたのキホン",
    text: "年収帯は？（世帯収入）",
    choices: ["〜400万", "400〜700万", "700〜1000万", "1000万〜"],
  },
  {
    id: "q3",
    chapter: "CHAPTER 1",
    chapterTitle: "あなたのキホン",
    text: "家族構成は？",
    choices: ["独身", "夫婦のみ", "子あり"],
  },
  {
    id: "q4",
    chapter: "CHAPTER 1",
    chapterTitle: "あなたのキホン",
    text: "住まいの家賃 or ローン（月額）は？",
    choices: [
      "なし（実家・社宅）",
      "〜8万円",
      "8〜15万円",
      "15万円〜",
    ],
  },
  // CHAPTER 2: お金の使い方（Q5〜Q8）
  {
    id: "q5",
    chapter: "CHAPTER 2",
    chapterTitle: "お金の使い方",
    text: "メインのクレカは？（複数の場合は最もよく使うもの）",
    choices: [
      "楽天カード",
      "三井住友カード（NL含む）",
      "PayPayカード",
      "その他・持っていない",
    ],
  },
  {
    id: "q6",
    chapter: "CHAPTER 2",
    chapterTitle: "お金の使い方",
    text: "クレカの支払い方法は？",
    choices: ["常に一括払い", "たまにリボ・分割を使う"],
  },
  {
    id: "q7",
    chapter: "CHAPTER 2",
    chapterTitle: "お金の使い方",
    text: "スマホキャリアは？",
    choices: [
      "docomo",
      "au",
      "SoftBank",
      "楽天モバイル・格安SIM",
    ],
  },
  {
    id: "q8",
    chapter: "CHAPTER 2",
    chapterTitle: "お金の使い方",
    text: "電気・ガス・ネット回線は？",
    choices: [
      "すべてバラバラ（別会社）",
      "一部セット割を使っている",
      "すべてまとめている",
    ],
  },
  // CHAPTER 3: 投資・節税（Q9〜Q12）
  {
    id: "q9",
    chapter: "CHAPTER 3",
    chapterTitle: "投資・節税",
    text: "iDeCoは？",
    choices: [
      "満額拠出中",
      "加入しているが少額",
      "やっていない",
    ],
    skipIf: (answers) => answers.q1 === "それ以外（学生・主婦など）",
  },
  {
    id: "q10",
    chapter: "CHAPTER 3",
    chapterTitle: "投資・節税",
    text: "NISAは？",
    choices: [
      "新NISA成長投資枠＋積立をフル活用",
      "積立だけやってる",
      "やっていない",
    ],
    skipIf: (answers) => answers.q1 === "それ以外（学生・主婦など）",
  },
  {
    id: "q11",
    chapter: "CHAPTER 3",
    chapterTitle: "投資・節税",
    text: "ふるさと納税は？",
    choices: [
      "毎年やっている（上限近く）",
      "たまにやる",
      "やっていない",
    ],
    skipIf: (answers) => answers.q1 === "それ以外（学生・主婦など）",
  },
  {
    id: "q12",
    chapter: "CHAPTER 3",
    chapterTitle: "投資・節税",
    text: "貯蓄型・終身保険に入っている？",
    choices: ["入っている", "掛け捨てのみ", "ほぼ未加入"],
  },
  // CHAPTER 4: ライフスタイル（Q13〜Q15）
  {
    id: "q13",
    chapter: "CHAPTER 4",
    chapterTitle: "ライフスタイル",
    text: "旅行の頻度は？（国内外合計）",
    choices: ["年1回以下", "年2〜4回", "年5回以上"],
  },
  {
    id: "q14",
    chapter: "CHAPTER 4",
    chapterTitle: "ライフスタイル",
    text: "飛行機を使うとき、マイルを貯めている？",
    choices: [
      "意識して貯めている",
      "乗るが気にしていない",
      "ほとんど乗らない",
    ],
  },
  {
    id: "q15",
    chapter: "CHAPTER 4",
    chapterTitle: "ライフスタイル",
    text: "ホテルやラウンジの会員権は？",
    choices: [
      "特定チェーンで上級会員",
      "プライオリティパスを持っている",
      "何も持っていない",
    ],
  },
];

export function getActiveQuestions(answers: Record<string, string>): Question[] {
  return questions.filter((q) => !q.skipIf || !q.skipIf(answers));
}
