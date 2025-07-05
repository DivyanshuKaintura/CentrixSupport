'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import backgroundImage from '@/../public/marketingHero.jpg';
import { motion } from 'framer-motion';

const navItems = [
  { name: 'Marketing', path: '/marketing', hasDropdown: true },
  { name: 'Home', path: '/' },
  { name: 'Design', path: '/design' },
  { name: 'Development', path: '/development' },
  { name: 'Media', path: '/media' },
];

const HeroSection = () => {
  const navVariants = {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
  };

  const navItemVariants = {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
  };

  const heroVariants = {
    initial: { opacity: 0, x: -50 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.8, ease: 'easeOut' } },
  };

  return (
    <div className="relative min-h-screen">
      {/* Background Image Container */}
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full">
          <Image
            src={backgroundImage}
            alt="Desert landscape"
            fill
            style={{ objectFit: 'cover' }}
            quality={100}
            priority
          />
        </div>
      </div>

      {/* Navigation Bar */}
      <nav className="relative z-10 flex items-center justify-between px-12 py-6">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-white font-Inconsolata">
          Nex Novel
        </Link>

        {/* Nav Items */}
        <motion.div
          variants={navVariants}
          initial="initial"
          animate="animate"
          className="flex-grow hidden md:flex items-center justify-center space-x-12 font-montserrat"
        >
          {navItems.map((item) => (
            <motion.div
              key={item.name}
              variants={navItemVariants}
              className="relative group"
            >
              <Link
                href={item.path}
                className="text-white hover:text-gray-200 transition-colors text-sm"
              >
                {item.name}
                {item.hasDropdown && (
                  <span className="ml-1 inline-block">▼</span>
                )}
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Button and Home Icon */}
        <motion.div className="hidden md:flex items-center space-x-8">
          {/* Fixed Contact Us Link */}
          <motion.a
            href="/contact-us"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 mr-11 text-white transition-colors rounded-full bg-white/20 hover:bg-white/30"
          >
            Contact Us
          </motion.a>
          
        </motion.div>
        <motion.a
            href="/"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 text-white transition-colors"
          >
            🏠
          </motion.a>
      </nav>

      {/* Hero Content */}
      <motion.div
        variants={heroVariants}
        initial="initial"
        animate="animate"
        className="relative z-10 flex flex-col justify-center h-[calc(100vh-200px)] px-12 max-w-xl mt-12"
      >
        <div>
          {/* Subtitle */}
          <motion.h2
            whileHover={{ scale: 1.1 }}
            className="mb-3 text-base font-montserrat text-white/70 font-light"
          >
            NexNovel Media Marketing
          </motion.h2>

          {/* Main Title */}
          <motion.h1
            whileHover={{ scale: 1.1 }}
            className="mb-4 text-5xl font-semibold  text-white leading-tight"
          >
            Strategic Marketing Solutions
          </motion.h1>

          {/* Description Text */}
          <motion.p
            whileHover={{ scale: 1.1 }}
            className="mb-8 text-base font-montserrat text-white/80 leading-relaxed max-w-md"
          >
            Drive growth and engagement with data-driven marketing strategies.
          </motion.p>

          {/* CTA Button */}
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block"
          >
            <Link
              href="/contact-us"
              className="px-5 py-2.5 text-sm text-white transition-colors bg-white/20 hover:bg-white/30 rounded"
            >
              Contact Us
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default HeroSection;