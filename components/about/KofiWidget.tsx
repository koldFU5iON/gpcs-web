"use client";

import { Coffee } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export default function KofiWidget() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="inline-flex items-center gap-2 rounded-lg border border-gpcs-border px-5 py-3 text-sm font-medium text-gpcs-silver hover:border-gpcs-gold/30 hover:text-gpcs-text transition-colors cursor-pointer">
          <Coffee size={16} />
          Support on Ko-fi
        </button>
      </PopoverTrigger>
      <PopoverContent
        className="w-[380px] overflow-hidden p-0"
        align="start"
        sideOffset={8}
      >
        <iframe
          id="kofiframe"
          src="https://ko-fi.com/devonstanton/?hidefeed=true&widget=true&embed=true&preview=true"
          style={{ border: "none", width: "100%", padding: "4px", background: "#f9f9f9" }}
          height="620"
          title="Support Devon Stanton on Ko-fi"
        />
      </PopoverContent>
    </Popover>
  );
}
