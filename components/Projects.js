"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, X, Maximize2, Minimize2 } from "lucide-react";

const projects = [
    {
        title: "BaatWaat - Chat App",
        description: "Real-time messaging app using WebSockets for instant communication. Integrated JWT authentication and deployed on Render.",
        tags: ["React", "Node.js", "MongoDB", "Socket.io", "Cloudinary"],
        image: "/project-baatwaat.svg",
        link: "https://baatwaat.onrender.com",
        github: "https://github.com/Codushan/chat-app",
        details: {
            why: "I wanted to understand how real-time communication works under the hood, specifically WebSocket protocols versus HTTP polling.",
            thinking: "The goal was to create a seamless, WhatsApp-like experience where messages are delivered instantly without page refreshes.",
            workflow: "Started with backend socket setup, then built the frontend React UI. Implemented JWT auth for security and Cloudinary for media sharing.",
            achieved: "Successfully handled concurrent users and real-time typing indicators. Learned deep state management with React.",
            how: "Built using MERN stack with Socket.io. Deployed server on Render and client on Vercel."
        }
    },
    {
        title: "Prithvi Website",
        description: "Official website for Prithvi '25, the Tech Fest of Civil Dept at NIT Calicut. Full-stack development with UI/UX design.",
        tags: ["React", "Node.js", "UI/UX", "Full Stack"],
        image: "/project-prithvi.svg",
        link: "https://prithvi25.in",
        github: "https://github.com/Codushan/Prithvi",
        details: {
            why: "To provide a central platform for event registrations and information for the departmental tech fest.",
            thinking: "The site needed to be visually striking to attract students while being robust enough to handle registration traffic.",
            workflow: "Designed High-fidelity mockups in Figma, then translated them to React components. Backend built with Node/Express for registrations.",
            achieved: "Handled traffic from thousands of students seamlessly. improved user engagement with interactive animations.",
            how: "React for frontend, Node.js/MongoDB for backend. Hosted on VPS for performance."
        }
    },
    {
        title: "GIS Image Classification",
        description: "TensorFlow-based CNN to classify satellite GIS images into urban, water, and forest classes with confidence scoring. Streamlit web app.",
        tags: ["Python", "TensorFlow", "Streamlit", "CNN"],
        image: "/project-gis.svg",
        link: "https://codushan-gis-image-model-streamlit-app-rvt9il.streamlit.app/",
        github: "https://github.com/Codushan/GIS-image-model",
        details: {
            why: "Automating land-use classification is a critical task in civil engineering and urban planning.",
            thinking: "A Convolutional Neural Network (CNN) is best suited for image feature extraction. Streamlit provides an easy interface for demonstration.",
            workflow: "Collected satellite imagery, preprocessed data, trained CNN model using TensorFlow, and deployed via Streamlit.",
            achieved: "High accuracy classification of Urban, Water body, and Green areas. Model performs real-time inference.",
            how: "Python, TensorFlow/Keras for DL, Streamlit for UI."
        }
    },
    {
        title: "RIG Club Website",
        description: "Official website for RIG Club. Handled full-stack development and UI/UX design.",
        tags: ["React", "Node.js", "UI/UX", "Full Stack"],
        image: "/project-rig.svg",
        link: "https://rignitc.com",
        github: "https://github.com/Codushan/rig_web",
        details: {
            why: "To showcase club activities and managing member registrations.",
            thinking: "Needed a modern, dynamic look to reflect the robotics and innovation theme of the club.",
            workflow: "Iterative design process with club members. Developed responsive UI first, then integrated backend APIs.",
            achieved: "Centralized hub for all club activities. Improved visibility on campus.",
            how: "Next.js for SEO and performance, Tailwind CSS for styling."
        }
    },
    {
        title: "AI Chat Interface",
        description: "Intelligent chat interface powered by the Gemini API for natural language interactions.",
        tags: ["React", "Gemini API", "AI"],
        image: "/project-ai-chat.svg",
        link: "https://ai-chat-sigma-gray.vercel.app/",
        github: "https://github.com/Codushan/Ai-Chat",
        details: {
            why: "To explore Large Language Model (LLM) integration in web apps.",
            thinking: "A clean, minimal interface that focuses on the conversation was the priority.",
            workflow: "Set up Gemini API keys, built a chat UI with auto-scrolling, and handled streaming responses.",
            achieved: "Smooth, responsive AI chat experience with markdown support.",
            how: "React, Google Gemini API, Markdown rendering."
        }
    },
    {
        title: "Medibot",
        description: "AI-powered medical assistant utilizing Gemini API and image processing for health queries and analysis.",
        tags: ["Python", "Gemini API", "Image Processing"],
        image: "/project-medibot.svg",
        link: "#",
        github: "#",
        details: {
            why: "To provide quick, preliminary medical information and image analysis.",
            thinking: "Combining computer vision with LLMs can unlock powerful diagnostic aids.",
            workflow: "Integrated image upload for analysis, routed queries to Gemini with specific medical prompts.",
            achieved: "Functional prototype capable of analyzing basic symptoms and medical images.",
            how: "Python, Flask, Google Gemini Vision API."
        }
    },
    {
        title: "Login & Signup System",
        description: "Robust backend system for user authentication, handling login and signup functionalities securely.",
        tags: ["Node.js", "Express", "MongoDB", "Auth"],
        image: "/project-auth.svg",
        link: "https://login-2-ui.vercel.app/",
        github: "https://github.com/Codushan/Login-2",
        details: {
            why: "Auth is the backbone of most apps. I wanted to build a reusable, secure auth service.",
            thinking: "Security first: properly hashing passwords, using HttpOnly cookies, and handling sessions.",
            workflow: "Designed DB schema, implemented bcrypt for hashing, JWT for tokens, and built frontend forms.",
            achieved: "A secure, reusable authentication module.",
            how: "Node.js, Express, MongoDB, BCrypt, JWT."
        }
    },
    {
        title: "Location Search Tool",
        description: "Web application to search for states and districts in India, specifically focused on Bihar.",
        tags: ["JavaScript", "API", "Frontend"],
        image: "/project-location.svg",
        link: "https://thecbweb.netlify.app/",
        github: "http://github.com/Codushan/My-Web",
        details: {
            why: "To solve the problem of easily finding administrative data for local regions.",
            thinking: "Fast search and filtering were the key requirements.",
            workflow: "Collected data into JSON, wrote efficient filter logic in vanilla JS.",
            achieved: "Lightning fast search without server roundtrips.",
            how: "HTML, CSS, Vanilla JavaScript."
        }
    },
    {
        title: "Library Management System",
        description: "RESTful APIs to manage books and student records. Focused on database schema optimization and error-handling.",
        tags: ["Node.js", "Express", "MongoDB"],
        image: "/project-library.svg",
        link: "#",
        github: "#",
        details: {
            why: "To digitize library record interactions.",
            thinking: "Data integrity and efficient querying were paramount.",
            workflow: "Designed ER diagram, normalized schema, implemented CRUD endpoints.",
            achieved: "Efficient API capable of managing thousands of book records.",
            how: "Node.js, Mongoose, Express."
        }
    },
];

export default function Projects() {
    const [selectedProject, setSelectedProject] = useState(null);

    // Prevent scrolling when modal is open
    useEffect(() => {
        if (selectedProject) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        }
    }, [selectedProject]);

    return (
        <section id="projects" className="py-20 px-6">
            <div className="max-w-6xl mx-auto">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-5xl font-bold mb-16 text-center"
                >
                    Featured <span className="text-gradient">Projects</span>
                </motion.h2>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            layoutId={`project-card-${index}`}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -10 }}
                            onClick={() => setSelectedProject(project)}
                            className="glass rounded-xl overflow-hidden group relative flex flex-col h-full cursor-pointer hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300"
                        >
                            {/* Image Placeholder */}
                            <div
                                className="h-32 w-full relative overflow-hidden"
                                style={{
                                    backgroundImage: `url(${project.image})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center'
                                }}
                            >
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                            </div>

                            <div className="p-5 flex flex-col flex-grow">
                                <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors line-clamp-1">
                                    {project.title}
                                </h3>
                                <p className="text-foreground/70 mb-4 text-sm line-clamp-3 flex-grow">
                                    {project.description}
                                </p>

                                <div className="flex flex-wrap gap-1.5 mb-4">
                                    {project.tags.slice(0, 3).map((tag) => (
                                        <span
                                            key={tag}
                                            className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                <div className="flex gap-3 mt-auto pt-4 border-t border-foreground/10">
                                    {/* Links inside card for quick access if needed, but main interaction is click */}
                                    {/* Prevent click propagation to card onClick */}
                                    <button
                                        className="flex items-center gap-1.5 text-xs font-semibold hover:text-primary transition-colors"
                                        onClick={(e) => { e.stopPropagation(); window.open(project.link, '_blank'); }}
                                    >
                                        <ExternalLink size={14} /> Demo
                                    </button>
                                    <button
                                        className="flex items-center gap-1.5 text-xs font-semibold hover:text-primary transition-colors"
                                        onClick={(e) => { e.stopPropagation(); window.open(project.github, '_blank'); }}
                                    >
                                        <Github size={14} /> Code
                                    </button>
                                </div>
                            </div>

                            {/* Hover Glow Effect */}
                            <div className="absolute inset-0 border border-foreground/5 group-hover:border-primary/50 rounded-xl transition-colors pointer-events-none" />
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Project Details Modal */}
            <AnimatePresence>
                {selectedProject && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedProject(null)}
                            className="absolute inset-0 bg-black/80 backdrop-blur-md"
                        />

                        {/* Modal Content */}
                        <motion.div
                            layoutId={`project-card-${projects.indexOf(selectedProject)}`}
                            className="bg-background border border-white/10 rounded-2xl w-full max-w-6xl h-[90vh] overflow-hidden relative shadow-2xl flex flex-col md:flex-row"
                        >
                            <button
                                onClick={() => setSelectedProject(null)}
                                className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/80 rounded-full text-white transition-colors"
                            >
                                <X size={20} />
                            </button>

                            {/* Left Side: Live Preview (Iframe) */}
                            <div className="w-full md:w-2/3 h-1/2 md:h-full bg-black relative border-b md:border-b-0 md:border-r border-white/10">
                                {selectedProject.link && selectedProject.link !== "#" ? (
                                    <iframe
                                        src={selectedProject.link}
                                        title={selectedProject.title}
                                        className="w-full h-full"
                                        frameBorder="0"
                                        allowFullScreen
                                    />
                                ) : (
                                    <div className="flex flex-col items-center justify-center h-full text-foreground/50">
                                        <ExternalLink size={48} className="mb-4 opacity-50" />
                                        <p>Live preview not available.</p>
                                    </div>
                                )}
                                <div className="absolute bottom-4 right-4 flex gap-2">
                                    <a
                                        href={selectedProject.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="glass px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 hover:bg-primary/20 transition-colors"
                                    >
                                        <Maximize2 size={14} /> Open Full
                                    </a>
                                </div>
                            </div>

                            {/* Right Side: Details */}
                            <div className="w-full md:w-1/3 h-1/2 md:h-full overflow-y-auto p-6 md:p-8 bg-secondary/5">
                                <h2 className="text-3xl font-bold mb-2">{selectedProject.title}</h2>
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {selectedProject.tags.map((tag) => (
                                        <span key={tag} className="text-xs font-mono text-primary bg-primary/10 px-2 py-1 rounded">
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-sm font-bold text-foreground/60 uppercase tracking-wider mb-2">Why I made this</h3>
                                        <p className="text-foreground/80 leading-relaxed text-sm">{selectedProject.details.why}</p>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-bold text-foreground/60 uppercase tracking-wider mb-2">My Thinking</h3>
                                        <p className="text-foreground/80 leading-relaxed text-sm">{selectedProject.details.thinking}</p>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-bold text-foreground/60 uppercase tracking-wider mb-2">Workflow</h3>
                                        <p className="text-foreground/80 leading-relaxed text-sm">{selectedProject.details.workflow}</p>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-bold text-foreground/60 uppercase tracking-wider mb-2">What I Achieved</h3>
                                        <p className="text-foreground/80 leading-relaxed text-sm">{selectedProject.details.achieved}</p>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-bold text-foreground/60 uppercase tracking-wider mb-2">How</h3>
                                        <p className="text-foreground/80 leading-relaxed text-sm">{selectedProject.details.how}</p>
                                    </div>
                                </div>

                                <div className="mt-8 pt-6 border-t border-white/10 flex gap-4">
                                    <a
                                        href={selectedProject.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 flex items-center justify-center gap-2 p-3 rounded-xl bg-foreground/5 hover:bg-foreground/10 transition-colors font-bold text-sm"
                                    >
                                        <Github size={18} /> View Code
                                    </a>
                                    <a
                                        href={selectedProject.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 flex items-center justify-center gap-2 p-3 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-bold text-sm"
                                    >
                                        <ExternalLink size={18} /> Live Demo
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
}
