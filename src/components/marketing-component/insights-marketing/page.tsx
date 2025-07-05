'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const marketingInsights = [
  {
    title: 'Leverage Social Proof',
    description:
      'Use customer testimonials, reviews, and case studies to build trust and credibility with your audience.',
    image: '/marketing-socials.jpg',
  },
  {
    title: 'Personalized Campaigns',
    description:
      'Tailor your marketing messages to individual customers based on their preferences and behaviors.',
    image: '/marketing-campaigns.jpg',
  },
  {
    title: 'Video Content Dominance',
    description:
      'Incorporate video content into your strategy as it drives higher engagement and conversion rates.',
    image: '/marketing-video-dominance.jpg',
  },
  {
    title: 'AI-Powered Analytics',
    description:
      'Utilize AI tools to analyze customer data and predict future trends for better decision-making.',
    image: '/marketing-Analytics.jpg',
  },
  {
    title: 'Micro-Influencer Partnerships',
    description:
      'Collaborate with niche influencers to reach highly engaged audiences in specific markets.',
    image: '/marketing-social.jpg',
  },
  {
    title: 'Sustainability in Marketing',
    description:
      'Highlight eco-friendly practices in your campaigns to appeal to environmentally conscious consumers.',
    image: '/marketing-sustainability.jpg',
  },
];

const MarketingInsights = () => {
  return (
    <section className="relative z-10 bg-gray-900 py-16 px-12">
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-3xl font-bold text-white text-center mb-8"
        >
          Marketing Insights
        </motion.h2>

        {/* Insights Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {marketingInsights.map((insight, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-gray-800 p-6 rounded-lg text-center hover:bg-white/30 transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
            >
              {/* Image */}
              <div className="mb-4 overflow-hidden rounded-lg h-40 w-full relative">
                <Image
                  src={insight.image} // Replace with actual image paths
                  alt={insight.title}
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority
                />
              </div>
              {/* Title */}
              <motion.h3
                whileHover={{ scale: 1.1 }}
                className="text-xl font-semibold text-white mb-2"
              >
                {insight.title}
              </motion.h3>
              {/* Description */}
              <p className="text-sm text-gray-400">{insight.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MarketingInsights;