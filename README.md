# 🥗 Calorie Diary

A modern, responsive calorie tracking and wellness application built with Next.js, TypeScript, and Tailwind CSS. This application provides comprehensive health monitoring with Thai language support and beautiful UI components.

## ✨ Features

- **📊 Calorie Tracking**: Track daily calorie intake with visual progress indicators
- **🏃 Activity Monitoring**: Monitor your daily activity levels and exercise
- **📈 Progress Analytics**: View detailed charts and analytics of your health journey
- **🎯 Goal Setting**: Set and track weight and fitness goals
- **🥘 Thai Food Database**: Comprehensive database of Thai foods with calorie information
- **📱 Responsive Design**: Beautiful UI that works on all devices
- **🌙 Dark/Light Mode**: Theme switching for comfortable viewing
- **🇹🇭 Thai Language Support**: Full Thai language interface
- **📋 Meal Planning**: Add and track meals throughout the day
- **⚡ Real-time Updates**: Live calorie calculations and progress tracking

## 🛠️ Tech Stack

- **Framework**: Next.js 15.2.4
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **Animations**: Framer Motion
- **Charts**: Recharts
- **Forms**: React Hook Form + Zod validation
- **Icons**: Lucide React
- **Package Manager**: PNPM

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- PNPM (recommended) or npm

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd calorie-diary
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Run the development server**
   ```bash
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

```bash
pnpm dev      # Start development server
pnpm build    # Build for production
pnpm start    # Start production server
pnpm lint     # Run ESLint
```

## 📱 Application Structure

```
📦 calorie-diary/
├── 📁 app/                    # Next.js app directory
│   ├── 📄 layout.tsx         # Root layout component
│   ├── 📄 page.tsx           # Landing page
│   ├── 📁 dashboard/         # Dashboard pages
│   ├── 📁 meals/             # Meal tracking pages
│   └── 📁 onboarding/        # User onboarding
├── 📁 components/            # Reusable components
│   ├── 📁 ui/                # shadcn/ui components
│   ├── 📄 calorie-ring.tsx   # Calorie progress ring
│   ├── 📄 activity-chart.tsx # Activity charts
│   └── 📄 wheel-picker.tsx   # Custom wheel input
├── 📁 lib/                   # Utility libraries
│   ├── 📄 calorie-calculator.ts # BMR/TDEE calculations
│   ├── 📄 meal-service.ts    # Meal data management
│   ├── 📄 thai-food-api.ts   # Thai food database
│   └── 📄 translations.ts    # Thai translations
└── 📁 hooks/                 # Custom React hooks
```

## 🎨 Key Components

### Calorie Ring
Interactive circular progress indicator showing daily calorie intake vs. target.

### Activity Chart
Visual representation of weekly activity and calorie burn data using Recharts.

### Wheel Picker
Custom wheel input component for selecting numeric values (age, weight, etc.).

### Thai Food Database
Comprehensive database of Thai foods with calorie information per serving.

## 🌍 Internationalization

The application features full Thai language support with translations for:
- UI elements and navigation
- Food items and categories
- Activity levels and goals
- Onboarding process

## 📐 Design System

Built with a consistent design system featuring:
- **Colors**: Green-themed palette promoting health and wellness
- **Typography**: Clear, readable fonts optimized for both Thai and English
- **Spacing**: Consistent spacing scale using Tailwind CSS
- **Components**: Accessible components built with Radix UI primitives

## 🔧 Configuration

### Tailwind CSS
Custom configuration with:
- Extended color palette
- Custom animations
- Responsive breakpoints

### Next.js
Optimized configuration with:
- TypeScript support
- Image optimization
- API routes for data management

## 📊 Features Deep Dive

### Onboarding Flow
1. **Basic Information**: Age, gender, personal details
2. **Body Measurements**: Height, current weight, goal weight
3. **Activity Level**: Sedentary to very active
4. **Goals**: Weight loss, maintenance, or gain

### Dashboard
- Real-time calorie tracking
- Weekly activity overview
- Goal progress indicators
- Quick meal addition

### Meal Tracking
- Add meals by category
- Thai food database integration
- Calorie calculation
- Daily meal history

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the beautiful UI components
- [Radix UI](https://www.radix-ui.com/) for accessible primitives
- [Lucide](https://lucide.dev/) for the icon system
- [Framer Motion](https://www.framer.com/motion/) for smooth animations

---

Made with ❤️ for healthy living 🌱
