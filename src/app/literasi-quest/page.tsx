"use client";

import ForkQuestEngine from "@/components/ForkQuestEngine";
import type { ForkQuestConfig, ShareContext } from "@/lib/fork-quest-types";

const config: ForkQuestConfig = {
  mode: "fork",

  title: "📚 Literasi Sebagai Percakapan",
  subtitle:
    "Journey dari surface reading sampai beyond the page consciousness",
  accentColor: "#7c2d12",
  accentGradient:
    "linear-gradient(135deg, #ea580c 0%, #dc2626 50%, #7c2d12 100%)",
  bgGradient:
    "linear-gradient(135deg, #fed7aa 0%, #fef3c7 50%, #fecaca 100%)",
  cardBorderColor: "#ea580c",
  progressDotColor:
    "linear-gradient(135deg, #ea580c 0%, #dc2626 100%)",
  finalBossDotColor: "#dc2626",
  levelHeaderBg: "linear-gradient(135deg, #fed7aa 0%, #fecaca 100%)",
  logoBubbleColor: "#ea580c",
  logoLabel: 'LITERASI SEBAGAI "PERCAKAPAN"',

  entry: {
    type: "theme-grid",
    label: "Pilih tema literasi yang berani kamu tanyakan:",
    themes: [
      "Reading vs Understanding Identity",
      "Knowledge Hoarding Syndrome",
      "Intellectual Pride & Ego",
      "Book Collection Anxiety",
      "Wisdom vs Information Crisis",
      "Social Media vs Deep Reading",
      "Philosophy Quote Addiction",
      "Literary Gatekeeping Behavior",
    ],
  },

  levels: [
    {
      name: "📚 Level 1: Surface Literasi",
      description: "Mulai mikir ulang tentang hubungan lo dengan bacaan",
      forks: {
        "Reading vs Understanding Identity": [
          "Kenapa lo percaya orang yang baca banyak buku itu otomatis pintar?",
          "Kalau lo suka baca, kenapa lo gak suka ditanya balik?",
          "Lo baca buku buat ngerti atau buat dianggap ngerti?",
        ],
        "Knowledge Hoarding Syndrome": [
          "Kenapa lo koleksi buku lebih banyak dari yang lo baca?",
          "Apa bedanya pengetahuan yang lo simpan dengan yang lo praktekkan?",
          "Lo bangga karena tau banyak atau karena bisa ngomong banyak?",
        ],
        default: [
          "Kenapa lo percaya orang yang baca banyak buku itu otomatis pintar?",
          "Kalau lo suka baca, kenapa lo gak suka ditanya balik?",
          "Lo literasi atau lo cuma koleksi kata-kata buat terlihat pintar?",
        ],
      },
    },
    {
      name: "📖 Level 2: Pattern of Knowledge Consumption",
      description: "Liat pola konsumsi pengetahuan lo",
      forks: {
        default: [
          "Apa yang lo bela saat bilang 'baca buku penting banget'?",
          "Lo baca karena ingin paham… atau ingin dianggap paham?",
          "Pattern literasi lo mencerminkan kebutuhan apa sebenernya?",
        ],
      },
    },
    {
      name: "🤓 Level 3: Identity as a Reader",
      description: "Gali identitas lo sebagai pembaca",
      forks: {
        default: [
          "Siapa lo tanpa rak buku lo?",
          "Apa identitas yang lo bentuk dari jumlah buku yang lo 'udah baca'?",
          "Kenapa lo butuh validasi dari seberapa banyak lo baca?",
        ],
      },
    },
    {
      name: "📝 Level 4: Shadow of Knowing",
      description: "Hadapi bayangan di balik pengetahuan lo",
      forks: {
        default: [
          "Apa yang lo sembunyikan di balik kutipan filsuf favorit lo?",
          "Bagian mana dari literasi yang bikin lo merasa lebih tinggi dari yang lain?",
          "Berapa banyak 'wisdom' lo yang sebenernya cuma quotes yang lo hafalin?",
        ],
      },
    },
    {
      name: "💀 Level 5: FINAL BOSS Beyond the Page",
      description: "Pertanyaan pamungkas melampaui halaman",
      forks: {
        default: [
          "Kalau semua yang lo baca ternyata gak bikin lo berubah, kenapa lo masih baca?",
          "Apa yang akan lo wariskan kalau semua kata di dunia hilang besok?",
          "Siapa lo tanpa semua buku yang pernah lo baca - dan apakah lo takut ketemu dia?",
        ],
      },
    },
  ],

  levelDescriptions: [
    "Mulai mikir ulang tentang hubungan lo dengan bacaan",
    "Liat pola konsumsi pengetahuan lo",
    "Gali identitas lo sebagai pembaca",
    "Hadapi bayangan di balik pengetahuan lo",
    "Pertanyaan pamungkas melampaui halaman",
  ],

  completionTitle: "LITERASI QUEST COMPLETED!",
  completionMessage:
    "Lo udah journey dari surface reading sampai beyond the page consciousness.",
  completionEmoji: "🏆📚",
  finalQuote: '"Membaca Ulang, Menulis Ulang, Bertanya Ulang"',

  generateShareText: (ctx: ShareContext) => {
    const url = "https://fork-quest.com";
    let text = `📚 LITERASI FORK QUEST COMPLETED! 📚\n\nGua baru aja journey 5 levels deep tentang literasi dari surface reading sampai core consciousness:\n\n`;
    ctx.steps.forEach((s, i) => {
      text += `L${i + 1}: ${s.question}\n`;
      if (s.answer) text += `↳ ${s.answer}\n`;
      text += `\n`;
    });
    if (ctx.finalAnswer)
      text += `💀 FINAL BOSS ANSWER:\n${ctx.finalAnswer}\n\n`;
    text += `"Membaca Ulang, Menulis Ulang, Bertanya Ulang"\n\n`;
    text += `Coba sendiri di: ${url}\n\n#LiterasiSebagaiPercakapan #ForkQuest #Literasi`;
    return text;
  },

  generateTwitterText: (ctx: ShareContext) => {
    const url = "https://fork-quest.com";
    const count = ctx.steps.length;
    let text = `📚 Completed ${count}-level literasi consciousness journey!\n\n`;
    const last = ctx.steps[ctx.steps.length - 1];
    if (last) {
      const shortQ =
        last.question.length > 80
          ? last.question.substring(0, 77) + "..."
          : last.question;
      text += `Final: "${shortQ}"\n`;
    }
    text += `${url}\n#LiterasiSebagaiPercakapan #ForkQuest`;
    return text;
  },

  backToUrl: "/",
};

export default function LiterasiQuestPage() {
  return <ForkQuestEngine config={config} />;
}
