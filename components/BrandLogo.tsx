import { site } from "@/lib/site";

export function BrandLogo({
  showTagline = true,
  className = "text-foreground",
  taglineClassName = "hidden text-[11px] font-normal tracking-wide text-muted sm:block",
}: {
  showTagline?: boolean;
  className?: string;
  taglineClassName?: string;
}) {
  return (
    <span className="inline-flex min-w-0 items-center gap-2.5">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={site.logoMark}
        alt=""
        width={40}
        height={40}
        className="h-9 w-9 shrink-0 object-contain sm:h-10 sm:w-10"
      />
      <span className="min-w-0 leading-tight">
        <span className={`font-display block text-[15px] font-semibold uppercase tracking-[0.16em] sm:text-base ${className}`}>
          {site.brand}
        </span>
        {showTagline ? (
          <span className={taglineClassName}>{site.tagline}</span>
        ) : null}
      </span>
    </span>
  );
}
