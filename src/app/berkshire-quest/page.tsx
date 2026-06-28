"use client";

import ForkQuestEngine from "@/components/ForkQuestEngine";
import type { ForkQuestConfig, ShareContext } from "@/lib/fork-quest-types";

const config: ForkQuestConfig = {
  mode: "fork",

  title: "Edisi Investasi",
  subtitle:
    "Lo baru aja milih satu sisi hubungan lo dengan duit yang pengen lo bongkar. Kita obrolin pelan-pelan — bukan buat dikasih tau harus ngapain, tapi buat lo liat sendiri apa yang sebenernya lo percaya.",
  accentColor: "#6366f1",
  accentGradient: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
  bgGradient: "linear-gradient(180deg, #fafafa 0%, #f5f3ff 100%)",
  cardBorderColor: "#d4d4d8",
  progressDotColor: "#6366f1",
  finalBossDotColor: "#6366f1",
  levelHeaderBg: "#ffffff",
  logoBubbleColor: "#6366f1",
  logoLabel: "Kawan Anti Halu?",

  entry: {
    type: "theme-grid",
    label: "Pilih satu yang paling nyangkut sekarang:",
    themes: [
      "Takut Rugi & Loss Aversion",
      "Portfolio Jadi Harga Diri",
      "FOMO Market & Ikut Orang",
      "Sabar atau Cuma Nyangkut",
      "Kaya untuk Siapa",
      "Investor Pintar Identity",
      "Overthinking Sebelum Mulai",
      "Moat, Privilege, dan Luck",
    ],
  },

  levels: [
    {
      name: "Surface Duit",
      description: "Bongkar definisi dan asumsi paling dasar lo tentang investasi",
      forks: {
        "Takut Rugi & Loss Aversion": [
          "Lo takut rugi uang, atau takut bukti bahwa lo gak sepintar yang lo kira?",
          "Apa yang lo sebut 'rugi' — angka merah di layar, atau makna yang lo tempelin ke angka itu?",
          "Kapan pertama kali lo ngerasa rugi itu memalukan — bukan cuma masalah duit?",
        ],
        "Portfolio Jadi Harga Diri": [
          "Kapan investasi berubah dari rencana masa depan jadi alat validasi diri lo?",
          "Berapa persen rasa percaya diri lo yang numpang di angka portfolio?",
          "Lo cek portfolio buat mantau duit, atau buat mantau harga diri lo hari itu?",
        ],
        "FOMO Market & Ikut Orang": [
          "Lo beli karena lo ngerti, atau karena lo gak mau ketinggalan cerita?",
          "Apa bedanya lo belajar dari orang sukses dan lo cuma ikut-ikutan?",
          "Jangan-jangan yang lo sebut 'research' cuma nyari pembenaran buat ikut arus?",
        ],
        "Sabar atau Cuma Nyangkut": [
          "Lo sabar karena tesis lo kuat, atau karena gak sanggup mengakui salah?",
          "Apa yang lo sebut 'hold' sebenernya cuma avoid ngadepin realita?",
          "Kapan terakhir lo jual karena sadar salah — bukan karena terpaksa?",
        ],
        "Kaya untuk Siapa": [
          "Lo pengen kaya untuk siapa — dan siapa yang lo pengen lihat lo kaya?",
          "Kalau gak ada yang tau net worth lo, apa lo masih seambisius sekarang?",
          "Apa yang lo kejar: kebebasan, atau pengakuan bahwa lo udah berhasil?",
        ],
        "Investor Pintar Identity": [
          "Apa yang lo sebut 'conviction' sebenernya cuma gengsi yang belum mau kalah?",
          "Lo lebih takut salah pilih saham, atau lebih takut keliatan bodoh di depan diri sendiri?",
          "Siapa lo tanpa predikat 'investor pintar' yang lo bangun bertahun-tahun?",
        ],
        "Overthinking Sebelum Mulai": [
          "Lo nunda mulai karena research belum cukup, atau karena action bikin lo gak bisa sembunyi lagi?",
          "Apa yang lebih aman buat lo: terus belajar tanpa eksekusi, atau gagal dan ketauan biasa aja?",
          "Jangan-jangan 'belum siap' yang lo bilang itu tameng biar lo gak pernah gagal?",
        ],
        "Moat, Privilege, dan Luck": [
          "Kalau semua return lo campuran luck, waktu, dan privilege — bagian mana yang masih bisa lo banggakan dengan jujur?",
          "Apa yang lo sebut 'analisa tajam' yang sebenernya cuma privileged starting point?",
          "Lo nyaman disebut pintar, tapi gak nyaman disebut beruntung — kenapa?",
        ],
        default: [
          "Apa sebenernya yang lo percaya tentang duit yang gak pernah lo tanyain ulang?",
          "Dari mana lo belajar bahwa investasi itu harus kayak gini?",
          "Apa definisi 'sukses investasi' yang lo pegang — dan siapa yang ngasih definisi itu?",
        ],
      },
    },
    {
      name: "Pattern Risiko",
      description: "Cari pola-pola yang lo ulang terus dalam ngadepin risiko dan keputusan finansial",
      forks: {
        default: [
          "Pola lo dalam investasi: kapan lo paling sering ambil keputusan yang lo sesali kemudian?",
          "Lo tend to overconfidence pas market naik, dan over-fear pas market turun — gitu juga di hidup lo?",
          "Apa yang selalu lo ulang: masuk telat, keluar telat, atau gak pernah masuk sama sekali?",
        ],
      },
    },
    {
      name: "Identity Investor",
      description: "Siapa lo tanpa portfolio, return, dan status sebagai 'orang yang ngerti investasi'",
      forks: {
        default: [
          "Siapa lo kalau portfolio lo gak bisa dipamerin — bahkan ke diri sendiri?",
          "Kalau besok semua return lo jadi nol, apa yang masih tersisa dari diri lo?",
          "Versi diri yang mana yang lo bela mati-matian dengan narasi 'investor sukses' ini?",
        ],
      },
    },
    {
      name: "Shadow Kekayaan",
      description: "Apa yang sebenernya lo dapat dari rasa takut, nunda, overanalyze, atau ikut hype",
      forks: {
        default: [
          "Apa yang lo dapat dari terus merasa takut rugi? Ada kenyamanan di kewaspadaan yang gak pernah action?",
          "Lo lebih milih overanalyze terus daripada masuk — karena di mode analisis, lo gak pernah bisa salah?",
          "Apa yang lo hindari dengan terus nyebut diri 'belum cukup paham'?",
        ],
      },
    },
    {
      name: "Final Boss Warisan",
      description: "Kalau uang dan portfolio bukan lagi pembelaan identitas, apa yang muncul",
      forks: {
        default: [
          "Kalau uang bukan lagi cara lo merasa aman, keamanan harus lo bangun dari mana?",
          "Apa yang lo wariskan ke orang sekitar lo — selain angka — dari seluruh perjalanan investasi lo?",
          "Kalau semua strategi lo cuma cerita yang lo jaga biar gak perlu ngadepin diri sendiri — lo siap lepas cerita itu?",
        ],
      },
    },
  ],

  levelDescriptions: [
    "Bongkar definisi dan asumsi lo tentang duit",
    "Cari pola lo dalam ngadepin risiko",
    "Siapa lo tanpa portfolio dan return",
    "Apa yang lo dapat dari rasa takut dan nunda",
    "Kalau uang bukan pembelaan identitas",
  ],

  completionTitle: "Yang Kawan tangkap",
  completionMessage:
    "Lo baru aja ngeliat investasi bukan cuma soal return — tapi cara lo bernegosiasi dengan takut, waktu, status, dan tanggung jawab. Gak ada kesimpulan di sini. Cuma lo yang bisa lanjutin obrolan ini.",
  completionEmoji: "🪞",
  finalQuote: "",

  generateShareText: (ctx: ShareContext) => {
    const url = "https://fork-quest.com";
    const hook = ctx.emotionalCore
      ? `Yang ketangkep: "${ctx.emotionalCore}"\n\n`
      : "";
    let text = `🪞 Kawan Anti Halu — Edisi Investasi\n\nGua kira masalah gua: ${ctx.entryValue}.\n${hook}`;
    // First Q&A as preview
    if (ctx.steps.length > 0) {
      text += `${ctx.steps[0].question}\n`;
      if (ctx.steps[0].answer) text += `↳ ${ctx.steps[0].answer}\n`;
      text += `\n`;
    }
    text += `Coba sendiri: ${url}\n\n#KawanAntiHalu`;
    return text;
  },

  generateTwitterText: (ctx: ShareContext) => {
    const url = "https://fork-quest.com";
    const hook = ctx.emotionalCore
      ? `Yang ketangkep: "${ctx.emotionalCore}"`
      : `Ngobrol investasi — ternyata bukan cuma soal duit.`;
    let text = `🪞 Gua kira: ${ctx.entryValue}.\n${hook}\n\n${url}\n#KawanAntiHalu`;
    if (text.length > 280) {
      text = `🪞 Gua kira: ${ctx.entryValue}.\n${ctx.emotionalCore ? `"${ctx.emotionalCore}"` : "Ternyata bukan cuma soal duit."}\n\n${url}\n#KawanAntiHalu`;
    }
    return text;
  },

  // ── AI Kawan Anti Halu ──
  aiMode: true,
  analyzeJourney: true,

  backToUrl: "/",
};

export default function BerkshireQuestPage() {
  return <ForkQuestEngine config={config} />;
}
