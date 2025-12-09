"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const words = [
    "INITIALIZING SYSTEM...",
    "LOADING MODULES...",
    "ESTABLISHING UPLINK...",
    "DECRYPTING ASSETS...",
    "ACCESS GRANTED"
];

export default function Preloader({ onComplete }) {
    const [index, setIndex] = useState(0);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Text cycling
        const textInterval = setInterval(() => {
            setIndex((prev) => (prev + 1) % words.length);
        }, 400);

        // Progress bar simulation
        const progressInterval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(progressInterval);
                    clearInterval(textInterval);
                    setTimeout(onComplete, 500); // Slight delay after 100% before exit
                    return 100;
                }
                // Random increments for "hacking" feel
                return prev + Math.floor(Math.random() * 10) + 1;
            });
        }, 200);

        return () => {
            clearInterval(textInterval);
            clearInterval(progressInterval);
        };
    }, [onComplete]);

    return (
        <motion.div
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black text-white overflow-hidden"
            initial={{ opacity: 1 }}
            exit={{ y: "-100%", transition: { duration: 0.8, ease: "easeInOut" } }}
        >
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 pointer-events-none" />

            {/* Central Spinner / Reactor */}
            <div className="relative mb-12">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="w-24 h-24 border-t-2 border-b-2 border-primary rounded-full"
                />
                <motion.div
                    animate={{ rotate: -180 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-2 border-r-2 border-l-2 border-secondary rounded-full"
                />
                <div className="absolute inset-0 flex items-center justify-center font-mono text-xl font-bold text-primary animate-pulse">
                    {Math.min(100, progress)}%
                </div>
            </div>

            {/* Glitch Tech Text */}
            <div className="font-mono text-lg md:text-2xl tracking-widest text-primary h-8 mb-8">
                {words[Math.min(index, words.length - 1)]}
            </div>

            {/* Progress Bar Container */}
            <div className="w-64 md:w-96 h-2 bg-white/10 rounded-full overflow-hidden relative">
                <motion.div
                    className="h-full bg-gradient-to-r from-primary to-secondary"
                    style={{ width: `${Math.min(100, progress)}%` }}
                    initial={{ width: 0 }}
                />
                {/* Glow effect on bar */}
                <div className="absolute top-0 bottom-0 right-0 w-4 bg-white/50 blur-md transform translate-x-full animate-shimmer" />
            </div>

            {/* Footer Tech Details */}
            <div className="absolute bottom-8 text-xs font-mono text-white/30 flex gap-8">
                <span>SYS.VER.2025.12</span>
                <span>SECURE_CONNECTION</span>
                <span>MEM_alloc: 64TB</span>
            </div>
        </motion.div>
    );
}
