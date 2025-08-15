import React from 'react';

import { FaFacebook, FaTwitter, FaGithub, FaLinkedin } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';


const Footer = () => {

  const user = useSelector((state) => state.userSlice.user);

  return (
    <footer className="bg-slate-900 text-white py-10 px-5">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">

        {/* Brand */}
        <div>
          <h2 className="text-3xl font-bold text-yellow-400">SkillsSwap</h2>
          <p className="mt-2 text-gray-400">A platform to exchange skills and grow together.</p>
        </div>

        {/* Useful Links */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-gray-300">
            {user?.email ? (
              <>
                <li><Link href="/homepage" className="hover:text-yellow-400 transition">Home</Link></li>
                <li><Link href="/about" className="hover:text-yellow-400 transition">About</Link></li>
              </>
            ) : (
              <>
                <li><Link href="/homepage" className="hover:text-yellow-400 transition">Login</Link></li>
                <li><Link href="/about" className="hover:text-yellow-400 transition">Signup</Link></li>
              </>
            )}
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Follow Us</h3>
          <div className="flex gap-4 text-2xl">
            <a href="#" className="hover:text-blue-500 transition"><FaFacebook /></a>
            <a href="#" className="hover:text-sky-400 transition"><FaTwitter /></a>
            <a href="https://github.com/anser624/Skills-Swap-Project" className="hover:text-gray-400 transition"><FaGithub /></a>
            <a href="#" className="hover:text-blue-300 transition"><FaLinkedin /></a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-10 text-center text-sm text-gray-500 border-t border-gray-700 pt-4">
        © {new Date().getFullYear()} SkillsSwap — Built by <span className="text-yellow-400 font-semibold">Ansar Malik</span>
      </div>
    </footer>
  );
};

export default Footer;
