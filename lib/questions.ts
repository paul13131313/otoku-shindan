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

  // CHAPTER 2: クレジットカード（Q5〜Q8）
  {
    id: "q5",
    chapter: "CHAPTER 2",
    chapterTitle: "クレジットカード",
    text: "メインのクレカは？（最もよく使うもの）",
    choices: [
      "楽天カード",
      "三井住友カード（NL含む）",
      "PayPayカード",
      "その他・持っていない",
    ],
  },
  {
    id: "q5b",
    chapter: "CHAPTER 2",
    chapterTitle: "クレジットカード",
    text: "ゴールドカード以上のクレカを持っている？",
    choices: [
      "ゴールドカードを持っている",
      "プラチナ/ブラックカードを持っている",
      "一般カードのみ",
      "クレカを持っていない",
    ],
  },
  {
    id: "q5c",
    chapter: "CHAPTER 2",
    chapterTitle: "クレジットカード",
    text: "クレカの月間利用額は？（全カード合計）",
    choices: [
      "〜5万円",
      "5〜15万円",
      "15〜30万円",
      "30万円〜",
    ],
  },
  {
    id: "q6",
    chapter: "CHAPTER 2",
    chapterTitle: "クレジットカード",
    text: "クレカの支払い方法は？",
    choices: ["常に一括払い", "たまにリボ・分割を使う"],
  },

  // CHAPTER 3: 通信・固定費（Q7〜Q8）
  {
    id: "q7",
    chapter: "CHAPTER 3",
    chapterTitle: "通信・固定費",
    text: "スマホキャリアは？",
    choices: [
      "大手キャリア（docomo / au / SoftBank）",
      "サブブランド（ahamo / povo / LINEMO / UQ / Y!mobile）",
      "楽天モバイル",
      "格安SIM（mineo / IIJmio / 日本通信など）",
    ],
  },
  {
    id: "q8",
    chapter: "CHAPTER 3",
    chapterTitle: "通信・固定費",
    text: "電気・ガス・ネット回線は？",
    choices: [
      "すべてバラバラ（別会社）",
      "一部セット割を使っている",
      "すべてまとめている",
    ],
  },

  // CHAPTER 4: 投資・節税（Q9〜Q13）
  {
    id: "q9",
    chapter: "CHAPTER 4",
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
    chapter: "CHAPTER 4",
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
    chapter: "CHAPTER 4",
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
    id: "q11b",
    chapter: "CHAPTER 4",
    chapterTitle: "投資・節税",
    text: "小規模企業共済・経営セーフティ共済は？",
    choices: [
      "両方加入している",
      "どちらか一方に加入",
      "加入していない",
    ],
    skipIf: (answers) =>
      answers.q1 !== "フリーランス・個人事業主" && answers.q1 !== "経営者・役員",
  },
  {
    id: "q12",
    chapter: "CHAPTER 4",
    chapterTitle: "投資・節税",
    text: "保険はどうしている？",
    choices: [
      "貯蓄型・終身保険に入っている",
      "掛け捨て生命保険のみ",
      "医療保険のみ",
      "ほぼ未加入",
    ],
  },

  // CHAPTER 5: 旅行・マイル（Q13〜Q16）
  {
    id: "q13",
    chapter: "CHAPTER 5",
    chapterTitle: "旅行・マイル",
    text: "旅行の頻度は？（国内外合計）",
    choices: ["年1回以下", "年2〜4回", "年5回以上"],
  },
  {
    id: "q14",
    chapter: "CHAPTER 5",
    chapterTitle: "旅行・マイル",
    text: "マイル系カード（JAL/ANAカード等）を持っている？",
    choices: [
      "JALカードを持っている",
      "ANAカードを持っている",
      "その他のマイル系カードを持っている",
      "持っていない",
    ],
  },
  {
    id: "q14b",
    chapter: "CHAPTER 5",
    chapterTitle: "旅行・マイル",
    text: "飛行機を使うとき、マイルを意識している？",
    choices: [
      "航空券もカード決済もマイルを意識",
      "搭乗マイルだけ貯まっている",
      "特に意識していない",
      "ほとんど飛行機に乗らない",
    ],
  },
  {
    id: "q15",
    chapter: "CHAPTER 5",
    chapterTitle: "旅行・マイル",
    text: "ホテル系の特典は？",
    choices: [
      "マリオット/ヒルトン等の上級会員",
      "プライオリティパスを持っている",
      "ホテル系クレカを持っている",
      "特に何も持っていない",
    ],
  },
];

export function getActiveQuestions(answers: Record<string, string>): Question[] {
  return questions.filter((q) => !q.skipIf || !q.skipIf(answers));
}
