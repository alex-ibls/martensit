"use client";

import { useState } from "react";
import { requisitesText } from "@/lib/site";

export function CopyRequisites() {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(requisitesText());
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex rounded-md border border-border bg-surface px-4 py-2 text-sm text-foreground transition hover:border-accent/40"
    >
      {copied ? "Скопировано" : "Скопировать реквизиты"}
    </button>
  );
}
