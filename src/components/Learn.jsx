import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, Shield, Zap, Target, AlertTriangle, Users, MoveUp, Ruler, Crown } from 'lucide-react';

const lessons = [
  {
    id: 1,
    title: "Equipment & Court Anatomy",
    description: "Understand the tools and the battlefield.",
    icon: Ruler,
    color: "bg-purple-500",
    content: [
      {
        subtitle: "The Racket",
        text: "Know your weapon. It consists of the Head, String Bed, Throat, Shaft, and Handle."
      },
      {
        subtitle: "The Shuttlecock",
        text: "Feather shuttles are for pros (better control, break easily). Nylon shuttles are for beginners (super durable)."
      },
      {
        subtitle: "The Lines",
        text: "Singles Court: Long & Narrow.\nDoubles Court: Short & Wide."
      }
    ]
  },
  {
    id: 2,
    title: "The Fundamentals",
    description: "The gears of your badminton engine.",
    icon: Shield,
    color: "bg-blue-500",
    content: [
      {
        subtitle: "The Forehand Grip",
        text: "Use the 'V' shape or Handshake grip for most of your shots. It allows full wrist flexibility."
      },
      {
        subtitle: "The Backhand Grip",
        text: "Move your thumb to the flat side of the handle for control and power on the backhand side."
      },
      {
        subtitle: "Ready Stance & Split Step",
        text: "Keep feet shoulder-width apart, knees slightly bent. Always do a tiny 'split step' hop as your opponent hits the shuttle to explode in any direction."
      }
    ]
  },
  {
    id: 3,
    title: "Serving Rules",
    description: "How to start the point legally.",
    icon: MoveUp,
    color: "bg-orange-500",
    content: [
      {
        subtitle: "Proper Height",
        text: "The shuttle MUST be struck below the waist (strictly below 1.15m in pro play)."
      },
      {
        subtitle: "The Service Box",
        text: "Serve from the RIGHT box if your score is Even (0, 2, 4...). Serve from the LEFT box if your score is Odd (1, 3, 5...)."
      },
      {
        subtitle: "Types of Serves",
        text: "• Low Serve: Skims the net (doubles).\n• High Serve: High and deep (singles).\n• Flick Serve: Deceptive low-to-high surprise."
      }
    ]
  },
  {
    id: 4,
    title: "Essential Strokes",
    description: "Your arsenal of attacks.",
    icon: Zap,
    color: "bg-yellow-500",
    content: [
      {
        subtitle: "Clears",
        text: "High, deep shots to the very back of the opponent's court to buy yourself time."
      },
      {
        subtitle: "Drops",
        text: "Soft, delicate shots meant to fall right over the net, forcing the opponent to run forward."
      },
      {
        subtitle: "Drives",
        text: "Fast, flat shots usually aimed right at the opponent's chest."
      },
      {
        subtitle: "The Smash",
        text: "The ultimate attacking shot! Steep, powerful, and downward. Aim for the gaps."
      }
    ]
  },
  {
    id: 5,
    title: "Scoring & Match Flow",
    description: "How to win the game.",
    icon: Target,
    color: "bg-green-500",
    content: [
      {
        subtitle: "Rally Point System",
        text: "Every time a rally ends, a point is scored. You don't need to be the server to earn a point."
      },
      {
        subtitle: "The 21-Point Rule",
        text: "Matches are 'Best of 3' games. First to 21 points wins the game."
      },
      {
        subtitle: "Deuce (Setting)",
        text: "If the score is 20-20, you must win by 2 clear points (e.g., 22-20). Capped at 30 (first to 30 wins)."
      }
    ]
  },
  {
    id: 6,
    title: "Common Faults",
    description: "What NOT to do on court.",
    icon: AlertTriangle,
    color: "bg-red-500",
    content: [
      {
        subtitle: "Service Faults",
        text: "Stepping on the line or hitting the shuttle above your waist while serving."
      },
      {
        subtitle: "Contact Faults",
        text: "Touching the net with your racket, body, or clothes while the shuttle is in play."
      },
      {
        subtitle: "Over-the-Net",
        text: "Striking the shuttle before it has crossed the net over to your side."
      }
    ]
  },
  {
    id: 7,
    title: "Singles vs Doubles",
    description: "Mastering the strategy.",
    icon: Users,
    color: "bg-teal-500",
    content: [
      {
        subtitle: "Singles Strategy",
        text: "It's a marathon. Focus on stamina, court coverage, and constantly moving the opponent to the four corners."
      },
      {
        subtitle: "Doubles Strategy",
        text: "It's a sprint. Focus on speed, attacking the 'T' (middle line), and utilizing Front-and-Back rotation when attacking, and Side-by-Side when defending."
      }
    ]
  }
];

const Learn = () => {
  const [completedLessons, setCompletedLessons] = useState([]);
  const [activeLessonIndex, setActiveLessonIndex] = useState(null);
  const [lessonProgress, setLessonProgress] = useState(0);

  const handleLessonOpen = (index) => {
    setActiveLessonIndex(index);
    setLessonProgress(0);
  };

  const handleNextSlide = () => {
    const lesson = lessons[activeLessonIndex];
    if (lessonProgress < lesson.content.length - 1) {
      setLessonProgress(prev => prev + 1);
    } else {
      // Finish lesson
      if (!completedLessons.includes(lesson.id)) {
        setCompletedLessons([...completedLessons, lesson.id]);
      }
      setActiveLessonIndex(null);
    }
  };

  return (
    <div className="min-h-screen h-screen overflow-y-auto bg-[#61995E] font-sans pb-32 md:pb-12 pt-20 md:pt-32 px-4 relative">
      {/* Map View */}
      <AnimatePresence>
        {activeLessonIndex === null && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0, scale: 0.95 }}
            className="max-w-md mx-auto relative z-10"
          >
            <div className="text-center mb-12">
              <h1 className="text-5xl font-black text-white italic tracking-tighter mb-4 drop-shadow-md">ACADEMY</h1>
              <div className="bg-white/20 backdrop-blur-lg inline-flex items-center gap-2 px-6 py-3 rounded-full text-white font-black uppercase tracking-widest text-xs shadow-xl border border-white/10">
                <Crown size={18} className="text-yellow-400" />
                <span>{completedLessons.length} / {lessons.length} Modules</span>
              </div>
            </div>

            <div className="flex flex-col items-center gap-12 relative pb-20">
              {/* Winding Path Background Line */}
              <div className="absolute top-10 bottom-10 left-1/2 -translate-x-1/2 w-4 border-l-4 border-dashed border-white/30 z-0"></div>

              {lessons.map((lesson, index) => {
                const isCompleted = completedLessons.includes(lesson.id);
                // Zig-zag pattern to use space on both sides
                const isEven = index % 2 === 0;
                const offset = 100;
                const xOffset = isEven ? -offset : offset; 
                
                return (
                  <motion.div 
                    key={lesson.id}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    style={{ x: xOffset }}
                    className="relative group cursor-pointer"
                    onClick={() => handleLessonOpen(index)}
                  >
                    {/* Tooltip on hover */}
                    <div className={`absolute top-1/2 -translate-y-1/2 ${isEven ? 'left-[calc(100%+1.5rem)]' : 'right-[calc(100%+1.5rem)]'} bg-white text-slate-900 font-bold text-[10px] uppercase tracking-widest px-4 py-2 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-xl z-20 pointer-events-none hidden md:block`}>
                      {lesson.title}
                      <div className={`absolute top-1/2 -translate-y-1/2 ${isEven ? '-left-2 border-r-white' : '-right-2 border-l-white'} border-4 border-transparent`}></div>
                    </div>
                    
                    {/* Mobile Tooltip (Always visible below) */}
                    <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-white/80 font-black text-[10px] uppercase tracking-widest whitespace-nowrap drop-shadow-md md:hidden">
                      {lesson.title}
                    </div>

                    {/* Horizontal connector to center line */}
                    <div 
                      className="absolute top-1/2 -translate-y-1/2 border-b-4 border-dashed border-white/30 -z-10"
                      style={{ 
                        width: `${offset}px`,
                        [isEven ? 'left' : 'right']: '50%'
                      }}
                    />

                    {/* Lesson Node */}
                    <motion.div 
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className={`w-28 h-28 md:w-32 md:h-32 rounded-full flex items-center justify-center border-8 relative z-10 transition-all ${isCompleted ? `${lesson.color} border-white shadow-[0_15px_0_rgba(255,255,255,0.3)]` : 'bg-white border-slate-200 shadow-[0_15px_0_rgba(0,0,0,0.15)]'}`}
                    >
                      <lesson.icon size={44} className={isCompleted ? 'text-white' : 'text-slate-300'} strokeWidth={isCompleted ? 3 : 2.5} />
                      
                      {isCompleted && (
                         <div className="absolute -bottom-2 -right-2 bg-yellow-400 text-white rounded-full p-1.5 border-4 border-white shadow-md">
                           <Check size={20} strokeWidth={4} />
                         </div>
                      )}
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lesson View Modal */}
      <AnimatePresence>
        {activeLessonIndex !== null && (
          <motion.div 
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[100] bg-white flex flex-col font-sans"
          >
            {/* Top Bar */}
            <div className="p-4 md:p-8 flex items-center gap-6 border-b border-slate-100">
              <button onClick={() => setActiveLessonIndex(null)} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400 hover:text-slate-600">
                <X size={28} strokeWidth={3} />
              </button>
              
              {/* Progress Bar */}
              <div className="flex-1 h-5 bg-slate-100 rounded-full overflow-hidden">
                <motion.div 
                  className={`h-full ${lessons[activeLessonIndex].color} rounded-full`}
                  initial={{ width: 0 }}
                  animate={{ width: `${((lessonProgress + 1) / lessons[activeLessonIndex].content.length) * 100}%` }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                />
              </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto px-6 py-10 md:p-12 flex flex-col items-center justify-center relative bg-slate-50">
              <div className="w-full max-w-lg">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={lessonProgress}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col items-center text-center bg-white p-8 md:p-12 rounded-[3rem] shadow-xl border border-slate-100"
                  >
                    <div className={`w-32 h-32 md:w-40 md:h-40 ${lessons[activeLessonIndex].color} rounded-[2.5rem] flex items-center justify-center text-white mb-10 shadow-2xl rotate-3`}>
                      {React.createElement(lessons[activeLessonIndex].icon, { size: 64, strokeWidth: 2.5 })}
                    </div>
                    
                    <h2 className="text-[10px] md:text-xs font-black uppercase tracking-widest text-slate-400 mb-4 bg-slate-100 px-4 py-1.5 rounded-full">
                      {lessons[activeLessonIndex].title}
                    </h2>
                    
                    <h3 className="text-3xl md:text-4xl font-black text-slate-900 mb-6 leading-tight tracking-tight">
                      {lessons[activeLessonIndex].content[lessonProgress].subtitle}
                    </h3>
                    
                    <p className="text-lg md:text-xl text-slate-500 font-medium leading-relaxed whitespace-pre-line">
                      {lessons[activeLessonIndex].content[lessonProgress].text}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="p-6 md:p-10 border-t border-slate-100 flex justify-center pb-12 md:pb-10 bg-white">
              <div className="w-full max-w-lg">
                <button 
                  onClick={handleNextSlide}
                  className={`w-full py-5 rounded-2xl font-black uppercase tracking-widest text-white shadow-[0_8px_0_rgba(0,0,0,0.15)] active:shadow-[0_0px_0_rgba(0,0,0,0.15)] active:translate-y-[8px] transition-all text-lg md:text-xl ${lessons[activeLessonIndex].color}`}
                >
                  {lessonProgress < lessons[activeLessonIndex].content.length - 1 ? "Continue" : "Complete Lesson"}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Learn;
