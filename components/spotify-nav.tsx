import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Home, BarChart3, Target, Settings, User, Apple, Calendar, Zap } from 'lucide-react';

const navigationItems = [
  { href: '/dashboard', label: 'Home', icon: Home, badge: null },
  { href: '/meals', label: 'Meals', icon: Apple, badge: null },
  { href: '/analytics', label: 'Analytics', icon: BarChart3, badge: 'Pro' },
  { href: '/goals', label: 'Goals', icon: Target, badge: null },
  { href: '/calendar', label: 'Calendar', icon: Calendar, badge: null },
  { href: '/workouts', label: 'Workouts', icon: Zap, badge: 'New' },
];

const bottomItems = [
  { href: '/profile', label: 'Profile', icon: User },
  { href: '/settings', label: 'Settings', icon: Settings },
];

interface SpotifyNavProps {
  className?: string;
  currentPath?: string;
}

export const SpotifyNav: React.FC<SpotifyNavProps> = ({ className, currentPath = '' }) => {
  return (
    <nav className={cn('spotify-backdrop rounded-2xl p-6 h-fit', className)}>
      <div className="space-y-8">
        {/* Logo */}
        <div className="spotify-flex-center">
          <div className="spotify-flex-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary spotify-glow" />
            <span className="font-bold text-xl spotify-text-gradient">CalorieDiary</span>
          </div>
        </div>

        {/* Main Navigation */}
        <div className="space-y-2">
          {navigationItems.map((item) => {
            const isActive = currentPath === item.href;
            return (
              <motion.div key={item.href} whileHover={{ x: 4 }} whileTap={{ scale: 0.98 }}>
                <Link href={item.href} className={cn('spotify-nav-item group', isActive && 'spotify-nav-item-active')}>
                  <item.icon className="w-5 h-5" />
                  <span className="flex-1">{item.label}</span>
                  {item.badge && (
                    <Badge variant={item.badge === 'Pro' ? 'spotify-warning' : 'spotify-success'} size="sm">
                      {item.badge}
                    </Badge>
                  )}
                  {isActive && <div className="w-1 h-1 rounded-full bg-primary animate-glow" />}
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Divider */}
        <div className="h-px bg-border/50" />

        {/* Bottom Navigation */}
        <div className="space-y-2">
          {bottomItems.map((item) => {
            const isActive = currentPath === item.href;
            return (
              <motion.div key={item.href} whileHover={{ x: 4 }} whileTap={{ scale: 0.98 }}>
                <Link href={item.href} className={cn('spotify-nav-item group', isActive && 'spotify-nav-item-active')}>
                  <item.icon className="w-5 h-5" />
                  <span className="flex-1">{item.label}</span>
                  {isActive && <div className="w-1 h-1 rounded-full bg-primary animate-glow" />}
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* User Section */}
        <div className="pt-4 border-t border-border/50">
          <div className="spotify-flex-center gap-3 p-3 rounded-lg bg-muted/20 hover:bg-muted/40 transition-colors cursor-pointer">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent" />
            <div className="flex-1 text-left">
              <div className="font-medium text-sm">Alex Johnson</div>
              <div className="spotify-text-small">Free Plan</div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
