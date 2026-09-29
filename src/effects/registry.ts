/**
 * The effects collection: every JavaScript effect on the site is switched here.
 * To remove one, set it to false (or delete its line and its code). Nothing else has to change.
 *
 * Two layers:
 *  - GSAP + Lenis: smooth scrolling and scroll choreography (components/motion/)
 *  - Anime.js: pointer effects, drawing and text (this folder)
 * Visitors who ask their device for less motion get none of it: the page is simply static.
 */
export const EFFECTS = {
  // --- GSAP + Lenis (components/motion/) ---
  /** Smooth, weighted mouse-wheel scrolling (Lenis). Touch stays native. */
  smoothScroll: true,
  /** A thin line along the top of the screen that fills as you scroll. */
  scrollProgress: true,
  /** The header logo shrinks a little once you start scrolling. */
  headerShrink: true,
  /** Hero: photo settles in, headline rises word by word, buttons follow. */
  heroIntro: true,
  /** Hero and the video section: the picture drifts slower than the page. */
  parallax: true,
  /** Section headings rise word by word as they come into view. */
  headingReveal: true,
  /** Paragraphs and card groups rise into place as they come into view. */
  blockReveal: true,
  /** The portrait in "About" is uncovered with a wipe. */
  imageReveal: true,
  /** The word band under the hero: it loops, and speeds up while you scroll. */
  marquee: true,
  /** A ball of white dust sweeps across the bottom of the page once, at the very end. */
  magicDust: true,

  // --- Anime.js (this folder) ---
  /** Hero: a soft white light follows the mouse. Mouse only. */
  cursorSpotlight: true,
  /** Main buttons lean towards the mouse when it comes close. Mouse only. */
  magneticButtons: true,
  /** Buttons squash when pressed and spring back. */
  springPress: true,
  /** Offer and step cards tilt in 3D towards the mouse. Mouse only. */
  cardTilt: true,
  /** Section labels decode from random letters when they come into view. */
  labelScramble: true,
  /** "Who it's for": the tick marks draw themselves. */
  checkDraw: true,
  /** "Next steps": a line draws between the steps as you scroll, with a spark riding it. */
  stepsThread: true,
} as const;

export type EffectName = keyof typeof EFFECTS;
