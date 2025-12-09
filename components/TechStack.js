"use client";

import { motion } from "framer-motion";

const skills = [
    { name: "Python", color: "#3776AB" },
    { name: "C++", color: "#00599C" },
    { name: "HTML", color: "#E34F26" },
    { name: "CSS", color: "#1572B6" },
    { name: "JavaScript", color: "#F7DF1E" },
    { name: "React.js", color: "#61DAFB" },
    { name: "Next.js", color: "#000000" },
    { name: "Node.js", color: "#339933" },
    { name: "Express.js", color: "#000000" },
    { name: "MongoDB", color: "#47A248" },
    { name: "MySQL", color: "#4479A1" },
    { name: "TensorFlow", color: "#FF6F00" },
    { name: "Scikit-learn", color: "#F7931E" },
    { name: "Docker", color: "#2496ED" },
    { name: "AWS", color: "#FF9900" },
    { name: "Git", color: "#F05032" },
    { name: "Figma", color: "#F24E1E" },
    { name: "Tailwind CSS", color: "#38B2AC" },
    { name: "MATLAB", color: "#e16737" },
    { name: "Staad Pro", color: "#005A9C" },
    { name: "AutoCAD", color: "#E31D1A" },
    { name: "QGIS", color: "#589632" },
];

export default function TechStack() {
    // Explosion stagger effect
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05,
                delayChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, scale: 0, y: 50 },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 200
            }
        }
    };

    return (
        <section id="tech" className="py-20 px-6 bg-secondary/5">
            <div className="max-w-6xl mx-auto text-center">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-5xl font-bold mb-16"
                >
                    Tech <span className="text-gradient">Galaxy</span>
                </motion.h2>

                <motion.div
                    className="flex flex-wrap justify-center gap-6"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.2 }}
                >
                    {skills.map((skill, index) => (
                        <motion.div
                            key={skill.name}
                            variants={itemVariants}
                            whileHover={{
                                scale: 1.1,
                                rotate: 5,
                                boxShadow: `0 0 20px ${skill.color}40`,
                                transition: { duration: 0.1, type: "spring", stiffness: 300, damping: 20 }
                            }}
                            className="glass px-6 py-4 rounded-full cursor-pointer flex items-center gap-2 group"
                            style={{ borderColor: `${skill.color}40` }}
                        >
                            <span
                                className="w-3 h-3 rounded-full"
                                style={{ backgroundColor: skill.color }}
                            />
                            <span className="font-medium group-hover:text-primary transition-colors">
                                {skill.name}
                            </span>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
