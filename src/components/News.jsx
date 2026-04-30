import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Calendar, User, ArrowRight, RefreshCw } from 'lucide-react';

const API_KEY = '10dc15c598444f2fb473376210d8d17a';

const News = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchNews();
    }, []);

    const fetchNews = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(`https://newsapi.org/v2/everything?q=badminton&language=en&sortBy=publishedAt&pageSize=13&apiKey=${API_KEY}`);
            const data = await res.json();
            
            if (data.status === 'ok') {
                const validArticles = data.articles.filter(a => a.title !== '[Removed]' && a.urlToImage);
                setArticles(validArticles);
            } else {
                setError(data.message || 'Failed to fetch news');
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen h-screen bg-[#61995E] flex justify-center items-center font-sans">
                <div className="flex flex-col items-center text-white">
                    <RefreshCw size={48} className="animate-spin mb-4" />
                    <p className="font-black tracking-widest uppercase text-sm">Fetching Courtside News...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen h-screen bg-[#61995E] flex justify-center items-center font-sans px-4">
                <div className="text-center bg-white p-10 rounded-3xl shadow-xl max-w-md w-full">
                    <h2 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">Oops!</h2>
                    <p className="text-slate-500 font-medium mb-6">{error}</p>
                    <button onClick={fetchNews} className="bg-[#61995E] text-white px-8 py-4 rounded-full font-black uppercase text-xs tracking-widest hover:scale-105 transition-transform shadow-lg">Try Again</button>
                </div>
            </div>
        );
    }

    const featuredArticle = articles[0];
    const otherArticles = articles.slice(1);

    return (
        <div className="min-h-screen h-screen overflow-y-auto bg-[#61995E] font-sans pb-32 md:pb-12 pt-24 md:pt-32 px-4 md:px-8 lg:px-12 relative">
            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12 text-center md:text-left"
                >
                    <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter italic mb-4 drop-shadow-md">
                        COURT <span className="text-blue-200">SIDE.</span>
                    </h1>
                    <p className="text-white/90 font-semibold md:text-sm max-w-2xl uppercase tracking-widest text-xs drop-shadow">
                        The latest updates, tournament results, and exclusive stories from the global badminton circuit.
                    </p>
                </motion.div>

                {/* Featured Article */}
                {featuredArticle && (
                    <motion.a 
                        href={featuredArticle.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 }}
                        className="block group relative rounded-[2.5rem] overflow-hidden shadow-2xl mb-12 h-[450px] md:h-[600px] cursor-pointer"
                    >
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors z-10 duration-500" />
                        <img 
                            src={featuredArticle.urlToImage} 
                            alt={featuredArticle.title}
                            className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                        />
                        <div className="absolute inset-0 z-20 flex flex-col justify-end p-6 md:p-12 bg-gradient-to-t from-black/90 via-black/40 to-transparent">
                            <div className="flex flex-wrap items-center gap-3 text-white/80 mb-4 text-[10px] md:text-xs font-bold uppercase tracking-widest">
                                <span className="bg-[#61995E] text-white px-4 py-1.5 rounded-full shadow-lg">Featured</span>
                                <span className="flex items-center gap-1 bg-black/30 backdrop-blur-md px-3 py-1.5 rounded-full"><Calendar size={14} /> {new Date(featuredArticle.publishedAt).toLocaleDateString()}</span>
                                {featuredArticle.source.name && <span className="flex items-center gap-1 bg-black/30 backdrop-blur-md px-3 py-1.5 rounded-full"><User size={14} /> {featuredArticle.source.name}</span>}
                            </div>
                            <h2 className="text-2xl md:text-5xl font-black text-white leading-tight mb-4 group-hover:text-blue-200 transition-colors drop-shadow-lg line-clamp-3 md:line-clamp-none">
                                {featuredArticle.title}
                            </h2>
                            <p className="text-white/80 md:text-lg line-clamp-2 md:line-clamp-3 max-w-3xl mb-6 hidden md:block">
                                {featuredArticle.description}
                            </p>
                            <div className="inline-flex items-center gap-2 text-white font-black uppercase tracking-widest text-xs hover:text-blue-200 transition-colors">
                                Read Full Story <ArrowRight size={16} />
                            </div>
                        </div>
                    </motion.a>
                )}

                {/* News Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {otherArticles.map((article, i) => (
                        <motion.a
                            key={article.url + i}
                            href={article.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 + (i * 0.05) }}
                            className="group bg-white rounded-[2.5rem] overflow-hidden shadow-lg hover:shadow-2xl transition-all flex flex-col cursor-pointer border-4 border-transparent hover:border-white/40"
                        >
                            <div className="relative h-48 md:h-56 overflow-hidden">
                                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors z-10" />
                                <img 
                                    src={article.urlToImage || 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'} 
                                    alt={article.title}
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                    onError={(e) => {e.target.src = 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'}}
                                />
                                {article.source.name && (
                                    <div className="absolute top-4 left-4 z-20">
                                        <span className="bg-white/90 backdrop-blur text-slate-900 text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest shadow-sm">
                                            {article.source.name}
                                        </span>
                                    </div>
                                )}
                            </div>
                            <div className="p-6 md:p-8 flex flex-col flex-1">
                                <div className="flex items-center gap-2 text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-3">
                                    <Calendar size={12} /> {new Date(article.publishedAt).toLocaleDateString()}
                                </div>
                                <h3 className="text-lg md:text-xl font-black text-slate-900 leading-tight mb-3 group-hover:text-[#61995E] transition-colors line-clamp-3">
                                    {article.title}
                                </h3>
                                <p className="text-slate-500 text-sm line-clamp-3 mb-6 flex-1 font-medium">
                                    {article.description}
                                </p>
                                <div className="mt-auto flex items-center justify-between text-[#61995E] font-black uppercase text-[10px] tracking-widest pt-4 border-t border-slate-100">
                                    <span>Read Article</span>
                                    <div className="bg-[#61995E]/10 p-2 rounded-full group-hover:bg-[#61995E] group-hover:text-white transition-colors">
                                        <ExternalLink size={16} className="transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                    </div>
                                </div>
                            </div>
                        </motion.a>
                    ))}
                </div>
                
                {articles.length === 0 && !loading && !error && (
                    <div className="text-center text-white font-medium py-20">
                        <p>No recent news found. Check back later!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default News;
