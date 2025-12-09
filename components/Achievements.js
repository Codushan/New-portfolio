"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Award, Star, Trophy, Users, Code, Cpu } from "lucide-react";
import Image from "next/image";

const achievements = [
    {
        title: "Tech Lead",
        description: "Civil Engineering Association (CEA), NIT Calicut",
        icon: Users,
        color: "text-cyan-400",
        image: "/achievement_techlead.png"
    },
    {
        title: "Design Head",
        description: "DND and SNS Club, NIT Calicut",
        icon: Star,
        color: "text-purple-400",
        image: "/achievement_sns.png"
    },
    {
        title: "Event Coordinator",
        description: "SGC and Magazine Club, NIT Calicut",
        icon: Trophy,
        color: "text-amber-400",
        image: "/achievement_sgc.png" // Reusing leadership or could use another variant
    },
    {
        title: "Data Science Bootcamp",
        description: "Udemy - ML, DL, NLP & Data Analysis",
        icon: Cpu,
        color: "text-emerald-400",
        image: "/achievement_udemy.png"
    },
    {
        title: "Responsive Web Design",
        description: "FreeCodeCamp Certification",
        icon: Code,
        color: "text-blue-400",
        image: "/achievement_web.png"
    },
    {
        title: "Smart India Hackathon",
        description: "Participant - 2023",
        icon: Award,
        color: "text-rose-400",
        image: "/achievement_sih.png"
    },
];

function Card({ item, index }) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
    const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

    function handleMouseMove(event) {
        const { left, top, width, height } = event.currentTarget.getBoundingClientRect();
        const xPct = (event.clientX - left) / width - 0.5;
        const yPct = (event.clientY - top) / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    }

    function handleMouseLeave() {
        x.set(0);
        y.set(0);
    }

    const rotateX = useTransform(mouseY, [-0.5, 0.5], ["10deg", "-10deg"]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-10deg", "10deg"]);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative h-64 rounded-2xl overflow-hidden group perspective-1000 cursor-pointer"
        >
            {/* 3D Background Image */}
            <div className="absolute inset-0 z-0 transition-transform duration-500 group-hover:scale-110">
                <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500"
                />
                <div className="absolute inset-0 bg-black/70 group-hover:bg-black/50 transition-colors duration-500" />
            </div>

            {/* Content */}
            <div className="relative z-10 h-full flex flex-col items-center justify-center p-6 text-center transform transition-transform duration-500 group-hover:translate-z-10 bg-white/5 backdrop-blur-[2px] border border-white/10 group-hover:border-primary/50">
                <div className={`mb-4 p-4 rounded-full bg-black/50 border border-white/10 shadow-xl ${item.color} group-hover:scale-110 transition-transform duration-300`}>
                    <item.icon size={32} />
                </div>

                <h3 className="text-xl font-bold mb-2 text-white group-hover:text-primary transition-colors">{item.title}</h3>
                <p className="text-sm text-gray-300 group-hover:text-white transition-colors">{item.description}</p>
            </div>

        </motion.div>
    );
}

export default function Achievements() {
    return (
        <section className="py-20 px-6 bg-quartermaster relative overflow-hidden">
            {/* Background decorative elements */}
            {/* <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(17,24,39,0)_0%,rgba(0,0,0,1)_100%)] pointer-events-none" /> */}

            <div className="max-w-6xl mx-auto relative z-10">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-5xl font-bold mb-16 text-center"
                >
                    <span className="text-gradient">Achievements & Roles</span>
                </motion.h2>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 perspective-1000">
                    {achievements.map((item, index) => (
                        <Card key={index} item={item} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}
