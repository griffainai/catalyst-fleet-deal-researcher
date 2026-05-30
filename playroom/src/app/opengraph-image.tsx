import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Catalyst — No dossier. A thesis you can kill.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #14202E 0%, #1E2D3D 100%)",
          padding: "70px 80px",
          fontFamily: "sans-serif",
        }}
      >
        {/* top row: wordmark */}
        <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
          <div
            style={{
              width: 72,
              height: 72,
              background: "#F2A30F",
              border: "5px solid #C97E08",
              borderRadius: 16,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 40,
            }}
          >
            ⚡
          </div>
          <div style={{ color: "#EAEEF2", fontSize: 58, fontWeight: 800, letterSpacing: -2 }}>
            CATALYST
          </div>
        </div>

        {/* middle: tagline */}
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ color: "#F2A30F", fontSize: 30, fontWeight: 700, letterSpacing: 4, textTransform: "uppercase" }}>
            The Fleet Deal Researcher
          </div>
          <div style={{ display: "flex", flexDirection: "column", color: "#FFFFFF", fontSize: 76, fontWeight: 800, letterSpacing: -3, lineHeight: 1.05 }}>
            <div style={{ display: "flex" }}>No dossier.</div>
            <div style={{ display: "flex" }}>A thesis you can kill.</div>
          </div>
        </div>

        {/* bottom: duel chips */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              color: "#8194A8",
              border: "3px solid #5C7088",
              borderRadius: 10,
              padding: "10px 18px",
              fontSize: 24,
            }}
          >
            🤖 Generic AI → a guessed profile
          </div>
          <div style={{ color: "#F2A30F", fontSize: 30, fontWeight: 800 }}>vs</div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              color: "#14202E",
              background: "#F2A30F",
              border: "3px solid #C97E08",
              borderRadius: 10,
              padding: "10px 18px",
              fontSize: 24,
              fontWeight: 700,
            }}
          >
            ⚡ Catalyst → a falsifiable thesis
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
