'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import {
  DashboardHeader,
  CalorieOverview,
  QuickStats,
  RecentMeals,
  QuickActions,
  staggerContainer,
} from '@/components/dashboard';
import { Stat, Meal } from '@/components/dashboard/types';
import { Activity, Heart, Zap, Droplets } from 'lucide-react';

export default function DashboardPage() {
  const router = useRouter();

  // Sample data - in a real app, this would come from an API or database
  const sampleStats: Stat[] = [
    {
      label: 'Steps Today',
      value: '8,543',
      unit: 'steps',
      icon: Activity,
      color: 'text-blue-500',
    },
    {
      label: 'Heart Rate',
      value: '72',
      unit: 'bpm',
      icon: Heart,
      color: 'text-red-500',
    },
    {
      label: 'Active Minutes',
      value: '45',
      unit: 'min',
      icon: Zap,
      color: 'text-yellow-500',
    },
    {
      label: 'Water Intake',
      value: '6',
      unit: 'glasses',
      icon: Droplets,
      color: 'text-cyan-500',
    },
  ];

  const sampleMeals: Meal[] = [
    {
      name: 'Breakfast',
      time: '8:30 AM',
      calories: 420,
      items: 'Oatmeal with berries, Greek yogurt',
    },
    {
      name: 'Lunch',
      time: '12:45 PM',
      calories: 650,
      items: 'Grilled chicken salad, quinoa',
    },
    {
      name: 'Snack',
      time: '3:15 PM',
      calories: 180,
      items: 'Apple with almond butter',
    },
  ];

  // Handler functions for actions
  const handleAddMeal = () => {
    router.push('/meals/add');
  };

  const handleViewAnalytics = () => {
    // Navigate to analytics page (to be implemented)
    console.log('Navigate to analytics');
  };

  const handleUpdateGoals = () => {
    // Navigate to goals settings (to be implemented)
    console.log('Navigate to goals settings');
  };

  const handleMealPlanning = () => {
    // Navigate to meal planning (to be implemented)
    console.log('Navigate to meal planning');
  };

  const handleProgressReport = () => {
    // Navigate to progress report (to be implemented)
    console.log('Navigate to progress report');
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-8">
        {/* Dashboard Header */}
        <DashboardHeader />

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Calorie Overview */}
            <CalorieOverview calorieGoal={2200} caloriesConsumed={1250} />

            {/* Recent Meals */}
            <RecentMeals meals={sampleMeals} onAddMeal={handleAddMeal} />
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1 space-y-8">
            {/* Quick Stats */}
            <QuickStats stats={sampleStats} />

            {/* Quick Actions */}
            <QuickActions
              onViewAnalytics={handleViewAnalytics}
              onUpdateGoals={handleUpdateGoals}
              onMealPlanning={handleMealPlanning}
              onProgressReport={handleProgressReport}
            />
          </div>
        </div>

        {/* Additional Dashboard Sections can be added here */}
        <motion.div variants={staggerContainer} className="mt-12">
          {/* Future sections like weekly summary, achievements, etc. */}
        </motion.div>
      </motion.div>
    </div>
  );
}
