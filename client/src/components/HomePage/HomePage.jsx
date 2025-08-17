import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";


const HomePage = () => {

  const user = useSelector((state) => state.userSlice.user);


  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-tr from-slate-900 via-slate-800 to-gray-900 text-white px-6"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Main Welcome Box */}
      <motion.div
        className="bg-slate-800 shadow-xl border border-slate-600 rounded-2xl p-10 text-center max-w-2xl"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <h1 className="text-5xl font-extrabold text-yellow-400 mb-6">
          Welcome to Home Page
        </h1>
        <p className="text-lg text-gray-300 leading-relaxed mb-6">
          This is your personalized space where you can begin your skill journey.
          Whether you're here to <span className="text-yellow-300 font-semibold">learn</span> or <span className="text-yellow-300 font-semibold">teach</span>,
          everything starts from your home dashboard.
        </p>

        {/* User Info Show if Available */}
        {user && (
          <div className="mt-6">
            <p className="text-xl text-white">
              Hello, <span className="text-yellow-400 font-bold">{user.Name}</span> 👋
            </p>
            <p className="text-base text-slate-300 mt-2">Email: {user.email}</p>
          </div>
        )}
      </motion.div>

      {/* Decorative Touch */}
      <motion.div
        className="mt-10 text-sm text-slate-400 italic"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        Start your journey today – swap skills, connect, and grow 🌱
      <span
        className="bg-slate-500 px-4 mx-4 py-1 rounded-md cursor-pointer text-white hover:bg-yellow-600 transition"
      >
        <Link to="/allUserPage">Explore All Users</Link>
      </span>
      </motion.div>
      
    </motion.div>

  );
};

export default HomePage;
