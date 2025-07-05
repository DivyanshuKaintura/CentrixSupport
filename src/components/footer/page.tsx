'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Instagram, Twitter, Facebook, Linkedin, Mail, Phone } from 'lucide-react';
import logo from "@/../public/icon.png"

const Footer = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  const iconVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.2,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };

  const linkGroups = [
    {
      title: 'Company',
      links: [
        { name: 'About Us', href: '/about' },
        { name: 'Careers', href: '/careers' },
        { name: 'Blog', href: '/blog' },
        { name: 'Press', href: '/press' },
      ],
    },
    {
      title: 'Services',
      links: [
        { name: 'Design', href: '/design' },
        { name: 'Development', href: '/development' },
        { name: 'Marketing', href: '/marketing' },
        { name: 'Media', href: '/media' },
      ],
    },
    {
      title: 'Contact',
      links: [
        { name: 'Support', href: '/' },
        { name: 'Sales', href: '/' },
        { name: 'Partners', href: '/' },
        { name: 'Help Center', href: '/' },
      ],
    },
  ];

  const socialLinks = [
    { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
    { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
    { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
    { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  ];

  return (
    <footer className="bg-gradient-to-b from-neutral-50 to-neutral-100 pt-20 pb-10">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Logo and Social Section */}
          <motion.div 
            variants={itemVariants}
            className="lg:col-span-2"
          >
            <Link href="/">
              <div className="relative w-40 h-20 mb-8">
                <Image
                  src={logo} // Replace with your logo path
                  alt="Company Logo"
                  fill
                  className="object-contain"
                />
              </div>
            </Link>
            
            <p className="text-neutral-600 mb-6 max-w-md">
               Join us in shaping the future of design and technology. We aim to create a meaningful AI mental health app that helps people manage their mental well-being through personalized support and resources.
            </p>

            <div className="flex space-x-4 mb-8">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={iconVariants}
                  initial="initial"
                  whileHover="hover"
                  className="w-10 h-10 flex items-center justify-center rounded-full 
                           bg-green-900 text-white hover:bg-green-800 
                           transition-colors duration-300"
                >
                  <social.icon size={20} />
                </motion.a>
              ))}
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-neutral-600">
                <Mail size={18} />
                <span>nexnovel@gmail.com</span>
              </div>
              <div className="flex items-center space-x-3 text-neutral-600">
                <Phone size={18} />
                <span>+91 93681 52845</span>
              </div>
              <div className="flex items-center space-x-3 text-neutral-600">
                
              </div>
            </div>
          </motion.div>

          {/* Links Sections */}
          {linkGroups.map((group) => (
            <motion.div 
              key={group.title}
              variants={itemVariants}
              className="space-y-6"
            >
              <h3 className="text-lg font-medium text-green-900">{group.title}</h3>
              <ul className="space-y-4">
                {group.links.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href}
                      className="text-neutral-600 hover:text-green-800 
                                transition-colors duration-300 block
                                transform hover:translate-x-2 transition-transform"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom Bar */}
        <motion.div
          variants={itemVariants}
          className="mt-16 pt-8 border-t border-neutral-200"
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-neutral-600 text-sm">
              © {new Date().getFullYear()} Nex Novel. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <Link href="/" className="text-neutral-600 hover:text-green-800 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/" className="text-neutral-600 hover:text-green-800 transition-colors">
                Terms of Service
              </Link>
              <Link href="/" className="text-neutral-600 hover:text-green-800 transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
};

export default Footer;