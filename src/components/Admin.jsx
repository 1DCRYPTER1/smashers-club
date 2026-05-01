import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { LogOut, Check, X, Calendar as CalIcon, Clock, Lock, RefreshCw } from 'lucide-react';

const Admin = () => {
    const [session, setSession] = useState(null);
    const [email] = useState('admin@smashersclub.com');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(true);
    const [loginError, setLoginError] = useState('');

    const [bookings, setBookings] = useState([]);
    const [fetching, setFetching] = useState(false);

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            if (session) fetchBookings();
            setLoading(false);
        });

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            if (session) fetchBookings();
        });

        return () => subscription.unsubscribe();
    }, []);

    const fetchBookings = async () => {
        setFetching(true);
        const { data, error } = await supabase
            .from('bookings')
            .select('*')
            .order('created_at', { ascending: false });

        if (data) setBookings(data);
        setFetching(false);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setLoginError('');

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) setLoginError(error.message);
        setLoading(false);
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
    };

    const updateStatus = async (id, newStatus) => {
        // Deprecated: Automated via Razorpay now.
    };

    if (loading && !session) return <div className="min-h-screen bg-[#61995E] flex items-center justify-center"><RefreshCw className="animate-spin text-white" size={48} /></div>;

    if (!session) {
        return (
            <div className="min-h-screen bg-[#61995E] flex justify-center items-start md:items-center pt-20 md:pt-0 px-4 pb-10 font-sans relative overflow-y-auto">
                <div className="absolute top-0 left-0 w-full p-6 z-50 flex justify-center">
                    <div className="text-white font-black text-2xl italic tracking-tighter drop-shadow-md cursor-pointer" onClick={() => window.location.href = '/'}>
                        SMASHER'S <span className="text-blue-200">CLUB</span>
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-2xl w-full max-w-md relative z-10"
                >
                    <div className="flex justify-center mb-6">
                        <div className="w-16 h-16 bg-slate-900 text-white rounded-full flex items-center justify-center shadow-lg">
                            <Lock size={32} />
                        </div>
                    </div>
                    <h2 className="text-3xl font-black text-slate-900 text-center mb-2 tracking-tighter">ADMIN SECURE</h2>
                    <p className="text-slate-500 text-center mb-8 font-medium text-sm">Authorized personnel only</p>

                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label className="block text-xs font-black uppercase text-slate-400 mb-2 tracking-widest">Admin Email</label>
                            <input
                                type="email"
                                value={email}
                                disabled
                                className="w-full p-4 bg-slate-100 rounded-2xl border-none outline-none font-bold text-slate-400 cursor-not-allowed opacity-70"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-black uppercase text-slate-400 mb-2 tracking-widest">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter admin password"
                                className="w-full p-4 bg-slate-50 rounded-2xl border-2 border-transparent outline-none focus:border-[#61995E] font-bold"
                            />
                        </div>

                        {loginError && <p className="text-red-500 text-xs font-bold text-center mt-2">{loginError}</p>}

                        <button
                            type="submit"
                            disabled={loading || !password}
                            className="w-full mt-6 bg-[#61995E] text-white py-4 rounded-2xl font-black uppercase tracking-wider shadow-xl hover:scale-[1.02] transition-transform disabled:opacity-50"
                        >
                            {loading ? "Authenticating..." : "Login to Dashboard"}
                        </button>
                    </form>
                </motion.div>
            </div>
        );
    }

    // Process data for charts
    const statusCounts = bookings.reduce((acc, curr) => {
        const s = curr.status || 'pending';
        acc[s] = (acc[s] || 0) + 1;
        return acc;
    }, {});

    const totalRevenue = bookings.reduce((sum, curr) => {
        if (curr.status === 'payment_successful' && curr.timeslot) {
            return sum + (curr.timeslot.split(',').length * 400);
        }
        return sum;
    }, 0);

    const pieData = [
        { name: 'Paid', value: statusCounts['payment_successful'] || 0, color: '#10b981' },
        { name: 'Pending/Old', value: statusCounts['pending'] || 0, color: '#f59e0b' },
    ].filter(d => d.value > 0);

    const dateCounts = bookings.reduce((acc, curr) => {
        acc[curr.booking_date] = (acc[curr.booking_date] || 0) + 1;
        return acc;
    }, {});

    const barData = Object.keys(dateCounts).sort().slice(-7).map(date => ({
        date: date.substring(5), // Just MM-DD
        requests: dateCounts[date]
    }));

    return (
        <div className="h-screen overflow-y-auto bg-slate-50 font-sans pb-20 md:pb-10 ">
            {/* Admin Header */}
            <header className="rounded-b-3xl bg-slate-900 text-white p-4 md:p-6 sticky top-0 z-50 flex justify-between items-center shadow-xl">
                <div>
                    <h1 className="text-xl md:text-2xl font-black italic tracking-tighter">SMASHER'S <span className="text-[#61995E]">ADMIN</span></h1>
                    <p className="text-[10px] md:text-xs text-slate-400 uppercase tracking-widest font-bold hidden sm:block">Command Center</p>
                </div>
                <div className="flex gap-2 md:gap-4">
                    <button onClick={fetchBookings} className="p-2 hover:bg-slate-800 rounded-full transition-colors"><RefreshCw size={20} className={fetching ? "animate-spin" : ""} /></button>
                    <button onClick={handleLogout} className="flex items-center gap-2 bg-red-500/20 text-red-400 px-3 md:px-4 py-2 rounded-full font-bold text-sm hover:bg-red-500/30 transition-colors">
                        <LogOut size={16} /> <span className="hidden md:inline">Logout</span>
                    </button>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 md:py-8 space-y-6 md:space-y-8">

                {/* Stats & Charts Row */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Summary Cards */}
                    <div className="grid grid-cols-2 gap-4 lg:col-span-1">
                        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col justify-center">
                            <h3 className="text-slate-400 text-xs font-black uppercase tracking-widest mb-1">Total Requests</h3>
                            <p className="text-4xl font-black text-slate-900">{bookings.length}</p>
                        </div>
                        <div className="bg-green-50 p-6 rounded-3xl shadow-sm border border-green-100 flex flex-col justify-center">
                            <h3 className="text-green-600/60 text-xs font-black uppercase tracking-widest mb-1">Revenue</h3>
                            <p className="text-4xl font-black text-green-600">₹{totalRevenue.toLocaleString()}</p>
                        </div>
                        <div className="col-span-2 bg-white p-6 rounded-3xl shadow-sm border border-slate-100 h-48 flex flex-col items-center justify-center">
                            <h3 className="text-slate-400 text-xs font-black uppercase tracking-widest mb-2 self-start w-full">Status Breakdown</h3>
                            {pieData.length > 0 ? (
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie data={pieData} cx="50%" cy="50%" innerRadius={40} outerRadius={60} paddingAngle={5} dataKey="value">
                                            {pieData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                        <RechartsTooltip />
                                    </PieChart>
                                </ResponsiveContainer>
                            ) : (
                                <p className="text-slate-300 font-bold text-sm">No data yet</p>
                            )}
                        </div>
                    </div>

                    {/* Bar Chart */}
                    <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 lg:col-span-2 min-h-[300px]">
                        <h3 className="text-slate-400 text-xs font-black uppercase tracking-widest mb-6">Recent Booking Volume (Last 7 Days)</h3>
                        {barData.length > 0 ? (
                            <ResponsiveContainer width="100%" height={250}>
                                <BarChart data={barData}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                    <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} dy={10} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                                    <RechartsTooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '1rem', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                                    <Bar dataKey="requests" fill="#61995E" radius={[6, 6, 0, 0]} barSize={40} />
                                </BarChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="h-[250px] flex items-center justify-center">
                                <p className="text-slate-300 font-bold text-sm">No bookings recorded yet</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Bookings Table/List */}
                <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
                    <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                        <h3 className="text-slate-800 text-lg font-black tracking-tight">Recent Requests</h3>
                    </div>

                    {/* Mobile View (Cards) */}
                    <div className="block lg:hidden">
                        {bookings.length === 0 ? (
                            <div className="p-8 text-center text-slate-400 font-medium">No bookings found.</div>
                        ) : bookings.map((booking) => {
                            const status = booking.status || 'pending';
                            return (
                                <div key={booking.id} className="p-5 border-b border-slate-100 flex flex-col gap-3">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <div className="font-black text-slate-800 text-lg">{booking.full_name}</div>
                                            <div className="text-xs text-slate-400 flex items-center gap-1 mt-1"><CalIcon size={12} /> {new Date(booking.created_at).toLocaleDateString()}</div>
                                        </div>
                                        <div>
                                            {status === 'payment_successful' ? (
                                                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">Paid</span>
                                            ) : (
                                                <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">{status}</span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="bg-slate-50 rounded-xl p-3 grid grid-cols-2 gap-2 text-sm">
                                        <div>
                                            <p className="text-xs text-slate-400 font-bold uppercase">Contact</p>
                                            <p className="font-semibold text-slate-700">{booking.phone}</p>
                                            <p className="text-xs text-slate-500 truncate">{booking.email}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-slate-400 font-bold uppercase">Requested Slot</p>
                                            <p className="font-bold text-[#61995E]">{booking.booking_date}</p>
                                            <p className="text-xs font-bold text-slate-600">{booking.timeslot}</p>
                                        </div>
                                    </div>

                                    <div className="bg-slate-50 rounded-xl p-3 mt-2 flex items-center justify-between border border-slate-100">
                                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Ref ID</span>
                                        <span className="font-mono text-xs font-bold text-slate-700">{booking.reference_id || 'N/A'}</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Desktop View (Table) */}
                    <div className="hidden lg:block overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50/80 text-slate-400 text-[10px] uppercase tracking-widest font-black">
                                    <th className="p-4 pl-8">Player</th>
                                    <th className="p-4">Contact</th>
                                    <th className="p-4">Requested Slot</th>
                                    <th className="p-4">Status</th>
                                    <th className="p-4 pr-8 text-right">Payment Ref</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bookings.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="p-12 text-center text-slate-400 font-medium">No bookings found in the system.</td>
                                    </tr>
                                ) : bookings.map((booking) => {
                                    const status = booking.status || 'pending';
                                    return (
                                        <tr key={booking.id} className="border-b border-slate-50 hover:bg-slate-50/80 transition-colors">
                                            <td className="p-4 pl-8">
                                                <div className="font-black text-slate-800 text-sm">{booking.full_name}</div>
                                                <div className="text-xs text-slate-400 mt-1 flex items-center gap-1 font-medium"><CalIcon size={12} /> Booked: {new Date(booking.created_at).toLocaleDateString()}</div>
                                            </td>
                                            <td className="p-4">
                                                <div className="text-sm font-bold text-slate-600">{booking.phone}</div>
                                                <div className="text-xs text-slate-400 font-medium">{booking.email}</div>
                                            </td>
                                            <td className="p-4">
                                                <div className="inline-flex items-center gap-2 bg-[#61995E]/10 text-[#61995E] px-3 py-1.5 rounded-lg font-black text-xs tracking-wide">
                                                    <CalIcon size={14} /> {booking.booking_date}
                                                </div>
                                                <div className="text-xs font-bold text-slate-500 mt-2 flex items-start gap-1 max-w-[200px]">
                                                    <Clock size={12} className="mt-0.5 shrink-0" /> 
                                                    <span className="flex-1 leading-relaxed">{booking.timeslot}</span>
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                {status === 'payment_successful' ? (
                                                    <span className="bg-green-100 text-green-700 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider flex items-center gap-1 w-max">
                                                        <Check size={12} strokeWidth={3} /> PAID
                                                    </span>
                                                ) : (
                                                    <span className="bg-amber-100 text-amber-700 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider flex items-center gap-1 w-max">
                                                        {status}
                                                    </span>
                                                )}
                                            </td>
                                            <td className="p-4 pr-8 text-right">
                                                <div className="inline-flex items-center gap-2 bg-slate-50 border border-slate-100 px-3 py-1.5 rounded-lg">
                                                    <span className="font-mono text-xs font-bold text-slate-700">{booking.reference_id || 'N/A'}</span>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Admin;
