import type { ProfileBrand } from "@/lib/profiles";
import { aluminumProfiles, pvcProfiles } from "@/lib/profiles";

function BrandRow({ title, items }: { title: string; items: readonly ProfileBrand[] }) {
  return (
    <div>
      <p className="kicker text-accent">{title}</p>
      <ul className="mt-5 flex flex-wrap items-start gap-x-10 gap-y-7 sm:gap-x-14">
        {items.map((item) => (
          <li key={item.name} className="flex min-w-[7.5rem] flex-col items-start gap-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.src}
              alt={item.name}
              className={`max-h-10 w-auto max-w-[10.5rem] object-contain object-left object-top ${item.knockout ? "brand-mark-knockout" : "brand-mark"}`}
            />
            {item.note ? (
              <p className="text-[10px] tracking-[0.12em] text-faint">{item.note}</p>
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ProfileTape() {
  return (
    <div className="mt-12 space-y-10">
      <BrandRow title="Алюминий" items={aluminumProfiles} />
      <BrandRow title="ПВХ-системы" items={pvcProfiles} />
    </div>
  );
}
