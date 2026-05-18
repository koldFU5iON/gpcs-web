import type { CalculationResult } from "@/lib/gpcs/types";

export interface SharePayload {
  result: CalculationResult;
  gameName: string;
}

export const SHARE_STORAGE_KEY = "gpcs_share_payload";
