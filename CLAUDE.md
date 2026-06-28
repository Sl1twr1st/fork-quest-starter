# Fork Quest Starter

> **Fork Quest = mesin pertanyaan bercabang untuk membongkar motif.**
> Format, bukan produk. Primitive yang bisa dipakai di project lain.

## Arsitektur

```
src/
├── lib/
│   ├── fork-quest-types.ts   ← Interface engine: ForkQuestConfig, LinearQuestConfig
│   ├── history.ts            ← localStorage persistence: Riwayat Perjalanan
│   ├── ai/
│   │   ├── types.ts          ← Interface AI: GenerateForksInput, JourneyAnalysis
│   │   └── prompts.ts        ← Prompt template "Kawan Bertanya" (persona Claude)
│   └── utils.ts              ← cn() helper (Tailwind merge)
├── components/
│   ├── ForkQuestEngine.tsx   ← Engine utama. Handle dua mode: fork & linear
│   │                           + HistorySection (riwayat perjalanan)
│   └── ui/                   ← Komponen dasar (Button, Card, Input) — belum dipakai
├── app/
│   ├── page.tsx              ← Homepage: grid 5 quest cards
│   ├── galau-quest/          ← AI mode enabled (aiMode: true, analyzeJourney: true)
│   ├── berkshire-quest/      ← Kawan Bertanya Edisi Investasi (AI mode enabled)
│   ├── rebahan-quest/        ← Linear mode
│   ├── indonesia-quest/      ← Fork mode, 8 tema
│   ├── literasi-quest/       ← Fork mode, 8 tema
│   └── api/
│       ├── generate-forks/   ← POST → Claude: generate 3 forks per level
│       └── analyze-journey/  ← POST → Claude: analisis 5-level journey
```

## Dua mode quest

### Fork mode (`mode: "fork"`)
User dapat 3 pertanyaan cabang per level. Pilih satu, jawab, lanjut level berikutnya.
5 level: Surface → Pattern → Identity → Shadow → Final Boss.

### Linear mode (`mode: "linear"`)
User dapat 1 pertanyaan per level. Jawab, lanjut. Gak ada branching.
Cocok untuk flow yang lebih santai (Rebahan).

## AI Mode — "Kawan Bertanya"

Enable dengan menambah `aiMode: true` dan `analyzeJourney: true` di config.

- **AI-first, static-fallback**: Engine panggil `/api/generate-forks` dulu. Kalau API gagal atau gak ada key, fallback ke static forks dari config.
- **Journey analysis**: Setelah 5 level selesai, engine panggil `/api/analyze-journey`. Claude analisis seluruh jawaban user dan balikin: pola, emotional core, refleksi personal, missed questions.
- **Perlu**: `ANTHROPIC_API_KEY` di `.env.local`

## Cara nambah quest baru

### Fork mode (pakai static config):
```typescript
// src/app/fomo-quest/page.tsx
const config: ForkQuestConfig = {
  mode: "fork",
  title: "FOMO Sebagai Percakapan",
  // ... branding, entry, 5 levels, completion, share, backToUrl
};

export default function Page() {
  return <ForkQuestEngine config={config} />;
}
```

### Fork mode + AI:
Tambahkan dua field di config:
```typescript
aiMode: true,
analyzeJourney: true,
```
Static `levels[].forks` tetap diisi sebagai fallback.

## Riwayat Perjalanan

Setiap journey yang selesai (termasuk AI analysis) otomatis disimpan ke localStorage.

- **Key**: `fork-quest-history` → `SavedJourney[]`
- **Max entries**: 20 (FIFO — hapus yang paling lama)
- **Tampil di**: completion page (setelah analisis) & entry page (link "📝 Lo udah N kali ngobrol")
- **Interaksi**: expand/collapse detail, hapus dengan konfirmasi
- **Data per entry**: questTitle, entryValue, timestamp, 5 steps (Q&A), JourneyAnalysis
- Lihat `src/lib/history.ts` untuk type `SavedJourney` dan utility functions

## Prompt persona

Kawan Bertanya adalah "teman yang cukup peduli untuk bertanya hal-hal yang orang lain hindari."
- Bahasa Indonesia sehari-hari (lo/gue), santai tapi tajam
- Gak menggurui, gak ngasih solusi — cuma bertanya
- Progresif deepening: surface → pattern → identity → shadow → final boss
- Format response: JSON (biar engine bisa parse)

### Safety constraints (encoded di prompt system — `src/lib/ai/prompts.ts`)
- JANGAN mendiagnosis kondisi mental
- JANGAN memberi klaim pasti tentang siapa user
- JANGAN memberi saran finansial, rekomendasi beli/jual aset, atau menyuruh transaksi
- `smallStep24h` WAJIB non-transaksional: refleksi, journaling, atau simulasi keputusan
- Gunakan bahasa tentative: "kayaknya", "mungkin", "jangan-jangan", "coba perhatiin"
- Bukan terapi, bukan diagnosis, bukan janji transformasi instan

## Pola "Investasi Sebagai Percakapan"

Edisi Investasi (Berkshire Quest) fokus ke **agency**, bukan return:
- Target: hubungan psikologis user dengan uang, risiko, waktu, status, kontrol, legacy
- Bukan: saham spesifik, target harga, rekomendasi beli/jual
- Descent ideal: surface market behavior → pola risiko → identitas investor → shadow benefit → tanggung jawab penuh
- DNA: investasi bukan soal return, tapi latihan mendengar suara sendiri ketika konsekuensinya nyata

## Tech stack

- Next.js 15 (App Router)
- React 19
- TypeScript
- Claude API (`@anthropic-ai/sdk`)
- Tailwind CSS (terpasang tapi belum dipakai — semua masih inline styles)

## Run

```bash
npm run dev      # → http://localhost:4000
npm run build
```

## Filosofi

Fork Quest adalah **primitive** — bentuk dasar yang bisa dipakai berkali-kali:
- **Kawan Bertanya Edisi Investasi** (Berkshire Quest) = Fork Quest untuk hubungan psikologis dengan uang, risiko, dan agency
- **Kawan Bertanya Edisi Galau** (Galau Quest) = Fork Quest untuk membongkar keluhan emosional
- Satpam Wallet = Fork Quest untuk keputusan investasi (coming soon)
- Ruang Interogasi = Fork Quest yang lebih galak dan berbasis verdict
- Void Saga = Fork Quest untuk karakter fiksi
- PM galak = Fork Quest untuk audit project scope

**"Fork Quest adalah cara mengubah kebingungan menjadi jalur pertanyaan."**
