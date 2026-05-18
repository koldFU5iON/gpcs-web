import type { CalculationResult } from "@/lib/gpcs/types";
import { TIER_HEX } from "@/lib/gpcs/tiers";
import { INDEPENDENCE_LABELS } from "@/lib/gpcs/independence";

function buildBadgeElement(result: CalculationResult, gameName?: string): HTMLDivElement {
  const tierColor = TIER_HEX[result.capacityTier];
  const independenceLabel = INDEPENDENCE_LABELS[result.independence].replace(/^I\d — /, "");

  const el = document.createElement("div");
  Object.assign(el.style, {
    position: "fixed", top: "0", left: "0", zIndex: "99999",
    pointerEvents: "none", width: "560px", height: "500px",
    fontFamily: "'Courier New', Courier, monospace",
    background: "#131320", border: `1px solid ${tierColor}40`,
    borderRadius: "12px",
    boxShadow: `0 0 60px ${tierColor}18, 0 0 120px ${tierColor}08`,
    padding: "32px 40px", boxSizing: "border-box", overflow: "hidden",
    display: "flex", flexDirection: "column",
  });

  // Top colour strip
  const strip = document.createElement("div");
  Object.assign(strip.style, {
    position: "absolute", top: "0", left: "0", right: "0", height: "4px",
    background: `linear-gradient(90deg, ${tierColor}60, ${tierColor}CC, ${tierColor}60)`,
    borderRadius: "12px 12px 0 0",
  });
  el.appendChild(strip);

  // Header label
  const header = document.createElement("p");
  Object.assign(header.style, {
    fontSize: "11px", fontWeight: "600", letterSpacing: "0.2em",
    textTransform: "uppercase", color: "#55557A",
    marginBottom: "20px", marginTop: "8px",
  });
  header.textContent = "GPC Capacity Rating";
  el.appendChild(header);

  // Rating + independence row
  const ratingRow = document.createElement("div");
  Object.assign(ratingRow.style, { display: "flex", alignItems: "baseline", gap: "16px", marginBottom: "10px" });
  const ratingEl = document.createElement("span");
  Object.assign(ratingEl.style, { fontSize: "96px", fontWeight: "900", lineHeight: "1", color: tierColor });
  ratingEl.textContent = result.display;
  const indEl = document.createElement("span");
  Object.assign(indEl.style, { fontSize: "36px", fontWeight: "600", color: "#8888AA" });
  indEl.textContent = `/ ${result.independence}`;
  ratingRow.appendChild(ratingEl);
  ratingRow.appendChild(indEl);
  el.appendChild(ratingRow);

  // Independence label
  const indLabel = document.createElement("p");
  Object.assign(indLabel.style, { fontSize: "14px", color: "#55557A", marginBottom: "32px" });
  indLabel.textContent = independenceLabel;
  el.appendChild(indLabel);

  // Divider
  const divider = document.createElement("div");
  divider.style.borderTop = `1px solid ${tierColor}20`;
  divider.style.marginBottom = "16px";
  el.appendChild(divider);

  // Meta rows
  const metaWrap = document.createElement("div");
  Object.assign(metaWrap.style, { display: "flex", flexDirection: "column", gap: "12px" });
  for (const [label, value] of [
    ["Verification", result.verification],
    ["Version", `v${result.version}`],
    ["Score", String(result.compositeScore)],
  ] as const) {
    const row = document.createElement("div");
    Object.assign(row.style, { display: "flex", justifyContent: "space-between", fontSize: "14px" });
    const lEl = document.createElement("span"); lEl.style.color = "#55557A"; lEl.textContent = label;
    const vEl = document.createElement("span"); vEl.style.color = "#8888AA"; vEl.textContent = value;
    row.appendChild(lEl); row.appendChild(vEl);
    metaWrap.appendChild(row);
  }
  el.appendChild(metaWrap);

  // Footer
  const footer = document.createElement("div");
  Object.assign(footer.style, {
    borderTop: `1px solid ${tierColor}15`, paddingTop: "20px",
    marginTop: "auto", textAlign: "center",
  });
  const footerText = document.createElement("p");
  Object.assign(footerText.style, {
    fontSize: "11px", color: "#55557A",
    letterSpacing: "0.12em", textTransform: "uppercase",
  });
  footerText.textContent = `${gameName ? `${gameName} · ` : ""}gpcstandard.org · Unverified self-assessment`;
  footer.appendChild(footerText);
  el.appendChild(footer);

  return el;
}

export async function downloadBadge(result: CalculationResult, gameName?: string): Promise<void> {
  const { toPng } = await import("html-to-image");

  const el = buildBadgeElement(result, gameName);
  document.body.appendChild(el);

  // Two animation frames — gives the browser time to paint before capture
  await new Promise<void>(resolve => requestAnimationFrame(() => requestAnimationFrame(() => resolve())));

  try {
    const dataUrl = await toPng(el, { pixelRatio: 2, width: 560, height: 500 });

    const slug = gameName
      ? gameName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")
      : null;
    const filename = slug ? `gpcs-rating-${slug}.png` : "gpcs-rating.png";

    const link = document.createElement("a");
    link.download = filename;
    link.href = dataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } finally {
    document.body.removeChild(el);
  }
}
