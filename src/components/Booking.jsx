import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../supabaseClient';
import { CheckCircle2, Clock, Calendar as CalIcon, ChevronRight } from 'lucide-react';

const Booking = () => {
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [bookedSlots, setBookedSlots] = useState([]);
    const [errors, setErrors] = useState({});
    const [paymentId, setPaymentId] = useState('');

    const loadRazorpayScript = () => {
        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const getLocalDateString = (d = new Date()) => {
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const [formData, setFormData] = useState({
        full_name: '',
        email: '',
        phone: '',
        booking_date: getLocalDateString(),
        timeslots: []
    });

    const timeSlots = [
        "07:00 AM - 08:00 AM", "08:00 AM - 09:00 AM",
        "06:00 PM - 07:00 PM", "07:00 PM - 08:00 PM", "08:00 PM - 09:00 PM"
    ];

    const getNextDays = () => {
        const days = [];
        for (let i = 0; i < 6; i++) {
            const date = new Date();
            date.setDate(date.getDate() + i);
            days.push({
                full: getLocalDateString(date),
                display: i === 0 ? 'Today' : date.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric' })
            });
        }
        return days;
    };

    useEffect(() => {
        fetchBookedSlots();
    }, [formData.booking_date]);

    const fetchBookedSlots = async () => {
        const { data, error } = await supabase
            .from('bookings')
            .select('timeslot')
            .eq('booking_date', formData.booking_date)
            .or('status.neq.rejected,status.is.null');

        if (error) {
            console.error("Error fetching slots:", error);
        }

        if (data) {
            const allSlots = data.flatMap(b => b.timeslot ? b.timeslot.split(', ') : []);
            setBookedSlots(allSlots);
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.full_name.trim()) newErrors.full_name = "Name is required";

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) newErrors.email = "Please enter a valid email address";

        const phoneRegex = /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[6789]\d{9}$/;
        if (!phoneRegex.test(formData.phone)) newErrors.phone = "Please enter a valid Indian phone number";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (!validateForm()) return;
        setLoading(true);

        const res = await loadRazorpayScript();
        if (!res) {
            alert('Razorpay SDK failed to load. Are you offline?');
            setLoading(false);
            return;
        }

        const totalAmount = formData.timeslots.length * 400;

        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY_ID,
            amount: totalAmount * 100, // in paise
            currency: 'INR',
            name: "Smasher's Club",
            description: `Booking ${formData.timeslots.length} court slot(s)`,
            prefill: {
                name: formData.full_name,
                email: formData.email,
                contact: formData.phone
            },
            theme: {
                color: '#61995E'
            },
            handler: async function (response) {
                const payment_id = response.razorpay_payment_id;
                setPaymentId(payment_id);

                const { timeslots, ...rest } = formData;
                const bookingData = {
                    ...rest,
                    timeslot: timeslots.join(', '),
                    status: 'payment_successful',
                    reference_id: payment_id
                };

                const { error } = await supabase.from('bookings').insert([bookingData]);

                if (!error) {
                    setStep(3);
                } else {
                    alert("Error saving booking: " + error.message);
                }
                setLoading(false);
            },
            modal: {
                ondismiss: function () {
                    setLoading(false);
                }
            }
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.on('payment.failed', function (response) {
            alert("Payment Failed: " + response.error.description);
            setLoading(false);
        });
        paymentObject.open();
    };

    return (
        <div className="h-[100dvh] bg-[#61995E] pt-24 pb-32 md:pb-12 px-4 md:px-6 flex justify-center items-start font-sans overflow-y-auto">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-2xl overflow-hidden min-h-[600px] flex flex-col md:my-auto"
            >
                <div className="bg-slate-900 p-8 text-white">
                    <h2 className="text-3xl font-black italic tracking-tighter">RESERVE COURT</h2>
                    <p className="text-slate-400 text-sm uppercase tracking-widest font-bold">Step {step} of 3</p>
                </div>

                <div className="p-8 flex-1">
                    <AnimatePresence mode="wait">
                        {step === 1 && (
                            <motion.div key="step1" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }}>
                                <label className="block text-xs font-black uppercase text-slate-400 mb-4 tracking-widest">Select Date</label>
                                <div className="flex gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
                                    {getNextDays().map((day) => (
                                        <button
                                            key={day.full}
                                            onClick={() => setFormData({ ...formData, booking_date: day.full })}
                                            className={`flex-shrink-0 px-6 py-3 rounded-2xl font-bold transition-all ${formData.booking_date === day.full ? 'bg-[#61995E] text-white' : 'bg-slate-100 text-slate-500'}`}
                                        >
                                            {day.display}
                                        </button>
                                    ))}
                                </div>

                                <label className="block text-xs font-black uppercase text-slate-400 mb-4 tracking-widest">Available Slots</label>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {timeSlots.map((slot) => {
                                        const isBooked = bookedSlots.includes(slot);
                                        return (
                                            <button
                                                key={slot}
                                                disabled={isBooked}
                                                onClick={() => {
                                                    const isSelected = formData.timeslots.includes(slot);
                                                    const newSlots = isSelected 
                                                        ? formData.timeslots.filter(s => s !== slot) 
                                                        : [...formData.timeslots, slot];
                                                    setFormData({ ...formData, timeslots: newSlots });
                                                }}
                                                className={`flex items-center gap-3 p-4 rounded-2xl border-2 transition-all ${isBooked ? 'opacity-30 cursor-not-allowed grayscale' : formData.timeslots.includes(slot) ? 'border-[#61995E] bg-[#61995E]/5 text-[#61995E]' : 'border-slate-100 hover:border-slate-200 text-slate-600'}`}
                                            >
                                                <Clock size={18} />
                                                <span className="font-bold">{slot}</span>
                                                {isBooked && <span className="ml-auto text-[10px] uppercase">Booked</span>}
                                            </button>
                                        );
                                    })}
                                </div>
                                <button
                                    disabled={formData.timeslots.length === 0}
                                    onClick={() => setStep(2)}
                                    className="w-full mt-8 bg-slate-900 text-white py-4 rounded-2xl font-black uppercase flex items-center justify-center gap-2 disabled:opacity-50"
                                >
                                    {formData.timeslots.length > 0 ? `Continue (${formData.timeslots.length} selected)` : 'Continue'} <ChevronRight size={20} />
                                </button>
                            </motion.div>
                        )}

                        {step === 2 && (
                            <motion.div key="step2" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
                                <div className="bg-amber-50 text-amber-800 p-4 rounded-2xl mb-6 flex items-start gap-3 border border-amber-200 shadow-sm">
                                    <div className="mt-0.5">⚠️</div>
                                    <p className="text-xs font-bold leading-relaxed">
                                        Please ensure your email address is correct. Your booking confirmation and receipt will be sent here automatically after payment.
                                    </p>
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <input type="text" placeholder="Full Name" className={`w-full p-4 bg-slate-50 rounded-2xl border-2 outline-none focus:ring-2 ring-[#61995E] font-bold ${errors.full_name ? 'border-red-500' : 'border-transparent'}`} onChange={(e) => { setFormData({ ...formData, full_name: e.target.value }); setErrors({ ...errors, full_name: '' }); }} />
                                        {errors.full_name && <p className="text-red-500 text-xs mt-1 ml-2 font-bold">{errors.full_name}</p>}
                                    </div>
                                    <div>
                                        <input type="email" placeholder="Email Address" className={`w-full p-4 bg-slate-50 rounded-2xl border-2 outline-none focus:ring-2 ring-[#61995E] font-bold ${errors.email ? 'border-red-500' : 'border-transparent'}`} onChange={(e) => { setFormData({ ...formData, email: e.target.value }); setErrors({ ...errors, email: '' }); }} />
                                        {errors.email && <p className="text-red-500 text-xs mt-1 ml-2 font-bold">{errors.email}</p>}
                                    </div>
                                    <div>
                                        <input type="tel" placeholder="Phone Number" className={`w-full p-4 bg-slate-50 rounded-2xl border-2 outline-none focus:ring-2 ring-[#61995E] font-bold ${errors.phone ? 'border-red-500' : 'border-transparent'}`} onChange={(e) => { setFormData({ ...formData, phone: e.target.value }); setErrors({ ...errors, phone: '' }); }} />
                                        {errors.phone && <p className="text-red-500 text-xs mt-1 ml-2 font-bold">{errors.phone}</p>}
                                    </div>
                                </div>
                                <div className="mt-8 p-6 bg-slate-900 rounded-3xl text-white">
                                    <p className="text-xs opacity-50 uppercase font-bold tracking-widest mb-2">Review Booking</p>
                                    <p className="font-bold text-lg mb-1">{formData.booking_date}</p>
                                    <p className="font-medium text-slate-300 text-sm">{formData.timeslots.join(', ')}</p>
                                </div>
                                <button onClick={handleSubmit} disabled={loading} className="w-full mt-6 bg-[#61995E] text-white py-4 rounded-2xl font-black uppercase shadow-xl hover:scale-[1.02] transition-transform">
                                    {loading ? "Processing..." : `Proceed to Payment (₹${formData.timeslots.length * 400})`}
                                </button>

                                <button onClick={() => setStep(1)} className="w-full mt-2 text-slate-400 font-bold py-2 text-sm">Go Back</button>
                            </motion.div>
                        )}

                        {step === 3 && (
                            <motion.div key="step3" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex flex-col items-center justify-center text-center py-10">
                                <div className="w-20 h-20 bg-green-100 text-[#61995E] rounded-full flex items-center justify-center mb-6">
                                    <CheckCircle2 size={48} />
                                </div>
                                <h3 className="text-2xl font-black text-slate-900 mb-2">BOOKING CONFIRMED!</h3>
                                <p className="text-slate-500 font-medium px-4 mb-4">
                                    Your payment was successful. Please check your email for the confirmation receipt.
                                </p>
                                <div className="bg-slate-50 px-6 py-3 rounded-xl border border-slate-100 inline-block mb-8">
                                    <p className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-1">Payment Reference</p>
                                    <p className="font-mono text-sm text-slate-800 font-bold">{paymentId}</p>
                                </div>
                                <button onClick={() => window.location.href = '/'} className="text-[#61995E] font-black uppercase tracking-widest text-sm underline">Back to Home</button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
        </div>
    );
};

export default Booking;