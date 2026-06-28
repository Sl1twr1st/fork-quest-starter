"use client";

export default function ForkQuestHomepage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #fafafa 0%, #f5f3ff 100%)",
        padding: "0 24px",
      }}
    >
      <div style={{ maxWidth: "720px", margin: "0 auto" }}>

        {/* ── Hero ── */}
        <div style={{ textAlign: "center", padding: "80px 0 48px 0" }}>
          <p
            style={{
              fontSize: "13px",
              fontWeight: 500,
              color: "#6366f1",
              letterSpacing: "1px",
              textTransform: "uppercase",
              margin: "0 0 16px 0",
            }}
          >
            Kawan Bertanya
          </p>
          <h1
            style={{
              fontSize: "36px",
              fontWeight: 700,
              color: "#1f2937",
              lineHeight: "1.35",
              margin: "0 0 16px 0",
              letterSpacing: "-0.5px",
            }}
          >
            Pilih satu hal yang lo hindari.
            <br />
            Jawab 5 pertanyaan.
            <br />
            Lihat motif yang lo bela.
          </h1>
          <p
            style={{
              fontSize: "16px",
              color: "#6b7280",
              lineHeight: "1.6",
              maxWidth: "480px",
              margin: "0 auto 40px auto",
            }}
          >
            Bukan terapi. Bukan nasihat. Teman yang cukup peduli buat nanya
            hal-hal yang orang lain hindari — dalam bahasa lo sendiri.
          </p>
        </div>

        {/* ── 2 Flagship ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "20px",
            marginBottom: "48px",
          }}
        >
          {/* Galau */}
          <div
            onClick={() => (window.location.href = "/galau-quest")}
            style={{
              background: "white",
              borderRadius: "12px",
              padding: "28px 24px",
              border: "1px solid #e5e7eb",
              cursor: "pointer",
              transition: "all 0.2s",
              boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.borderColor = "#6366f1";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(99,102,241,0.1)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.borderColor = "#e5e7eb";
              e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.04)";
            }}
          >
            <p style={{ fontSize: "36px", margin: "0 0 12px 0", lineHeight: "1" }}>🪞</p>
            <h3
              style={{
                fontSize: "18px",
                fontWeight: 600,
                color: "#1f2937",
                margin: "0 0 6px 0",
              }}
            >
              Edisi Galau
            </h3>
            <p
              style={{
                fontSize: "13px",
                color: "#6b7280",
                lineHeight: "1.5",
                margin: "0 0 16px 0",
              }}
            >
              Masukin satu rasa yang lagi ganggu — capek, takut gagal, bingung.
              Kita urai pelan-pelan lewat 5 pertanyaan.
            </p>
            <span style={{ fontSize: "13px", fontWeight: 600, color: "#6366f1" }}>
              Mulai pelan-pelan →
            </span>
          </div>

          {/* Investasi */}
          <div
            onClick={() => (window.location.href = "/berkshire-quest")}
            style={{
              background: "white",
              borderRadius: "12px",
              padding: "28px 24px",
              border: "1px solid #e5e7eb",
              cursor: "pointer",
              transition: "all 0.2s",
              boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.borderColor = "#6366f1";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(99,102,241,0.1)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.borderColor = "#e5e7eb";
              e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.04)";
            }}
          >
            <p style={{ fontSize: "36px", margin: "0 0 12px 0", lineHeight: "1" }}>💸</p>
            <h3
              style={{
                fontSize: "18px",
                fontWeight: 600,
                color: "#1f2937",
                margin: "0 0 6px 0",
              }}
            >
              Edisi Investasi
            </h3>
            <p
              style={{
                fontSize: "13px",
                color: "#6b7280",
                lineHeight: "1.5",
                margin: "0 0 16px 0",
              }}
            >
              Investasi bukan cuma soal return — tapi cara lo menghadapi takut rugi,
              validasi, dan tanggung jawab.
            </p>
            <span style={{ fontSize: "13px", fontWeight: 600, color: "#6366f1" }}>
              Bongkar motif →
            </span>
          </div>
        </div>

        {/* ── How it works ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "16px",
            marginBottom: "48px",
          }}
        >
          {[
            { num: "1", label: "Pilih tema", desc: "Satu hal yang lagi lo hindari atau gak berani lo tanyain ke diri sendiri." },
            { num: "2", label: "Jawab 5 level", desc: "Pertanyaan makin dalem — dari surface sampai lo ketemu suara sendiri." },
            { num: "3", label: "Lihat motif lo", desc: "Bukan kesimpulan. Cermin yang susah lo bohongi." },
          ].map((step) => (
            <div key={step.num} style={{ textAlign: "center" }}>
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  background: "#6366f1",
                  color: "white",
                  fontSize: "14px",
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 10px auto",
                }}
              >
                {step.num}
              </div>
              <p
                style={{
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "#1f2937",
                  margin: "0 0 4px 0",
                }}
              >
                {step.label}
              </p>
              <p
                style={{
                  fontSize: "12px",
                  color: "#9ca3af",
                  lineHeight: "1.5",
                  margin: "0",
                }}
              >
                {step.desc}
              </p>
            </div>
          ))}
        </div>

        {/* ── Eksplorasi lain ── */}
        <div
          style={{
            borderTop: "1px solid #e5e7eb",
            paddingTop: "32px",
            marginBottom: "48px",
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontSize: "12px",
              fontWeight: 500,
              color: "#9ca3af",
              margin: "0 0 16px 0",
              textTransform: "uppercase",
              letterSpacing: "1px",
            }}
          >
            Eksplorasi lain
          </p>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
            {[
              { label: "Rebahan", href: "/rebahan-quest", desc: "Ngobrol santai sambil refleksi" },
              { label: "Indonesia", href: "/indonesia-quest", desc: "Pertanyaan tentang bangsa" },
              { label: "Literasi", href: "/literasi-quest", desc: "Apa yang lo sebut 'baca'" },
            ].map((q) => (
              <div
                key={q.href}
                onClick={() => (window.location.href = q.href)}
                style={{
                  padding: "10px 18px",
                  background: "white",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontSize: "12px",
                  color: "#6b7280",
                  transition: "all 0.15s",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.borderColor = "#6366f1";
                  e.currentTarget.style.color = "#6366f1";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.borderColor = "#e5e7eb";
                  e.currentTarget.style.color = "#6b7280";
                }}
              >
                <span style={{ fontWeight: 500 }}>{q.label}</span>
                <span style={{ marginLeft: "6px", color: "#d1d5db" }}>—</span>
                <span style={{ marginLeft: "6px" }}>{q.desc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Footer ── */}
        <div
          style={{
            textAlign: "center",
            padding: "32px 0 48px 0",
            borderTop: "1px solid #e5e7eb",
          }}
        >
          <p style={{ fontSize: "13px", color: "#6b7280", margin: "0 0 8px 0" }}>
            Kawan Bertanya — format interogasi reflektif bercabang.
          </p>
          <p style={{ fontSize: "12px", color: "#d1d5db", margin: "0" }}>
            Bukan terapi. Bukan nasihat. Cermin yang susah dibohongi.
          </p>
        </div>
      </div>
    </div>
  );
}
