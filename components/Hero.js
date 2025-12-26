"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail, FileText } from "lucide-react";
import { useEffect, useState, useRef, useMemo } from "react";

export default function Hero() {
    const [text, setText] = useState("");
    const fullText = "Aspiring Software Engineer | Full Stack Developer | AI/ML Enthusiast";
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    // Reduce blur, focusing on hard pixelated destruction
    const contentValues = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

    useEffect(() => {
        let index = 0;
        const interval = setInterval(() => {
            setText(fullText.slice(0, index));
            index++;
            if (index > fullText.length) clearInterval(interval);
        }, 50);
        return () => clearInterval(interval);
    }, []);

    // Generate many small pixels for "high res" destruction
    // 25x25 = 625 pixels. Small enough to look like "pixels", not blocks.
    const rows = 20;
    const cols = 20;
    const pixels = useMemo(() => {
        return Array.from({ length: rows * cols }).map((_, i) => ({
            id: i,
            // Random start time for each pixel to appear/disappear
            threshold: Math.random() * 0.5 // Occurs between 0 and 0.5 scroll progress
        }));
    }, []);

    return (
        <section ref={containerRef} className="relative min-h-screen flex flex-col justify-center items-center text-center overflow-hidden px-6 bg-quartermaster">

            {/* Pixel Destruction Grid Overlay */}
            <div className="absolute inset-0 z-20 pointer-events-none flex flex-wrap content-start">
                {pixels.map((pixel) => (
                    <Pixel
                        key={pixel.id}
                        threshold={pixel.threshold}
                        scrollYProgress={scrollYProgress}
                        total={rows * cols}
                    />
                ))}
            </div>

            {/* Grid Overlay */}
            <div className="absolute inset-0 grid-overlay z-0" />

            {/* Content */}
            <motion.div
                style={{ opacity: contentValues }}
                className="z-10 max-w-4xl relative"
            >
                <div className="mb-6 inline-block px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium">
                    Open to Work
                </div>

                <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight leading-tight">
                    Hi, I'm <span className="text-gradient">Chandrabhushan</span>
                </h1>

                <div className="h-24 md:h-32 flex items-center justify-center">
                    <p className="text-xl md:text-3xl text-foreground/80 font-light max-w-2xl mx-auto">
                        {text}
                        <span className="animate-pulse">|</span>
                    </p>
                </div>

                <div className="flex flex-col md:flex-row gap-4 justify-center items-center mt-8">
                    <motion.a
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        href="#projects"
                        className="px-8 py-4 bg-primary text-white rounded-full font-semibold shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all"
                    >
                        View Projects
                    </motion.a>
                    <motion.a
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        href="/resume.pdf"
                        className="px-8 py-4 glass rounded-full font-semibold hover:bg-white/10 transition-all flex items-center gap-2"
                    >
                        <FileText size={20} /> Download Resume
                    </motion.a>
                </div>

                <div className="flex gap-6 justify-center mt-12">
                    <motion.a
                        whileHover={{ y: -5 }}
                        href="https://github.com/Codushan"
                        target="_blank"
                        className="p-3 glass rounded-full hover:text-primary transition-colors"
                    >
                        <Github size={24} />
                    </motion.a>
                    <motion.a
                        whileHover={{ y: -5 }}
                        href="https://www.linkedin.com/in/chandrabhushan3"
                        target="_blank"
                        className="p-3 glass rounded-full hover:text-primary transition-colors"
                    >
                        <Linkedin size={24} />
                    </motion.a>
                    <motion.a
                        whileHover={{ y: -5 }}
                        href="mailto:chandrabhushankumar553@gmail.com"
                        className="p-3 glass rounded-full hover:text-primary transition-colors"
                    >
                        <Mail size={24} />
                    </motion.a>
                </div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-50"
            >
                <ArrowDown size={32} />
            </motion.div>
        </section>
    );
}

// Separate component for performance optimization
function Pixel({ threshold, scrollYProgress }) {
    const scale = useTransform(scrollYProgress,
        [threshold, threshold + 0.05], // Tiny window for "sudden" appearance
        [0, 1.5] // Overshoot slightly to ensure coverage
    );

    // Hard toggle opacity
    const opacity = useTransform(scrollYProgress, (value) =>
        value > threshold ? 1 : 0
    );

    return (
        <motion.div
            className="w-[5%] h-[5vh] bg-background border border-white/5" // 5% width = 20 columns
            style={{
                scale: scale,
                opacity: opacity
            }}
        />
    );
}
