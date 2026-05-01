import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Booking from './components/Booking';
import Admin from './components/Admin';
import News from './components/News';
import Learn from './components/Learn';
import Contact from './components/Contact';
import FindPlayers from './components/FindPlayers';
import BadmintonCourtSVG from './assets/badminton_court_half.svg';

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full flex flex-col md:flex-row min-h-screen overflow-x-hidden">
      <div className="flex-1 flex flex-col justify-center px-6 md:pl-20 py-10 z-10 order-2 md:order-1 text-center md:text-left md:mt-0 mt-[-500px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="relative mt-[-40px] md:mt-0"
        >
          <h1 className="text-white text-6xl md:text-6xl lg:text-9xl font-black leading-[0.9] mb-6 tracking-tighter">
            SMASH <br className="hidden md:block" /> EVERYTHING.
          </h1>
          <p className="text-blue-100 text-base md:text-lg max-w-md mx-auto md:mx-0 font-medium opacity-80 mb-8">
            The ultimate destination for badminton enthusiasts.
            Book courts and join our club.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start">
            <motion.button
              onClick={() => navigate('/book')}
              whileHover={{ y: -5, boxShadow: "0 20px 40px rgba(255,255,255,0.4)" }}
              whileTap={{ scale: 0.95 }}
              initial={{ boxShadow: "0 10px 30px rgba(255,255,255,0.15)" }}
              className="bg-white text-[#61995E] px-10 py-4 rounded-full font-black tracking-wide text-lg w-full sm:w-auto"
            >
              BOOK NOW
            </motion.button>
          </div>
        </motion.div>
      </div>

      <div className="flex-1 flex order-1 items-start justify-center md:order-2 md:items-center md:justify-end h-[40vh] md:h-screen relative">
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full h-full flex items-start justify-center md:items-center md:justify-end"
        >
          <img
            src={BadmintonCourtSVG}
            alt="Court"
            className="
              w-auto object-contain
              h-[140%] rotate-180 translate-y-[-25%] scale-110 
              md:h-[100vh] md:rotate-[-90deg] md:translate-y-0 md:translate-x-[5%] md:mr-[-5%]
              drop-shadow-[-30px_0px_40px_rgba(0,0,0,0.4)]
            "
          />
        </motion.div>
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <div className="w-full min-h-screen bg-[#61995E] relative">
        <Routes>
          <Route path="/" element={<><Navbar /><Home /></>} />
          <Route path="/book" element={<><Navbar /><Booking /></>} />
          <Route path="/news" element={<><Navbar /><News /></>} />
          <Route path="/learn" element={<><Navbar /><Learn /></>} />
          <Route path="/contact" element={<><Navbar /><Contact /></>} />
          <Route path="/players" element={<><Navbar /><FindPlayers /></>} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;