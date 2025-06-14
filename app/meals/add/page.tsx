"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Search, ArrowLeft, Star, Plus, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import CategorySelector from "@/components/category-selector"
import {
  addMeal,
  addFavoriteFood,
  removeFavoriteFood,
  getFavoriteFoods,
  getCustomFoods,
  addCustomFood,
} from "@/lib/meal-service"
import { searchThaiFoods, type ThaiFoodItem } from "@/lib/thai-food-api"
import { thaiTranslations as t } from "@/lib/translations"
import { fadeIn, slideUp, staggerContainer, buttonTap } from "@/lib/motion-variants"

// Food item interface for our app
interface FoodItem {
  id: string | number
  name: string
  calories: number
  grams: number
  image: string
  isFavorite?: boolean
  isRecent?: boolean
  isCustom?: boolean
  carbs?: number
  protein?: number
  fat?: number
  category?: string
  category_th?: string
}

export default function AddMealPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedMealType, setSelectedMealType] = useState("lunch")
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null)
  const [portionSize, setPortionSize] = useState("100")
  const [customFoodOpen, setCustomFoodOpen] = useState(false)
  const [customFood, setCustomFood] = useState({
    name: "",
    calories: "",
    grams: "100",
    category: "custom",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [searchResults, setSearchResults] = useState<FoodItem[]>([])
  const [favoriteFoods, setFavoriteFoods] = useState<FoodItem[]>([])
  const [customFoods, setCustomFoods] = useState<FoodItem[]>([])
  const [recentFoods, setRecentFoods] = useState<FoodItem[]>([])

  // Load saved data on mount
  useEffect(() => {
    // Load favorites
    const favorites = getFavoriteFoods()
    setFavoriteFoods(favorites)

    // Load custom foods
    const customs = getCustomFoods()
    setCustomFoods(customs)

    // Load recent foods from localStorage
    try {
      const recents = JSON.parse(localStorage.getItem("recentFoods") || "[]")
      setRecentFoods(recents)
    } catch (error) {
      console.error("Error loading recent foods:", error)
    }

    // Initial search with empty query to load all foods
    handleSearch()
  }, [])

  // Filtered foods based on active tab
  const [filteredFoods, setFilteredFoods] = useState<FoodItem[]>([])

  // Update filtered foods when search results or active tab changes
  useEffect(() => {
    let filtered: FoodItem[] = []

    switch (activeTab) {
      case "recent":
        filtered = recentFoods
        break
      case "saved":
        filtered = favoriteFoods
        break
      case "custom":
        filtered = customFoods
        break
      default:
        filtered = searchResults
        break
    }

    setFilteredFoods(filtered)
  }, [searchResults, activeTab, recentFoods, favoriteFoods, customFoods])

  // Convert Thai food API item to our app's food item format
  const convertApiItemToFoodItem = (item: ThaiFoodItem): FoodItem => {
    return {
      id: item.id,
      name: item.name_th || item.name, // Prefer Thai name
      calories: item.calories,
      grams: item.serving_size,
      image: item.image_url || "/placeholder.svg?height=64&width=64",
      carbs: item.carbs,
      protein: item.protein,
      fat: item.fat,
      category: item.category,
      category_th: item.category_th,
      isFavorite: favoriteFoods.some((f) => f.id === item.id),
    }
  }

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault()
    }

    if (activeTab !== "all") {
      // If not on the "all" tab, don't perform API search
      return
    }

    setIsLoading(true)

    try {
      // Use the Thai food API to search with category filter
      const response = await searchThaiFoods(searchTerm, selectedCategory)

      // Convert API items to our app's format
      const foods = response.items.map(convertApiItemToFoodItem)

      // Mark favorites
      const foodsWithFavorites = foods.map((food) => ({
        ...food,
        isFavorite: favoriteFoods.some((f) => f.id === food.id),
      }))

      setSearchResults(foodsWithFavorites)
    } catch (error) {
      console.error("Error searching foods:", error)
    } finally {
      setIsLoading(false)
    }
  }

  // Handle category change
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    // Trigger search with new category
    if (activeTab === "all") {
      setIsLoading(true)
      searchThaiFoods(searchTerm, category)
        .then((response) => {
          const foods = response.items.map(convertApiItemToFoodItem)
          const foodsWithFavorites = foods.map((food) => ({
            ...food,
            isFavorite: favoriteFoods.some((f) => f.id === food.id),
          }))
          setSearchResults(foodsWithFavorites)
        })
        .catch((error) => {
          console.error("Error searching foods:", error)
        })
        .finally(() => {
          setIsLoading(false)
        })
    }
  }

  const handleAddMeal = (meal: FoodItem) => {
    // Set the selected food for portion selection
    setSelectedFood(meal)
  }

  const handleConfirmAdd = () => {
    if (!selectedFood) return

    // Calculate calories based on portion size
    const portionMultiplier = Number.parseInt(portionSize) / selectedFood.grams
    const adjustedCalories = Math.round(selectedFood.calories * portionMultiplier)
    const adjustedCarbs = selectedFood.carbs ? Math.round(selectedFood.carbs * portionMultiplier) : 0
    const adjustedProtein = selectedFood.protein ? Math.round(selectedFood.protein * portionMultiplier) : 0
    const adjustedFat = selectedFood.fat ? Math.round(selectedFood.fat * portionMultiplier) : 0

    // Add meal with adjusted values
    addMeal({
      ...selectedFood,
      calories: adjustedCalories,
      grams: Number.parseInt(portionSize),
      carbs: adjustedCarbs,
      protein: adjustedProtein,
      fat: adjustedFat,
      mealType: selectedMealType,
      date: new Date(),
    })

    // Add to recent foods
    const updatedRecentFoods = [selectedFood, ...recentFoods.filter((f) => f.id !== selectedFood.id)].slice(0, 10)
    setRecentFoods(updatedRecentFoods)
    localStorage.setItem("recentFoods", JSON.stringify(updatedRecentFoods))

    // Close dialog and navigate back
    setSelectedFood(null)
    router.push("/meals")
  }

  const handleAddCustomFood = () => {
    // Validate inputs
    if (!customFood.name || !customFood.calories || !customFood.grams) {
      return
    }

    // Create new custom food
    const newFood: FoodItem = {
      id: `custom-${Date.now()}`,
      name: customFood.name,
      calories: Number.parseInt(customFood.calories),
      grams: Number.parseInt(customFood.grams),
      image: "/placeholder.svg?height=64&width=64",
      isCustom: true,
      category: customFood.category,
    }

    // Add to database
    addCustomFood(newFood)
    setCustomFoods([newFood, ...customFoods])

    // Reset form and close dialog
    setCustomFood({
      name: "",
      calories: "",
      grams: "100",
      category: "custom",
    })
    setCustomFoodOpen(false)
  }

  const toggleFavorite = (food: FoodItem) => {
    const isFavorite = favoriteFoods.some((f) => f.id === food.id)

    if (isFavorite) {
      // Remove from favorites
      removeFavoriteFood(food.id)
      setFavoriteFoods(favoriteFoods.filter((f) => f.id !== food.id))
    } else {
      // Add to favorites
      addFavoriteFood(food)
      setFavoriteFoods([...favoriteFoods, food])
    }

    // Update the food in search results
    setSearchResults(searchResults.map((f) => (f.id === food.id ? { ...f, isFavorite: !isFavorite } : f)))

    // Update the food in filtered foods
    setFilteredFoods(filteredFoods.map((f) => (f.id === food.id ? { ...f, isFavorite: !isFavorite } : f)))
  }

  return (
    <motion.div className="min-h-screen bg-[#e0f5eb]" initial="hidden" animate="visible" variants={fadeIn}>
      <div className="max-w-md mx-auto p-4">
        {/* Header */}
        <motion.div className="flex items-center justify-between mb-6" variants={slideUp}>
          <Link href="/meals">
            <motion.div whileTap={buttonTap.tap}>
              <Button variant="ghost" size="icon" className="rounded-full bg-[#c2e8d7]">
                <ArrowLeft size={20} />
              </Button>
            </motion.div>
          </Link>
          <h1 className="text-xl font-semibold">{t.addFood}</h1>
          <div className="w-10"></div>
        </motion.div>

        {/* Search */}
        <motion.form onSubmit={handleSearch} className="mb-4" variants={slideUp}>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <Input
              type="text"
              placeholder={t.searchForFood}
              className="pl-10 bg-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button
              type="submit"
              size="sm"
              className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8"
              disabled={isLoading}
            >
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : t.search}
            </Button>
          </div>
        </motion.form>

        {/* Category Selector - Only show in "all" tab */}
        {activeTab === "all" && (
          <motion.div className="mb-4" variants={slideUp}>
            <Label className="block mb-2">{t.categories}</Label>
            <CategorySelector selectedCategory={selectedCategory} onSelectCategory={handleCategoryChange} />
          </motion.div>
        )}

        {/* Meal Type Selection */}
        <motion.div className="mb-4" variants={slideUp}>
          <Label className="block mb-2">{t.selectMealType}</Label>
          <Select value={selectedMealType} onValueChange={setSelectedMealType}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder={t.selectMealType} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="breakfast">{t.breakfast}</SelectItem>
              <SelectItem value="lunch">{t.lunch}</SelectItem>
              <SelectItem value="dinner">{t.dinner}</SelectItem>
              <SelectItem value="snack">{t.snack}</SelectItem>
            </SelectContent>
          </Select>
        </motion.div>

        {/* Tabs */}
        <motion.div variants={slideUp}>
          <Tabs defaultValue="all" className="mb-6" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-4 bg-transparent">
              <TabsTrigger
                value="all"
                className="data-[state=active]:border-b-2 data-[state=active]:border-black bg-transparent"
              >
                {t.all}
              </TabsTrigger>
              <TabsTrigger
                value="recent"
                className="data-[state=active]:border-b-2 data-[state=active]:border-black bg-transparent"
              >
                {t.recent}
              </TabsTrigger>
              <TabsTrigger
                value="saved"
                className="data-[state=active]:border-b-2 data-[state=active]:border-black bg-transparent"
              >
                {t.saved}
              </TabsTrigger>
              <TabsTrigger
                value="custom"
                className="data-[state=active]:border-b-2 data-[state=active]:border-black bg-transparent"
              >
                {t.custom}
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </motion.div>

        {/* Loading State */}
        {isLoading && (
          <motion.div
            className="flex justify-center items-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
          </motion.div>
        )}

        {/* Food List */}
        {!isLoading && (
          <motion.div className="space-y-4 mb-20" variants={staggerContainer}>
            {filteredFoods.length > 0 ? (
              filteredFoods.map((food) => (
                <motion.div key={food.id} variants={slideUp}>
                  <Card className="overflow-hidden">
                    <CardContent className="p-4 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full overflow-hidden">
                          <Image
                            src={food.image || "/placeholder.svg?height=64&width=64"}
                            alt={food.name}
                            width={64}
                            height={64}
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="font-medium">{food.name}</h3>
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <span>
                              {food.calories} {t.kcal}
                            </span>
                            <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
                            <span>
                              {food.grams} {t.gram}
                            </span>
                          </div>
                          {food.category_th && (
                            <div className="mt-1">
                              <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full">{food.category_th}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <motion.div whileTap={buttonTap.tap}>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-gray-500"
                            onClick={() => toggleFavorite(food)}
                          >
                            <Star className={food.isFavorite ? "fill-[#c2e8d7] text-[#c2e8d7]" : ""} size={20} />
                          </Button>
                        </motion.div>
                        <motion.div whileTap={buttonTap.tap}>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="bg-[#c2e8d7] hover:bg-[#a5d8c1]"
                            onClick={() => handleAddMeal(food)}
                          >
                            {t.add}
                          </Button>
                        </motion.div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            ) : (
              <motion.div
                className="text-center py-8 text-gray-500"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {activeTab === "all" ? t.searchForFoods : t.noFoodFound}
              </motion.div>
            )}
          </motion.div>
        )}

        {/* Add Custom Food Button */}
        <motion.div
          className="fixed bottom-6 right-6"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, type: "spring", stiffness: 300, damping: 24 }}
          whileTap={buttonTap.tap}
          whileHover={{ scale: 1.05 }}
        >
          <Button className="rounded-full bg-black hover:bg-gray-800" onClick={() => setCustomFoodOpen(true)}>
            <Plus className="mr-2" size={18} />
            {t.addCustomFood}
          </Button>
        </motion.div>
      </div>

      {/* Portion Size Dialog */}
      {selectedFood && (
        <Dialog open={!!selectedFood} onOpenChange={(open) => !open && setSelectedFood(null)}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>{t.selectPortionSize}</DialogTitle>
            </DialogHeader>
            <div className="flex items-center gap-4 my-4">
              <div className="w-16 h-16 rounded-full overflow-hidden">
                <Image
                  src={selectedFood.image || "/placeholder.svg"}
                  alt={selectedFood.name}
                  width={64}
                  height={64}
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="font-medium">{selectedFood.name}</h3>
                <p className="text-sm text-gray-500">
                  {Math.round(selectedFood.calories * (Number.parseInt(portionSize) / selectedFood.grams))} {t.kcal} /{" "}
                  {portionSize} {t.gram}
                </p>
                {selectedFood.category_th && (
                  <div className="mt-1">
                    <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full">{selectedFood.category_th}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="portion" className="text-right col-span-1">
                  {t.portion}
                </Label>
                <Input
                  id="portion"
                  type="number"
                  value={portionSize}
                  onChange={(e) => setPortionSize(e.target.value)}
                  className="col-span-2"
                  min="1"
                />
                <span className="col-span-1">{t.gram}</span>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setSelectedFood(null)}>
                {t.cancel}
              </Button>
              <Button onClick={handleConfirmAdd}>{t.add}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Custom Food Dialog */}
      <Dialog open={customFoodOpen} onOpenChange={setCustomFoodOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{t.addCustomFood}</DialogTitle>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="foodName" className="text-right col-span-1">
                {t.name}
              </Label>
              <Input
                id="foodName"
                value={customFood.name}
                onChange={(e) => setCustomFood({ ...customFood, name: e.target.value })}
                className="col-span-3"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="calories" className="text-right col-span-1">
                {t.calories}
              </Label>
              <Input
                id="calories"
                type="number"
                value={customFood.calories}
                onChange={(e) => setCustomFood({ ...customFood, calories: e.target.value })}
                className="col-span-2"
                min="1"
              />
              <span className="col-span-1">{t.kcal}</span>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="grams" className="text-right col-span-1">
                {t.portion}
              </Label>
              <Input
                id="grams"
                type="number"
                value={customFood.grams}
                onChange={(e) => setCustomFood({ ...customFood, grams: e.target.value })}
                className="col-span-2"
                min="1"
              />
              <span className="col-span-1">{t.gram}</span>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right col-span-1">
                {t.categories}
              </Label>
              <Select
                value={customFood.category}
                onValueChange={(value) => setCustomFood({ ...customFood, category: value })}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder={t.selectCategory} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="curry">{t.curries}</SelectItem>
                  <SelectItem value="noodle">{t.noodles}</SelectItem>
                  <SelectItem value="rice">{t.riceDishes}</SelectItem>
                  <SelectItem value="soup">{t.soups}</SelectItem>
                  <SelectItem value="salad">{t.salads}</SelectItem>
                  <SelectItem value="stir-fry">{t.stirFries}</SelectItem>
                  <SelectItem value="dessert">{t.desserts}</SelectItem>
                  <SelectItem value="snack">{t.snacks}</SelectItem>
                  <SelectItem value="drink">{t.drinks}</SelectItem>
                  <SelectItem value="custom">{t.custom}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setCustomFoodOpen(false)}>
              {t.cancel}
            </Button>
            <Button onClick={handleAddCustomFood}>{t.add}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  )
}
