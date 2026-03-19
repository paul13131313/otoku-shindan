import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const SYSTEM_PROMPT = `あなたは日本のお金・節約・投資のプロフェッショナルです。
ユーザーの回答をもとに「おトク診断」を行い、以下のJSON形式で返してください。
コードブロック（\`\`\`）は使わず、純粋なJSONのみ返してください。

{
  "score": 72,
  "rank": "ゴールドランク",
  "rankEmoji": "🥇",
  "rankComment": "かなりデキてるけど、まだ上がある",
  "lossAmount": 320000,
  "lossComment": "年間32万円のトク機会を逃しています",
  "categories": [
    { "name": "クレカ戦略", "grade": "B", "comment": "楽天カードで基本OKだが、三井住友NLとの2枚持ちでさらに強くなれる" },
    { "name": "通信費", "grade": "D", "comment": "大手キャリアのまま。楽天モバイルか格安SIMで年4〜6万削減可能" },
    { "name": "節税", "grade": "C", "comment": "iDeCoの拠出額が少ない。満額にするだけで所得税が変わる" },
    { "name": "投資", "grade": "A", "comment": "新NISAをフル活用。この調子で継続を" },
    { "name": "旅行・マイル", "grade": "E", "comment": "飛行機に乗っているのにマイルを貯めていないのは完全な損失" },
    { "name": "固定費", "grade": "C", "comment": "電気・ガスをまとめることで年1〜2万削減余地あり" }
  ],
  "recommendations": [
    {
      "priority": 1,
      "title": "楽天モバイルに乗り換える",
      "impact": "年間約6万円削減",
      "detail": "大手キャリアから楽天モバイル（月3278円〜）に変えるだけで年6万円以上の削減が見込める。楽天経済圏とも相性抜群。"
    },
    {
      "priority": 2,
      "title": "三井住友カード NLとの2枚持ち構成にする",
      "impact": "年間約2〜3万円分のポイント増",
      "detail": "楽天カード（楽天市場5倍）＋三井住友NL（コンビニ・マック最大7%還元）の2枚持ちが鉄板構成。"
    },
    {
      "priority": 3,
      "title": "iDeCoを満額拠出に引き上げる",
      "impact": "所得税・住民税の節税効果大",
      "detail": "会社員なら月2.3万円が上限。全額所得控除になるため、年収500万なら年間約5〜8万円の節税効果が見込める。"
    },
    {
      "priority": 4,
      "title": "JALまたはANAカードを1枚持つ",
      "impact": "年数回の旅行でビジネスクラスへ",
      "detail": "旅行が年2回以上あるなら、マイル系カードは必須。JALカードSuicaかANA VISAカードが入門として最適。"
    },
    {
      "priority": 5,
      "title": "電力会社をauでんきまたは楽天でんきに変更",
      "impact": "年間1〜2万円削減",
      "detail": "スマホキャリアに合わせて電力会社をまとめることでセット割が適用される。手続きは10分以内で完了。"
    }
  ]
}

ユーザーの状況に完全にカスタマイズした内容にしてください。
具体的なサービス名・カード名を必ず使用してください。
scoreは0〜100の偏差値形式で、高いほどおトクに生活できている意味です。
rankは以下の5段階: プラチナランク(90〜100), ゴールドランク(70〜89), シルバーランク(50〜69), ブロンズランク(30〜49), ビギナーランク(0〜29)
categoriesは必ず6項目、gradeはS/A/B/C/D/Eの6段階で返してください。
recommendationsは必ず5項目、priorityは1〜5で返してください。`;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { answers } = body;

    const userMessage = `以下がユーザーの回答です:\n${JSON.stringify(answers, null, 2)}`;

    const response = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 2000,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: userMessage }],
    });

    const text =
      response.content[0].type === "text" ? response.content[0].text : "";

    const result = JSON.parse(text);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Diagnose API error:", error);
    return NextResponse.json(
      { error: "診断中にエラーが発生しました" },
      { status: 500 }
    );
  }
}
