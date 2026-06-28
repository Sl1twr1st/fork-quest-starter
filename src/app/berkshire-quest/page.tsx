"use client";

import ForkQuestEngine from "@/components/ForkQuestEngine";
import type { ForkQuestConfig, ShareContext } from "@/lib/fork-quest-types";

const config: ForkQuestConfig = {
  mode: "fork",

  title: "🏗️ Dalam Proses Investasi,\nBeranikah Kamu:",
  subtitle:
    'Mempertanyakan apakah "value investing" cuma cara sophisticated untuk menunda rasa takut?\nMengakui privilege di balik semua "moat" yang kamu banggakan?\nMelepas identitas sebagai "investor pintar" demi jadi manusia yang lebih sadar?\n---\n"Terlalu banyak angka, terlalu sedikit kesadaran."',
  accentColor: "#059669",
  accentGradient: "linear-gradient(135deg, #10b981 0%, #047857 100%)",
  bgGradient:
    "linear-gradient(135deg, #d1fae5 0%, #ffffff 50%, #fef3c7 100%)",
  cardBorderColor: "#10b981",
  progressDotColor:
    "linear-gradient(135deg, #10b981 0%, #f59e0b 100%)",
  finalBossDotColor: "#dc2626",
  levelHeaderBg: "linear-gradient(135deg, #d1fae5 0%, #fef3c7 100%)",
  logoBubbleColor: "#059669",
  logoLabel: 'INVESTASI SEBAGAI "PERCAKAPAN"',

  entry: {
    type: "theme-grid",
    label: "Pilih aspek investasi yang berani kamu pertanyakan:",
    themes: [
      "Value vs Growth Identity",
      "Portfolio & Self-Worth Anxiety",
      "Patience vs Fear Psychology",
      "Wealth & Legacy Questions",
      "Market Crashes & Ego Defense",
      "Buffett Worship Syndrome",
      "Moat vs Privilege Confusion",
      "Investment Philosophy Crisis",
    ],
  },

  levels: [
    {
      name: "💰 Level 1: Surface Kapitalisme",
      description: "Mulai mempertanyakan surface-level investment beliefs",
      forks: {
        "Value vs Growth Identity": [
          "Kenapa lo percaya harga naik itu berarti lo makin pintar?",
          "Apa perbedaan antara sabar dan takut jual rugi?",
          "Lo beli saham karena value atau karena FOMO ke Buffett?",
        ],
        "Portfolio & Self-Worth Anxiety": [
          "Kenapa net worth lo jadi parameter kebahagiaan?",
          "Berapa persen identitas lo yang bergantung sama portfolio performance?",
          "Lo stress karena rugi atau karena takut dianggap bodoh?",
        ],
        "Patience vs Fear Psychology": [
          "Lo 'patient' investor atau cuma takut realize loss?",
          "Apa bedanya sabar dengan procrastination dalam investasi?",
          "Kenapa lo bisa sabar sama saham tapi gak sabar sama traffic?",
        ],
        "Wealth & Legacy Questions": [
          "Lo pengen kaya untuk siapa sebenernya?",
          "Apa yang bakal lo ceritain ke anak cucu tentang cara lo dapet duit?",
          "Kenapa lo butuh financial freedom tapi takut tanggung jawab freedom itu sendiri?",
        ],
        default: [
          "Kenapa lo percaya harga naik itu berarti lo makin pintar?",
          "Apa perbedaan antara sabar dan takut jual rugi?",
          "Lo investasi atau lo gambling dengan teori yang lebih sophisticated?",
        ],
      },
    },
    {
      name: "📈 Level 2: Pattern of Value",
      description: "Liat pola investasi yang kita ulang tanpa sadar",
      forks: {
        default: [
          "Apa yang lo bela saat terus beli saham 'blue chip'?",
          "Lo sabar karena ngerti, atau karena bingung mau ngapain?",
          "Pattern investasi lo mencerminkan pattern hidup lo yang mana?",
        ],
      },
    },
    {
      name: "🎯 Level 3: Identity as Investor",
      description: "Gali identitas sebagai investor",
      forks: {
        default: [
          "Siapa lo tanpa portfolio lo?",
          "Apa identitas yang lo bentuk dari return 15% setahun?",
          "Kenapa lo butuh validasi dari market untuk merasa pintar?",
        ],
      },
    },
    {
      name: "🌑 Level 4: Shadow of Wealth",
      description: "Face the shadow side of wealth accumulation",
      forks: {
        default: [
          "Bagian mana dari kapitalisme yang sebenernya lo nikmati tapi lo gak akui?",
          "Apa yang lo sebut 'moat' sebenernya cuma privilege?",
          "Berapa banyak 'financial wisdom' lo yang sebenernya luck disguised as skill?",
        ],
      },
    },
    {
      name: "💀 Level 5: FINAL BOSS Buffettian Consciousness",
      description: "Pertanyaan terakhir tentang makna sejati value investing",
      forks: {
        default: [
          "Kalau semua strategi lo cuma cara menunda rasa takut, apa arti value investing buat hidupmu?",
          "Apa yang akan lo wariskan kalau semua saham lo jadi nol?",
          "Siapa Warren Buffett tanpa compound interest - dan siapa lo tanpa mimpi jadi dia?",
        ],
      },
    },
  ],

  levelDescriptions: [
    "Mulai mempertanyakan surface-level investment beliefs",
    "Liat pola investasi yang kita ulang tanpa sadar",
    "Gali identitas sebagai investor",
    "Face the shadow side of wealth accumulation",
    "Pertanyaan terakhir tentang makna sejati value investing",
  ],

  completionTitle: "BERKSHIRE QUEST COMPLETED!",
  completionMessage:
    "Lo udah journey dari surface kapitalisme sampai Buffettian consciousness. Sekarang lo bukan cuma investor—tapi conscious steward of capital.",
  completionEmoji: "🏆🏗️",
  finalQuote:
    '"Investor bukan hanya jadi pemilih saham—tapi pemilik tanggung jawab identitas."',

  generateShareText: (ctx: ShareContext) => {
    const url = "https://berkshirequest.com";
    let text = `🏗️ BERKSHIRE FORK QUEST COMPLETED! 💼\n\nGua baru aja journey 5 levels deep tentang investasi dari surface kapitalisme sampai Buffettian consciousness:\n\n`;
    ctx.steps.forEach((s, i) => {
      text += `L${i + 1}: ${s.question}\n`;
      if (s.answer) text += `↳ ${s.answer}\n`;
      text += `\n`;
    });
    if (ctx.finalAnswer)
      text += `💀 FINAL BOSS ANSWER:\n${ctx.finalAnswer}\n\n`;
    text += `"Investor bukan hanya jadi pemilih saham—tapi pemilik tanggung jawab identitas."\n\n`;
    text += `Coba sendiri di: ${url}\n\n#BerkshireQuest #ValueInvesting #InvestorConsciousness`;
    return text;
  },

  generateTwitterText: (ctx: ShareContext) => {
    const url = "https://berkshirequest.com";
    const count = ctx.steps.length;
    let text = `🏗️ Completed ${count}-level investor consciousness journey!\n\n`;
    const last = ctx.steps[ctx.steps.length - 1];
    if (last) {
      const shortQ =
        last.question.length > 80
          ? last.question.substring(0, 77) + "..."
          : last.question;
      const shortA =
        last.answer && last.answer.length > 60
          ? last.answer.substring(0, 57) + "..."
          : last.answer;
      text += `Final: "${shortQ}"\n`;
      if (shortA) text += `↳ ${shortA}\n\n`;
    }
    text += `${url}\n#BerkshireQuest #ValueInvesting`;
    if (text.length > 280) {
      const excess = text.length - 277;
      const urlIdx = text.indexOf(url);
      text =
        text.substring(0, urlIdx - excess - 3) +
        "...\n" +
        text.substring(urlIdx);
    }
    return text;
  },

  backToUrl: "/",
};

export default function BerkshireQuestPage() {
  return <ForkQuestEngine config={config} />;
}
