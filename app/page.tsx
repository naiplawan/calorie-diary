'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { thaiTranslations as t } from '@/lib/translations';
import { fadeIn, slideUp, staggerContainer } from '@/lib/motion-variants';
import { ChevronLeft, ChevronRight, PlayCircle } from 'lucide-react';

const features = [
  { key: 'keepHealthyDiet', icon: '🥗' },
  { key: 'takeChallenge', icon: '🏆' },
  { key: 'takeWorkLifeBalance', icon: '⚖️' },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e0f5eb] to-[#c2e8d7]">
      <div className="container mx-auto px-6 py-12">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {/* Hero Section */}
          <motion.div className="mb-16" variants={fadeIn}>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">{t.consumeHealthFood}</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Transform your lifestyle with our comprehensive calorie tracking and wellness platform
            </p>
          </motion.div>

          {/* Features Grid */}
          <motion.div className="grid md:grid-cols-3 gap-8 mb-16" variants={staggerContainer}>
            {features.map((feature, index) => (
              <motion.div
                key={feature.key}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
                variants={fadeIn}
                whileHover={{ y: -10, scale: 1.02 }}
                whileTap={{ scale: 0.95 }}
                custom={index}
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-800">{t[feature.key as keyof typeof t]}</h3>
              </motion.div>
            ))}
          </motion.div>

          {/* Navigation Controls */}
          <motion.div className="flex justify-center items-center gap-6 mb-16" variants={slideUp}>
            <motion.button
              className="w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center hover:shadow-lg transition-shadow"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </motion.button>

            <motion.div
              className="flex items-center gap-3 bg-white rounded-full px-6 py-3 shadow-md"
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-lg font-semibold text-gray-800">{t.start}</span>
              <PlayCircle className="w-6 h-6 text-green-600" />
            </motion.div>

            <motion.button
              className="w-12 h-12 rounded-full bg-gray-800 text-white flex items-center justify-center hover:bg-gray-700 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg max-w-md mx-auto"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.6 }}
          >
            <p className="text-gray-600 mb-6 text-lg">{t.noAccount}</p>
            <Link href="/onboarding" className="block">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  size="lg"
                  className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  {t.signUp}
                </Button>
              </motion.div>
            </Link>
          </motion.div>

          {/* Decorative Elements */}
          <div className="absolute top-20 left-10 w-20 h-20 bg-green-200 rounded-full opacity-50 blur-xl"></div>
          <div className="absolute bottom-20 right-10 w-32 h-32 bg-blue-200 rounded-full opacity-30 blur-2xl"></div>
        </motion.div>
      </div>
    </div>
  );
}
