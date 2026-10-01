"use client";

import { useEffect, useRef } from "react";

/**
 * Background video that costs nothing until it's needed. The page loads only a small poster image;
 * the video itself starts downloading when its section comes within one screen of view, plays while
 * on screen and pauses when scrolled away. Before this, the 5 MB clip downloaded on page load and
 * held back the hero photo on phones.
 */
export default function LazyVideo({ src, poster, className }: { src: string; poster: string; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!video.getAttribute("src")) video.src = src;
          video.play().catch(() => {
            // Autoplay can be refused (power saving); the poster stays, which is fine.
          });
        } else if (video.getAttribute("src")) {
          video.pause();
        }
      },
      { rootMargin: "100% 0px" },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [src]);

  return (
    <video
      ref={ref}
      className={className}
      poster={poster}
      preload="none"
      loop
      muted
      playsInline
      aria-hidden
    />
  );
}
