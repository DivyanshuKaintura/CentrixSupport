// components/FeaturesSection.js
'use client';
import { motion } from 'framer-motion';
import { useInView, useAnimation } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { 
  Palette, 
  LayoutIcon, 
  PenTool, 
  ImageIcon, 
  Monitor, 
  Code, 
  UserCheck, 
  Briefcase 
} from 'lucide-react';

const FeaturesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false }); // Set once: false to trigger animations multiple times
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start('animate');
    }
  }, [isInView, controls]);

  const sectionVariants = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.6, -0.05, 0.01, 0.99] } },
  };

  const cardVariants = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.6, -0.05, 0.01, 0.99] } },
  };

  const features = [
    {
      icon: <Palette className="w-8 h-8 text-pink-500" />,
      title: "Brand Identity",
      description: "Logo design, color palettes, and comprehensive brand guidelines.",
    },
    {
      icon: <LayoutIcon className="w-8 h-8 text-purple-500" />,
      title: "UI/UX Design",
      description: "User-centered interfaces that enhance digital experiences.",
    },
    {
      icon: <ImageIcon className="w-8 h-8 text-pink-500" />,
      title: "Visual Design",
      description: "Engaging graphics for web, print, and social media.",
    },
    {
      icon: <PenTool className="w-8 h-8 text-purple-500" />,
      title: "Illustration",
      description: "Custom illustrations and visual storytelling.",
    },
    {
      icon: <Monitor className="w-8 h-8 text-pink-500" />,
      title: "Web Design",
      description: "Responsive and modern websites tailored to your business needs.",
    },
    {
      icon: <Code className="w-8 h-8 text-purple-500" />,
      title: "Development",
      description: "Custom web development solutions for seamless functionality.",
    },
    {
      icon: <UserCheck className="w-8 h-8 text-pink-500" />,
      title: "User Testing",
      description: "Usability testing to ensure your design meets user needs.",
    },
    {
      icon: <Briefcase className="w-8 h-8 text-purple-500" />,
      title: "Project Management",
      description: "Efficient project management to keep your project on track.",
    },
  ];

  return (
    <motion.section
      ref={ref}
      variants={sectionVariants}
      initial="initial"
      animate={controls}
      className="py-16 bg-gray-100"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          variants={cardVariants}
          initial="initial"
          animate={controls}
          className="text-4xl md:text-5xl font-bold text-center mb-12"
        >
          Our Features & Services
        </motion.h2>
        <motion.p
          variants={cardVariants}
          initial="initial"
          animate={controls}
          className="text-xl text-center mb-12 text-gray-600"
        >
          Discover the comprehensive range of services we offer to bring your vision to life.
        </motion.p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={cardVariants}
              initial="initial"
              animate={controls}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="p-8 border rounded-lg bg-white shadow-md hover:shadow-lg transition-all"
            >
              <div className="mb-4 flex justify-center">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-2 text-center">{feature.title}</h3>
              <p className="text-gray-600 text-center">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default FeaturesSection;