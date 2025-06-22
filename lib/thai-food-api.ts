// Thai Food API integration
export interface FoodItem {
  id: string;
  name: string;
  nameEn: string;
  category: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber?: number;
  sugar?: number;
  servingSize?: number;
  emoji?: string;
}

export interface FoodCategory {
  id: string;
  name: string;
  nameEn: string;
  icon: string;
}

// Mock data for development
const mockCategories: FoodCategory[] = [
  { id: 'rice', name: 'ข้าว', nameEn: 'Rice & Grains', icon: '🍚' },
  { id: 'noodles', name: 'เส้น', nameEn: 'Noodles', icon: '🍜' },
  { id: 'curry', name: 'แกง', nameEn: 'Curry', icon: '🍛' },
  { id: 'stir-fry', name: 'ผัด', nameEn: 'Stir-fry', icon: '🥘' },
  { id: 'soup', name: 'ต้ม', nameEn: 'Soup', icon: '🍲' },
  { id: 'salad', name: 'ยำ', nameEn: 'Salad', icon: '🥗' },
  { id: 'grilled', name: 'ย่าง', nameEn: 'Grilled', icon: '🍖' },
  { id: 'dessert', name: 'ของหวาน', nameEn: 'Dessert', icon: '🍮' },
];

const mockFoods: FoodItem[] = [
  {
    id: '1',
    name: 'ข้าวผัดกุ้ง',
    nameEn: 'Fried Rice with Shrimp',
    category: 'rice',
    calories: 350,
    protein: 18,
    carbs: 45,
    fat: 12,
    fiber: 2,
    servingSize: 250,
    emoji: '🍤',
  },
  {
    id: '2',
    name: 'ผัดไทย',
    nameEn: 'Pad Thai',
    category: 'noodles',
    calories: 400,
    protein: 15,
    carbs: 55,
    fat: 14,
    fiber: 3,
    servingSize: 300,
    emoji: '🍜',
  },
  {
    id: '3',
    name: 'แกงเขียวหวานไก่',
    nameEn: 'Green Curry with Chicken',
    category: 'curry',
    calories: 280,
    protein: 25,
    carbs: 8,
    fat: 18,
    fiber: 2,
    servingSize: 200,
    emoji: '🍛',
  },
  {
    id: '4',
    name: 'ต้มยำกุ้ง',
    nameEn: 'Tom Yum Goong',
    category: 'soup',
    calories: 120,
    protein: 15,
    carbs: 8,
    fat: 3,
    fiber: 1,
    servingSize: 250,
    emoji: '🍲',
  },
  {
    id: '5',
    name: 'ข้าวขาวหมูแดง',
    nameEn: 'Rice with Red Pork',
    category: 'rice',
    calories: 450,
    protein: 22,
    carbs: 60,
    fat: 15,
    fiber: 1,
    servingSize: 300,
    emoji: '🍚',
  },
  {
    id: '6',
    name: 'ส้มตำ',
    nameEn: 'Papaya Salad',
    category: 'salad',
    calories: 150,
    protein: 3,
    carbs: 30,
    fat: 2,
    fiber: 8,
    servingSize: 200,
    emoji: '🥗',
  },
  {
    id: '7',
    name: 'ไก่ย่าง',
    nameEn: 'Grilled Chicken',
    category: 'grilled',
    calories: 250,
    protein: 35,
    carbs: 0,
    fat: 12,
    fiber: 0,
    servingSize: 150,
    emoji: '🍖',
  },
  {
    id: '8',
    name: 'ผัดกะเพราหมูสับ',
    nameEn: 'Stir-fried Basil with Minced Pork',
    category: 'stir-fry',
    calories: 320,
    protein: 20,
    carbs: 15,
    fat: 22,
    fiber: 2,
    servingSize: 200,
    emoji: '🥘',
  },
  {
    id: '9',
    name: 'มะม่วงข้าวเหนียว',
    nameEn: 'Mango Sticky Rice',
    category: 'dessert',
    calories: 380,
    protein: 6,
    carbs: 70,
    fat: 12,
    fiber: 3,
    servingSize: 180,
    emoji: '🍮',
  },
  {
    id: '10',
    name: 'ข้าวต้มไก่',
    nameEn: 'Rice Porridge with Chicken',
    category: 'soup',
    calories: 200,
    protein: 15,
    carbs: 25,
    fat: 5,
    fiber: 1,
    servingSize: 300,
    emoji: '🍲',
  },
];

export async function searchFoods(query: string, category?: string): Promise<FoodItem[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  let results = mockFoods;

  if (category) {
    results = results.filter((food) => food.category === category);
  }

  if (query) {
    const lowercaseQuery = query.toLowerCase();
    results = results.filter(
      (food) => food.name.toLowerCase().includes(lowercaseQuery) || food.nameEn.toLowerCase().includes(lowercaseQuery)
    );
  }

  return results;
}

export async function getCategories(): Promise<FoodCategory[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 200));
  return mockCategories;
}

export async function getFoodById(id: string): Promise<FoodItem | null> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100));
  return mockFoods.find((food) => food.id === id) || null;
}

export async function getThaiFood(): Promise<FoodItem[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 200));
  return mockFoods;
}
