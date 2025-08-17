import { motion } from 'framer-motion';
import React from 'react'

const ProfileCards = () => {
  return (
    <motion.div
      className="bg-slate-800 shadow-md border border-slate-700 rounded-xl p-6 text-center w-72"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      <img
        src={user.profilePic || "/default-avatar.png"}
        alt={user.Name}
        className="w-20 h-20 rounded-full mx-auto mb-4 border-2 border-yellow-400"
      />
      <h2 className="text-xl font-bold text-yellow-300">{user.Name}</h2>
      <p className="text-gray-400">{user.email}</p>
      <p className="text-sm text-gray-300 mt-2">{user.bio || "No bio available"}</p>
    </motion.div>
  );
};

export default ProfileCards