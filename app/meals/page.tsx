'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Plus, Coffee, Sun, Moon, Cookie, Search, Calendar, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/modern-card';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/modern-input';
import { getThaiFood, type FoodItem } from '@/lib/thai-food-api';
import { fadeIn, slideUp, staggerContainer } from '@/lib/motion-variants';
import { t } from '@/lib/translations';

const buttonTap = {
  tap: { scale: 0.95 },
};

interface DiaryEntry {
  id: number;
  name: string;
  nameEn: string;
  calories: number;
  mealType: string;
  protein: number;
  carbs: number;
  fat: number;
  timestamp: Date;
}

export default function MealsPage() {
  const [activeTab, setActiveTab] = useState('recently');
  const [mealType, setMealType] = useState('lunch');
  const [searchQuery, setSearchQuery] = useState('');
  const [foodItems, setFoodItems] = useState<FoodItem[]>([]);
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);
  const [dailyStats, setDailyStats] = useState({
    consumed: 1425,
    goal: 2000,
    carbs: { consumed: 142, goal: 250 },
    protein: { consumed: 85, goal: 150 },
    fat: { consumed: 47, goal: 67 },
  });

  useEffect(() => {
    const loadFoodItems = async () => {
      const items = await getThaiFood();
      if (searchQuery) {
        const filtered = items.filter(
          (item: FoodItem) =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.nameEn.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFoodItems(filtered);
      } else {
        setFoodItems(items.slice(0, 10));
      }
    };

    loadFoodItems();
  }, [searchQuery, activeTab]);

  const addFoodItem = (food: FoodItem) => {
    const newEntry: DiaryEntry = {
      id: Date.now(),
      name: food.name,
      nameEn: food.nameEn,
      calories: food.calories,
      mealType: mealType,
      protein: food.protein,
      carbs: food.carbs,
      fat: food.fat,
      timestamp: new Date(),
    };

    setDiaryEntries((prev) => [...prev, newEntry]);

    setDailyStats((prev) => ({
      ...prev,
      consumed: prev.consumed + food.calories,
      carbs: { ...prev.carbs, consumed: prev.carbs.consumed + food.carbs },
      protein: { ...prev.protein, consumed: prev.protein.consumed + food.protein },
      fat: { ...prev.fat, consumed: prev.fat.consumed + food.fat },
    }));
  };

  const removeEntry = (entryId: number) => {
    const entry = diaryEntries.find((e) => e.id === entryId);
    if (entry) {
      setDiaryEntries((prev) => prev.filter((e) => e.id !== entryId));
      setDailyStats((prev) => ({
        ...prev,
        consumed: prev.consumed - entry.calories,
        carbs: { ...prev.carbs, consumed: Math.max(0, prev.carbs.consumed - entry.carbs) },
        protein: { ...prev.protein, consumed: Math.max(0, prev.protein.consumed - entry.protein) },
        fat: { ...prev.fat, consumed: Math.max(0, prev.fat.consumed - entry.fat) },
      }));
    }
  };

  const calorieProgress = (dailyStats.consumed / dailyStats.goal) * 100;
  const carbProgress = (dailyStats.carbs.consumed / dailyStats.carbs.goal) * 100;
  const proteinProgress = (dailyStats.protein.consumed / dailyStats.protein.goal) * 100;
  const fatProgress = (dailyStats.fat.consumed / dailyStats.fat.goal) * 100;

  const mealTypeIcons = {
    breakfast: Coffee,
    lunch: Sun,
    dinner: Moon,
    snack: Cookie,
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-background via-background to-muted/10"
      initial="hidden"
      animate="visible"
      variants={fadeIn}
    >
      <div className="max-w-md mx-auto p-6">
        {/* Header */}
        <motion.div className="flex items-center justify-between mb-8" variants={slideUp}>
          <Link href="/dashboard">
            <Button variant="ghost" size="icon" className="apple-card-interactive">
              <ArrowLeft size={20} />
            </Button>
          </Link>
          <h1 className="spotify-text-heading">Food Diary</h1>
          <Button variant="ghost" size="icon" className="apple-card-interactive">
            <Calendar size={20} />
          </Button>
        </motion.div>

        {/* Search Bar */}
        <motion.div variants={slideUp} className="mb-6">
          <Input
            placeholder={t('meals_searchPlaceholder_i18n')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            leftIcon={<Search className="w-4 h-4" />}
            variant="glass"
            className="bg-background/50"
          />
        </motion.div>

        {/* Daily Intake Card */}
        <motion.div variants={slideUp} className="mb-8">
          <Card variant="glass" className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="spotify-text-subheading">Daily Progress</h2>
              <span className="text-sm text-muted-foreground">{new Date().toLocaleDateString()}</span>
            </div>
            <div className="relative mb-4">
              <Progress value={calorieProgress} className="h-3 spotify-backdrop border border-border/20" />
              <div
                className="absolute top-0 left-0 h-3 bg-gradient-to-r from-primary via-primary/80 to-primary/60 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(calorieProgress, 100)}%` }}
              />
            </div>
            <div className="flex justify-between text-sm">
              <span className="font-medium">{dailyStats.consumed} kcal</span>
              <span className="text-muted-foreground">{dailyStats.goal} kcal goal</span>
            </div>
          </Card>
        </motion.div>

        {/* Macros */}
        <motion.div className="grid grid-cols-3 gap-4 mb-8" variants={staggerContainer}>
          <motion.div variants={slideUp}>
            <Card variant="minimal" className="p-4 text-center">
              <p className="spotify-text-small font-medium mb-2 text-orange-600">Carbs</p>
              <div className="relative mb-2">
                <Progress value={carbProgress} className="h-2" />
              </div>
              <p className="spotify-text-small text-muted-foreground">
                {dailyStats.carbs.consumed}g/{dailyStats.carbs.goal}g
              </p>
            </Card>
          </motion.div>
          <motion.div variants={slideUp}>
            <Card variant="minimal" className="p-4 text-center">
              <p className="spotify-text-small font-medium mb-2 text-blue-600">Protein</p>
              <div className="relative mb-2">
                <Progress value={proteinProgress} className="h-2" />
              </div>
              <p className="spotify-text-small text-muted-foreground">
                {dailyStats.protein.consumed}g/{dailyStats.protein.goal}g
              </p>
            </Card>
          </motion.div>
          <motion.div variants={slideUp}>
            <Card variant="minimal" className="p-4 text-center">
              <p className="spotify-text-small font-medium mb-2 text-green-600">Fat</p>
              <div className="relative mb-2">
                <Progress value={fatProgress} className="h-2" />
              </div>
              <p className="spotify-text-small text-muted-foreground">
                {dailyStats.fat.consumed}g/{dailyStats.fat.goal}g
              </p>
            </Card>
          </motion.div>
        </motion.div>

        {/* Meal Types */}
        <motion.div className="grid grid-cols-4 gap-2 mb-8" variants={staggerContainer}>
          {Object.entries(mealTypeIcons).map(([type, Icon]) => (
            <motion.div key={type} variants={slideUp} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                variant={mealType === type ? 'primary' : 'glass'}
                size="sm"
                className="w-full flex flex-col gap-1 h-16"
                onClick={() => setMealType(type)}
              >
                <Icon className="w-4 h-4" />
                <span className="text-xs capitalize">{type}</span>
              </Button>
            </motion.div>
          ))}
        </motion.div>

        {/* Today's Meals Section */}
        {diaryEntries.length > 0 && (
          <motion.div variants={slideUp} className="mb-8">
            <Card variant="glass" className="p-4">
              <h3 className="spotify-text-subheading mb-4">Today's Meals</h3>
              <div className="space-y-3">
                {diaryEntries.map((entry) => (
                  <div key={entry.id} className="flex items-center justify-between p-3 bg-background/30 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                      <div>
                        <p className="font-medium text-sm">{entry.name}</p>
                        <p className="text-xs text-muted-foreground capitalize">
                          {entry.mealType} • {entry.calories} kcal
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeEntry(entry.id)}
                      className="text-destructive hover:text-destructive/80"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        )}

        {/* Tabs */}
        <motion.div variants={slideUp} className="mb-6">
          <Tabs defaultValue="recently" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3 bg-transparent">
              <TabsTrigger
                value="recently"
                className="data-[state=active]:border-b-2 data-[state=active]:border-primary bg-transparent"
              >
                {t('meals_recently_i18n')}
              </TabsTrigger>
              <TabsTrigger
                value="liked"
                className="data-[state=active]:border-b-2 data-[state=active]:border-primary bg-transparent"
              >
                {t('meals_favorites_i18n')}
              </TabsTrigger>
              <TabsTrigger
                value="popular"
                className="data-[state=active]:border-b-2 data-[state=active]:border-primary bg-transparent"
              >
                {t('meals_all_i18n')}
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </motion.div>

        {/* Food List */}
        <motion.div className="space-y-3 mb-20" variants={staggerContainer}>
          {foodItems.map((food, index) => (
            <motion.div key={food.id || index} variants={slideUp}>
              <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                      <span className="text-lg">{food.emoji || '🍽️'}</span>
                    </div>
                    <div>
                      <h3 className="font-medium text-sm">{food.name}</h3>
                      <p className="text-xs text-muted-foreground">{food.nameEn}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                        <span>{food.calories} kcal</span>
                        <span className="w-1 h-1 bg-muted-foreground rounded-full"></span>
                        <span>{food.servingSize || 100}g</span>
                      </div>
                    </div>
                  </div>
                  <motion.div whileTap={buttonTap.tap}>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => addFoodItem(food)}
                      className="text-primary hover:text-primary/80"
                    >
                      <Plus size={18} />
                    </Button>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Add Custom Food Button */}
        <motion.div
          className="fixed bottom-6 right-6"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, type: 'spring', stiffness: 300, damping: 24 }}
          whileTap={buttonTap.tap}
          whileHover={{ scale: 1.05 }}
        >
          <Button className="rounded-full w-14 h-14 bg-primary hover:bg-primary/80 shadow-lg">
            <Plus size={24} />
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
}
