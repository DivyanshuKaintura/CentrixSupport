// Code: ServiceCard component
'use client';
import { m as motion } from 'framer-motion';
import { useState } from 'react';

export const ServiceCard = ({ title, description, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.2, duration: 0.8 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative group cursor-pointer"
    >
      <motion.div
        animate={{
          scale: isHovered ? 1.02 : 1,
          y: isHovered ? -5 : 0,
        }}
        className="bg-neutral-50 p-8 rounded-lg shadow-sm transition-all duration-300"
      >
        <h3 className="text-2xl font-light text-green-900 mb-4">{title}</h3>
        <p className="text-neutral-600">{description}</p>
        
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isHovered ? 1 : 0 }}
          className="h-0.5 bg-green-900 mt-6 origin-left"
        />
      </motion.div>
    </motion.div>
  );
};