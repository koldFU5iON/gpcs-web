import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "GPCS — Game Project Classification Standard";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const TIERS = ["AAA", "AA", "A", "BBB", "BB", "B", "C"];
const COLORS = ["#FFD700", "#FF6600", "#00C8FF", "#00E676", "#CF40FF", "#FF4081", "#607080"];

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          background: "#0A0A0F",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Subtle gold radial glow top-left */}
        <div
          style={{
            position: "absolute",
            top: -100,
            left: -100,
            width: 600,
            height: 600,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(255,215,0,0.07) 0%, transparent 70%)",
          }}
        />

        {/* Top: logo + wordmark */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 48,
              height: 48,
              border: "1.5px solid rgba(255,215,0,0.5)",
              background: "rgba(255,215,0,0.1)",
              borderRadius: 8,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span style={{ color: "#FFD700", fontSize: 22, fontWeight: 700 }}>G</span>
          </div>
          <span style={{ color: "#F0F0FA", fontSize: 26, fontWeight: 600, letterSpacing: "0.01em" }}>
            GPCS
          </span>
          <div
            style={{
              marginLeft: 4,
              padding: "3px 10px",
              border: "1px solid rgba(255,215,0,0.3)",
              borderRadius: 999,
              background: "rgba(255,215,0,0.08)",
            }}
          >
            <span style={{ color: "#FFD700", fontSize: 12, fontWeight: 500 }}>
              Proposal under testing
            </span>
          </div>
        </div>

        {/* Centre: headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <span
              style={{
                color: "#F0F0FA",
                fontSize: 58,
                fontWeight: 700,
                lineHeight: 1.05,
                letterSpacing: "-0.01em",
              }}
            >
              The game industry
            </span>
            <span
              style={{
                color: "#FFD700",
                fontSize: 58,
                fontWeight: 700,
                lineHeight: 1.05,
                letterSpacing: "-0.01em",
              }}
            >
              finally has a standard.
            </span>
          </div>
          <span style={{ color: "#8888AA", fontSize: 22, lineHeight: 1.5, maxWidth: 680 }}>
            Seven capacity tiers · Independence markers · Verified classifications
          </span>
        </div>

        {/* Bottom: tier strip + URL */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {/* Tier pills */}
          <div style={{ display: "flex", gap: 8 }}>
            {TIERS.map((tier, i) => (
              <div
                key={tier}
                style={{
                  padding: "6px 14px",
                  borderRadius: 6,
                  border: `1px solid ${COLORS[i]}40`,
                  background: `${COLORS[i]}12`,
                  color: COLORS[i],
                  fontSize: 15,
                  fontWeight: 700,
                  fontFamily: "monospace",
                }}
              >
                {tier}
              </div>
            ))}
          </div>

          {/* URL */}
          <span style={{ color: "#55557A", fontSize: 16, letterSpacing: "0.02em" }}>
            gpcstandard.org
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
