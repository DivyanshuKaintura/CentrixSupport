'use client';
import React from 'react';
import { motion } from 'framer-motion';

// Service Data
const services = [
  {
    title: 'Digital Marketing',
    description:
      'Boost your online presence with targeted campaigns and data-driven strategies.',
    icon: '📊',
    color: '#FF6F61', // Coral
  },
  {
    title: 'Content Creation',
    description:
      'Engage your audience with high-quality, creative content tailored to your brand.',
    icon: '✍️',
    color: '#6BCB77', // Green
  },
  {
    title: 'Social Media Management',
    description:
      'Grow your social media channels with consistent, strategic posting and analytics.',
    icon: '📱',
    color: '#4D96FF', // Blue
  },
  {
    title: 'SEO Optimization',
    description:
      'Improve your website’s visibility and rank higher on search engine results.',
    icon: '🔍',
    color: '#FFD97D', // Yellow
  },
  {
    title: 'Email Marketing',
    description:
      'Reach your audience directly with personalized and impactful email campaigns.',
    icon: '✉️',
    color: '#FF9A8B', // Light Coral
  },
  {
    title: 'Analytics & Reporting',
    description:
      'Track performance and make data-driven decisions with detailed reports.',
    icon: '📈',
    color: '#937DC2', // Purple
  },
];

const ServicesSection = () => {
  return (
    <section className="relative z-10 bg-gray-100 py-16 px-12">
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-3xl font-bold text-gray-900 text-center mb-8"
        >
          Our Services
        </motion.h2>

        {/* Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-gray-50 p-6 rounded-lg text-center hover:bg-gray-100 transition-colors duration-300 shadow-md"
              whileHover={{ scale: 1.05 }}
            >
              {/* Icon */}
              <motion.div
                whileHover={{ scale: 1.2 }}
                className="text-4xl inline-block mb-4"
                style={{ color: service.color }}
              >
                {service.icon}
              </motion.div>
              {/* Title */}
              <motion.h3
                whileHover={{ scale: 1.1 }}
                className="text-xl font-semibold text-gray-900 mb-2"
              >
                {service.title}
              </motion.h3>
              {/* Description */}
              <p className="text-sm text-gray-600">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;