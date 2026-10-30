import type { SVGProps } from "react";

/** The Tallo mark: a sweet potato wearing a pair of cow horns. Line art in currentColor. */
export function TalloMark({ title = "Tallo", ...props }: SVGProps<SVGSVGElement> & { title?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" role="img" aria-label={title || undefined} aria-hidden={title ? undefined : true} {...props}>
      <g stroke="currentColor" strokeWidth={3.4} strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 43C15 29 40 25 59 31 51 46 25 53 5 43Z" />
        <path d="M23 30C16 28 11 22 12 13 15 19 19 22 26 24" />
        <path d="M42 26C48 23 52 17 51 9 48 15 44 18 38 20" />
        <path d="M17 41C27 38 39 35 49 34" />
      </g>
    </svg>
  );
}

export function TalloWordmark({ className }: { className?: string }) {
  return <span className={["t-wordmark", className].filter(Boolean).join(" ")}>Tallo</span>;
}

export function TalloLockup({ className }: { className?: string }) {
  return (
    <span className={["t-lockup", className].filter(Boolean).join(" ")}>
      <TalloMark className="t-lockup__mark" title="" />
      <TalloWordmark />
    </span>
  );
}
