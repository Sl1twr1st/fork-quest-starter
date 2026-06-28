"use client";

import ForkQuestEngine from "@/components/ForkQuestEngine";
import type { ForkQuestConfig, ShareContext } from "@/lib/fork-quest-types";

const config: ForkQuestConfig = {
  mode: "fork",

  title: "Kawan Ber?",
  subtitle:
    "Masukin satu rasa yang lagi ganggu. Kita urai pelan-pelan lewat 5 pertanyaan.",
  accentColor: "#6366f1",
  accentGradient: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
  bgGradient: "linear-gradient(180deg, #fafafa 0%, #f5f3ff 100%)",
  cardBorderColor: "#d4d4d8",
  progressDotColor: "#6366f1",
  finalBossDotColor: "#6366f1",
  levelHeaderBg: "#ffffff",
  logoBubbleColor: "#6366f1",
  logoLabel: "Kawan Ber?",

  entry: {
    type: "direct-input",
    label: "Atau pilih yang umum:",
    placeholder: "Misal: gua capek, gua takut gagal, gua bingung...",
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
      name: "Pertanyaan 1",
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
      name: "Pertanyaan 2",
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
      name: "Pertanyaan 3",
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
      name: "Pertanyaan 4",
      description: "Hadapi bagian yang lo sembunyiin",
      forks: {
        default: [
          "Apa yang paling gua takutin tentang jadi versi terbaik gua?",
          "Siapa yang gua kecewain kalau gua berhenti jadi korban?",
          "Bagian mana dari suffering gua yang sebenernya gua enjoy?",
        ],
      },
    },
    {
      name: "Pertanyaan 5",
      description: "Pertanyaan terakhir",
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

  completionTitle: "Ini yang Kawan Bertanya tangkap",
  completionMessage:
    "Lo udah jalan dari keluhan awal sampai nemu pola yang lebih dalam.",
  completionEmoji: "🪞",
  finalQuote: "",

  generateShareText: (ctx: ShareContext) => {
    const url = "https://fork-quest.com";
    let text = `🪞 Kawan Bertanya\n\nGua mulai dari "${ctx.entryValue}" dan ngobrol 5 pertanyaan makin dalem:\n\n`;
    ctx.steps.forEach((s) => {
      text += `${s.question}\n`;
      if (s.answer) text += `↳ ${s.answer}\n`;
      text += `\n`;
    });
    if (ctx.finalAnswer) text += `Jawaban terakhir: ${ctx.finalAnswer}\n\n`;
    text += `Coba sendiri: ${url}\n\n#KawanBertanya`;
    return text;
  },

  generateTwitterText: (ctx: ShareContext) => {
    const url = "https://fork-quest.com";
    let text = `🪞 Ngobrol sama Kawan Bertanya. Mulai dari "${ctx.entryValue}" — ternyata dalem.\n\n`;
    text += `${url}\n#KawanBertanya`;
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
