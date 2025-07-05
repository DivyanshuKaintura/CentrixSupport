// components/DesignGreatnessSection.js
'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import designImage1 from '@/../public/design4.jpg';
import designImage2 from '@/../public/scenery2.jpg';
import designImage3 from '@/../public/design3.jpg';

const DesignGreatnessSection = () => {
  const sectionVariants = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.6, -0.05, 0.01, 0.99] } },
  };

  const cardVariants = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.6, -0.05, 0.01, 0.99] } },
  };

  return (
    <motion.section
      variants={sectionVariants}
      initial="initial"
      animate="animate"
      className="py-20 bg-gray-900 text-white"
    >
      <div className="container mx-auto px-4">
        <motion.h2
          variants={cardVariants}
          className="text-4xl md:text-5xl font-bold text-center mb-12"
        >
          Experience the Greatness of Our Design
        </motion.h2>
        <motion.p
          variants={cardVariants}
          className="text-xl text-center mb-12"
        >
          Discover why Nex Novel Media Design stands out in the world of design.
        </motion.p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <motion.div
            variants={cardVariants}
            className="bg-gray-800 p-8 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
          >
            <Image
              src={designImage1}
              alt="Design Sample 1"
              width={300}
              height={200}
              className="rounded-lg mb-4"
            />
            <h3 className="text-2xl font-bold mb-2">Innovative Solutions</h3>
            <p className="text-gray-400">
              We deliver cutting-edge design solutions that solve complex problems and exceed expectations.
            </p>
          </motion.div>
          {/* Card 2 */}
          <motion.div
            variants={cardVariants}
            className="bg-gray-800 p-8 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
          >
            <Image
              src={designImage2}
              alt="Design Sample 2"
              width={300}
              height={200}
              className="rounded-lg mb-4"
            />
            <h3 className="text-2xl font-bold mb-2">Creative Vision</h3>
            <p className="text-gray-400">
              Our team of designers brings creativity and vision to every project, ensuring unique and impactful designs.
            </p>
          </motion.div>
          {/* Card 3 */}
          <motion.div
            variants={cardVariants}
            className="bg-gray-800 p-8 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
          >
            <Image
              src={designImage3}
              alt="Design Sample 3"
              width={300}
              height={200}
              className="rounded-lg mb-4"
            />
            <h3 className="text-2xl font-bold mb-2">Client-Centric Approach</h3>
            <p className="text-gray-400">
              We prioritize understanding our clients needs and work closely with them to bring their vision to life.
            </p>
          </motion.div>
        </div>
        {/* Testimonials */}
        <motion.div
          variants={cardVariants}
          className="mt-12 text-center"
        >
          <h2 className="text-3xl font-bold mb-6">What We Proudly Say</h2>
          <div className="flex flex-col items-center space-y-6">
            <blockquote className="text-lg text-gray-400">
              Transform your brand with cutting-edge design solutions that capture attention and inspire action.
              <footer className="text-gray-300 mt-2">- Nex Novel Media Design</footer>
            </blockquote>
            
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default DesignGreatnessSection;