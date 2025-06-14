"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { X, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { getMealsByDate } from "@/lib/meal-service"
import { thaiTranslations as t } from "@/lib/translations"
import { fadeIn, slideUp, staggerContainer, buttonTap } from "@/lib/motion-variants"

export default function MealsPage() {
  const [activeTab, setActiveTab] = useState("recently")
  const [mealType, setMealType] = useState("lunch")
  const [meals, setMeals] = useState(() => getMealsByDate(new Date()))

  return (
    <motion.div className="min-h-screen bg-[#e0f5eb]" initial="hidden" animate="visible" variants={fadeIn}>
      <div className="max-w-md mx-auto p-4">
        {/* Header */}
        <motion.div className="flex items-center justify-between mb-6" variants={slideUp}>
          <Link href="/dashboard">
            <motion.div whileTap={buttonTap.tap}>
              <Button variant="ghost" size="icon" className="rounded-full bg-[#c2e8d7]">
                <X size={20} />
              </Button>
            </motion.div>
          </Link>
          <h1 className="text-xl font-semibold">{t.dailyActivities}</h1>
          <motion.div whileTap={buttonTap.tap}>
            <Button variant="ghost" size="icon" className="rounded-full bg-[#c2e8d7]">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M19 13C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11C18.4477 11 18 11.4477 18 12C18 12.5523 18.4477 13 19 13Z"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M5 13C5.55228 13 6 12.5523 6 12C6 11.4477 5.55228 11 5 11C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13Z"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Button>
          </motion.div>
        </motion.div>

        {/* Daily Intake */}
        <motion.div className="mb-6" variants={slideUp}>
          <h2 className="text-sm font-medium mb-2">{t.dailyIntake}</h2>
          <Progress value={75} className="h-2" />
        </motion.div>

        {/* Macros */}
        <motion.div className="grid grid-cols-3 gap-4 mb-6" variants={staggerContainer}>
          <motion.div variants={slideUp}>
            <p className="text-sm font-medium mb-1">{t.carbs}</p>
            <Progress value={50} className="h-2 mb-1" />
            <p className="text-xs">21/447g</p>
          </motion.div>
          <motion.div variants={slideUp}>
            <p className="text-sm font-medium mb-1">{t.protein}</p>
            <Progress value={66} className="h-2 mb-1" />
            <p className="text-xs">23/57g</p>
          </motion.div>
          <motion.div variants={slideUp}>
            <p className="text-sm font-medium mb-1">{t.fat}</p>
            <Progress value={75} className="h-2 mb-1" />
            <p className="text-xs">20/277g</p>
          </motion.div>
        </motion.div>

        {/* Tabs */}
        <motion.div variants={slideUp}>
          <Tabs defaultValue="recently" className="mb-6">
            <TabsList className="grid grid-cols-3 bg-transparent">
              <TabsTrigger
                value="recently"
                className="data-[state=active]:border-b-2 data-[state=active]:border-black bg-transparent"
                onClick={() => setActiveTab("recently")}
              >
                {t.recently}
              </TabsTrigger>
              <TabsTrigger
                value="liked"
                className="data-[state=active]:border-b-2 data-[state=active]:border-black bg-transparent"
                onClick={() => setActiveTab("liked")}
              >
                {t.liked}
              </TabsTrigger>
              <TabsTrigger
                value="history"
                className="data-[state=active]:border-b-2 data-[state=active]:border-black bg-transparent"
                onClick={() => setActiveTab("history")}
              >
                {t.history}
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </motion.div>

        {/* Meal Types */}
        <motion.div className="flex justify-between mb-6" variants={staggerContainer}>
          <motion.div variants={slideUp} whileTap={buttonTap.tap}>
            <Button
              variant={mealType === "breakfast" ? "default" : "outline"}
              className={`rounded-full ${mealType === "breakfast" ? "bg-black text-white" : "bg-[#c2e8d7]"}`}
              onClick={() => setMealType("breakfast")}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="mr-2"
              >
                <path
                  d="M18 8H19C20.0609 8 21.0783 8.42143 21.8284 9.17157C22.5786 9.92172 23 10.9391 23 12C23 13.0609 22.5786 14.0783 21.8284 14.8284C21.0783 15.5786 20.0609 16 19 16H18"
                  stroke={mealType === "breakfast" ? "white" : "black"}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2 8H18V17C18 18.0609 17.5786 19.0783 16.8284 19.8284C16.0783 20.5786 15.0609 21 14 21H6C4.93913 21 3.92172 20.5786 3.17157 19.8284C2.42143 19.0783 2 18.0609 2 17V8Z"
                  stroke={mealType === "breakfast" ? "white" : "black"}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M6 1V4"
                  stroke={mealType === "breakfast" ? "white" : "black"}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M10 1V4"
                  stroke={mealType === "breakfast" ? "white" : "black"}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M14 1V4"
                  stroke={mealType === "breakfast" ? "white" : "black"}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {t.breakfast}
            </Button>
          </motion.div>

          <motion.div variants={slideUp} whileTap={buttonTap.tap}>
            <Button
              variant={mealType === "lunch" ? "default" : "outline"}
              className={`rounded-full ${mealType === "lunch" ? "bg-black text-white" : "bg-[#c2e8d7]"}`}
              onClick={() => setMealType("lunch")}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="mr-2"
              >
                <path
                  d="M18 8H19C20.0609 8 21.0783 8.42143 21.8284 9.17157C22.5786 9.92172 23 10.9391 23 12C23 13.0609 22.5786 14.0783 21.8284 14.8284C21.0783 15.5786 20.0609 16 19 16H18"
                  stroke={mealType === "lunch" ? "white" : "black"}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2 8H18V17C18 18.0609 17.5786 19.0783 16.8284 19.8284C16.0783 20.5786 15.0609 21 14 21H6C4.93913 21 3.92172 20.5786 3.17157 19.8284C2.42143 19.0783 2 18.0609 2 17V8Z"
                  stroke={mealType === "lunch" ? "white" : "black"}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M6 1V4"
                  stroke={mealType === "lunch" ? "white" : "black"}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M10 1V4"
                  stroke={mealType === "lunch" ? "white" : "black"}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M14 1V4"
                  stroke={mealType === "lunch" ? "white" : "black"}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {t.lunch}
            </Button>
          </motion.div>

          <motion.div variants={slideUp} whileTap={buttonTap.tap}>
            <Button
              variant={mealType === "dinner" ? "default" : "outline"}
              className={`rounded-full ${mealType === "dinner" ? "bg-black text-white" : "bg-[#c2e8d7]"}`}
              onClick={() => setMealType("dinner")}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="mr-2"
              >
                <path
                  d="M18 8H19C20.0609 8 21.0783 8.42143 21.8284 9.17157C22.5786 9.92172 23 10.9391 23 12C23 13.0609 22.5786 14.0783 21.8284 14.8284C21.0783 15.5786 20.0609 16 19 16H18"
                  stroke={mealType === "dinner" ? "white" : "black"}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2 8H18V17C18 18.0609 17.5786 19.0783 16.8284 19.8284C16.0783 20.5786 15.0609 21 14 21H6C4.93913 21 3.92172 20.5786 3.17157 19.8284C2.42143 19.0783 2 18.0609 2 17V8Z"
                  stroke={mealType === "dinner" ? "white" : "black"}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M6 1V4"
                  stroke={mealType === "dinner" ? "white" : "black"}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M10 1V4"
                  stroke={mealType === "dinner" ? "white" : "black"}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M14 1V4"
                  stroke={mealType === "dinner" ? "white" : "black"}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {t.dinner}
            </Button>
          </motion.div>

          <motion.div variants={slideUp} whileTap={buttonTap.tap}>
            <Button
              variant={mealType === "snack" ? "default" : "outline"}
              className={`rounded-full ${mealType === "snack" ? "bg-black text-white" : "bg-[#c2e8d7]"}`}
              onClick={() => setMealType("snack")}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="mr-2"
              >
                <path
                  d="M18 8H19C20.0609 8 21.0783 8.42143 21.8284 9.17157C22.5786 9.92172 23 10.9391 23 12C23 13.0609 22.5786 14.0783 21.8284 14.8284C21.0783 15.5786 20.0609 16 19 16H18"
                  stroke={mealType === "snack" ? "white" : "black"}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2 8H18V17C18 18.0609 17.5786 19.0783 16.8284 19.8284C16.0783 20.5786 15.0609 21 14 21H6C4.93913 21 3.92172 20.5786 3.17157 19.8284C2.42143 19.0783 2 18.0609 2 17V8Z"
                  stroke={mealType === "snack" ? "white" : "black"}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M6 1V4"
                  stroke={mealType === "snack" ? "white" : "black"}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M10 1V4"
                  stroke={mealType === "snack" ? "white" : "black"}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M14 1V4"
                  stroke={mealType === "snack" ? "white" : "black"}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {t.snack}
            </Button>
          </motion.div>
        </motion.div>

        {/* Meal List */}
        <motion.div className="space-y-4 mb-20" variants={staggerContainer}>
          <motion.div variants={slideUp}>
            <Card className="overflow-hidden">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden">
                    <Image
                      src="/placeholder.svg?height=64&width=64"
                      alt={t.grilledChickenSalad}
                      width={64}
                      height={64}
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium">{t.grilledChickenSalad}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <span>294 {t.kcal}</span>
                      <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
                      <span>150 {t.gram}</span>
                    </div>
                  </div>
                </div>
                <motion.div whileTap={buttonTap.tap}>
                  <Button variant="ghost" size="icon">
                    <Plus size={20} />
                  </Button>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={slideUp}>
            <Card className="overflow-hidden">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden">
                    <Image
                      src="/placeholder.svg?height=64&width=64"
                      alt={t.chickenWithSalad}
                      width={64}
                      height={64}
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium">{t.chickenWithSalad}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <span>120 {t.kcal}</span>
                      <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
                      <span>50 {t.gram}</span>
                    </div>
                  </div>
                </div>
                <motion.div whileTap={buttonTap.tap}>
                  <Button variant="ghost" size="icon">
                    <Plus size={20} />
                  </Button>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={slideUp}>
            <Card className="overflow-hidden">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden">
                    <Image
                      src="/placeholder.svg?height=64&width=64"
                      alt={t.eggAndCarrot}
                      width={64}
                      height={64}
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium">{t.eggAndCarrot}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <span>150 {t.kcal}</span>
                      <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
                      <span>90 {t.gram}</span>
                    </div>
                  </div>
                </div>
                <motion.div whileTap={buttonTap.tap}>
                  <Button variant="ghost" size="icon">
                    <Plus size={20} />
                  </Button>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={slideUp}>
            <Card className="overflow-hidden">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden">
                    <Image
                      src="/placeholder.svg?height=64&width=64"
                      alt={t.greenVegetable}
                      width={64}
                      height={64}
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium">{t.greenVegetable}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <span>70 {t.kcal}</span>
                      <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
                      <span>70 {t.gram}</span>
                    </div>
                  </div>
                </div>
                <motion.div whileTap={buttonTap.tap}>
                  <Button variant="ghost" size="icon">
                    <Plus size={20} />
                  </Button>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Add Meal Button */}
        <Link href="/meals/add">
          <motion.div
            className="fixed bottom-6 right-6"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 300, damping: 24 }}
            whileTap={buttonTap.tap}
            whileHover={{ scale: 1.05 }}
          >
            <Button className="rounded-full w-14 h-14 bg-black hover:bg-gray-800">
              <Plus size={24} />
            </Button>
          </motion.div>
        </Link>
      </div>
    </motion.div>
  )
}
