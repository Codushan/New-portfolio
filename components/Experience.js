"use client";

import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";

const experienceData = [
    {
        year: "Nov 2024 - Present",
        title: "Research Project",
        institution: "Production of Green Hydrogen from Sewage Sludge",
        description: "Working on a solar-powered bioreactor for sustainable hydrogen production.",
        color: "from-blue-500/20 to-cyan-500/20",
        border: "border-cyan-500/50"
    },
    {
        year: "Oct 2023 - Present",
        title: "Tech Lead",
        institution: "Civil Engineering Association (CEA), NIT Calicut",
        description: "Leading technical initiatives and managing web development projects for the association.",
        color: "from-purple-500/20 to-pink-500/20",
        border: "border-purple-500/50"
    },
    {
        year: "Sept 2024",
        title: "Traffic Engineering Project",
        institution: "Four-Way No Signal Junction",
        description: "Analyzed and designed a traffic solution for a complex junction.",
        color: "from-amber-500/20 to-orange-500/20",
        border: "border-amber-500/50"
    },
    {
        year: "June 2024",
        title: "Internship",
        institution: "GREENWORLD SOLARWARES Pvt. Ltd.",
        description: "Gained site-level construction operations experience on a road project.",
        color: "from-green-500/20 to-emerald-500/20",
        border: "border-green-500/50"
    },
    {
        year: "Oct 2023",
        title: "Participant",
        institution: "Smart India Hackathon 2023",
        description: "Developed a prototype for a government chatbot.",
        color: "from-red-500/20 to-rose-500/20",
        border: "border-red-500/50"
    }
];

export default function Experience() {
    return (
        <section id="experience" className="py-20 px-6 relative overflow-visible">
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-background to-background opacity-50"></div>
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        Collage <span className="text-gradient">Experiences</span>
                    </h2>
                    <p className="text-foreground/60 max-w-2xl mx-auto">
                        My journey through various projects, roles, and technical challenges.
                    </p>
                </motion.div>

                <div className="flex flex-wrap justify-center gap-8">
                    {experienceData.map((item, index) => (
                        <motion.div
                            key={index}
                            className="experience-card-wrapper"
                            initial={{ y: 200, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: false, margin: "100px" }}
                            transition={{
                                type: "spring",
                                stiffness: 50,
                                damping: 20,
                                delay: index * 0.1
                            }}
                        >
                            <motion.div
                                animate={{
                                    y: [0, -10, 0],
                                }}
                                transition={{
                                    y: {
                                        duration: 3 + Math.random() * 2,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                        delay: Math.random() * 2 + 1 // Add delay so it doesn't start while entering
                                    }
                                }}
                                whileHover={{ y: -10, scale: 1.02 }}
                                className={`relative w-full p-6 rounded-2xl border backdrop-blur-sm bg-gradient-to-br ${item.color} ${item.border} shadow-lg group h-full`}
                            >
                                <div className="mb-4 flex items-center justify-between">
                                    <div className="p-2 rounded-lg bg-background/50 border border-white/10">
                                        <Briefcase size={24} className="text-foreground" />
                                    </div>
                                    <span className="text-xs font-mono py-1 px-3 rounded-full bg-background/50 border border-white/10 text-foreground/80">
                                        {item.year}
                                    </span>
                                </div>

                                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors duration-300">
                                    {item.title}
                                </h3>
                                <h4 className="text-sm font-semibold text-foreground/70 mb-4 uppercase tracking-wider">
                                    {item.institution}
                                </h4>
                                <p className="text-foreground/70 text-sm leading-relaxed">
                                    {item.description}
                                </p>
                            </motion.div>
                        </motion.div>
                    ))}
                </div>
            </div>
            <style jsx>{`
                .experience-card-wrapper {
                    width: 100%;
                }
                @media (min-width: 768px) {
                    .experience-card-wrapper { width: calc(50% - 2rem); }
                }
                @media (min-width: 1024px) {
                    .experience-card-wrapper { width: calc(33.33% - 2rem); }
                }
            `}</style>
        </section>
    );
}
