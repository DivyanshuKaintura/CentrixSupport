'use client';
import { m as motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link'; // Import Link from next/link
import backgroundImage from '../../../../public/Hero_image.jpg';

export const Hero = () => {
  const textHoverVariants = {
    initial: { x: 0 },
    hover: { x: 10, transition: { duration: 0.3 } }
  };
  const headingHoverVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.05, transition: { duration: 0.3 } }
  };
  const buttonVariants = {
    initial: { scale: 1, backgroundColor: 'rgba(255, 255, 255, 0.1)' },
    hover: { 
      scale: 1.05,
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      transition: { duration: 0.3 }
    },
    tap: { scale: 0.95 }
  };

  return (
    <section className="min-h-screen relative overflow-hidden">
      {/* Background Image Container */}
      <div className="absolute inset-0 z-0">
        <Image
          src={backgroundImage}
          alt="Background"
          fill
          priority
          className="object-cover object-center"
          quality={100}
        />
      </div>
      
      {/* Content */}
      <div className="max-w-7xl mx-auto px-8 pt-32 pb-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                whileHover="hover"
                variants={textHoverVariants}
                className="text-black/ text-lg tracking-wide cursor-pointer font-montserrat"
              >
                At Nex Novel, we believe in transforming ideas into impactful realities.
              </motion.p>
              <div className="space-y-2">
                {['Aim', 'Revolutionize', 'AI Future'].map((text, index) => (
                  <motion.h1
                    key={text}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2 }}
                    whileHover="hover"
                    variants={headingHoverVariants}
                    className="text-6xl lg:text-7xl font-bold text-green-800 leading-tight tracking-wider cursor-pointer"
                  >
                    {text}
                  </motion.h1>
                ))}
              </div>
            </div>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              whileHover="hover"
              variants={textHoverVariants}
              className="text-black/80 text-xl font-light cursor-pointer font-montserrat"
            >
              At Nex Novel, we aim to create a Mental Health AI app that revolutionizes the way people manage their mental well-being. 
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex gap-6 pt-4 font-montserrat"
            >
              {/* Learn More Button */}
              {/* <Link href="/learn-more">
                <motion.button
                  variants={buttonVariants}
                  initial="initial"
                  whileHover="hover"
                  whileTap="tap"
                  className="backdrop-blur-sm text-white px-8 py-4 rounded-lg"
                >
                  Learn More
                </motion.button>
              </Link> */}
              
              {/* Contact Us Button */}
              <Link href="/contact-us">
                <motion.button
                  variants={buttonVariants}
                  initial="initial"
                  whileHover="hover"
                  whileTap="tap"
                  className="backdrop-blur-sm text-white px-8 py-4 rounded-lg flex items-center gap-2"
                >
                  Contact Us
                  <motion.span
                    initial={{ x: 0 }}
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.3 }}
                    className="transform translate-y-[1px]"
                  >
                    →
                  </motion.span>
                </motion.button>
              </Link>
            </motion.div>
          </div>
          
          {/* Right Column - Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative h-[600px] flex items-center justify-center"
          >
            {/* <Image
              src={heroImage}
              alt="Hero Image"
              fill
              quality={100}
              className="object-contain"
            /> */}
          </motion.div>
        </div>
      </div>
    </section>
  );
};