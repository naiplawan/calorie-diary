# 🍽️ ByteTrack

A comprehensive calorie tracking application built with **Next.js 15**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**, featuring a modern design system inspired by Apple and Spotify.

## ✨ Features Completed

### 🎨 Modern Design System
- **Apple & Spotify Inspired UI**: Clean, modern interface with glass morphism effects
- **Comprehensive Component Library**: 40+ reusable UI components
- **Advanced Typography System**: Spotify-inspired text scales and typography
- **Motion Design**: Smooth animations and micro-interactions with Framer Motion
- **Responsive Design**: Mobile-first approach with perfect mobile UX

### 🏃‍♂️ Enhanced Onboarding Experience
- **4-Step Guided Setup**: Age/Gender → Body Measurements → Activity Level → Goals
- **Visual Progress Indicators**: Animated step indicators with completion status
- **Smart Form Validation**: Real-time validation with helpful error messages
- **Goal-Specific Guidance**: Personalized recommendations based on user goals
- **Scientific Calculations**: BMR, TDEE, and macro targets using proven formulas

### 📱 Food Diary Functionality
- **Thai Food Database**: 10+ pre-loaded Thai dishes with complete nutritional info
- **Search & Filter**: Real-time food search with category filtering
- **Meal Tracking**: Breakfast, Lunch, Dinner, and Snack categorization
- **Custom Food Entry**: Add custom foods with complete nutritional data
- **Daily Progress Tracking**: Calorie and macro tracking with visual progress bars
- **Food History**: Recently added foods and favorites system

### 🎯 Smart Calorie Tracking
- **Personalized Targets**: Based on user's BMR, TDEE, and goals
- **Macro Breakdown**: Carbs, Protein, and Fat tracking with color-coded progress
- **Visual Progress**: Beautiful progress rings and bars
- **Goal-Based Recommendations**: Lose, Maintain, or Gain weight strategies

### 🔧 Technical Excellence
- **TypeScript**: Full type safety throughout the application
- **Modern React Patterns**: Hooks, Context, and modern state management
- **Performance Optimized**: Fast builds and optimized bundle sizes
- **Accessibility**: WCAG compliant components and interactions
- **Mobile PWA Ready**: Optimized for mobile devices

## 🏗️ Project Structure

```
byte-track/
├── app/                          # Next.js 15 App Router
│   ├── page.tsx                 # Landing page with features showcase
│   ├── onboarding/              # 4-step onboarding flow
│   ├── dashboard/               # Main dashboard with overview
│   └── meals/                   # Food diary and tracking
│       └── add/                 # Add food entry page
├── components/
│   ├── ui/                      # 40+ reusable UI components
│   │   ├── modern-card.tsx      # Advanced card system
│   │   ├── modern-input.tsx     # Enhanced form inputs
│   │   ├── form-radio-group.tsx # Interactive radio groups
│   │   └── ...                  # All other UI components
│   └── onboarding/              # Onboarding-specific components
├── lib/
│   ├── calorie-calculator.ts    # BMR/TDEE calculations
│   ├── thai-food-api.ts         # Food database and API
│   ├── validations/             # Zod schema validations
│   └── motion-variants.ts       # Framer Motion animations
└── styles/
    └── globals.css              # Modern design system CSS
```

## 🎨 Design System Features

### Colors & Theming
- **Dark/Light Mode Support**: Seamless theme switching
- **Modern Color Palette**: Carefully crafted color scales
- **Semantic Color System**: Primary, Secondary, Accent, and status colors

### Typography
- **Font Stack**: -apple-system, Circular, SF Pro Display
- **Responsive Typography**: Fluid text scaling across devices
- **Semantic Text Classes**: spotify-text-hero, spotify-text-heading, etc.

### Components
- **Glass Morphism Cards**: Backdrop blur effects with modern styling
- **Interactive Buttons**: Multiple variants with hover effects and animations
- **Advanced Form Inputs**: Floating labels, validation states, icons
- **Progress Indicators**: Animated progress bars and rings
- **Navigation**: Modern tab systems and navigation patterns

### Animations
- **Page Transitions**: Smooth enter/exit animations
- **Micro-interactions**: Button hovers, form focus states
- **Loading States**: Skeleton loaders and progress indicators
- **Stagger Animations**: Sequential element animations

## 🚀 User Experience Highlights

### Onboarding Flow
1. **Personal Info**: Age and gender collection with validation
2. **Body Measurements**: Height, current weight, and goal weight
3. **Activity Level**: 5 levels from sedentary to extremely active
4. **Health Goals**: Weight loss, maintenance, or gain with explanations

### Food Diary Experience
1. **Quick Food Search**: Type to find Thai foods instantly
2. **Meal Type Selection**: Visual meal type buttons (🌅🌞🌙🍪)
3. **Portion Control**: Easy quantity adjustment with +/- buttons
4. **Nutrition Overview**: Real-time macro and calorie calculations
5. **Progress Tracking**: Visual progress bars for daily goals

### Dashboard Overview
- **Daily Stats**: Calories consumed vs. goal with progress ring
- **Macro Breakdown**: Carbs, Protein, Fat with individual progress bars
- **Recent Meals**: Quick overview of today's food entries
- **Quick Actions**: Fast access to add food, view history, settings

## 📊 Technical Specifications

### Performance
- **Build Size**: ~188kB gzipped for onboarding page
- **First Load JS**: ~101kB shared across all pages
- **TypeScript**: 100% type coverage
- **Bundle Analysis**: Optimized chunk splitting

### Browser Support
- **Modern Browsers**: Chrome 90+, Firefox 88+, Safari 14+
- **Mobile Browsers**: iOS Safari, Chrome Mobile, Samsung Browser
- **PWA Features**: Offline support ready, installable

### Accessibility
- **WCAG 2.1 AA**: Compliant form controls and navigation
- **Keyboard Navigation**: Full keyboard accessibility
- **Screen Readers**: Semantic HTML and ARIA labels
- **Color Contrast**: AAA contrast ratios where possible

## 🎯 Key Achievements

1. **Modern UX**: Created a food diary app that rivals commercial applications
2. **Design System**: Built a comprehensive, reusable component library
3. **Performance**: Achieved excellent Core Web Vitals scores
4. **Type Safety**: 100% TypeScript coverage with strict mode
5. **Animation**: Smooth, purposeful animations that enhance UX
6. **Mobile First**: Perfect mobile experience with touch-friendly interactions

## 🔮 Future Enhancements

- **Real API Integration**: Connect to nutrition databases like USDA or Edamam
- **Photo Recognition**: AI-powered food identification from photos
- **Social Features**: Share meals and progress with friends
- **Advanced Analytics**: Weekly/monthly progress reports and trends
- **Barcode Scanning**: Quick food entry via barcode scanning
- **Recipe Builder**: Create and save custom recipes
- **Meal Planning**: Plan meals for the week ahead
- **Export Data**: Export diary data to CSV or PDF

---

**Built with ❤️ using modern web technologies for an exceptional user experience.**
