"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

type Status = "idle" | "loading" | "success" | "error";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, message }),
    });

    const data = await res.json();

    if (!res.ok) {
      setStatus("error");
      setErrorMsg(data.error ?? "Something went wrong. Please try again.");
      return;
    }

    setStatus("success");
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-8 text-center">
        <CheckCircle size={32} className="text-gpcs-gold" />
        <p className="font-display text-lg font-semibold text-gpcs-text">Message sent</p>
        <p className="text-sm text-gpcs-muted max-w-sm">
          Thanks for reaching out. Devon will get back to you directly via email.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="mb-1.5 block text-xs font-medium text-gpcs-muted uppercase tracking-wider">
            Name
          </label>
          <input
            id="contact-name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className="w-full rounded-lg border border-gpcs-border bg-gpcs-surface px-4 py-2.5 text-sm text-gpcs-text placeholder:text-gpcs-muted focus:border-gpcs-gold/50 focus:outline-none focus:ring-1 focus:ring-gpcs-gold/30 transition-colors"
          />
        </div>
        <div>
          <label htmlFor="contact-email" className="mb-1.5 block text-xs font-medium text-gpcs-muted uppercase tracking-wider">
            Email
          </label>
          <input
            id="contact-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full rounded-lg border border-gpcs-border bg-gpcs-surface px-4 py-2.5 text-sm text-gpcs-text placeholder:text-gpcs-muted focus:border-gpcs-gold/50 focus:outline-none focus:ring-1 focus:ring-gpcs-gold/30 transition-colors"
          />
        </div>
      </div>

      <div>
        <label htmlFor="contact-message" className="mb-1.5 block text-xs font-medium text-gpcs-muted uppercase tracking-wider">
          Message
        </label>
        <textarea
          id="contact-message"
          required
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="What would you like to discuss?"
          className="w-full resize-none rounded-lg border border-gpcs-border bg-gpcs-surface px-4 py-2.5 text-sm text-gpcs-text placeholder:text-gpcs-muted focus:border-gpcs-gold/50 focus:outline-none focus:ring-1 focus:ring-gpcs-gold/30 transition-colors"
        />
      </div>

      {status === "error" && (
        <div className="flex items-center gap-2 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-2.5 text-sm text-red-400">
          <AlertCircle size={15} className="shrink-0" />
          {errorMsg}
        </div>
      )}

      <div className="flex items-center justify-between gap-4">
        <p className="text-xs text-gpcs-muted">
          Your email will not be published or shared.
        </p>
        <button
          type="submit"
          disabled={status === "loading"}
          className="inline-flex items-center gap-2 rounded-lg bg-gpcs-gold px-6 py-2.5 text-sm font-semibold text-gpcs-navy hover:bg-gpcs-gold-light transition-colors disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
        >
          {status === "loading" ? (
            <>
              <Loader2 size={15} className="animate-spin" />
              Sending…
            </>
          ) : (
            <>
              Send message
              <ArrowRight size={15} />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
