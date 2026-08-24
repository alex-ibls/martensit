import { messengerHref, site } from "@/lib/site";

export function TelegramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M21.5 3.4 18.9 20c-.2 1-1.1 1.3-1.9.8l-5.2-3.8-2.5 2.4c-.3.3-.7.4-1 .2l.4-5.3 9.6-8.7c.4-.4-.1-.6-.6-.3L6.2 12.4 1.2 10.8c-1-.3-1-1 .2-1.5l19-6.2c.8-.3 1.6.2 1.1 2.3Z" />
    </svg>
  );
}

export function MaxIcon({ className }: { className?: string }) {
  return (
    // Official MAX mark from brand assets (max.ru / Wikimedia vector of the app icon)
    // eslint-disable-next-line @next/next/no-img-element
    <img src="/max-icon.svg" alt="" className={className} />
  );
}

export function MessengerLinks({
  className = "",
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  const items = [
    {
      href: messengerHref(site.telegramUrl),
      label: "Telegram",
      icon: TelegramIcon,
      iconClass: "h-4 w-4",
      external: Boolean(site.telegramUrl),
    },
    {
      href: messengerHref(site.maxUrl),
      label: "MAX",
      icon: MaxIcon,
      iconClass: "h-5 w-5",
      external: Boolean(site.maxUrl),
    },
  ];

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {items.map((item) => (
        <a
          key={item.label}
          href={item.href}
          {...(item.external
            ? { target: "_blank", rel: "noopener noreferrer" }
            : undefined)}
          className="inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-sm text-zinc-100 transition hover:border-teal-300/40 hover:bg-white/10"
        >
          <item.icon className={item.iconClass} />
          {compact ? null : <span>{item.label}</span>}
          {compact ? <span className="sr-only">{item.label}</span> : null}
        </a>
      ))}
    </div>
  );
}
