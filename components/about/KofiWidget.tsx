"use client";

import { useState } from "react";
import { Coffee, ChevronUp } from "lucide-react";

export default function KofiWidget() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="inline-flex items-center gap-2 rounded-lg border border-gpcs-border px-5 py-3 text-sm font-medium text-gpcs-silver hover:border-gpcs-gold/30 hover:text-gpcs-text transition-colors cursor-pointer"
      >
        <Coffee size={16} />
        {open ? "Hide Ko-fi" : "Support on Ko-fi"}
        {open && <ChevronUp size={14} className="ml-1" />}
      </button>

      {open && (
        <div className="mt-4 overflow-hidden rounded-xl border border-gpcs-border">
          <iframe
            id="kofiframe"
            src="https://ko-fi.com/devonstanton/?hidefeed=true&widget=true&embed=true&preview=true"
            style={{ border: "none", width: "100%", padding: "4px", background: "#f9f9f9" }}
            height="712"
            title="Support Devon Stanton on Ko-fi"
          />
        </div>
      )}
    </div>
  );
}
