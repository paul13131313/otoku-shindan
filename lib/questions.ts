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

  // CHAPTER 2: クレジットカード・決済（Q5〜Q6b）
  {
    id: "q5",
    chapter: "CHAPTER 2",
    chapterTitle: "クレジットカード・決済",
    text: "メインのクレカは？（最もよく使う1枚）",
    choices: [
      "楽天カード（一般）",
      "楽天ゴールド / 楽天プレミアム",
      "三井住友カードNL（一般）",
      "三井住友ゴールドNL",
      "三井住友プラチナプリファード",
      "JALカード / ANAカード",
      "PayPayカード",
      "JCBカードW",
      "その他のカード",
      "クレカを持っていない",
    ],
  },
  {
    id: "q5b",
    chapter: "CHAPTER 2",
    chapterTitle: "クレジットカード・決済",
    text: "サブカード（2枚目以降）は？（複数ある場合は最も使うもの）",
    choices: [
      "マリオットボンヴォイカード",
      "JALカード / ANAカード",
      "Amazon系 / ビックカメラ等の提携カード",
      "別ブランドのゴールド以上のカード",
      "特に持っていない / 1枚だけ",
    ],
    skipIf: (answers) => answers.q5 === "クレカを持っていない",
  },
  {
    id: "q5c",
    chapter: "CHAPTER 2",
    chapterTitle: "クレジットカード・決済",
    text: "クレカの月間利用額は？（全カード合計）",
    choices: [
      "〜5万円",
      "5〜15万円",
      "15〜30万円",
      "30万円〜",
    ],
    skipIf: (answers) => answers.q5 === "クレカを持っていない",
  },
  {
    id: "q5d",
    chapter: "CHAPTER 2",
    chapterTitle: "クレジットカード・決済",
    text: "QRコード決済は使っている？",
    choices: [
      "PayPayをよく使う",
      "楽天Payをよく使う",
      "複数のQR決済を使い分けている",
      "ほとんど使っていない",
    ],
  },
  {
    id: "q6",
    chapter: "CHAPTER 2",
    chapterTitle: "クレジットカード・決済",
    text: "クレカの支払い方法は？",
    choices: ["常に一括払い", "たまにリボ・分割を使う"],
    skipIf: (answers) => answers.q5 === "クレカを持っていない",
  },
  {
    id: "q6b",
    chapter: "CHAPTER 2",
    chapterTitle: "クレジットカード・決済",
    text: "ポイントの貯め先は意識している？",
    choices: [
      "楽天ポイントに集中している",
      "Vポイント（三井住友系）に集中している",
      "PayPayポイントに集中している",
      "マイル（JAL/ANA）に集中している",
      "特に意識していない / バラバラ",
    ],
  },

  // CHAPTER 3: 通信・固定費（Q7〜Q8b）
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
  {
    id: "q8b",
    chapter: "CHAPTER 3",
    chapterTitle: "通信・固定費",
    text: "サブスク（動画・音楽・クラウド等）に月いくら払っている？",
    choices: [
      "〜1,000円",
      "1,000〜3,000円",
      "3,000〜5,000円",
      "5,000円〜",
      "サブスクは使っていない",
    ],
  },

  // CHAPTER 4: 投資・節税（Q9〜Q12）
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
    text: "小規模企業共済は？",
    choices: [
      "満額（月7万円）拠出中",
      "加入しているが満額ではない",
      "加入していない",
    ],
    skipIf: (answers) =>
      answers.q1 !== "フリーランス・個人事業主" && answers.q1 !== "経営者・役員",
  },
  {
    id: "q11c",
    chapter: "CHAPTER 4",
    chapterTitle: "投資・節税",
    text: "経営セーフティ共済（倒産防止共済）は？",
    choices: [
      "満額（月20万円）拠出中",
      "加入しているが満額ではない",
      "加入していない",
    ],
    skipIf: (answers) =>
      answers.q1 !== "フリーランス・個人事業主" && answers.q1 !== "経営者・役員",
  },
  {
    id: "q11d",
    chapter: "CHAPTER 4",
    chapterTitle: "投資・節税",
    text: "確定申告の方法は？",
    choices: [
      "青色申告（65万円控除）",
      "青色申告（10万円控除 / 簡易簿記）",
      "白色申告",
      "税理士に丸投げ",
    ],
    skipIf: (answers) =>
      answers.q1 !== "フリーランス・個人事業主" && answers.q1 !== "経営者・役員",
  },
  {
    id: "q12",
    chapter: "CHAPTER 4",
    chapterTitle: "投資・節税",
    text: "生命保険の種類は？（医療保険は除く）",
    choices: [
      "貯蓄型・終身保険に入っている",
      "掛け捨て（定期）生命保険に入っている",
      "生命保険には入っていない",
    ],
  },

  // CHAPTER 5: 旅行・マイル（Q13〜Q15）
  {
    id: "q13",
    chapter: "CHAPTER 5",
    chapterTitle: "旅行・マイル",
    text: "旅行の頻度は？（国内外合計）",
    choices: ["年1回以下", "年2〜4回", "年5回以上"],
  },
  {
    id: "q13b",
    chapter: "CHAPTER 5",
    chapterTitle: "旅行・マイル",
    text: "旅行のスタイルは？",
    choices: [
      "とにかく安さ重視（LCC＋ビジネスホテル）",
      "コスパ重視（セール活用＋そこそこのホテル）",
      "快適さ重視（フルサービス航空＋高級ホテル）",
      "旅行にはあまり行かない",
    ],
    skipIf: (answers) => answers.q13 === "年1回以下",
  },
  {
    id: "q14",
    chapter: "CHAPTER 5",
    chapterTitle: "旅行・マイル",
    text: "飛行機はどの航空会社が多い？",
    choices: [
      "JAL・ANAなどフルサービスキャリア中心",
      "LCC中心（Peach・ジェットスター等）",
      "行き先や値段で使い分ける",
      "ほとんど飛行機に乗らない",
    ],
    skipIf: (answers) => answers.q13 === "年1回以下",
  },
  {
    id: "q15",
    chapter: "CHAPTER 5",
    chapterTitle: "旅行・マイル",
    text: "ホテルの予約方法は？",
    choices: [
      "マリオット/ヒルトン等の上級会員として直接予約",
      "楽天トラベル / じゃらんなどのポータル",
      "Booking.com / Expediaなどの海外系サイト",
      "特にこだわりなし / その都度比較",
    ],
    skipIf: (answers) => answers.q13 === "年1回以下",
  },
];

export function getActiveQuestions(answers: Record<string, string>): Question[] {
  return questions.filter((q) => !q.skipIf || !q.skipIf(answers));
}
