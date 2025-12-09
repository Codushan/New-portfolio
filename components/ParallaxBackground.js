"use client";

import { useScroll, useTransform, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useTheme } from "./ThemeProvider";

export default function ParallaxBackground() {
    const { theme } = useTheme();
    const { scrollY } = useScroll();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Parallax transforms
    const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
    const y2 = useTransform(scrollY, [0, 1000], [0, -150]);
    const y3 = useTransform(scrollY, [0, 1000], [0, 400]);

    const rotate1 = useTransform(scrollY, [0, 1000], [0, 45]);
    const rotate2 = useTransform(scrollY, [0, 1000], [0, -30]);

    if (!mounted) return null;

    return (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
            {theme === "light" ? (
                <>
                    {/* Light Mode: Sepia / History / Organic */}
                    <div className="absolute inset-0 opacity-10"
                        style={{
                            backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%238b5a2b' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"
                        }}
                    />

                    {/* Floating Organic Shapes (Clouds/Ink Blots) */}
                    <motion.div style={{ y: y1, x: -50 }} className="absolute top-10 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
                    <motion.div style={{ y: y2, x: 100 }} className="absolute top-1/3 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
                    <motion.div style={{ y: y3, rotate: rotate1 }} className="absolute bottom-20 left-1/4 w-72 h-72 bg-accent/5 rounded-full blur-2xl" />

                    {/* Subtle Particles/Dust */}
                    <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-[0.05] mix-blend-overlay"></div>
                </>
            ) : (
                <>
                    {/* Dark Mode: Futuristic / Grid / Neon */}
                    <div className="absolute inset-0 bg-quartermaster opacity-40"></div>
                    <div className="absolute inset-0 grid-overlay opacity-30"></div>

                    {/* Moving Cyber Shapes */}
                    <motion.div
                        style={{ y: y2, rotate: rotate2 }}
                        className="absolute top-20 right-20 w-80 h-80 border border-primary/20 rounded-full"
                    />
                    <motion.div
                        style={{ y: y1 }}
                        className="absolute bottom-40 left-10 w-40 h-40 border border-secondary/20 rotate-45"
                    />
                </>
            )}
        </div>
    );
}
