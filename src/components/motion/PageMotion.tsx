"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { usePathname } from "next/navigation";
import { EFFECTS } from "@/effects/registry";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

/**
 * Scroll and load choreography for every page, driven by data attributes in the markup:
 *   data-scroll-progress   the line along the top of the screen
 *   data-hero-media        hero photo: settles in on load, then drifts slower than the page
 *   data-intro="head"      hero headline (its words are [data-intro-word]), rises on load
 *   data-intro="rise"      other hero blocks, rise on load one after another
 *   data-anim="words"      heading rises word by word (words only, so Arabic letters stay joined)
 *   data-anim="rise"       block fades and rises into place
 *   data-anim="stagger"    its children rise one after another
 *   data-reveal="image"    picture uncovered with a wipe
 *   data-parallax          picture drifts inside its section while the section scrolls past
 *   data-marquee-track     the word band; loops, and speeds up with the scroll speed
 * Every block is switched in src/effects/registry.ts. Without JavaScript, or with reduced
 * motion, everything simply shows in its final state.
 */
export function PageMotion({ locale }: { locale: string }) {
  const pathname = usePathname();

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.defaults({ ease: "power3.out", duration: 0.9 });
        const all = (selector: string) => gsap.utils.toArray<HTMLElement>(selector);
        const one = (selector: string) => document.querySelector<HTMLElement>(selector);
        const once = (trigger: Element, start = "top 88%") => ({ trigger, start, once: true });
        const undo: (() => void)[] = [];

        if (EFFECTS.scrollProgress) {
          const bar = one("[data-scroll-progress]");
          if (bar) gsap.to(bar, { scaleX: 1, ease: "none", scrollTrigger: { start: 0, end: "max", scrub: 0.2 } });
        }

        if (EFFECTS.headerShrink) {
          const header = one(".site-header");
          if (header) {
            ScrollTrigger.create({
              start: 40,
              end: 1e7,
              onToggle: (self) => header.setAttribute("data-shrunk", String(self.isActive)),
            });
            undo.push(() => header.removeAttribute("data-shrunk"));
          }
        }

        if (EFFECTS.heroIntro) {
          const media = one("[data-hero-media]");
          const head = one('[data-intro="head"]');
          const words = all("[data-intro-word]");
          const rise = all('[data-intro="rise"]');
          const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
          if (media) tl.fromTo(media, { scale: 1.18 }, { scale: 1, duration: 2.4, ease: "power3.out" }, 0);
          if (head) tl.set(head, { opacity: 1 }, 0.1);
          if (words.length) tl.from(words, { yPercent: 118, duration: 1.2, stagger: 0.09 }, 0.15);
          if (rise.length) tl.fromTo(rise, { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 1.1, stagger: 0.14 }, 0.9);
        }

        if (EFFECTS.parallax) {
          // Hero: the photo trails the page a little. The gap this opens is always above the screen.
          const hero = one("[data-hero]");
          const media = one("[data-hero-media]");
          if (hero && media)
            gsap.to(media, {
              yPercent: 14,
              ease: "none",
              scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: true },
            });
          for (const el of all("[data-parallax]"))
            gsap.fromTo(
              el,
              { yPercent: -7 },
              {
                yPercent: 7,
                ease: "none",
                scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: true },
              },
            );
        }

        if (EFFECTS.headingReveal) {
          for (const el of all('[data-anim="words"]')) {
            const split = SplitText.create(el, { type: "words", mask: "words" });
            gsap.from(split.words, {
              yPercent: 110,
              opacity: 0,
              duration: 1,
              ease: "power4.out",
              stagger: 0.05,
              scrollTrigger: once(el),
              // Put the heading back to plain text once it has landed: the dozens of wrapper
              // elements per heading otherwise stay in the page and slow every style update.
              onComplete: () => split.revert(),
            });
          }
        }

        if (EFFECTS.blockReveal) {
          for (const el of all('[data-anim="rise"]'))
            gsap.from(el, { y: 32, opacity: 0, clearProps: "transform,opacity", scrollTrigger: once(el) });
          for (const el of all('[data-anim="stagger"]'))
            gsap.from(el.children, {
              y: 36,
              opacity: 0,
              stagger: 0.09,
              clearProps: "transform,opacity",
              scrollTrigger: once(el, "top 85%"),
            });
        }

        if (EFFECTS.imageReveal) {
          for (const el of all('[data-reveal="image"]')) {
            gsap.fromTo(
              el,
              { clipPath: "inset(0% 0% 100% 0%)" },
              {
                clipPath: "inset(0% 0% 0% 0%)",
                duration: 1.4,
                ease: "power4.inOut",
                clearProps: "clipPath",
                scrollTrigger: once(el, "top 85%"),
              },
            );
            const img = el.querySelector("img");
            if (img) gsap.from(img, { scale: 1.25, duration: 1.8, scrollTrigger: once(el, "top 85%") });
          }
        }

        if (EFFECTS.marquee) {
          const track = one("[data-marquee-track]");
          if (track) {
            const rtl = document.documentElement.dir === "rtl";
            // The track holds the same content twice, so moving it by half loops without a seam.
            const loop = gsap.fromTo(
              track,
              { xPercent: rtl ? -50 : 0 },
              { xPercent: rtl ? 0 : -50, ease: "none", duration: 36, repeat: -1, paused: true },
            );
            // Scrolling makes the band speed up in the direction of travel, then it settles back.
            // One ticker function eases the speed, and it only runs while the band is on screen.
            let speed = 1;
            let target = 1;
            const ease = () => {
              target += (1 - target) * 0.06;
              speed += (target - speed) * 0.2;
              loop.timeScale(speed);
            };
            ScrollTrigger.create({
              trigger: track.parentElement,
              start: "top bottom",
              end: "bottom top",
              onToggle(self) {
                if (self.isActive) {
                  loop.play();
                  gsap.ticker.add(ease);
                } else {
                  loop.pause();
                  gsap.ticker.remove(ease);
                }
              },
              onUpdate(self) {
                target = 1 + gsap.utils.clamp(-6, 6, self.getVelocity() / 350);
              },
            });
            undo.push(() => gsap.ticker.remove(ease));
          }
        }

        return () => undo.forEach((fn) => fn());
      });
      return () => mm.revert();
    },
    { dependencies: [locale, pathname], revertOnUpdate: true },
  );

  return null;
}

/** The progress line itself. It is filled by PageMotion. */
export function ScrollProgress() {
  if (!EFFECTS.scrollProgress) return null;
  return <div data-scroll-progress aria-hidden="true" className="scroll-progress" />;
}
