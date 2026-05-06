# 🏸 Smasher's Club

> **SMASH EVERYTHING.**

Welcome to the official repository of **Smasher's Club**, the ultimate digital destination for badminton enthusiasts. Designed with a premium "Anti-Gravity" aesthetic, this platform provides a seamless experience for booking courts, finding partners, and mastering the game.

![Smasher's Club Banner](public/banner.png)

## ✨ Key Features

- **⚡ Real-time Booking**: A high-performance booking system integrated with Supabase for instant court availability and reservations.
- **🤝 Find Players**: Connect with fellow badminton players in your area and organize matches.
- **🎮 Gamified Learning**: The "Learn" module offers an interactive way to study badminton fundamentals with smooth animations and progress tracking.
- **📰 Club Newsfeed**: Stay updated with the latest club announcements, tournament results, and news.
- **🛡️ Admin Dashboard**: A secure, comprehensive management interface for club administrators to handle bookings and user requests.
- **📱 Mobile-First Design**: Optimized for a flawless experience across all devices, featuring a modern mobile navigation menu.

## 🛠️ Tech Stack

- **Frontend**: [React](https://reactjs.org/) + [Vite](https://vitejs.dev/)
- **Animation**: [Framer Motion](https://www.framer.com/motion/) & [GSAP](https://greensock.com/gsap/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Database/Backend**: [Supabase](https://supabase.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Routing**: [React Router](https://reactrouter.com/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/) & [Shadcn UI](https://ui.shadcn.com/)

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- A Supabase project

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/1DCRYPTER1/smashers-club.git
   cd smashers-club
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the root directory and add your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

## 🏗️ Project Structure

- `src/components`: Reusable UI components and page-level components.
- `src/assets`: Static assets, SVGs, and images.
- `src/lib`: Utility functions and client configurations (e.g., Supabase).
- `src/App.jsx`: Main routing and application layout.
- `tailwind.config.js`: Custom theme and color configurations.

## 🎨 Design Philosophy

Smasher's Club utilizes a unique **"Anti-Gravity"** theme characterized by:
- High-contrast typography.
- Vibrant, curated green color palettes (`#61995E`).
- Fluid, physics-based animations via Framer Motion.
- Clean, minimalist layouts that prioritize usability and visual impact.

## 📄 License

This project is licensed under the MIT License.

---

Built with ❤️ for the Badminton Community.
