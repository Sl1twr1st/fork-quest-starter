# Fork Quest Starter — Kawan Anti Halu

> **Anti Halu = alat buat ngetes narasi sebelum jadi keputusan.**
> Kawan Anti Halu ngetes narasi lewat pertanyaan reflektif. Satpam Anti Halu ngetes narasi lewat gerbang bukti.
> Persona: Kawan Bertanya. Brand: Kawan Anti Halu. Primitive yang bisa dipakai di project lain.

## Brand Context

Project ini adalah **Kawan Anti Halu**, bagian *reflective companion* dari brand payung **Anti Halu**.
Brand source of truth: `docs/anti-halu-brand/`

### Aturan sebelum mengubah
Sebelum mengubah positioning, homepage copy, prompt persona, share copy, atau membuat quest baru, **WAJIB** baca:
- [`docs/anti-halu-brand/BRAND_CORE.md`](docs/anti-halu-brand/BRAND_CORE.md) — shared enemy, brand promise, manifesto, tone
- [`docs/anti-halu-brand/BRAND_ARCHITECTURE.md`](docs/anti-halu-brand/BRAND_ARCHITECTURE.md) — Kawan vs Satpam, role boundaries

### Kawan vs Satpam
- **Kawan** (project ini) **tidak memberi verdict.** Kawan bertanya, memantulkan pola, dan membantu user melihat cerita yang dia bela. Output: pertanyaan, refleksi, langkah kecil.
- **Satpam** (project sibling `satpam-wallet`) adalah decision gatekeeper. Satpam memverifikasi klaim, mengecek bukti, dan memberi verdict: JALAN / TAHAN / JANGAN.
- **Jangan mencampur role.** Kawan tidak menyuruh tindakan spesifik. Satpam tidak bertanya reflektif.

Voice details: [`docs/anti-halu-brand/VOICE_SYSTEM.md`](docs/anti-halu-brand/VOICE_SYSTEM.md)
Product map & roadmap: [`docs/anti-halu-brand/PRODUCT_MAP.md`](docs/anti-halu-brand/PRODUCT_MAP.md)

## Arsitektur

```
src/
├── lib/
│   ├── fork-quest-types.ts   ← Interface engine: ForkQuestConfig, LinearQuestConfig
│   ├── history.ts            ← localStorage persistence: Riwayat Perjalanan
│   ├── ai/
│   │   ├── types.ts          ← Interface AI: GenerateForksInput, JourneyAnalysis
│   │   └── prompts.ts        ← Prompt persona "Kawan Bertanya" (brand: Kawan Anti Halu)
│   └── utils.ts              ← cn() helper (Tailwind merge)
├── components/
│   ├── ForkQuestEngine.tsx   ← Engine utama. Handle dua mode: fork & linear
│   │                           + HistorySection (riwayat perjalanan)
│   └── ui/                   ← Komponen dasar (Button, Card, Input) — belum dipakai
├── app/
│   ├── page.tsx              ← Homepage: 2 flagship cards + secondary explorations
│   ├── galau-quest/          ← AI mode enabled (aiMode: true, analyzeJourney: true)
│   ├── berkshire-quest/      ← Kawan Anti Halu: Edisi Investasi (AI mode enabled)
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

## AI Mode — "Kawan Anti Halu" (persona: Kawan Bertanya)

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

Persona AI adalah "Kawan Bertanya" — teman yang cukup peduli untuk bertanya hal-hal yang orang lain hindari. Brand produk: Kawan Anti Halu.
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

## Pola "Edisi Investasi" (Kawan Anti Halu)

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

## Product Direction (PM Galak Roadmap)

### Positioning
Kawan Anti Halu = **format interogasi reflektif bercabang**.
Janji: "Ngetes cerita yang lo percaya, pelan-pelan." Anti halu bukan anti mimpi.
Flow: entry rasa/tema → pilih angle → jawab → pertanyaan makin personal → final reflection → shareable artifact → history.

### 2 Flagship
1. **Edisi Galau** — broad emotional hook
2. **Edisi Investasi** — high-stakes identity/agency hook

### Roadmap (urut)
1. Rapikan homepage: bukan "collection", tapi janji — "5 pertanyaan buat ngebongkar motif lo"
2. Share viral loop: emotionalCore jadi headline share, bukan "completed quest"
3. Simpan journey walau analysis gagal ✅ (done — `517aa1d`)
4. Pisahkan prompt domain config: global persona + domain safety + domain lens
5. Tiny eval log lokal: selected theme, forks generated, selected fork, answer length, completion
6. PM Audit quest (setelah 1-5 solid)

### Blindspot yang harus dijaga
- Jangan bikin 10 quest lagi sebelum tau mana yang punya retensi
- Belum ada sharp user — pilih 1 wedge dulu
- Share butuh hook ("Gua kira masalah gua X, ternyata Y") bukan "coba sendiri"
- Static benchmark butuh rubric, bukan cuma rasa

### Metrik yang perlu diukur (manual dulu)
- completion rate per quest
- pertanyaan mana yang paling dipilih
- jawaban level berapa paling panjang
- final reflection di-copy atau tidak
- user balik lihat history atau tidak

## Filosofi

Fork Quest adalah **primitive** — bentuk dasar yang bisa dipakai berkali-kali:
- **Edisi Investasi** (Berkshire Quest) = Kawan Anti Halu untuk hubungan psikologis dengan uang, risiko, dan agency
- **Edisi Galau** (Galau Quest) = Kawan Anti Halu untuk membongkar keluhan emosional
- Satpam Wallet = Fork Quest untuk keputusan investasi (coming soon)
- Ruang Interogasi = Fork Quest yang lebih galak dan berbasis verdict
- Void Saga = Fork Quest untuk karakter fiksi
- PM galak = Fork Quest untuk audit project scope

**"Fork Quest adalah cara mengubah kebingungan menjadi jalur pertanyaan."**
