"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Send, MapPin, Mail, Phone, Loader2, CheckCircle, Copy, PhoneCall } from "lucide-react";
import { useState, useRef } from "react";
import emailjs from '@emailjs/browser';

export default function Contact() {
    const formRef = useRef();
    const [isSending, setIsSending] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState("");
    const [showPhoneOptions, setShowPhoneOptions] = useState(false);

    const sendEmail = (e) => {
        e.preventDefault();
        setIsSending(true);
        setError("");

        // Keys from environment variables
        const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
        const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
        const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

        if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
            setError("EmailJS keys missing. Check your .env file.");
            console.error("EmailJS Environment Variables missing. Make sure NEXT_PUBLIC_EMAILJS_SERVICE_ID, NEXT_PUBLIC_EMAILJS_TEMPLATE_ID, and NEXT_PUBLIC_EMAILJS_PUBLIC_KEY are set.");
            setIsSending(false);
            return;
        }

        emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY)
            .then((result) => {
                setIsSuccess(true);
                setIsSending(false);
                e.target.reset();
                setTimeout(() => setIsSuccess(false), 5000);
            }, (error) => {
                console.log(error.text);
                setError("Failed to send message. Please try again.");
                setIsSending(false);
            });
    };

    return (
        <section id="contact" className="py-20 px-6 relative">
            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
                {/* Contact Info */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-8">
                        Let's <span className="text-gradient">Connect</span>
                    </h2>
                    <p className="text-lg text-foreground/70 mb-12">
                        Have a project in mind? Looking for a partner to build something incredible?
                        Let's chat and turn your ideas into reality.
                    </p>

                    <div className="space-y-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 glass rounded-full text-primary">
                                <Mail size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold">Email</h3>
                                <p className="text-gray-500">chandrabhushankumar553@gmail.com</p>
                            </div>
                        </div>
                        <div className="relative">
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => setShowPhoneOptions(!showPhoneOptions)}
                                className="flex items-center gap-4 cursor-pointer group"
                            >
                                <div className="p-3 glass rounded-full text-secondary group-hover:bg-secondary/20 transition-colors">
                                    <Phone size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold group-hover:text-secondary transition-colors">Phone</h3>
                                    <p className="text-gray-500">+91 9113757673</p>
                                </div>
                            </motion.div>

                            <AnimatePresence>
                                {showPhoneOptions && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        className="absolute top-16 left-0 z-10 glass p-2 rounded-xl flex flex-col gap-1 min-w-[150px]"
                                    >
                                        <a
                                            href="tel:+919113757673"
                                            className="flex items-center gap-2 p-2 rounded-lg hover:bg-secondary/20 text-sm font-medium transition-colors"
                                            onClick={() => setShowPhoneOptions(false)}
                                        >
                                            <PhoneCall size={16} /> Call Now
                                        </a>
                                        <button
                                            onClick={() => {
                                                navigator.clipboard.writeText("+919113757673");
                                                setShowPhoneOptions(false);
                                                // Could add a toast here but simple copy is fine for now
                                            }}
                                            className="flex items-center gap-2 p-2 rounded-lg hover:bg-secondary/20 text-sm font-medium transition-colors text-left w-full"
                                        >
                                            <Copy size={16} /> Copy Number
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="p-3 glass rounded-full text-accent">
                                <MapPin size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold">Location</h3>
                                <p className="text-foreground/70">Calicut, India</p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Contact Form */}
                <motion.form
                    ref={formRef}
                    onSubmit={sendEmail}
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="glass p-8 rounded-3xl space-y-6"
                >
                    {isSuccess && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="p-4 bg-green-500/20 border border-green-500/50 rounded-xl text-green-500 flex items-center gap-2"
                        >
                            <CheckCircle size={20} /> Message sent successfully!
                        </motion.div>
                    )}

                    {error && (
                        <div className="p-4 bg-red-500/20 border border-red-500/50 rounded-xl text-red-500 text-sm">
                            {error}
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium mb-2">Name</label>
                        <input
                            type="text"
                            name="user_name"
                            required
                            className="w-full px-4 py-3 rounded-xl bg-background/50 border border-white/10 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                            placeholder="John Doe"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Email</label>
                        <input
                            type="email"
                            name="user_email"
                            required
                            className="w-full px-4 py-3 rounded-xl bg-background/50 border border-white/10 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                            placeholder="john@example.com"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Message</label>
                        <textarea
                            name="message"
                            required
                            rows="4"
                            className="w-full px-4 py-3 rounded-xl bg-background/50 border border-foreground/10 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                            placeholder="Tell me about your project..."
                        />
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        disabled={isSending}
                        className="w-full py-4 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-xl shadow-lg shadow-primary/25 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {isSending ? (
                            <>Sending... <Loader2 className="animate-spin" size={20} /></>
                        ) : (
                            <>Send Message <Send size={20} /></>
                        )}
                    </motion.button>
                </motion.form>
            </div>
        </section>
    );
}
