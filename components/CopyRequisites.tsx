"use client";

import { useState } from "react";
import { requisitesText } from "@/lib/site";
import { btnGhost } from "@/lib/ui";

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
      className={btnGhost}
    >
      {copied ? "Скопировано" : "Скопировать реквизиты"}
    </button>
  );
}
