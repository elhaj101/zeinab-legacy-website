"use client";

import { CardTilt } from "./CardTilt";
import { CheckDraw } from "./CheckDraw";
import { CursorSpotlight } from "./CursorSpotlight";
import { LabelScramble } from "./LabelScramble";
import { MagneticButtons } from "./MagneticButtons";
import { SpringPress } from "./SpringPress";
import { StepsThread } from "./StepsThread";
import { usePathname } from "next/navigation";
import { Fragment } from "react";

/**
 * All Anime.js effects, mounted once in the locale layout. Each one is switched on or off in
 * ./registry.ts. Keyed by page so they look the markup up again after a client-side navigation.
 */
export function Effects({ locale }: { locale: string }) {
  const pathname = usePathname();
  return (
    <>
      <Fragment key={pathname}>
        <SpringPress />
        <MagneticButtons />
        <CursorSpotlight />
        <CardTilt />
        <LabelScramble locale={locale} />
        <CheckDraw />
        <StepsThread />
      </Fragment>
    </>
  );
}
