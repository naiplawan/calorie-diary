'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { DashboardHeader } from '@/components/dashboard/dashboard-header';
import { CalorieOverview } from '@/components/dashboard/calorie-overview';
import { QuickStats } from '@/components/dashboard/quick-stats';
import { RecentMeals } from '@/components/dashboard/recent-meals';
import { QuickActions } from '@/components/dashboard/quick-actions';
import { staggerContainer } from '@/components/dashboard/motion-variants';
import type { Stat, Meal } from '@/components/dashboard/types';
import { Droplets, Activity, Clock, Flame as Fire } from 'lucide-react';

export default function Page() {
  // Data state
  const calorieGoal = 2000;
  const caloriesConsumed = 1450;

  const stats: Stat[] = [
    { label: 'Calories Today', value: `${caloriesConsumed}`, unit: 'kcal', icon: Fire, color: 'text-primary' },
    { label: 'Water Intake', value: '6', unit: 'glasses', icon: Droplets, color: 'text-blue-500' },
    { label: 'Active Minutes', value: '45', unit: 'min', icon: Activity, color: 'text-orange-500' },
    { label: 'Sleep', value: '7.2', unit: 'hours', icon: Clock, color: 'text-purple-500' },
  ];

  const recentMeals: Meal[] = [
    { name: 'Breakfast', time: '8:30 AM', calories: 450, items: 'Oatmeal with berries' },
    { name: 'Lunch', time: '12:30 PM', calories: 650, items: 'Grilled chicken salad' },
    { name: 'Snack', time: '3:15 PM', calories: 200, items: 'Greek yogurt' },
    { name: 'Dinner', time: '7:00 PM', calories: 150, items: 'Currently logging...' },
  ];

  // Event handlers
  const handleAddMeal = () => {
    // Navigate to add meal page or open modal
    console.log('Add meal clicked');
  };

  const handleViewAnalytics = () => {
    console.log('View analytics clicked');
  };

  const handleUpdateGoals = () => {
    console.log('Update goals clicked');
  };

  const handleMealPlanning = () => {
    console.log('Meal planning clicked');
  };

  const handleProgressReport = () => {
    console.log('Progress report clicked');
  };

  return (
    <div className="min-h-screen bg-background spotify-scrollbar">
      <div className="spotify-container spotify-section">
        <DashboardHeader />

        <motion.div
          className="grid gap-8 lg:grid-cols-3"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <CalorieOverview calorieGoal={calorieGoal} caloriesConsumed={caloriesConsumed} />

          <QuickStats stats={stats} />

          <RecentMeals meals={recentMeals} onAddMeal={handleAddMeal} />

          <QuickActions
            onViewAnalytics={handleViewAnalytics}
            onUpdateGoals={handleUpdateGoals}
            onMealPlanning={handleMealPlanning}
            onProgressReport={handleProgressReport}
          />
        </motion.div>
      </div>
    </div>
  );
}
