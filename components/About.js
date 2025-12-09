"use client";

import { motion } from "framer-motion";
import { Code, User, GraduationCap } from "lucide-react";

const educationData = [
    {
        year: "Nov 2022 - Present",
        title: "B.Tech in Civil Engineering",
        institution: "National Institute of Technology, Calicut",
        description: "CGPA: 7.90/10. Active member of CEA, DND, and SGC clubs.",
    },
    {
        year: "2021",
        title: "Senior Secondary (12th)",
        institution: "Govt. Sr. Secondary School, Tilauthu, Rohtas",
        description: "Percentage: 83.4% (PCM)",
    },
    {
        year: "2019",
        title: "Secondary (10th)",
        institution: "Saraswati Vidya Mandir, Tilauthu, Rohtas",
        description: "Percentage: 94.4%",
    }
];

export default function About() {
    return (
        <section id="about" className="py-20 px-6 relative overflow-visible">
            <div className="max-w-6xl mx-auto">
                <div className="grid md:grid-cols-2 gap-12 items-start overflow-hidden py-10">
                    {/* Text Content - Slides in from LEFT */}
                    <motion.div
                        initial={{ x: -100, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: false, amount: 0.3 }}
                        transition={{ type: "spring", stiffness: 100, damping: 20 }}
                    >
                        <h2 className="text-4xl md:text-5xl font-bold mb-8">
                            About <span className="text-gradient">Me</span>
                        </h2>
                        <p className="text-lg text-foreground/70 mb-6 leading-relaxed">
                            I am an aspiring Software Engineer passionate about building scalable and efficient systems.
                            With expertise in full-stack development, I enjoy solving complex problems using logic and creativity.
                            My experience ranges from building real-time chat applications to deploying AI/ML models for GIS image classification.
                        </p>
                        <p className="text-lg text-foreground/70 mb-6 leading-relaxed">
                            Currently pursuing my B.Tech at NIT Calicut, I actively lead technical teams and mentor junior developers.
                            I am eager to apply my analytical and coding skills to deliver impactful digital products.
                        </p>

                        <div className="grid grid-cols-2 gap-4 mt-8">
                            <div className="glass p-4 rounded-xl">
                                <Code className="text-primary mb-2" size={32} />
                                <h3 className="font-bold text-xl">Full Stack</h3>
                                <p className="text-sm text-foreground/60">Web Development</p>
                            </div>
                            <div className="glass p-4 rounded-xl">
                                <User className="text-secondary mb-2" size={32} />
                                <h3 className="font-bold text-xl">AI / ML</h3>
                                <p className="text-sm text-foreground/60">Integration</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Education Timeline - Slides in from RIGHT */}
                    <motion.div
                        className="relative pl-8 border-l-2 border-gray-200 dark:border-gray-800"
                        initial={{ x: 100, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: false, amount: 0.3 }}
                        transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.2 }}
                    >
                        <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                            <GraduationCap className="text-primary" /> Education
                        </h3>
                        {educationData.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.2 + 0.4, duration: 0.5 }}
                                className="mb-10 relative"
                            >
                                <div className="absolute -left-[41px] top-0 bg-background p-1 rounded-full border border-primary">
                                    <GraduationCap size={20} className="text-primary" />
                                </div>
                                <span className="text-sm text-primary font-mono mb-1 block">{item.year}</span>
                                <h3 className="text-xl font-bold mb-1">{item.title}</h3>
                                <h4 className="text-md font-semibold text-foreground/80 mb-2">{item.institution}</h4>
                                <p className="text-foreground/70 text-sm">{item.description}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
