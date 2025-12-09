"use client";

import { motion } from "framer-motion";
import { ArrowUp, Github, Linkedin, Twitter } from "lucide-react";

export default function Footer() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <footer className="py-12 px-6 border-t border-foreground/10 bg-background relative">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                <div>
                    <h2 className="text-2xl font-bold tracking-tighter mb-2">
                        CHANDRABHUSHAN<span className="text-primary">.</span>
                    </h2>
                    <p className="text-foreground/60 text-sm">
                        © {new Date().getFullYear()} Chandrabhushan Kumar. All rights reserved.
                    </p>
                </div>

                <div className="flex gap-6">
                    {[Github, Linkedin, Twitter].map((Icon, i) => (
                        <motion.a
                            key={i}
                            whileHover={{ y: -5, color: "var(--primary)" }}
                            href="#"
                            className="text-foreground/60 transition-colors"
                        >
                            <Icon size={24} />
                        </motion.a>
                    ))}
                </div>

                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={scrollToTop}
                    className="p-3 bg-primary text-white rounded-full shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all"
                >
                    <ArrowUp size={24} />
                </motion.button>
            </div>
        </footer>
    );
}
