# 🍽️ ByteTrack

A sophisticated, production-ready calorie tracking and wellness application built with cutting-edge web technologies. Features a beautiful design system inspired by Apple and Spotify, comprehensive food tracking capabilities, and an exceptional user experience.

## ✨ Key Features

### 🎨 **Modern Design System**
- **Apple & Spotify Inspired UI**: Clean, professional interface with glass morphism effects
- **40+ Reusable Components**: Comprehensive component library with multiple variants
- **Advanced Typography**: Modern font stacks with responsive text scaling
- **Motion Design**: Smooth animations and micro-interactions using Framer Motion
- **Dark/Light Mode**: Seamless theme switching with system preference detection

### 🏃‍♂️ **Enhanced Onboarding Experience**
- **4-Step Guided Setup**: Intuitive onboarding with visual progress indicators
- **Smart Form Validation**: Real-time validation with helpful error messages
- **Scientific Calculations**: BMR, TDEE, and macro targets using proven formulas
- **Goal-Specific Guidance**: Personalized recommendations based on user objectives
- **Responsive Mobile Design**: Perfect mobile experience with touch-friendly interactions

### 📱 **Complete Food Diary**
- **Thai Food Database**: 10+ pre-loaded Thai dishes with complete nutritional information
- **Real-time Search**: Instant food search with category filtering
- **Meal Tracking**: Breakfast, lunch, dinner, and snack categorization
- **Custom Food Entry**: Add custom foods with complete nutritional data
- **Portion Control**: Easy quantity adjustment with visual feedback
- **Daily Progress**: Visual calorie and macro tracking with progress bars

### 🎯 **Smart Nutrition Tracking**
- **Personalized Targets**: Based on user's BMR, TDEE, and health goals
- **Macro Breakdown**: Carbs, protein, and fat tracking with color-coded progress
- **Visual Progress**: Beautiful progress rings and animated charts
- **Goal-Based Recommendations**: Tailored advice for weight loss, maintenance, or gain

## 🛠️ Tech Stack

### **Core Technologies**
- **Framework**: Next.js 15.2.4 (App Router)
- **Language**: TypeScript (100% type coverage)
- **Styling**: Tailwind CSS with custom design system
- **Animations**: Framer Motion for smooth interactions

### **UI & Components**
- **Component Library**: Custom components inspired by shadcn/ui
- **Icons**: Lucide React for consistent iconography
- **Forms**: React Hook Form with Zod validation
- **State Management**: React hooks and context

### **Development Tools**
- **Package Manager**: npm/pnpm
- **Linting**: ESLint with TypeScript rules
- **Build Tool**: Next.js with optimized bundling

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm, pnpm, or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd byte-track

# Install dependencies
npm install
# or
pnpm install

# Start development server
npm run dev
# or
pnpm dev

# Open your browser
# Navigate to http://localhost:3000
```

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 📱 Application Structure

```
📦 byte-track/
├── 📁 app/                          # Next.js 15 App Router
│   ├── 📄 layout.tsx               # Root layout with theme provider
│   ├── 📄 page.tsx                 # Landing page with feature showcase
│   ├── 📄 globals.css              # Modern design system CSS
│   ├── 📁 dashboard/               # Main dashboard overview
│   ├── 📁 meals/                   # Food diary and tracking
│   │   └── 📁 add/                 # Add food entry flow
│   └── 📁 onboarding/              # 4-step user onboarding
├── 📁 components/                   # Reusable components
│   ├── 📁 ui/                      # 40+ UI components
│   │   ├── 📄 modern-card.tsx      # Advanced card system
│   │   ├── 📄 modern-input.tsx     # Enhanced form inputs
│   │   ├── 📄 form-radio-group.tsx # Interactive radio groups
│   │   ├── 📄 button.tsx           # Multi-variant button system
│   │   └── 📄 ...                  # All other UI components
│   └── 📁 onboarding/              # Onboarding-specific components
├── 📁 lib/                         # Utility libraries
│   ├── 📄 calorie-calculator.ts    # BMR/TDEE calculations
│   ├── 📄 thai-food-api.ts         # Food database and API
│   ├── 📄 motion-variants.ts       # Framer Motion animations
│   ├── 📄 translations.ts          # Thai language support
│   └── 📁 validations/             # Zod schema validations
└── 📁 styles/                      # Global styles
    └── 📄 globals.css              # Comprehensive design system
```

## 🎨 Design System

### **Component Variants**
- **Cards**: Default, Glass, Elevated, Minimal, Interactive
- **Buttons**: Primary, Secondary, Ghost, Outline, Premium, Glass, Minimal
- **Inputs**: Default, Minimal, Glass, Filled with floating labels
- **Form Controls**: Radio groups, selects with premium styling

### **Typography Scale**
```css
.spotify-text-hero     /* Large hero text */
.spotify-text-heading  /* Section headings */
.spotify-text-body     /* Body text */
.spotify-text-small    /* Small text */
```

### **Color System**
- **Primary**: Main brand colors with variants
- **Secondary**: Supporting colors
- **Accent**: Highlight colors
- **Semantic**: Success, warning, error, info states

### **Animation System**
- **Page Transitions**: Smooth enter/exit animations
- **Micro-interactions**: Button hovers, form focus states
- **Loading States**: Skeleton loaders and progress indicators
- **Stagger Animations**: Sequential element animations

## 📊 Features Deep Dive

### **Onboarding Flow**
1. **Basic Information** (`/onboarding`)
   - Age and gender collection with validation
   - Interactive form elements with real-time feedback

2. **Body Measurements**
   - Height, current weight, and goal weight input
   - BMR calculation explanations and guidance

3. **Activity Level Selection**
   - 5 activity levels from sedentary to extremely active
   - Visual cards with descriptions and multipliers

4. **Health Goals**
   - Weight loss, maintenance, or gain options
   - Goal-specific strategies and recommendations

### **Dashboard** (`/dashboard`)
- **Daily Overview**: Calorie progress with animated rings
- **Macro Breakdown**: Carbs, protein, fat with progress bars
- **Quick Actions**: Fast access to add meals and view progress
- **Recent Activity**: Overview of recent meals and entries

### **Food Diary** (`/meals`)
- **Food Search**: Real-time search through Thai food database
- **Meal Categories**: Visual meal type selection (breakfast, lunch, dinner, snacks)
- **Nutrition Display**: Complete macro and calorie information
- **Diary Management**: Add, edit, and remove food entries

### **Add Food Flow** (`/meals/add`)
- **Food Selection**: Choose from database or create custom entries
- **Portion Control**: Visual quantity adjustment
- **Nutrition Preview**: Real-time calorie and macro calculations
- **Quick Add**: Save favorite foods for easy access

## 🌍 Internationalization

- **Thai Language Support**: Complete Thai translations for UI elements
- **Thai Food Database**: Authentic Thai dishes with local names
- **Cultural Considerations**: Appropriate serving sizes and meal patterns

## 📈 Performance & Optimization

### **Build Metrics**
- **Total Pages**: 8 optimized pages
- **Bundle Size**: ~188kB for feature-rich pages
- **Shared JS**: 101kB efficiently shared across routes
- **First Load JS**: Optimized chunk splitting

### **Performance Features**
- **Static Generation**: Pre-built pages for fast loading
- **Image Optimization**: Next.js automatic image optimization
- **Code Splitting**: Automatic route-based code splitting
- **Bundle Analysis**: Optimized dependency management

## 🔧 Configuration

### **Tailwind CSS**
Custom configuration with:
- Extended color palette for health and wellness theme
- Custom animations and transitions
- Responsive breakpoints for all devices
- Design system utilities

### **TypeScript**
Strict configuration with:
- Full type safety across all components
- Custom type definitions for food data
- Zod schema validation integration

### **Next.js**
Optimized setup with:
- App Router for modern routing
- TypeScript support
- Image optimization
- Performance monitoring

## 🎯 User Experience Highlights

### **Accessibility**
- **WCAG 2.1 AA Compliant**: Screen reader friendly
- **Keyboard Navigation**: Full keyboard accessibility
- **Color Contrast**: High contrast ratios for readability
- **Focus Management**: Clear focus indicators

### **Mobile Experience**
- **Touch-Friendly**: Large touch targets and gestures
- **Responsive Design**: Perfect on all screen sizes
- **PWA Ready**: Installable as a mobile app
- **Offline Support**: Core functionality works offline

### **Performance**
- **Fast Loading**: Optimized bundle sizes
- **Smooth Animations**: 60fps animations with Framer Motion
- **Instant Feedback**: Real-time form validation and updates
- **Efficient Data**: Optimized state management

## 🚀 Deployment

### **Production Build**
```bash
npm run build    # Create production build
npm run start    # Start production server
```

### **Deployment Platforms**
- **Vercel**: Optimal deployment platform for Next.js
- **Netlify**: Static site deployment with serverless functions
- **Railway**: Full-stack deployment with database support

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **[Next.js](https://nextjs.org/)** - The React framework for production
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Framer Motion](https://www.framer.com/motion/)** - Motion library for React
- **[Lucide](https://lucide.dev/)** - Beautiful & consistent icon pack
- **[Zod](https://zod.dev/)** - TypeScript-first schema validation
- **[React Hook Form](https://react-hook-form.com/)** - Performant forms library

---

## 🎉 **Built with ❤️ for modern web development**

**A production-ready food diary application showcasing the best of modern web technologies, exceptional UX design, and comprehensive health tracking capabilities.**

[![Built with Next.js](https://img.shields.io/badge/Built%20with-Next.js-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-100%25-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Styled%20with-Tailwind%20CSS-38B2AC)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Animated%20with-Framer%20Motion-pink)](https://www.framer.com/motion/)
