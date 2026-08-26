import { messengerHref, site } from "@/lib/site";
import { btnIcon } from "@/lib/ui";

export function TelegramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M21.5 3.4 18.9 20c-.2 1-1.1 1.3-1.9.8l-5.2-3.8-2.5 2.4c-.3.3-.7.4-1 .2l.4-5.3 9.6-8.7c.4-.4-.1-.6-.6-.3L6.2 12.4 1.2 10.8c-1-.3-1-1 .2-1.5l19-6.2c.8-.3 1.6.2 1.1 2.3Z" />
    </svg>
  );
}

export function MessengerLinks({
  className = "",
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  const href = messengerHref(site.telegramUrl);

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <a
        href={href}
        {...(site.telegramUrl
          ? { target: "_blank", rel: "noopener noreferrer" }
          : undefined)}
        className={`${btnIcon} ${compact ? "" : "w-auto gap-2 px-3 text-xs font-semibold uppercase tracking-[0.16em]"}`}
      >
        <TelegramIcon className="h-4 w-4" />
        {compact ? <span className="sr-only">Telegram</span> : <span>Telegram</span>}
      </a>
    </div>
  );
}
