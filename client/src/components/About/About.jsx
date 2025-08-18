import React from "react";
import { motion } from "framer-motion";

const About = () => {
  return (
    <div className="min-h-screen pt-32 md:pt-40 bg-gradient-to-br from-gray-900 to-slate-800 text-white px-4 sm:px-6 md:px-8 py-12 flex flex-col items-center font-sans overflow-hidden">

      {/* Header */}
      <motion.h1
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-yellow-400 mb-8 text-center"
      >
        About Our App
      </motion.h1>

      {/* App Description */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
        className="max-w-4xl bg-slate-900 shadow-lg border border-slate-700 rounded-xl p-6 sm:p-8 md:p-10 mb-12 text-base sm:text-lg space-y-5 sm:space-y-6 leading-relaxed"
      >
        <p>
          Our platform is a <span className="text-yellow-400 font-semibold">Skill-Swap based web app</span> built for learners and educators.
          The idea is simple: you teach something, and in return, you learn something new — completely free.
        </p>
        <p>
          Whether you're a student, freelancer, or a hobbyist, this app helps you connect with like-minded people to exchange skills
          like coding, designing, marketing, languages, or even cooking!
        </p>
        <p>
          🔁 It’s not just a platform — it’s a community. Built with ❤️ by passionate developers for real users like you.
        </p>
      </motion.div>

      {/* Why Choose Us */}
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="w-full max-w-5xl mb-12"
      >
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 border-b-2 border-yellow-500 inline-block">
          Why Choose Us?
        </h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 mt-4 sm:mt-6 text-base sm:text-lg md:text-xl text-gray-200">
          {[
            "🌐 100% Free & Open — No hidden fees or ads.",
            "🤝 Real Skill Matching — We match users based on what they teach & learn.",
            "⚡ Fast, Lightweight & Secure — Built using React, Tailwind, Node.js & MongoDB.",
            "🌍 Perfect for learners in Pakistan, India, UAE, and across the world.",
          ].map((text, i) => (
            <motion.li
              key={i}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="bg-slate-700 p-4 sm:p-6 rounded-lg shadow hover:shadow-yellow-500/30 transition text-center sm:text-left"
            >
              {text}
            </motion.li>
          ))}
        </ul>
      </motion.div>

      {/* Developer Info */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        viewport={{ once: true }}
        className="text-center mt-6 sm:mt-10"
      >
        <p className="text-base sm:text-lg md:text-xl text-gray-300">Made with 💙 by</p>
        <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mt-2 text-yellow-400 hover:underline">
          Ansar Malik
        </h3>
        <p className="text-gray-400 mt-1 text-sm sm:text-base italic">
          Front-End Developer | React Enthusiast | Dreaming Big 🚀
        </p>
      </motion.div>
    </div>
  );
};

export default About;
