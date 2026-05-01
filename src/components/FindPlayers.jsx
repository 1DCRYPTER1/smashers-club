import React from 'react';
import { motion } from 'framer-motion';
import { Users, Search, Target, Shield, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const FindPlayers = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen h-screen overflow-y-auto overflow-x-hidden bg-[#61995E] pt-28 pb-36 md:pt-24 md:pb-12 px-4 flex flex-col items-center md:justify-center font-sans relative">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
                    className="absolute -top-1/4 -right-1/4 w-[800px] h-[800px] bg-white/5 rounded-full blur-3xl"
                />
                <motion.div 
                    animate={{ rotate: -360 }}
                    transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
                    className="absolute -bottom-1/4 -left-1/4 w-[600px] h-[600px] bg-yellow-400/5 rounded-full blur-3xl"
                />
            </div>

            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="max-w-3xl w-full bg-white/10 backdrop-blur-2xl border border-white/20 rounded-[3rem] p-8 md:p-16 text-center relative z-10 shadow-2xl"
            >
                <div className="flex justify-center mb-8 relative">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
                        className="w-24 h-24 bg-white rounded-3xl rotate-12 shadow-xl flex items-center justify-center text-[#61995E] relative z-10"
                    >
                        <Users size={48} strokeWidth={2.5} />
                    </motion.div>
                    
                    <motion.div
                        initial={{ scale: 0, x: -50 }}
                        animate={{ scale: 1, x: -30, y: 20 }}
                        transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.4 }}
                        className="w-16 h-16 bg-yellow-400 rounded-2xl -rotate-12 shadow-xl flex items-center justify-center text-slate-900 absolute top-0 -left-4 z-0"
                    >
                        <Search size={28} strokeWidth={3} />
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                >
                    <h2 className="text-[10px] md:text-xs font-black uppercase tracking-widest text-white/70 mb-4 bg-white/10 px-4 py-1.5 rounded-full inline-block border border-white/10">
                        Feature In Development
                    </h2>
                    
                    <h1 className="text-4xl md:text-6xl font-black text-white italic tracking-tighter mb-6 drop-shadow-md leading-tight">
                        FIND YOUR <br />
                        <span className="text-yellow-400">PERFECT MATCH</span>
                    </h1>
                    
                    <p className="text-lg md:text-xl text-blue-50 font-medium mb-10 max-w-xl mx-auto leading-relaxed">
                        Tired of playing alone? Soon you'll be able to connect with players matching your skill level, coordinate times, and book a court together—all in one place.
                    </p>
                </motion.div>

                {/* Features Grid */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10"
                >
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col items-center hover:bg-white/10 transition-colors">
                        <Target className="text-yellow-400 mb-3" size={28} />
                        <h3 className="text-white font-black text-sm uppercase tracking-wider mb-2">Skill Matching</h3>
                        <p className="text-white/60 text-xs font-medium">Find players who match your exact level of play.</p>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col items-center hover:bg-white/10 transition-colors">
                        <Clock className="text-yellow-400 mb-3" size={28} />
                        <h3 className="text-white font-black text-sm uppercase tracking-wider mb-2">Schedule Sync</h3>
                        <p className="text-white/60 text-xs font-medium">Instantly see who is available when you are.</p>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col items-center hover:bg-white/10 transition-colors">
                        <Shield className="text-yellow-400 mb-3" size={28} />
                        <h3 className="text-white font-black text-sm uppercase tracking-wider mb-2">Verified Players</h3>
                        <p className="text-white/60 text-xs font-medium">Play with a trusted community of members.</p>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 }}
                >
                    <button 
                        onClick={() => navigate('/')}
                        className="bg-white text-[#61995E] px-10 py-4 rounded-full font-black tracking-widest uppercase text-sm shadow-[0_8px_30px_rgba(255,255,255,0.3)] hover:scale-105 transition-transform active:scale-95"
                    >
                        Back to Home
                    </button>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default FindPlayers;
