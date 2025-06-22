'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { fadeIn } from './motion-variants';
import { Stat } from './types';

interface QuickStatsProps {
  stats: Stat[];
}

export function QuickStats({ stats }: QuickStatsProps) {
  return (
    <motion.div variants={fadeIn} className="space-y-6">
      {stats.map((stat, index) => (
        <motion.div key={stat.label} variants={fadeIn} custom={index}>
          <Card className="spotify-card-compact spotify-hover-lift">
            <CardContent className="p-6">
              <div className="spotify-flex-between">
                <div>
                  <p className="spotify-text-small font-medium mb-2">{stat.label}</p>
                  <p className="text-3xl font-bold text-foreground">
                    {stat.value}
                    <span className="text-base font-normal spotify-text-small ml-2">{stat.unit}</span>
                  </p>
                </div>
                <div className="spotify-flex-center w-12 h-12 rounded-full bg-primary/10">
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
}
