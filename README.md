# 🍴 Fork Quest

> **Fork Quest = mesin pertanyaan bercabang untuk membongkar motif.**
>
> Format, bukan produk. Primitive yang bisa dipakai di project lain.

Orang datang dengan satu rasa / keluhan / tema, lalu sistem ngasih beberapa pertanyaan cabang. Dia pilih satu, jawab, terus pertanyaannya makin dalam. Bukan quiz buat "dapat skor", tapi alat buat **ngajak orang ngobrol sama dirinya sendiri.**

---

## Konsep inti

```
X Sebagai Percakapan
```

Apa pun bisa diubah jadi ruang refleksi:
- **Galau Sebagai Percakapan** — dari keluhan sehari-hari sampai final boss consciousness
- **Rebahan Sebagai Percakapan** — ngobrol santai yang bikin nyadar pelan-pelan
- **Indonesia Sebagai Percakapan** — dari surface nationalism sampai identitas bangsa
- **Investasi Sebagai Percakapan** — dari kapitalisme sampai "siapa lo tanpa portfolio?"
- **Literasi Sebagai Percakapan** — dari reading identity sampai beyond the page

5 level progressive deepening: **Surface → Pattern → Identity → Shadow → Final Boss.**

---

## Quick Start

```bash
npm install
npm run dev        # → http://localhost:4000
```

### AI Mode ("Kawan Bertanya")

Bikin `.env.local`:
```
ANTHROPIC_API_KEY=sk-ant-xxx
```

Galau Quest udah di-enable AI mode. Setiap lo main ulang, pertanyaannya beda — AI-generated, bukan hardcoded. Di akhir, AI analisis seluruh perjalanan lo.

Tanpa API key, tetep jalan — fallback ke static config.

---

## Arsitektur

```
src/
├── lib/
│   ├── fork-quest-types.ts   ← Interface engine
│   └── ai/
│       ├── types.ts          ← Interface AI
│       └── prompts.ts        ← Persona "Kawan Bertanya"
├── components/
│   └── ForkQuestEngine.tsx   ← Engine utama (fork + linear mode)
├── app/
│   ├── page.tsx              ← Homepage
│   ├── galau-quest/          ← AI mode ✅
│   ├── rebahan-quest/        ← Linear mode
│   ├── indonesia-quest/
│   ├── literasi-quest/
│   ├── berkshire-quest/
│   └── api/
│       ├── generate-forks/   ← POST → Claude
│       └── analyze-journey/  ← POST → Claude
```

---

## Cara nambah quest baru

### Fork mode + static config
```typescript
const config: ForkQuestConfig = {
  mode: "fork",
  title: "FOMO Sebagai Percakapan",
  entry: { type: "direct-input", presets: ["Gua takut ketinggalan", ...] },
  levels: [ /* 5 level dengan forks */ ],
  // ... branding, completion, share
};

export default function Page() {
  return <ForkQuestEngine config={config} />;
}
```

### Dengan AI
Tambah dua field:
```typescript
aiMode: true,
analyzeJourney: true,
```
Static `levels[].forks` tetap diisi sebagai fallback kalau API gagal.

---

## Engine bisa dipakai di mana aja

Karena ini **primitive**, engine yang sama bisa dipakai untuk:
- **Satpam Wallet** — Fork Quest untuk keputusan investasi
- **Ruang Interogasi** — Fork Quest yang lebih galak, berbasis verdict
- **Void Saga** — Fork Quest untuk membangun karakter fiksi
- **PM Audit** — Fork Quest untuk mempertanyakan project scope

Satu mesin, banyak kulit.

---

## Tech Stack

- Next.js 15 (App Router)
- React 19 + TypeScript
- Claude API (`@anthropic-ai/sdk`)
- Tailwind CSS (terpasang, belum dipakai — masih inline styles)

---

> *"Fork Quest adalah cara mengubah kebingungan menjadi jalur pertanyaan."*
