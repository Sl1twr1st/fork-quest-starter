# Anti Halu — Brand Core

## Brand Definition (v1)

> **Anti Halu adalah alat buat ngetes narasi sebelum jadi keputusan.**

Kawan Anti Halu ngetes narasi lewat pertanyaan reflektif.
Satpam Anti Halu ngetes narasi lewat gerbang bukti dan verdict.

Anti Halu bukan anti mimpi.
Musuhnya bukan ambisi, tapi **narasi yang dipakai buat menghindari kenyataan**.

## Why "Narasi" (Not "Cerita")

- **Narasi** terasa lebih dewasa dan luas. Bisa masuk ke domain personal, finansial, produk, karier, politik, relationship.
- **Cerita** terasa lebih ringan/fiksi. Narasi punya bobot: ada struktur, ada pembelaan, ada implikasi.
- "Sebelum jadi keputusan" bikin jelas kenapa ini penting. Bukan sekadar refleksi lucu, tapi ada konsekuensi.

## Shared Enemy

**"Halu"** = narasi yang kedengeran masuk akal, tapi sebenernya dipakai buat menghindari kenyataan.

Halu bisa berupa:
- Pembenaran yang kedengeran pinter
- Ketakutan yang pakai jas "strategi"
- FOMO yang dirapihin jadi "analisis"
- Conviction yang sebenernya gengsi belum mau kalah
- "Belum siap" yang jadi tameng biar gak pernah gagal

## Brand Promise

> **Ngetes narasi sebelum jadi keputusan.**
> Biar lo gak kalah sama narasi sendiri.

## Tagline

```
Anti Halu
Ngetes narasi sebelum jadi keputusan.
```

Varian spoken:
```
Anti Halu
Biar narasi lo dites dulu sebelum jadi keputusan.
```

## Manifesto

```
Setiap keputusan punya narasi pembela.
Anti Halu bantu lo ngetes narasi itu sebelum keburu jadi tindakan.

Anti Halu bukan anti mimpi.
Anti Halu cuma ngajak lo ngecek:
ini keyakinan, atau pembenaran?
ini strategi, atau takut yang pakai jas?
ini keputusan, atau FOMO yang rapi?

Kawan ngetes narasi di kepala lo.
Satpam ngetes keputusan di depan lo.

Biar lo gak kalah sama narasi sendiri.
```

## Tone Principle

- **Tajam di diagnosis, hangat di niat.**
- Jangan ngeledek user sebagai orang bodoh.
- Jangan bikin "anti halu" terdengar anti mimpi.
- Anti Halu harus terasa seperti **perlindungan dari self-deception**, bukan penghinaan.
- Bahasa: Indonesia sehari-hari (lo/gue), santai tapi presisi.
- Pakai framing tentative: "jangan-jangan", "kayaknya", "coba perhatiin", "bagian mana".

## Product Guardrail

> **Anti Halu juga harus anti halu terhadap refleksi.**

Kadang halu paling rapi adalah merasa sudah berubah karena sudah memahami diri sendiri. Insight tanpa action bisa jadi halu baru — dopamine self-analysis yang gak pernah turun ke tanah.

Guardrail yang diterapkan:
- **Daily reflection limit**: maksimal 4 completed journeys per hari (global, semua edisi). Counter disimpan di localStorage (`kawan-anti-halu-daily-count`).
  - Journey ke-3: nudge kuning — "Kadang halu paling rapi adalah merasa sudah berubah..."
  - Journey ke-4 selesai: strong stop — "Cukup dulu hari ini. Pilih satu langkah kecil dari riwayat lo dan lakuin di luar layar."
  - Entry page diblokir setelah limit. Tombol "Buka riwayat" dan "Cukup dulu" tetap tersedia.
- **Analysis prompt**: jangan bikin user tenggelam dalam refleksi, akhiri dengan langkah kecil non-dramatis.
- **Failure mode aman**: AI boleh gagal, tapi perjalanan user tidak boleh hilang. Journey tetap disimpan ke history dengan `analysis: null`. UI tampilkan fallback: "Insight belum kebaca penuh, tapi perjalanan lo aman disimpan."
- **History pattern callout**: tunjukin pola berulang, bukan cuma koleksi insight.
- **"Cukup dulu" mode**: tombol untuk berhenti, bukan cuma "Lagi".

## Product Ethics

> **Anti Halu bukan cuma ngetes narasi user.**
> **Anti Halu juga ngetes narasi produk sendiri:**
> **"lebih banyak engagement = lebih baik"**

Dan dia jawab: belum tentu.

4 journey bukan paywall. 4 journey adalah rem moral.
AI boleh gagal, perjalanan user gak boleh hilang.
Insight setengah matang lebih buruk daripada jujur "belum kebaca penuh."
Trust lebih penting dari selalu tampil pintar.

## What Anti Halu Is NOT

- Bukan financial advice
- Bukan terapi atau diagnosis klinis
- Bukan motivational content
- Bukan tools untuk menghakimi keputusan orang lain
- Bukan anti-ambisi atau anti-risk-taking
