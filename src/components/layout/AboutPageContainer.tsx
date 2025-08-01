"use client";

import { AboutSection1 } from "@/components/sections/AboutSection1";
import { AboutSection1End } from "@/components/sections/transitions/AboutSection1End";
import { AboutSection2Start } from "@/components/sections/transitions/AboutSection2Start";
import { AboutSection2 } from "@/components/sections/AboutSection2";
import { AboutSection2End } from "@/components/sections/transitions/AboutSection2End";
import { AboutSection3Start } from "@/components/sections/transitions/AboutSection3Start";
import { AboutSection3 } from "@/components/sections/AboutSection3";
import { AboutSection3End } from "@/components/sections/transitions/AboutSection3End";
import { AboutSection4Start } from "@/components/sections/transitions/AboutSection4Start";
import { AboutSection4 } from "@/components/sections/AboutSection4";
import { AboutSection4End } from "@/components/sections/transitions/AboutSection4End";
import { AboutSection5Start } from "@/components/sections/transitions/AboutSection5Start";
import { AboutSection5 } from "@/components/sections/AboutSection5";
import { AboutSection5End } from "@/components/sections/transitions/AboutSection5End";

export function AboutPageContainer() {
  return (
    <main className="relative">
      <AboutSection1 />
      <AboutSection1End />
      <AboutSection2Start />
      <AboutSection2 />
      <AboutSection2End />
      <AboutSection3Start />
      <AboutSection3 />
      <AboutSection3End />
      <AboutSection4Start />
      <AboutSection4 />
      <AboutSection4End />
      <AboutSection5Start />
      <AboutSection5 />
      <AboutSection5End />
    </main>
  );
} 