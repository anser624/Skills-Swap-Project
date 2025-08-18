import React from 'react';

import { FaFacebook, FaTwitter, FaGithub, FaLinkedin } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';


const Footer = () => {

  const {user} = useSelector((state) => state.user);

  return (
    <footer className="px-5 py-10 text-white bg-slate-900">
      <div className="grid max-w-6xl grid-cols-1 gap-8 mx-auto sm:grid-cols-2 md:grid-cols-3">

        {/* Brand */}
        <div>
          <h2 className="text-3xl font-bold text-yellow-400">SkillsSwap</h2>
          <p className="mt-2 text-gray-400">A platform to exchange skills and grow together.</p>
        </div>

        {/* Useful Links */}
        <div>
          <h3 className="mb-3 text-xl font-semibold">Quick Links</h3>
          <ul className="space-y-2 text-gray-300">
            {user?.email ? (
              <>
                <li><Link href="/" className="transition hover:text-yellow-400">Home</Link></li>
                <li><Link href="/about" className="transition hover:text-yellow-400">About</Link></li>
              </>
            ) : (
              <>
                <li><Link href="/login" className="transition hover:text-yellow-400">Login</Link></li>
                <li><Link href="/signup" className="transition hover:text-yellow-400">Signup</Link></li>
              </>
            )}
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="mb-3 text-xl font-semibold">Follow Us</h3>
          <div className="flex gap-4 text-2xl">
            <a href="#" className="transition hover:text-blue-500"><FaFacebook /></a>
            <a href="#" className="transition hover:text-sky-400"><FaTwitter /></a>
            <a href="https://github.com/anser624/Skills-Swap-Project" className="transition hover:text-gray-400"><FaGithub /></a>
            <a href="https://www.linkedin.com/in/ansar-malik-30ba1130a/" className="transition hover:text-blue-300"><FaLinkedin /></a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="pt-4 mt-10 text-sm text-center text-gray-500 border-t border-gray-700">
        © {new Date().getFullYear()} SkillsSwap — Built by <span className="font-semibold text-yellow-400">Ansar Malik</span>
      </div>
    </footer>
  );
};

export default Footer;
