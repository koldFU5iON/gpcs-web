import type { CalculationResult } from "@/lib/gpcs/types";
import { TIER_HEX } from "@/lib/gpcs/tiers";
import { INDEPENDENCE_LABELS } from "@/lib/gpcs/independence";

export interface KeyArtState {
  imageDataUrl: string;
  panX: number;
  panY: number;
  scaledImgW: number;
  scaledImgH: number;
}

function buildBadgeElement(result: CalculationResult, gameName?: string, width = 560): HTMLDivElement {
  const tierColor = TIER_HEX[result.capacityTier];
  const independenceLabel = INDEPENDENCE_LABELS[result.independence].replace(/^I\d — /, "");
  const s = width / 560; // scale factor
  const px = (n: number) => `${Math.round(n * s)}px`;

  const el = document.createElement("div");
  Object.assign(el.style, {
    position: "fixed", top: "0", left: "0", zIndex: "99999",
    pointerEvents: "none", width: `${width}px`, height: px(400),
    fontFamily: "'Courier New', Courier, monospace",
    background: "#131320", border: `1px solid ${tierColor}40`,
    borderRadius: px(12),
    boxShadow: `0 0 ${px(60)} ${tierColor}18, 0 0 ${px(120)} ${tierColor}08`,
    padding: `${px(32)} ${px(40)}`, boxSizing: "border-box", overflow: "hidden",
    display: "flex", flexDirection: "column",
  });

  // Top colour strip
  const strip = document.createElement("div");
  Object.assign(strip.style, {
    position: "absolute", top: "0", left: "0", right: "0", height: px(4),
    background: `linear-gradient(90deg, ${tierColor}60, ${tierColor}CC, ${tierColor}60)`,
    borderRadius: `${px(12)} ${px(12)} 0 0`,
  });
  el.appendChild(strip);

  // Header label
  const header = document.createElement("p");
  Object.assign(header.style, {
    fontSize: px(11), fontWeight: "600", letterSpacing: "0.2em",
    textTransform: "uppercase", color: "#55557A",
    marginBottom: px(20), marginTop: px(8),
  });
  header.textContent = "GPC Capacity Rating";
  el.appendChild(header);

  // Rating + independence row
  const ratingRow = document.createElement("div");
  Object.assign(ratingRow.style, { display: "flex", alignItems: "baseline", gap: px(16), marginBottom: px(10) });
  const ratingEl = document.createElement("span");
  Object.assign(ratingEl.style, { fontSize: px(96), fontWeight: "900", lineHeight: "1", color: tierColor });
  ratingEl.textContent = result.display;
  const indEl = document.createElement("span");
  Object.assign(indEl.style, { fontSize: px(36), fontWeight: "600", color: "#8888AA" });
  indEl.textContent = `/ ${result.independence}`;
  ratingRow.appendChild(ratingEl);
  ratingRow.appendChild(indEl);
  el.appendChild(ratingRow);

  // Independence label
  const indLabel = document.createElement("p");
  Object.assign(indLabel.style, { fontSize: px(14), color: "#55557A", marginBottom: px(32) });
  indLabel.textContent = independenceLabel;
  el.appendChild(indLabel);

  // Divider
  const divider = document.createElement("div");
  divider.style.borderTop = `1px solid ${tierColor}20`;
  divider.style.marginBottom = px(16);
  el.appendChild(divider);

  // Meta rows
  const metaWrap = document.createElement("div");
  Object.assign(metaWrap.style, { display: "flex", flexDirection: "column", gap: px(12) });
  for (const [label, value] of [
    ["Verification", result.verification],
    ["Version", `v${result.version}`],
    ["Score", String(result.compositeScore)],
  ] as const) {
    const row = document.createElement("div");
    Object.assign(row.style, { display: "flex", justifyContent: "space-between", fontSize: px(14) });
    const lEl = document.createElement("span"); lEl.style.color = "#55557A"; lEl.textContent = label;
    const vEl = document.createElement("span"); vEl.style.color = "#8888AA"; vEl.textContent = value;
    row.appendChild(lEl); row.appendChild(vEl);
    metaWrap.appendChild(row);
  }
  el.appendChild(metaWrap);

  // Footer
  const footer = document.createElement("div");
  Object.assign(footer.style, {
    borderTop: `1px solid ${tierColor}15`, paddingTop: px(20),
    marginTop: "auto", textAlign: "center",
  });
  const footerText = document.createElement("p");
  Object.assign(footerText.style, {
    fontSize: px(11), color: "#55557A",
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
    const dataUrl = await toPng(el, { pixelRatio: 2, width: 560, height: 400 });

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

export async function downloadKeyArtOverlay(
  state: KeyArtState,
  result: CalculationResult,
  gameName?: string,
): Promise<void> {
  const { toPng } = await import("html-to-image");
  const RATIO = 2; // preview is 600px wide, output is 1200px

  const container = document.createElement("div");
  Object.assign(container.style, {
    position: "fixed", top: "0", left: "0", zIndex: "99999",
    width: "1200px", height: "630px", overflow: "hidden", pointerEvents: "none",
  });

  // Key art layer
  const img = document.createElement("img");
  img.src = state.imageDataUrl;
  Object.assign(img.style, {
    position: "absolute",
    width: `${state.scaledImgW * RATIO}px`,
    height: `${state.scaledImgH * RATIO}px`,
    top: `${state.panY * RATIO}px`,
    left: `${state.panX * RATIO}px`,
    pointerEvents: "none",
  });
  container.appendChild(img);

  // Badge layer at 400px wide, bottom-left with 32px margin
  const badge = buildBadgeElement(result, gameName, 400);
  badge.style.position = "absolute";
  badge.style.top = "auto";
  badge.style.bottom = "32px";
  badge.style.left = "32px";
  badge.style.zIndex = "1";
  container.appendChild(badge);

  document.body.appendChild(container);
  await new Promise<void>(resolve => requestAnimationFrame(() => requestAnimationFrame(() => resolve())));

  try {
    const dataUrl = await toPng(container, { pixelRatio: 1, width: 1200, height: 630 });
    const slug = gameName ? gameName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") : null;
    const filename = slug ? `gpcs-keyart-${slug}.png` : "gpcs-keyart.png";
    const link = document.createElement("a");
    link.download = filename; link.href = dataUrl;
    document.body.appendChild(link); link.click(); document.body.removeChild(link);
  } finally {
    document.body.removeChild(container);
  }
}

export async function downloadSquareBadge(result: CalculationResult, gameName?: string): Promise<void> {
  const { toPng } = await import("html-to-image");
  const SIZE = 1080;

  const container = document.createElement("div");
  Object.assign(container.style, {
    position: "fixed", top: "0", left: "0", zIndex: "99999",
    width: `${SIZE}px`, height: `${SIZE}px`,
    background: "#0A0A0F",
    display: "flex", alignItems: "center", justifyContent: "center",
    pointerEvents: "none",
  });

  const badge = buildBadgeElement(result, gameName);
  badge.style.position = "relative";
  badge.style.top = "auto";
  badge.style.left = "auto";
  badge.style.zIndex = "auto";
  container.appendChild(badge);

  document.body.appendChild(container);
  await new Promise<void>(resolve => requestAnimationFrame(() => requestAnimationFrame(() => resolve())));

  try {
    const dataUrl = await toPng(container, { pixelRatio: 1, width: SIZE, height: SIZE });
    const slug = gameName ? gameName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") : null;
    const filename = slug ? `gpcs-card-${slug}.png` : "gpcs-card.png";
    const link = document.createElement("a");
    link.download = filename; link.href = dataUrl;
    document.body.appendChild(link); link.click(); document.body.removeChild(link);
  } finally {
    document.body.removeChild(container);
  }
}
