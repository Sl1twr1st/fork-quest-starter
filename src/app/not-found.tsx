import Link from "next/link";

export default function NotFound() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        padding: "2rem",
        textAlign: "center",
      }}
    >
      <h1 style={{ fontSize: "3rem", marginBottom: "1rem" }}>404</h1>
      <p style={{ fontSize: "1.2rem", opacity: 0.7 }}>
        Halaman ini nggak ada. Mungkin lo nyasar.
      </p>
      <Link
        href="/"
        style={{
          marginTop: "2rem",
          color: "#0070f3",
          textDecoration: "underline",
        }}
      >
        ← Balik ke beranda
      </Link>
    </div>
  );
}
