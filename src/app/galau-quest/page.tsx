"use client";

import ForkQuestEngine from "@/components/ForkQuestEngine";
import type { ForkQuestConfig, ShareContext } from "@/lib/fork-quest-types";

const config: ForkQuestConfig = {
  mode: "fork",

  title: "🌀 Personal Fork Quest: 5 Levels Deep",
  subtitle: "Journey dari keluhan surface sampai final boss consciousness",
  accentColor: "#7c3aed",
  accentGradient:
    "linear-gradient(135deg, #7c3aed 0%, #ec4899 50%, #ea580c 100%)",
  bgGradient:
    "linear-gradient(135deg, #f8fafc 0%, #f3e8ff 50%, #fed7aa 100%)",
  cardBorderColor: "#a855f7",
  progressDotColor: "linear-gradient(135deg, #a855f7 0%, #ec4899 100%)",
  finalBossDotColor: "#ef4444",
  levelHeaderBg: "linear-gradient(135deg, #e9d5ff 0%, #dbeafe 100%)",
  logoBubbleColor: "#7c3aed",
  logoLabel: 'GALAU SEBAGAI "PERCAKAPAN"',

  entry: {
    type: "direct-input",
    label: "Pilih keluhan umum:",
    placeholder: "Atau tulis keluhan lo sendiri...",
    presets: [
      "Gua bodoh",
      "Hidup susah",
      "Gua gak beruntung",
      "Gua selalu gagal",
      "Gua capek banget",
      "Gua sendiri terus",
    ],
  },

  levels: [
    {
      name: "🌱 Level 1: Surface Questions",
      description: "Mulai mikir ulang tentang keluhan lo",
      forks: {
        bodoh: [
          "Kenapa gua takut keliatan pinter?",
          "Siapa yang bilang gua bodoh pertama kali?",
          "Apa yang gua sebut 'bodoh' sebenernya?",
        ],
        susah: [
          "Apa yang gua sebut 'susah' sebenernya?",
          "Versi gua yang mana yang suka tantangan?",
          "Kenapa gua lebih suka cerita susah daripada cerita mudah?",
        ],
        beruntung: [
          "Versi gua yang mana yang percaya sama keberuntungan?",
          "Apa yang gua sebut 'beruntung' yang orang lain gak liat?",
          "Kenapa gua ngasih credit ke nasib, bukan ke diri sendiri?",
        ],
        gagal: [
          "Apa yang gua sebut 'gagal' yang sebenernya adalah proses?",
          "Versi gua yang mana yang takut sukses?",
          "Siapa yang ngajarin gua definisi 'gagal' ini?",
        ],
        default: [
          "Kenapa gua lebih suka cerita tentang ini daripada cari solusinya?",
          "Versi gua yang mana yang sebenernya bisa handle ini?",
          "Apa yang gua defend dengan merasa seperti ini?",
        ],
      },
    },
    {
      name: "🌿 Level 2: Pattern Recognition",
      description: "Liat pola-pola yang lo ulang terus",
      forks: {
        default: [
          "Apa yang gua bela dengan tetap bertanya tanpa action?",
          "Versi gua yang mana yang sebenernya udah tau jawabannya?",
          "Kenapa gua lebih suka explore masalah daripada solve masalah?",
        ],
      },
    },
    {
      name: "🌳 Level 3: Identity Core",
      description: "Gali sampai ke inti identitas lo",
      forks: {
        default: [
          "Siapa gua tanpa cerita victim yang gua pegang selama ini?",
          "Apa yang gua korbanin buat maintain identitas yang sekarang?",
          "Versi gua yang mana yang gua bunuh buat jadi versi yang sekarang?",
        ],
      },
    },
    {
      name: "🔥 Level 4: Shadow Work",
      description: "Face the shadow yang lo sembunyiin",
      forks: {
        default: [
          "Apa yang paling gua takutin tentang jadi versi terbaik gua?",
          "Siapa yang gua kecewain kalau gua berhenti jadi korban?",
          "Bagian mana dari suffering gua yang sebenernya gua enjoy?",
        ],
      },
    },
    {
      name: "💀 Level 5: FINAL BOSS",
      description: "Pertanyaan terakhir yang bakal ngubah segalanya",
      forks: {
        default: [
          "Kalau semua alasan lo selama ini cuma cerita, siapa lo sebenernya tanpa cerita itu?",
          "Apa yang terjadi kalau lo stop defending dan mulai becoming?",
          "Versi lo yang paling ditakutin untuk exist - kenapa lo takut jadi dia?",
        ],
      },
    },
  ],

  levelDescriptions: [
    "Mulai mikir ulang tentang keluhan lo",
    "Liat pola-pola yang lo ulang terus",
    "Gali sampai ke inti identitas lo",
    "Face the shadow yang lo sembunyiin",
    "Pertanyaan terakhir yang bakal ngubah segalanya",
  ],

  completionTitle: "PERJALANAN SELESAI!",
  completionMessage:
    "Lo udah jalan dari keluhan awal sampai nemu pola yang lebih dalam.",
  completionEmoji: "🏆",
  finalQuote: '"Satu menjadi banyak, untuk selalu mengingat satu"',

  generateShareText: (ctx: ShareContext) => {
    const url = "https://fork-quest.com";
    let text = `🌀 PERSONAL FORK QUEST COMPLETED! 🌀\n\nGua baru aja journey 5 levels deep dari surface complaint sampai core consciousness:\n\n`;
    ctx.steps.forEach((s, i) => {
      text += `L${i + 1}: ${s.question}\n`;
      if (s.answer) text += `↳ ${s.answer}\n`;
      text += `\n`;
    });
    if (ctx.finalAnswer)
      text += `💀 FINAL BOSS ANSWER:\n${ctx.finalAnswer}\n\n`;
    text += `"Satu menjadi banyak, untuk selalu mengingat satu"\n\n`;
    text += `Coba sendiri di: ${url}\n\n#PersonalForkQuest #Consciousness #SelfAwareness`;
    return text;
  },

  generateTwitterText: (ctx: ShareContext) => {
    const url = "https://fork-quest.com";
    let text = `🌀 Just completed Personal Fork Quest! Journey dari "${ctx.entryValue}" sampai core consciousness dalam 5 levels.\n\n`;
    if (ctx.finalAnswer) {
      const s =
        ctx.finalAnswer.length > 60
          ? ctx.finalAnswer.substring(0, 60) + "..."
          : ctx.finalAnswer;
      text += `💀 Final insight: "${s}"\n\n`;
    }
    text += `${url}\n#PersonalForkQuest #Consciousness`;
    return text;
  },

  // ── AI Kawan Bertanya ──
  aiMode: true,
  analyzeJourney: true,

  backToUrl: "/",
};

export default function GalauQuestPage() {
  return <ForkQuestEngine config={config} />;
}
