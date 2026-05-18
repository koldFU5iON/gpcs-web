export async function downloadBadge(element: HTMLElement, gameName?: string): Promise<void> {
  const { toPng } = await import("html-to-image");
  const dataUrl = await toPng(element, { pixelRatio: 2, width: 560, height: 700 });

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
}
