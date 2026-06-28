"use client";

import ForkQuestEngine from "@/components/ForkQuestEngine";
import type { ForkQuestConfig, ShareContext } from "@/lib/fork-quest-types";

const config: ForkQuestConfig = {
  mode: "fork",

  title: "🇮🇩 Setelah 80 Tahun Merdeka\nBeranikah Kamu:",
  subtitle:
    "Bertanya tanpa janji jawaban?\nMelakukan sesuatu tanpa jaminan hasil?\nMenghadapi bayangan diri tanpa narasi penyelamat?",
  accentColor: "#2563eb",
  accentGradient: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)",
  bgGradient:
    "linear-gradient(135deg, #dbeafe 0%, #ffffff 50%, #fecaca 100%)",
  cardBorderColor: "#3b82f6",
  progressDotColor:
    "linear-gradient(135deg, #3b82f6 0%, #dc2626 100%)",
  finalBossDotColor: "#dc2626",
  levelHeaderBg: "linear-gradient(135deg, #dbeafe 0%, #fecaca 100%)",
  logoBubbleColor: "#2563eb",
  logoLabel: 'INDONESIA SEBAGAI "PERCAKAPAN"',

  entry: {
    type: "theme-grid",
    label: "Pilih tema Indonesia yang berani kamu tanyakan:",
    themes: [
      "Kesadaran Diri & Identitas",
      "Demokrasi & Keberanian Bicara",
      "Tradisi, Rasa, & Budaya",
      "Ketimpangan & Kelas Sosial",
      "Nasionalisme & Refleksi Kemerdekaan",
      "Sejarah, Narasi, & Warisan",
      "Teknologi, Algoritma, & Masa Depan",
      "Emosi, Luka, & Pemulihan",
    ],
  },

  levels: [
    {
      name: "🇮🇩 Level 1: Surface Indonesia",
      description: "Mulai mikir ulang tentang Indonesia lo",
      forks: {
        "Kesadaran Diri & Identitas": [
          "Lo masih cinta bangsa ini atau udah lupa?",
          "Kalau Indonesia punya grup WA keluarga besar yang jadi admin-nya siapa?",
          "Status FB bangsa ini kira-kira apa ya: Single? In Relationship? atau It's Complicated?",
        ],
        "Demokrasi & Keberanian Bicara": [
          "Bangsa ini lahir dari percakapan. Tapi hari ini siapa yang masih mendengarkan?",
          "Kenapa 'menjadi warga yang baik' gak pernah jadi trending?",
          "Merdeka tidak hanya artinya bebas. Tapi berani bertanya: bebas untuk menjadi apa?",
        ],
        "Tradisi, Rasa, & Budaya": [
          "Bisakah aroma kopi yang kamu pesan mengalahkan aroma sejarah bangsamu?",
          "Scroll terus vs baca buku: mana yang lebih 'Indonesia'?",
          "Kalo Indonesia punya Tinder, apa yang ditulis di bionya?",
        ],
        "Ketimpangan & Kelas Sosial": [
          "Bangsa ini seperti warung Padang: Menunya lengkap, Bumbunya pas, Porsinya royal. Tapi kenapa yang makan suka ngutang?",
          "Kalau sejarah bangsa itu warisan, siapa yang bayar pajaknya?",
          "Apa yang bangsa ini butuhkan mungkin lebih dari sekedar tisu?",
        ],
        default: [
          "Jika Indonesia adalah pertanyaan, siapa yang berani menjadi 'tanda tanya'?",
          "Kalau kamu hanya membaca satu versi Indonesia, mungkin kamu belum membaca apa-apa?",
          "Kalo bangsa ini main band kenapa bingung salah kunci tapi benar rasa?",
        ],
      },
    },
    {
      name: "🌿 Level 2: Pattern Kebangsaan",
      description: "Liat pola-pola kebangsaan yang kita ulang terus",
      forks: {
        default: [
          "Apa yang lo bela dengan tetap ngomong 'Indonesia' tanpa tau artinya?",
          "Versi Indonesia yang mana yang lo takut akui ada?",
          "Kenapa lo lebih suka nostalgia kemerdekaan daripada bikin kemerdekaan baru?",
        ],
      },
    },
    {
      name: "🌳 Level 3: Identity Core Bangsa",
      description: "Gali sampai ke inti identitas bangsa ini",
      forks: {
        default: [
          "Siapa Indonesia tanpa cerita heroik yang kita pegang selama ini?",
          "Apa yang kita korbanin buat maintain identitas 'bangsa besar'?",
          "Versi Indonesia yang mana yang kita bunuh buat jadi versi yang sekarang?",
        ],
      },
    },
    {
      name: "🔥 Level 4: Shadow Work Indonesia",
      description: "Face the shadow yang kita sembunyiin soal Indonesia",
      forks: {
        default: [
          "Apa yang paling lo takutin tentang Indonesia jadi bangsa yang beneran merdeka?",
          "Siapa yang lo kecewain kalau Indonesia berhenti jadi korban sejarah?",
          "Bagian mana dari 'penderitaan bangsa' yang sebenernya kita enjoy?",
        ],
      },
    },
    {
      name: "💀 Level 5: FINAL BOSS MERDEKA",
      description:
        "Pertanyaan terakhir buat ganti POV cara lo liat bangsa ini",
      forks: {
        default: [
          "Kalau semua narasi kebangsaan selama ini cuma cerita, apa Indonesia sebenernya tanpa cerita itu?",
          "Apa yang terjadi kalau kita stop defending 'budaya leluhur' dan mulai creating budaya masa depan?",
          "Versi Indonesia yang paling ditakutin untuk exist - kenapa kita takut jadi dia?",
        ],
      },
    },
  ],

  levelDescriptions: [
    "Mulai mikir ulang tentang Indonesia lo",
    "Liat pola-pola kebangsaan yang kita ulang terus",
    "Gali sampai ke inti identitas bangsa ini",
    "Face the shadow yang kita sembunyiin soal Indonesia",
    "Pertanyaan terakhir buat ganti POV cara lo liat bangsa ini",
  ],

  completionTitle: "INDONESIA QUEST COMPLETED!",
  completionMessage:
    "Lo udah journey dari surface questions tentang Indonesia sampai ke core consciousness kebangsaan.",
  completionEmoji: "🏆🇮🇩",
  finalQuote: '"Membaca Ulang, Menulis Ulang, Bertanya Ulang"',

  generateShareText: (ctx: ShareContext) => {
    const url = "https://indonesiasebagaipercakapan.katabaru.com";
    let text = `🇮🇩 INDONESIA FORK QUEST COMPLETED! 🇮🇩\n\nGua baru aja journey 5 levels deep tentang Indonesia dari surface questions sampai core consciousness:\n\n`;
    ctx.steps.forEach((s, i) => {
      text += `L${i + 1}: ${s.question}\n`;
      if (s.answer) text += `↳ ${s.answer}\n`;
      text += `\n`;
    });
    if (ctx.finalAnswer)
      text += `💀 FINAL BOSS ANSWER:\n${ctx.finalAnswer}\n\n`;
    text += `"Membaca Ulang, Menulis Ulang, Bertanya Ulang"\n\n`;
    text += `Coba sendiri di: ${url}\n\n#IndonesiaSebagaiPercakapan #ForkQuest #Indonesia`;
    return text;
  },

  generateTwitterText: (ctx: ShareContext) => {
    const url = "https://indonesiasebagaipercakapan.katabaru.com";
    const count = ctx.steps.length;
    let text = `🇮🇩 Completed ${count}-level Indonesia consciousness journey!\n\n`;
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
    text += `${url}\n#IndonesiaSebagaiPercakapan #ForkQuest`;
    if (text.length > 280) {
      const excess = text.length - 277;
      const urlIdx = text.indexOf(url);
      text = text.substring(0, urlIdx - excess - 3) + "...\n" + text.substring(urlIdx);
    }
    return text;
  },

  backToUrl: "/",
};

export default function IndonesiaQuestPage() {
  return <ForkQuestEngine config={config} />;
}
