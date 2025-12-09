"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ParallaxBackground from "@/components/ParallaxBackground";
import About from "@/components/About";
import Experience from "@/components/Experience";
import TechStack from "@/components/TechStack";
import CodingStats from "@/components/CodingStats";
import Projects from "@/components/Projects";
import Achievements from "@/components/Achievements";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Preloader from "@/components/Preloader";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <main className="min-h-screen bg-background text-foreground overflow-hidden relative">
      <AnimatePresence mode="wait">
        {isLoading ? (
          <Preloader key="preloader" onComplete={() => setIsLoading(false)} />
        ) : (
          <>
            <ParallaxBackground />
            <Navbar />
            <Hero />
            <About />
            <TechStack />
            <CodingStats />
            <Projects />
            <Experience />
            <Achievements />
            <Contact />
            <Footer />
          </>
        )}
      </AnimatePresence>
    </main>
  );
}
