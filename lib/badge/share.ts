// Web Share API helpers — used for sharing badge images to social platforms

export function dataUrlToFile(dataUrl: string, filename: string): File {
  const [meta, base64] = dataUrl.split(",");
  const mimeMatch = meta.match(/data:([^;]+);/);
  const mime = mimeMatch ? mimeMatch[1] : "image/png";
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return new File([bytes], filename, { type: mime });
}

export function canShareFiles(files: File[]): boolean {
  if (typeof navigator === "undefined" || typeof navigator.canShare !== "function") {
    return false;
  }
  try {
    return navigator.canShare({ files });
  } catch {
    return false;
  }
}

export interface ShareWithFilesArgs {
  files: File[];
  text: string;
  url: string;
}

/** Returns true if the native share sheet was opened, false if the API
 *  was unavailable or the user aborted before the share resolved. */
export async function shareWithFiles(args: ShareWithFilesArgs): Promise<boolean> {
  if (!canShareFiles(args.files)) return false;
  try {
    await navigator.share(args);
    return true;
  } catch {
    // User cancelled, share blocked, or unsupported — caller should fall back
    return false;
  }
}
