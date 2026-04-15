import type {
  IndependenceTier,
  IPOwnership,
  CreativeControlMatrix,
} from "./types";

/**
 * Computes the Independence Marker (I0–I3) from Q6, Q13, and Q14.
 *
 * I0 — Fully independent: no publisher, studio owns IP, full creative control
 * I1 — Partial independence: publisher-backed, studio retains IP and core creative control
 * I2 — Publisher-controlled: publisher owns IP or has creative veto
 * I3 — First-party/subsidiary: platform/parent company owns studio and IP
 */
export function computeIndependenceMarker(
  ipOwnership: IPOwnership | null,
  creativeControl: CreativeControlMatrix,
  publisherBacked: boolean
): IndependenceTier {
  // No publisher at all → I0 by definition
  if (!publisherBacked) return "I0";

  // Platform/parent owns (first-party or subsidiary) → I3
  if (ipOwnership === "platform_owns") return "I3";

  // Publisher owns IP → I2
  if (ipOwnership === "publisher_owns") return "I2";

  // Publisher has veto on core creative pillars → I2
  const publisherControlsCore =
    creativeControl.coreDesign === "publisher" ||
    creativeControl.scopeFeatures === "publisher" ||
    creativeControl.monetisation === "publisher";

  if (publisherControlsCore) return "I2";

  // Publisher controls release timing (but not creative core) — borderline I1/I2
  // We classify this as I1 since creative integrity is preserved
  // Co-owned IP with studio retaining creative control → I1
  return "I1";
}

export const INDEPENDENCE_LABELS: Record<IndependenceTier, string> = {
  I0: "I0 — Fully Independent",
  I1: "I1 — Partial Independence",
  I2: "I2 — Publisher-Controlled",
  I3: "I3 — First-Party / Subsidiary",
};

export const INDEPENDENCE_DESCRIPTIONS: Record<IndependenceTier, string> = {
  I0: "100% IP ownership, self-published, no external approval required for creative decisions.",
  I1: "Publisher-backed but studio retains IP and core creative control.",
  I2: "Publisher owns IP or holds creative veto rights over core design pillars.",
  I3: "Studio is owned by a platform holder or major publisher parent.",
};
