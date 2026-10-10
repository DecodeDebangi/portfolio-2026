import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { WorkSection } from "@/components/WorkSection";
import { ExperienceSection } from "@/components/ExperienceSection";
import { AboutSection } from "@/components/AboutSection";
import { SkillsSection } from "@/components/SkillsSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";

import { AnimatedSection } from "@/components/AnimatedSection";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1 flex flex-col w-full">
        <AnimatedSection delay={0.1}><HeroSection /></AnimatedSection>
        <AnimatedSection><WorkSection /></AnimatedSection>
        <AnimatedSection><ExperienceSection /></AnimatedSection>
        <AnimatedSection><AboutSection /></AnimatedSection>
        <AnimatedSection><SkillsSection /></AnimatedSection>
        <AnimatedSection><ContactSection /></AnimatedSection>
      </main>
      <Footer />
    </>
  );
}
