'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import backgroundImage from '@/../public/scenery2.jpg';

const navItems = [
  { name: 'Design', path: '/design', hasDropdown: true },
  { name: 'Home', path: '/' },
  { name: 'Marketing', path: '/marketing' },
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

  const textVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.6, -0.05, 0.01, 0.99] } },
  };

  const subTextVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 1, delay: 0.5, ease: [0.6, -0.05, 0.01, 0.99] } },
  };

  return (
    <div className="relative min-h-screen">
      {/* Background Image Container */}
      <div className="absolute inset-0 z-0">
        <Image
          src={backgroundImage}
          alt="Mountain landscape with sunflowers"
          fill
          style={{ objectFit: 'cover' }}
          quality={100}
          priority
        />
      </div>
      {/* Navigation Bar */}
      <motion.nav
        variants={navVariants}
        initial="initial"
        animate="animate"
        className="relative z-10 bg-transparent px-6 py-4"
      >
        <div className="container mx-auto flex items-center justify-between">
          <Link href="/" className="text-white text-2xl font-Inconsolata font-bold">
            NexNovel
          </Link>
          <motion.div className="hidden md:flex items-center space-x-8 font-montserrat">
            {navItems.map((item) => (
              <motion.div
                key={item.name}
                variants={navItemVariants}
                className="relative group"
              >
                <Link
                  href={item.path}
                  className="text-white hover:text-yellow-300 transition-colors"
                >
                  {item.name}
                  {item.hasDropdown && (
                    <span className="ml-1 inline-block">▼</span>
                  )}
                </Link>
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div className="flex items-center space-x-4">
           <motion.div className="hidden md:flex items-center space-x-8">
                     {/* Fixed Contact Us Link */}
                     <motion.a
                       href="/contact-us"
                       whileHover={{ scale: 1.05 }}
                       whileTap={{ scale: 0.95 }}
                       className="px-4 py-2 text-white mr-11 border font-montserrat border-yellow-400 rounded-full hover:bg-yellow-400 hover:text-black transition-colors"
                     >
                       Contact Us
                     </motion.a>
                     
                   </motion.div>
            <motion.a
              href="/"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 text-white hover:text-yellow-400"
            >
              🏠
            </motion.a>
          </motion.div>
        </div>
      </motion.nav>
      {/* Hero Content */}
      <motion.div
        className="relative z-10 flex items-center justify-center min-h-screen"
        initial="initial"
        animate="animate"
      >
        <div className="text-center px-4">
          <motion.h1
            variants={textVariants}
            whileHover={{ scale: 1.05 }}
            className="text-white text-5xl md:text-7xl font-bold mb-6 max-w-4xl mx-auto leading-tight"
          >
            Design that Makes an Impact
          </motion.h1>
          <motion.p
            variants={subTextVariants}
            whileHover={{ scale: 1.05 }}
            className="text-yellow-400 text-xl md:text-2xl"
          >
            Nev Novel Design
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
};
  
export default HeroSection;