// Mock data for meals
const mockMeals = [
  {
    id: 1,
    name: "Grilled Chicken Salad",
    calories: 294,
    grams: 150,
    mealType: "lunch",
    date: new Date(),
    image: "/placeholder.svg?height=64&width=64",
    carbs: 10,
    protein: 35,
    fat: 12,
  },
  {
    id: 2,
    name: "Chicken With Salad",
    calories: 120,
    grams: 50,
    mealType: "lunch",
    date: new Date(),
    image: "/placeholder.svg?height=64&width=64",
    carbs: 5,
    protein: 15,
    fat: 4,
  },
  {
    id: 3,
    name: "Egg And Corot",
    calories: 150,
    grams: 90,
    mealType: "breakfast",
    date: new Date(),
    image: "/placeholder.svg?height=64&width=64",
    carbs: 8,
    protein: 12,
    fat: 8,
  },
  {
    id: 4,
    name: "Green Vegetable",
    calories: 70,
    grams: 70,
    mealType: "dinner",
    date: new Date(),
    image: "/placeholder.svg?height=64&width=64",
    carbs: 12,
    protein: 3,
    fat: 1,
  },
]

// In a real app, this would be stored in a database
let meals = [...mockMeals]

// Get meals by date
export function getMealsByDate(date: Date) {
  const dateString = date.toDateString()
  return meals.filter((meal) => meal.date.toDateString() === dateString)
}

// Get meals by type
export function getMealsByType(type: string) {
  return meals.filter((meal) => meal.mealType === type)
}

// Add a new meal
export function addMeal(meal: any) {
  const newMeal = {
    ...meal,
    id: meals.length + 1,
    date: new Date(),
  }

  meals.push(newMeal)

  // Store in localStorage for persistence
  try {
    const storedMeals = JSON.parse(localStorage.getItem("meals") || "[]")
    localStorage.setItem("meals", JSON.stringify([...storedMeals, newMeal]))
  } catch (error) {
    console.error("Error storing meal in localStorage:", error)
  }

  return newMeal
}

// Delete a meal
export function deleteMeal(id: number) {
  meals = meals.filter((meal) => meal.id !== id)

  // Update localStorage
  try {
    const storedMeals = JSON.parse(localStorage.getItem("meals") || "[]")
    localStorage.setItem("meals", JSON.stringify(storedMeals.filter((meal: any) => meal.id !== id)))
  } catch (error) {
    console.error("Error updating localStorage:", error)
  }

  return true
}

// Get total calories for a day
export function getTotalCaloriesForDay(date: Date) {
  const dayMeals = getMealsByDate(date)
  return dayMeals.reduce((total, meal) => total + meal.calories, 0)
}

// Get macros for a day
export function getMacrosForDay(date: Date) {
  const dayMeals = getMealsByDate(date)

  return dayMeals.reduce(
    (macros, meal) => {
      return {
        carbs: macros.carbs + (meal.carbs || 0),
        protein: macros.protein + (meal.protein || 0),
        fat: macros.fat + (meal.fat || 0),
      }
    },
    { carbs: 0, protein: 0, fat: 0 },
  )
}

// Get favorite foods
export function getFavoriteFoods() {
  try {
    return JSON.parse(localStorage.getItem("favoriteFoods") || "[]")
  } catch (error) {
    console.error("Error getting favorite foods:", error)
    return []
  }
}

// Add a food to favorites
export function addFavoriteFood(food: any) {
  try {
    const favorites = getFavoriteFoods()
    if (!favorites.some((f: any) => f.id === food.id)) {
      localStorage.setItem("favoriteFoods", JSON.stringify([...favorites, food]))
    }
  } catch (error) {
    console.error("Error adding favorite food:", error)
  }
}

// Remove a food from favorites
export function removeFavoriteFood(foodId: number | string) {
  try {
    const favorites = getFavoriteFoods()
    localStorage.setItem("favoriteFoods", JSON.stringify(favorites.filter((f: any) => f.id !== foodId)))
  } catch (error) {
    console.error("Error removing favorite food:", error)
  }
}

// Get custom foods
export function getCustomFoods() {
  try {
    return JSON.parse(localStorage.getItem("customFoods") || "[]")
  } catch (error) {
    console.error("Error getting custom foods:", error)
    return []
  }
}

// Add a custom food
export function addCustomFood(food: any) {
  try {
    const customFoods = getCustomFoods()
    const newFood = {
      ...food,
      id: food.id || Date.now(), // Use timestamp as ID if not provided
      isCustom: true,
    }
    localStorage.setItem("customFoods", JSON.stringify([...customFoods, newFood]))
    return newFood
  } catch (error) {
    console.error("Error adding custom food:", error)
    return null
  }
}
