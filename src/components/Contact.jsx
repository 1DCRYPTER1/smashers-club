import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Code2, HeartHandshake, Coffee } from 'lucide-react';
import profileImg from '../assets/profile.jpg';

const Contact = () => {
    return (
        <div className="min-h-screen h-screen overflow-y-auto bg-[#61995E] font-sans pb-32 md:pb-12 pt-24 md:pt-32 px-4 md:px-8 lg:px-12 relative">
            <div className="max-w-6xl mx-auto relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12 text-center"
                >
                    <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter italic mb-4 drop-shadow-md">
                        GET IN <span className="text-blue-200">TOUCH.</span>
                    </h1>
                    <p className="text-white/90 font-semibold md:text-sm uppercase tracking-widest text-xs drop-shadow">
                        Join the club, reach out for inquiries, or just say hello.
                    </p>
                </motion.div>

                <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 md:gap-12 lg:auto-rows-min">

                    {/* 1. About Owner (Always First) */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden group order-1 lg:order-none"
                    >
                        <div className="absolute top-0 right-0 p-6 opacity-[0.03] text-[#61995E] group-hover:scale-110 group-hover:rotate-12 transition-all duration-700 pointer-events-none">
                            <HeartHandshake size={200} />
                        </div>

                        <h2 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-8 flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-[#61995E]"></div> About The Owner
                        </h2>

                        <div className="flex flex-col md:flex-row gap-8 items-center md:items-start text-center md:text-left relative z-10">
                            <div className="w-32 h-32 md:w-40 md:h-40 shrink-0 rounded-full overflow-hidden border-[6px] border-slate-50 shadow-xl group-hover:border-blue-50 transition-colors duration-500">
                                <img src={profileImg} alt="Owner Profile" className="w-full h-full object-cover object-top transform group-hover:scale-105 transition-transform duration-700" />
                            </div>
                            <div className="flex flex-col justify-center">
                                <h3 className="text-2xl font-black text-slate-900 mb-3 tracking-tight">Welcome to the Club!</h3>
                                <p className="text-slate-500 font-medium leading-relaxed text-sm md:text-base">
                                    As a passionate badminton enthusiast, I wanted to create a platform that brings players together. Smasher's Club isn't just about booking courts—it's about building a community of athletes who share the same love for the smash!
                                </p>
                                <p className="mt-6 text-right text-slate-900 font-black italic tracking-tight text-lg">John Doe</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* 2. Contact Details & Map (Second on Mobile, Right Column on Desktop) */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-2xl h-full flex flex-col order-2 lg:row-span-2 lg:order-none"
                    >
                        <h2 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-8 flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-blue-500"></div> Contact Details
                        </h2>

                        <div className="space-y-4 flex-1">
                            <a href="tel:+919876543210" className="flex items-center gap-5 group cursor-pointer p-4 rounded-2xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                                <div className="w-12 h-12 rounded-full bg-[#61995E]/10 text-[#61995E] flex items-center justify-center group-hover:bg-[#61995E] group-hover:text-white transition-colors shrink-0 shadow-sm">
                                    <Phone size={20} />
                                </div>
                                <div>
                                    <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest mb-0.5">Call Us</p>
                                    <p className="text-lg font-black text-slate-800 tracking-tight">+91 98765 43210</p>
                                </div>
                            </a>

                            <a href="mailto:hello@smashersclub.com" className="flex items-center gap-5 group cursor-pointer p-4 rounded-2xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                                <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center group-hover:bg-blue-500 group-hover:text-white transition-colors shrink-0 shadow-sm">
                                    <Mail size={20} />
                                </div>
                                <div>
                                    <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest mb-0.5">Email Us</p>
                                    <p className="text-lg font-black text-slate-800 tracking-tight break-all">hello@smashersclub.com</p>
                                </div>
                            </a>

                            <div className="flex items-center gap-5 p-4 rounded-2xl group border border-transparent hover:border-slate-100 hover:bg-slate-50 transition-colors">
                                <div className="w-12 h-12 rounded-full bg-red-50 text-red-500 flex items-center justify-center shrink-0 shadow-sm group-hover:bg-red-500 group-hover:text-white transition-colors">
                                    <MapPin size={20} />
                                </div>
                                <div>
                                    <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest mb-1">Location</p>
                                    <p className="text-sm md:text-base font-bold text-slate-800 leading-snug">123 Badminton Arena, Sports City,<br />New Delhi 110001, India</p>
                                </div>
                            </div>
                        </div>

                        {/* Map Box */}
                        <div className="mt-8 rounded-3xl overflow-hidden border-4 border-slate-100 shadow-inner h-48 relative bg-slate-200 flex-shrink-0 group">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1m3!1d224345.83923192868!2d77.06889709999999!3d28.527582000000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5b347eb62d%3A0x52c2b7494e204dce!2sNew%20Delhi%2C%20Delhi!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                                className="absolute inset-0 w-full h-full border-0 grayscale hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>
                    </motion.div>

                    {/* 3. Developer Info (Third on Mobile, Left Column on Desktop) */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-slate-900 p-8 rounded-[2.5rem] shadow-xl text-white relative overflow-hidden hover:bg-slate-800 transition-colors duration-500 order-3 lg:order-none"
                    >
                        <div className="absolute -right-10 -bottom-10 opacity-5 pointer-events-none">
                            <Code2 size={200} />
                        </div>
                        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
                            <div className="flex items-center gap-6">
                                <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center backdrop-blur-md shrink-0 border border-blue-400/30">
                                    <span className="font-black text-blue-300 text-xl tracking-tighter">&lt;/&gt;</span>
                                </div>
                                <div>
                                    <p className="text-[10px] uppercase tracking-widest font-bold text-slate-400 mb-1">Designed & Developed By</p>
                                    <p className="text-2xl font-black tracking-tight text-white">Shaun Dsilva</p>
                                    <p className="text-slate-400 text-xs font-medium mt-1">Crafting pixel-perfect, agentic web experiences.</p>
                                </div>
                            </div>

                            <a
                                href="https://www.buymeacoffee.com/shaundsilva"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-2 bg-[#FFDD00] text-slate-900 px-5 py-3 rounded-xl font-black text-[10px] md:text-xs uppercase tracking-widest hover:scale-105 hover:shadow-[0_0_20px_rgba(255,221,0,0.3)] transition-all shrink-0 w-full md:w-auto"
                            >
                                <Coffee size={18} strokeWidth={3} /> Buy me a coffee
                            </a>
                        </div>
                    </motion.div>

                </div>
            </div>
        </div>
    );
};

export default Contact;
