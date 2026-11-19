import type { SVGProps } from "react";

const RAYS = "M74.9 54.8L96.7 52.0L96.2 49.1L74.7 54.0Z M73.7 50.8L93.9 42.1L92.6 39.5L73.3 50.0Z M71.4 47.3L90.7 31.3L88.8 29.2L70.8 46.6Z M68.3 44.5L84.0 21.3L81.6 19.8L67.6 44.0Z M64.6 42.7L74.1 13.2L71.3 12.4L63.7 42.5Z M60.5 42.0L61.5 8.0L58.5 8.0L59.5 42.0Z M56.3 42.5L48.7 12.4L45.9 13.2L55.4 42.7Z M52.4 44.0L38.4 19.8L36.0 21.3L51.7 44.5Z M49.2 46.6L31.2 29.2L29.3 31.3L48.6 47.3Z M46.7 50.0L27.4 39.5L26.1 42.1L46.3 50.8Z M45.3 54.0L23.8 49.1L23.3 52.0L45.1 54.8Z M50 57A10 10 0 0 1 70 57Z";
const LEAVES = "M60 68C52 68 45 63 42 55C50 54 57 58 60 68Z M60 68C68 68 75 63 78 55C70 54 63 58 60 68Z";
const LINES = "M4 62.2H40V64.6H4Z M80 62.2H116V64.6H80Z";

/**
 * The sunrise emblem from the top of the bag: gold rays and sun over two leaves, with a fine line either side.
 * Colors come from CSS: --mark-sun (rays + sun) and --mark-leaf (leaves + lines).
 */
export function TalloMark({ title = "Tallo", lines = true, ...props }: SVGProps<SVGSVGElement> & { title?: string; lines?: boolean }) {
  return (
    <svg
      viewBox={lines ? "0 0 120 72" : "36 8 48 64"}
      role="img"
      aria-label={title || undefined}
      aria-hidden={title ? undefined : true}
      {...props}
      className={["t-mark", props.className].filter(Boolean).join(" ")}
    >
      <path fill="var(--mark-sun, #C69A4A)" d={RAYS} />
      <path fill="var(--mark-leaf, #5A1416)" d={lines ? `${LEAVES} ${LINES}` : LEAVES} />
    </svg>
  );
}

/** The name, set in the bag's serif with wide spacing. */
export function TalloWordmark({ className }: { className?: string }) {
  return (
    <span className={["t-wordmark", className].filter(Boolean).join(" ")} aria-label="Tallo">
      TALLO
    </span>
  );
}

export function TalloLockup({ className }: { className?: string }) {
  return (
    <span className={["t-lockup", className].filter(Boolean).join(" ")}>
      <TalloMark className="t-lockup__mark" title="" lines={false} />
      <TalloWordmark />
    </span>
  );
}
