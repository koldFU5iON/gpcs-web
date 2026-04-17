"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { MessageCircle, X, Send, Loader2, Maximize2, Minimize2, RotateCcw, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Message {
  role: "user" | "assistant";
  text: string;
}

const SUGGESTED = [
  "What is GPCS?",
  "How is a rating calculated?",
  "What does I0 mean?",
  "What's the difference between Verified and Audited?",
];

// ---------------------------------------------------------------------------
// Markdown renderer — defined outside to avoid remount on parent re-render
// ---------------------------------------------------------------------------
function MarkdownContent({ text, expanded }: { text: string; expanded: boolean }) {
  return (
    <ReactMarkdown
      remarkPlugins={expanded ? [remarkGfm] : []}
      components={{
        p: ({ children }) => <p className="mb-1.5 last:mb-0">{children}</p>,
        ul: ({ children }) => <ul className="mb-1.5 ml-3 space-y-0.5 list-disc">{children}</ul>,
        ol: ({ children }) => <ol className="mb-1.5 ml-3 space-y-0.5 list-decimal">{children}</ol>,
        li: ({ children }) => <li className="text-sm">{children}</li>,
        h2: ({ children }) => <p className="mt-2 mb-1 font-semibold text-gpcs-text text-sm">{children}</p>,
        h3: ({ children }) => <p className="mt-1.5 mb-0.5 font-semibold text-gpcs-text text-sm">{children}</p>,
        strong: ({ children }) => <strong className="font-semibold text-gpcs-text">{children}</strong>,
        code: ({ children }) => (
          <code className="font-mono text-xs bg-gpcs-slate/60 rounded px-1 py-0.5 text-gpcs-gold">
            {children}
          </code>
        ),
        a: ({ href, children }) => (
          <a
            href={href}
            className="text-gpcs-gold underline hover:text-gpcs-gold-light transition-colors"
            {...(href?.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          >
            {children}
          </a>
        ),
        table: ({ children }) => (
          <div className="overflow-x-auto my-2">
            <table className="w-full text-xs border-collapse">{children}</table>
          </div>
        ),
        thead: ({ children }) => <thead className="border-b border-gpcs-border">{children}</thead>,
        th: ({ children }) => (
          <th className="px-2 py-1.5 text-left font-semibold text-gpcs-text whitespace-nowrap">
            {children}
          </th>
        ),
        td: ({ children }) => (
          <td className="px-2 py-1.5 border-b border-gpcs-border/50 text-gpcs-silver">
            {children}
          </td>
        ),
      }}
    >
      {text}
    </ReactMarkdown>
  );
}

// ---------------------------------------------------------------------------
// Paused screen — shown when billing credit is exhausted
// ---------------------------------------------------------------------------
function PausedPanel({ inModal }: { inModal: boolean }) {
  return (
    <div className={cn("flex flex-1 flex-col items-center justify-center px-6 py-8 text-center gap-4", inModal && "px-10")}>
      <div className="flex h-10 w-10 items-center justify-center rounded-full border border-gpcs-border bg-gpcs-surface-alt">
        <span className="text-gpcs-muted text-lg">·</span>
      </div>
      <div>
        <p className="text-sm font-semibold text-gpcs-text mb-1">Assistant unavailable</p>
        <p className="text-xs text-gpcs-muted leading-relaxed max-w-xs">
          The chat assistant is temporarily offline. You can still read the full
          specification or get in touch directly.
        </p>
      </div>
      <div className="flex flex-col gap-2 w-full max-w-[200px]">
        <a
          href="/specification"
          className="rounded-lg border border-gpcs-border px-4 py-2 text-xs font-medium text-gpcs-silver hover:border-gpcs-gold/40 hover:text-gpcs-gold transition-colors text-center"
        >
          Read the Specification
        </a>
        <a
          href="/about#contact"
          className="rounded-lg border border-gpcs-border px-4 py-2 text-xs font-medium text-gpcs-silver hover:border-gpcs-gold/40 hover:text-gpcs-gold transition-colors text-center"
        >
          Get in Touch
        </a>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Info panel — scope / limits screen
// ---------------------------------------------------------------------------
function InfoPanel({
  inModal,
  onDismiss,
}: {
  inModal: boolean;
  onDismiss: () => void;
}) {
  return (
    <>
      <div className={cn("flex-1 overflow-y-auto px-4 py-5 space-y-5", inModal && "px-6")}>
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-gpcs-muted mb-2">
            What this can answer
          </p>
          <ul className="space-y-1.5">
            {[
              "GPCS tier definitions and what they mean",
              "How the scoring algorithm and weightings work",
              "Independence markers (I0–I3) and how they're assigned",
              "Verification levels and what each requires",
              "Governance, licensing, and citation guidance",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2 text-xs text-gpcs-silver">
                <span className="text-gpcs-gold mt-0.5 shrink-0">›</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-gpcs-muted mb-2">
            What it can't answer
          </p>
          <ul className="space-y-1.5">
            {[
              "General game industry questions or news",
              "Advice on specific studios or projects",
              "Anything not covered in the GPCS whitepaper",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2 text-xs text-gpcs-silver">
                <span className="text-gpcs-muted mt-0.5 shrink-0">›</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-lg border border-gpcs-border bg-gpcs-surface-alt p-3 text-xs text-gpcs-muted leading-relaxed">
          Answers are generated from the whitepaper and may contain errors. Limit of 15
          questions per hour. For anything that matters, verify against the{" "}
          <a
            href="/specification"
            className="text-gpcs-gold underline hover:text-gpcs-gold-light"
          >
            full specification
          </a>
          .
        </div>
      </div>
      <div className={cn("border-t border-gpcs-border px-4 py-3", inModal && "px-6")}>
        <button
          onClick={onDismiss}
          className="w-full rounded-lg border border-gpcs-border py-2 text-sm font-medium text-gpcs-silver hover:border-gpcs-gold/40 hover:text-gpcs-gold transition-colors cursor-pointer"
        >
          Got it
        </button>
      </div>
    </>
  );
}

// ---------------------------------------------------------------------------
// Header — defined outside to prevent remount on keystroke
// ---------------------------------------------------------------------------
interface HeaderProps {
  inModal: boolean;
  showInfo: boolean;
  hasMessages: boolean;
  onInfo: () => void;
  onClear: () => void;
  onToggleExpand: () => void;
  onClose: () => void;
}

function ChatHeader({
  inModal,
  showInfo,
  hasMessages,
  onInfo,
  onClear,
  onToggleExpand,
  onClose,
}: HeaderProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-between border-b border-gpcs-border px-4 py-3 rounded-t-2xl",
        inModal && "px-6"
      )}
    >
      <div className="flex items-center gap-2">
        <div className="flex h-6 w-6 items-center justify-center rounded border border-gpcs-gold/40 bg-gpcs-gold/10">
          <span className="font-display text-[10px] font-bold text-gpcs-gold">G</span>
        </div>
        <span className="text-sm font-semibold text-gpcs-text">Ask about GPCS</span>
      </div>
      <div className="flex items-center gap-1">
        <button
          onClick={onInfo}
          className={cn(
            "flex h-7 w-7 items-center justify-center rounded-md transition-colors cursor-pointer",
            showInfo ? "text-gpcs-gold" : "text-gpcs-muted hover:text-gpcs-text"
          )}
          aria-label="About this assistant"
          title="About this assistant"
        >
          <Info size={14} />
        </button>
        {hasMessages && !showInfo && (
          <button
            onClick={onClear}
            className="flex h-7 w-7 items-center justify-center rounded-md text-gpcs-muted hover:text-gpcs-text transition-colors cursor-pointer"
            aria-label="Clear chat"
            title="Clear chat"
          >
            <RotateCcw size={14} />
          </button>
        )}
        <button
          onClick={onToggleExpand}
          className="flex h-7 w-7 items-center justify-center rounded-md text-gpcs-muted hover:text-gpcs-text transition-colors cursor-pointer"
          aria-label={inModal ? "Collapse" : "Expand"}
          title={inModal ? "Collapse" : "Expand"}
        >
          {inModal ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
        </button>
        <button
          onClick={onClose}
          className="flex h-7 w-7 items-center justify-center rounded-md text-gpcs-muted hover:text-gpcs-text transition-colors cursor-pointer"
          aria-label="Close chat"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Message list + input — defined outside to prevent remount on keystroke
// ---------------------------------------------------------------------------
interface BodyProps {
  inModal: boolean;
  messages: Message[];
  input: string;
  streaming: boolean;
  rateLimited: boolean;
  error: string | null;
  inputRef: React.RefObject<HTMLTextAreaElement | null>;
  bottomRef: React.RefObject<HTMLDivElement | null>;
  onInput: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  onSend: () => void;
  onSuggest: (q: string) => void;
}

function ChatBody({
  inModal,
  messages,
  input,
  streaming,
  rateLimited,
  error,
  inputRef,
  bottomRef,
  onInput,
  onKeyDown,
  onSend,
  onSuggest,
}: BodyProps) {
  const isEmpty = messages.length === 0;

  return (
    <>
      <div className={cn("flex-1 overflow-y-auto px-4 py-3 space-y-3", inModal && "px-6")}>
        {isEmpty && (
          <div className="space-y-3">
            <p className="text-xs text-gpcs-muted leading-relaxed">
              Ask anything about the GPCS framework — tiers, methodology,
              independence markers, or verification levels.
            </p>
            <div className="flex flex-wrap gap-1.5">
              {SUGGESTED.map((q) => (
                <button
                  key={q}
                  onClick={() => onSuggest(q)}
                  className="rounded-full border border-gpcs-border px-2.5 py-1 text-xs text-gpcs-silver hover:border-gpcs-gold/40 hover:text-gpcs-gold transition-colors cursor-pointer"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg, i) => (
          <div
            key={i}
            className={cn("flex", msg.role === "user" ? "justify-end" : "justify-start")}
          >
            <div
              className={cn(
                "rounded-xl px-3 py-2 text-sm leading-relaxed",
                inModal ? "max-w-[90%]" : "max-w-[85%]",
                msg.role === "user"
                  ? "bg-gpcs-gold/15 text-gpcs-text border border-gpcs-gold/20"
                  : "bg-gpcs-surface-alt text-gpcs-silver border border-gpcs-border"
              )}
            >
              {msg.role === "user" ? (
                msg.text
              ) : (
                <MarkdownContent text={msg.text} expanded={inModal} />
              )}
            </div>
          </div>
        ))}

        {streaming && messages[messages.length - 1]?.text === "" && (
          <div className="flex justify-start">
            <div className="flex items-center gap-1.5 rounded-xl border border-gpcs-border bg-gpcs-surface-alt px-3 py-2">
              <Loader2 size={12} className="animate-spin text-gpcs-muted" />
              <span className="text-xs text-gpcs-muted">Thinking…</span>
            </div>
          </div>
        )}

        {error && <p className="text-xs text-red-400 text-center px-2">{error}</p>}

        <div ref={bottomRef} />
      </div>

      <p className={cn("px-4 pb-1 text-[10px] text-gpcs-muted leading-tight", inModal && "px-6")}>
        This assistant can make mistakes. Always verify against the{" "}
        <a href="/specification" className="underline hover:text-gpcs-gold">
          specification
        </a>{" "}
        before citing or acting on any answer.
      </p>

      <div className={cn("border-t border-gpcs-border px-3 py-2", inModal && "px-5")}>
        <div className="flex items-end gap-2">
          <textarea
            ref={inputRef}
            value={input}
            onChange={onInput}
            onKeyDown={onKeyDown}
            disabled={streaming || rateLimited}
            placeholder={rateLimited ? "Hourly limit reached" : "Ask a question…"}
            rows={1}
            className="flex-1 resize-none rounded-lg border border-gpcs-border bg-gpcs-bg px-3 py-2 text-sm text-gpcs-text placeholder:text-gpcs-muted focus:outline-none focus:border-gpcs-gold/40 disabled:opacity-50 transition-colors"
            style={{ maxHeight: "72px", overflowY: "auto" }}
          />
          <button
            onClick={onSend}
            disabled={!input.trim() || streaming || rateLimited}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gpcs-gold text-gpcs-navy hover:bg-gpcs-gold-light disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
            aria-label="Send"
          >
            <Send size={14} />
          </button>
        </div>
      </div>
    </>
  );
}

// ---------------------------------------------------------------------------
// Main widget
// ---------------------------------------------------------------------------
export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [paused, setPaused] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [rateLimited, setRateLimited] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (open && !showInfo) setTimeout(() => inputRef.current?.focus(), 100);
  }, [open, showInfo]);

  // Check availability when widget is first opened
  useEffect(() => {
    if (!open) return;
    fetch("/api/chat")
      .then((r) => r.json())
      .then((d) => { if (d.available === false) setPaused(true); })
      .catch(() => {});
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, streaming]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape" && expanded) setExpanded(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [expanded]);

  const clearChat = useCallback(() => {
    abortRef.current?.abort();
    setMessages([]);
    setError(null);
    setStreaming(false);
    setRateLimited(false);
    setTimeout(() => inputRef.current?.focus(), 50);
  }, []);

  const handleInput = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = Math.min(e.target.scrollHeight, 72) + "px";
  }, []);

  const send = useCallback(async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || streaming || rateLimited) return;

    setMessages((prev) => [...prev, { role: "user", text: trimmed }]);
    setInput("");
    // Reset textarea height
    if (inputRef.current) inputRef.current.style.height = "auto";
    setStreaming(true);
    setError(null);

    const controller = new AbortController();
    abortRef.current = controller;
    setMessages((prev) => [...prev, { role: "assistant", text: "" }]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed, expanded }),
        signal: controller.signal,
      });

      if (res.status === 402) {
        setPaused(true);
        setMessages((prev) => prev.slice(0, -1));
        return;
      }

      if (res.status === 429) {
        setRateLimited(true);
        setMessages((prev) => {
          const msgs = [...prev];
          msgs[msgs.length - 1] = {
            role: "assistant",
            text: "You've reached the hourly limit for this tool. For deeper reading, you can [download the full specification](/specification).",
          };
          return msgs;
        });
        return;
      }

      if (!res.ok || !res.body) {
        const data = await res.json().catch(() => ({}));
        setError(data.error ?? "Something went wrong. Please try again.");
        setMessages((prev) => prev.slice(0, -1));
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        if (chunk.includes("_BILLING_PAUSED_")) {
          setPaused(true);
          setMessages((prev) => prev.slice(0, -1));
          return;
        }
        setMessages((prev) => {
          const msgs = [...prev];
          msgs[msgs.length - 1] = {
            role: "assistant",
            text: msgs[msgs.length - 1].text + chunk,
          };
          return msgs;
        });
      }
    } catch (err: unknown) {
      if (err instanceof Error && err.name === "AbortError") return;
      setError("Could not reach the server. Please check your connection.");
      setMessages((prev) => prev.slice(0, -1));
    } finally {
      setStreaming(false);
    }
  }, [streaming, rateLimited, expanded]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send(input);
    }
  }, [send, input]);

  const handleSend = useCallback(() => send(input), [send, input]);
  const handleToggleInfo = useCallback(() => setShowInfo((v) => !v), []);
  const handleClose = useCallback(() => { setOpen(false); setExpanded(false); }, []);
  const handleExpandCompact = useCallback(() => setExpanded(true), []);
  const handleCollapseModal = useCallback(() => setExpanded(false), []);
  const handleDismissInfo = useCallback(() => {
    setShowInfo(false);
    setTimeout(() => inputRef.current?.focus(), 50);
  }, []);

  const sharedHeaderProps = {
    showInfo,
    hasMessages: messages.length > 0,
    onInfo: handleToggleInfo,
    onClear: clearChat,
    onClose: handleClose,
  };

  const sharedBodyProps = {
    messages,
    input,
    streaming,
    rateLimited,
    error,
    inputRef,
    bottomRef,
    onInput: handleInput,
    onKeyDown: handleKeyDown,
    onSend: handleSend,
    onSuggest: send,
  };

  return (
    <>
      {/* ── Expanded modal ──────────────────────────────────────────────────── */}
      {open && expanded && (
        <>
          <div
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            onClick={handleCollapseModal}
          />
          <div
            className="fixed inset-x-4 top-[5%] bottom-[5%] z-50 mx-auto flex max-w-3xl flex-col rounded-2xl border border-gpcs-border bg-gpcs-surface shadow-2xl sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 sm:w-[820px]"
            onClick={(e) => e.stopPropagation()}
          >
            <ChatHeader {...sharedHeaderProps} inModal={true} onToggleExpand={handleCollapseModal} />
            {paused
              ? <PausedPanel inModal={true} />
              : showInfo
              ? <InfoPanel inModal={true} onDismiss={handleDismissInfo} />
              : <ChatBody {...sharedBodyProps} inModal={true} />
            }
          </div>
        </>
      )}

      {/* ── Compact panel ───────────────────────────────────────────────────── */}
      {open && !expanded && (
        <div
          className="fixed bottom-20 right-4 z-50 flex w-[340px] max-w-[calc(100vw-2rem)] flex-col rounded-2xl border border-gpcs-border bg-gpcs-surface shadow-2xl"
          style={{ height: "480px" }}
        >
          <ChatHeader {...sharedHeaderProps} inModal={false} onToggleExpand={handleExpandCompact} />
          {paused
            ? <PausedPanel inModal={false} />
            : showInfo
            ? <InfoPanel inModal={false} onDismiss={handleDismissInfo} />
            : <ChatBody {...sharedBodyProps} inModal={false} />
          }
        </div>
      )}

      {/* ── Bubble trigger ──────────────────────────────────────────────────── */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-4 right-4 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-gpcs-gold shadow-lg hover:bg-gpcs-gold-light transition-colors cursor-pointer"
        aria-label={open ? "Close chat" : "Ask about GPCS"}
      >
        {open ? (
          <X size={20} className="text-gpcs-navy" />
        ) : (
          <MessageCircle size={20} className="text-gpcs-navy" />
        )}
      </button>
    </>
  );
}
