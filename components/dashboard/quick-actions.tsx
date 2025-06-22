'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart3, Target, Calendar, TrendingUp } from 'lucide-react';
import { fadeIn } from './motion-variants';

interface QuickActionsProps {
  onViewAnalytics?: () => void;
  onUpdateGoals?: () => void;
  onMealPlanning?: () => void;
  onProgressReport?: () => void;
}

export function QuickActions({ onViewAnalytics, onUpdateGoals, onMealPlanning, onProgressReport }: QuickActionsProps) {
  return (
    <motion.div variants={fadeIn}>
      <Card className="spotify-card">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks and shortcuts</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button variant="outline" size="sm" className="w-full justify-start" onClick={onViewAnalytics}>
            <BarChart3 className="w-4 h-4 mr-2" />
            View Analytics
          </Button>
          <Button variant="outline" size="sm" className="w-full justify-start" onClick={onUpdateGoals}>
            <Target className="w-4 h-4 mr-2" />
            Update Goals
          </Button>
          <Button variant="outline" size="sm" className="w-full justify-start" onClick={onMealPlanning}>
            <Calendar className="w-4 h-4 mr-2" />
            Meal Planning
          </Button>
          <Button variant="outline" size="sm" className="w-full justify-start" onClick={onProgressReport}>
            <TrendingUp className="w-4 h-4 mr-2" />
            Progress Report
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}
