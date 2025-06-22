'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Flame as Fire } from 'lucide-react';
import { fadeIn } from './motion-variants';

interface CalorieOverviewProps {
  calorieGoal: number;
  caloriesConsumed: number;
}

export function CalorieOverview({ calorieGoal, caloriesConsumed }: CalorieOverviewProps) {
  const caloriesRemaining = calorieGoal - caloriesConsumed;
  const progressPercentage = (caloriesConsumed / calorieGoal) * 100;

  return (
    <motion.div variants={fadeIn} className="lg:col-span-2">
      <Card className="spotify-card-interactive border-primary/30 bg-gradient-to-br from-primary/5 to-accent/5">
        <CardHeader className="pb-6">
          <CardTitle className="spotify-flex-between">
            <div className="spotify-flex-center gap-3">
              <Fire className="w-7 h-7 text-primary" />
              <span className="spotify-text-heading">Calorie Progress</span>
            </div>
            <div className="w-4 h-4 bg-primary rounded-full animate-glow" />
          </CardTitle>
          <CardDescription className="spotify-text-body">
            Track your daily caloric intake and stay on target
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="text-center">
            <div className="text-6xl font-bold spotify-text-gradient mb-3">
              {caloriesRemaining > 0 ? caloriesRemaining : 0}
            </div>
            <div className="spotify-text-small text-lg">
              {caloriesRemaining > 0 ? 'calories remaining' : 'over goal'}
            </div>
          </div>

          <div className="relative">
            <div className="spotify-progress-bar h-4">
              <div
                className="spotify-progress-fill shadow-glow"
                style={{ width: `${Math.min(progressPercentage, 100)}%` }}
              />
            </div>
            <div className="spotify-flex-between text-sm spotify-text-small mt-3">
              <span>0</span>
              <span className="font-semibold text-primary">{caloriesConsumed} consumed</span>
              <span>{calorieGoal} goal</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6 pt-6 border-t border-border/30">
            <div className="text-center">
              <div className="text-3xl font-bold text-chart-2 mb-1">65%</div>
              <div className="spotify-text-small">Carbs</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-chart-3 mb-1">20%</div>
              <div className="spotify-text-small">Protein</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-chart-5 mb-1">15%</div>
              <div className="spotify-text-small">Fat</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
