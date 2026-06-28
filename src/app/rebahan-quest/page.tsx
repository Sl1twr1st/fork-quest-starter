"use client";

import ForkQuestEngine from "@/components/ForkQuestEngine";
import type { LinearQuestConfig, ShareContext } from "@/lib/fork-quest-types";

const config: LinearQuestConfig = {
  mode: "linear",

  title: "🌀 Fork Quest: Versi Rebahan",
  subtitle:
    'Ngobrol santai rebahan buat nyadar pelan-pelan "bener gak gua emang begini?"',
  accentColor: "#92400e",
  accentGradient:
    "linear-gradient(135deg, #f59e0b 0%, #d97706 50%, #92400e 100%)",
  bgGradient:
    "linear-gradient(135deg, #fef3c7 0%, #fed7aa 50%, #fbbf24 100%)",
  cardBorderColor: "#f59e0b",
  progressDotColor: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
  levelHeaderBg: "linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)",
  logoBubbleColor: "#f59e0b",
  logoLabel: 'REBAHAN SEBAGAI "PERCAKAPAN"',

  levels: [
    {
      name: "Pertanyaan 1",
      description: "Mulai dari yang simple dulu",
      emoji: "🛋️",
      question:
        "Kalau lo lagi rebahan, hal apa sih yang suka muter di kepala lo?",
      placeholder: "Misal: Kenapa hidup gue gini-gini aja ya...",
    },
    {
      name: "Pertanyaan 2",
      description: "Apa yang lo sebenernya mau?",
      emoji: "💭",
      question:
        "Kalau hidup lo gitu-gitu aja, sebenernya lo ngarepnya kayak apa sih?",
      placeholder: "Misal: Gue pengen hidup yang lebih santai tapi cukup.",
    },
    {
      name: "Pertanyaan 3",
      description: "Versi diri yang tersembunyi",
      emoji: "🎭",
      question:
        "Apa versi lo yang sebenernya pengen ngomong tapi belum dikasih panggung?",
      placeholder: "Misal: Gue pengen santai tapi takut dibilang pemalas.",
    },
    {
      name: "Pertanyaan 4",
      description: "Guilty pleasure yang lo sembunyiin",
      emoji: "🤫",
      question:
        "Apa hal yang lo nikmatin diam-diam, tapi gak pernah lo akui ke orang lain?",
      placeholder: "Misal: Gue suka drama.",
    },
    {
      name: "Pertanyaan 5",
      description: "Suara yang hilang dalam hiruk pikuk",
      emoji: "👶",
      question:
        "Kalau semua suara dalam diri lo matiin, suara siapa yang sebenernya lo kangenin?",
      placeholder: "Misal: Suara gue sendiri waktu kecil.",
    },
  ],

  completionTitle: "Ngobrol Selesai!",
  completionMessage:
    "Lo udah ngobrol jujur sama diri lo sendiri. Gokil! 🔥",
  completionEmoji: "🏁",
  finalQuote:
    '"Ngobrol sambil rebahan tapi bisa nyadar pelan-pelan"',

  generateShareText: (ctx: ShareContext) => {
    const url = "https://fork-quest.com";
    let text = `☕ FORK QUEST WARUNG KOPI COMPLETED! ☕\n\nGua baru aja ngobrol santai sama diri sendiri dan nyadar pelan-pelan:\n\n`;
    ctx.steps.forEach((s) => {
      text += `${s.question}\n`;
      if (s.answer) text += `↳ ${s.answer}\n`;
      text += `\n`;
    });
    text += `"Ngobrol santai tapi bisa bikin diri lo nyadar pelan-pelan "bener gak gua emang ini?"\n\n`;
    text += `Coba sendiri di: ${url}\n\n#ForkQuestWarungKopi #NgobrolSantai #SelfAwareness`;
    return text;
  },

  generateTwitterText: (ctx: ShareContext) => {
    const url = "https://fork-quest.com";
    let text = `☕ Just completed Fork Quest Warung Kopi! Ngobrol santai sama diri sendiri ternyata bisa nyadar banyak hal.\n\n`;
    const last = ctx.steps[ctx.steps.length - 1];
    if (last?.answer) {
      const s =
        last.answer.length > 50
          ? last.answer.substring(0, 50) + "..."
          : last.answer;
      text += `💭 Insight terakhir: "${s}"\n\n`;
    }
    text += `${url}\n#ForkQuestWarungKopi #NgobrolSantai`;
    return text;
  },

  backToUrl: "/",
};

export default function RebahanQuestPage() {
  return <ForkQuestEngine config={config} />;
}
