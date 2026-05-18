import type { Metadata } from "next";
import ShareView from "@/components/share/ShareView";

export const metadata: Metadata = {
  title: "Share Your GPCS Rating",
  description: "Download and share your GPCS project capacity rating badge.",
  alternates: { canonical: "https://gpcstandard.org/share" },
  openGraph: {
    url: "https://gpcstandard.org/share",
    title: "Share Your GPCS Rating",
    description: "Download and share your GPCS project capacity rating badge.",
  },
};

export default function SharePage() {
  return <ShareView />;
}
