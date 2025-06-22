'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Apple, ChevronRight, Plus } from 'lucide-react';
import { fadeIn } from './motion-variants';
import { Meal } from './types';

interface RecentMealsProps {
  meals: Meal[];
  onAddMeal?: () => void;
}

export function RecentMeals({ meals, onAddMeal }: RecentMealsProps) {
  return (
    <motion.div variants={fadeIn} className="lg:col-span-2">
      <Card className="spotify-card">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Apple className="w-5 h-5 text-primary" />
              Today's Meals
            </CardTitle>
            <CardDescription>Your nutrition timeline</CardDescription>
          </div>
          <Button size="sm" className="spotify-button" onClick={onAddMeal}>
            <Plus className="w-4 h-4 mr-1" />
            Add Meal
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {meals.map((meal) => (
            <motion.div
              key={meal.name}
              className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-semibold">{meal.name}</h4>
                  <span className="text-sm text-muted-foreground">{meal.time}</span>
                </div>
                <p className="text-sm text-muted-foreground">{meal.items}</p>
              </div>
              <div className="text-right">
                <div className="font-semibold text-primary">{meal.calories} cal</div>
                <ChevronRight className="w-4 h-4 text-muted-foreground ml-auto" />
              </div>
            </motion.div>
          ))}
        </CardContent>
      </Card>
    </motion.div>
  );
}
