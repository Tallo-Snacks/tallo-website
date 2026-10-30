"use client";

import { useEffect, useRef, type ReactNode } from "react";

export type Chapter = {
  id: string;
  kicker: string;
  title: string;
  body: string;
  tags?: string[];
  actions?: ReactNode;
  align?: "left" | "right";
};

type Props = {
  chapters: Chapter[];
  src: string;
  mobileSrc: string;
  poster: string;
  mobilePoster: string;
};

/**
 * Scroll-driven film. The video sits in a sticky stage; scrolling through the
 * chapters below it sets the video's current time. Chapter copy is ordinary
 * HTML, always rendered, so the page reads fine with no JavaScript at all.
 */
export function ScrollFilm({ chapters, src, mobileSrc, poster, mobilePoster }: Props) {
  const rootRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const video = videoRef.current;
    if (!root || !video) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const isMobile = window.matchMedia("(max-width: 760px)").matches;
    const url = isMobile ? mobileSrc : src;
    let blobUrl: string | null = null;
    let target = 0;
    let raf = 0;
    let ready = false;
    const controller = new AbortController();

    // Load the whole clip into memory so seeking is instant in both directions.
    fetch(url, { signal: controller.signal })
      .then((r) => r.blob())
      .then((b) => {
        blobUrl = URL.createObjectURL(b);
        video.src = blobUrl;
        video.load();
      })
      .catch(() => {
        /* poster stays up; page still reads fine */
      });

    const onMeta = () => {
      ready = true;
      video.pause();
      onScroll();
    };
    const onSeeked = () => root.setAttribute("data-painted", "true");
    video.addEventListener("loadedmetadata", onMeta);
    video.addEventListener("seeked", onSeeked);

    const progress = () => {
      const rect = root.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      return Math.min(1, Math.max(0, -rect.top / Math.max(total, 1)));
    };

    const tick = () => {
      raf = 0;
      if (!ready || !video.duration) return;
      const t = target * (video.duration - 0.05);
      if (!video.seeking && Math.abs(video.currentTime - t) > 0.01) video.currentTime = t;
      if (video.seeking || Math.abs(video.currentTime - t) > 0.01) raf = requestAnimationFrame(tick);
    };

    function onScroll() {
      target = progress();
      if (barRef.current) barRef.current.style.transform = `scaleX(${target})`;
      if (!raf) raf = requestAnimationFrame(tick);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();

    return () => {
      controller.abort();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      video.removeEventListener("loadedmetadata", onMeta);
      video.removeEventListener("seeked", onSeeked);
      if (raf) cancelAnimationFrame(raf);
      if (blobUrl) URL.revokeObjectURL(blobUrl);
    };
  }, [src, mobileSrc]);

  return (
    <section ref={rootRef} className="t-film" aria-label="How Tallo is made">
      <div className="t-film__stage" aria-hidden="true">
        <picture className="t-film__poster">
          <source media="(max-width: 760px)" srcSet={mobilePoster} />
          <img src={poster} alt="" />
        </picture>
        <video ref={videoRef} className="t-film__video" muted playsInline preload="none" />
        <div className="t-film__shade" />
        <div className="t-film__progress">
          <span ref={barRef} />
        </div>
      </div>
      <div className="t-film__story">
        {chapters.map((c, i) => {
          const Heading = i === 0 ? "h1" : "h2";
          return (
            <article key={c.id} id={c.id} className="t-film__chapter" data-align={c.align ?? "left"}>
              <div className="t-film__copy">
                <p className="t-film__kicker">{c.kicker}</p>
                <Heading className="t-film__title">{c.title}</Heading>
                <p className="t-film__body">{c.body}</p>
                {c.tags?.length ? (
                  <ul className="t-film__tags">
                    {c.tags.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                ) : null}
                {c.actions ? <div className="t-film__actions">{c.actions}</div> : null}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
