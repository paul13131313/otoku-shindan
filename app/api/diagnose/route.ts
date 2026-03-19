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
    { "name": "クレカ戦略", "grade": "B", "comment": "..." },
    { "name": "通信・固定費", "grade": "D", "comment": "..." },
    { "name": "節税", "grade": "C", "comment": "..." },
    { "name": "投資", "grade": "A", "comment": "..." },
    { "name": "旅行・マイル", "grade": "E", "comment": "..." },
    { "name": "保険", "grade": "C", "comment": "..." }
  ],
  "recommendations": [
    {
      "priority": 1,
      "title": "アクションのタイトル",
      "impact": "年間約○万円削減",
      "detail": "具体的な説明。なぜこれが効果的か、注意点は何か。",
      "caveat": "ただし○○の場合は不要"
    }
  ]
}

【絶対ルール】
1. ユーザーの回答に含まれる情報のみに基づいて判断すること。回答されていない項目を推測しないこと。
2. ユーザーが「持っている」「加入している」と回答したものを再度提案しないこと。
3. カードの複数枚持ちを提案する場合は、以下を必ず含めること:
   - 決済額が分散するデメリットの説明
   - 年間決済額に対して年会費の元が取れるかの損益分岐点
   - どの店・場面でどのカードを使うかの具体的な使い分け戦略
4. 各推奨アクションには "caveat"（注意点・すでにやっている場合の補足）を含めること。
5. 「年間○万円削減」のような効果額は、ユーザーの年収帯・利用額から現実的に計算すること。

【クレカ戦略の判断基準】
- ゴールドカード以上を持っている場合、一般カードへの乗り換えは提案しない
- 月間利用額が少ない場合（〜5万円）、年会費のかかるカードは提案しない
- マイル系カードとポイント系カードは役割が異なるため、共存は可能だが決済先の棲み分けを必ず説明すること
- マリオット系カード（SPGアメックス等）は宿泊特典が主目的であり、日常決済用ではないことを踏まえること

【節税の判断基準】
- 小規模企業共済に「加入済み」と回答した場合、加入を提案しない
- フリーランス/経営者でない場合は小規模企業共済を提案しない
- iDeCoの上限額は就労形態によって異なる（会社員2.3万/月、自営業6.8万/月）

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
      model: "claude-sonnet-4-20250514",
      max_tokens: 2500,
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
