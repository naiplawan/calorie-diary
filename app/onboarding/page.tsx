'use client';

import type React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { calculateBMR, calculateTDEE, calculateTargetCalories, calculateMacroTargets } from '@/lib/calorie-calculator';
import { thaiTranslations as t } from '@/lib/translations';
import { fadeIn, slideIn, staggerContainer } from '@/lib/motion-variants';
import { User, Ruler, Activity, Target, ChevronLeft, ChevronRight } from 'lucide-react';

interface FormData {
  age: string;
  gender: 'male' | 'female' | 'other';
  height: string;
  weight: string;
  goalWeight: string;
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'very' | 'extreme';
  goal: 'lose' | 'maintain' | 'gain';
}

const steps = [
  {
    id: 1,
    title: t.basicInfo,
    description: t.getToKnowYou,
    icon: User,
  },
  {
    id: 2,
    title: t.bodyMeasurements,
    description: t.tellAboutBody,
    icon: Ruler,
  },
  {
    id: 3,
    title: t.activityLevel,
    description: t.howActive,
    icon: Activity,
  },
  {
    id: 4,
    title: t.yourGoal,
    description: t.whatAchieve,
    icon: Target,
  },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    age: '',
    gender: 'male',
    height: '',
    weight: '',
    goalWeight: '',
    activityLevel: 'sedentary',
    goal: 'maintain',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value as any }));
  };

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = () => {
    // Calculate BMR and TDEE
    const bmr = calculateBMR(
      Number.parseFloat(formData.weight),
      Number.parseFloat(formData.height),
      Number.parseInt(formData.age),
      formData.gender
    );

    const tdee = calculateTDEE(bmr, formData.activityLevel);

    // Map form goals to calculation function goals
    let goalForCalculation: string;
    switch (formData.goal) {
      case 'lose':
        goalForCalculation = 'loseWeight';
        break;
      case 'gain':
        goalForCalculation = 'gainWeight';
        break;
      case 'maintain':
      default:
        goalForCalculation = 'maintainWeight';
        break;
    }

    // Use proper calorie calculation function
    const targetCalories = calculateTargetCalories(tdee, goalForCalculation);

    // Calculate proper macro targets based on goal
    const macroTargets = calculateMacroTargets(targetCalories, goalForCalculation);

    // Store user data and calculated values
    localStorage.setItem(
      'userData',
      JSON.stringify({
        ...formData,
        bmr,
        tdee,
        targetCalories,
        macroTargets,
      })
    );

    router.push('/dashboard');
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.age && formData.gender;
      case 2:
        return formData.height && formData.weight && formData.goalWeight;
      case 3:
        return formData.activityLevel;
      case 4:
        return formData.goal;
      default:
        return false;
    }
  };

  const progress = (currentStep / 4) * 100;
  const currentStepData = steps[currentStep - 1];
  const StepIcon = currentStepData.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e0f5eb] to-[#c2e8d7] flex items-center justify-center p-4">
      <motion.div className="w-full max-w-lg" variants={staggerContainer} initial="hidden" animate="visible">
        {/* Progress Section */}
        <motion.div className="mb-8" variants={fadeIn}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md">
                <StepIcon className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-800">Step {currentStep} of 4</h2>
                <p className="text-sm text-gray-600">{Math.round(progress)}% Complete</p>
              </div>
            </div>
          </div>
          <Progress value={progress} className="h-2" />
        </motion.div>

        {/* Main Card */}
        <motion.div variants={fadeIn}>
          <Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-2xl font-bold text-gray-800">{currentStepData.title}</CardTitle>
              <CardDescription className="text-gray-600 text-base">{currentStepData.description}</CardDescription>
            </CardHeader>

            <CardContent className="px-6 pb-6">
              <AnimatePresence mode="wait">
                {/* Step 1: Basic Information */}
                {currentStep === 1 && (
                  <motion.div
                    key="step1"
                    className="space-y-6"
                    variants={fadeIn}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <div className="space-y-2">
                      <Label htmlFor="age" className="text-sm font-medium">
                        {t.age}
                      </Label>
                      <Input
                        id="age"
                        name="age"
                        type="number"
                        placeholder={t.enterAge}
                        value={formData.age}
                        onChange={handleInputChange}
                        min="18"
                        max="100"
                        className="h-12"
                      />
                    </div>

                    <div className="space-y-3">
                      <Label className="text-sm font-medium">{t.gender}</Label>
                      <RadioGroup
                        value={formData.gender}
                        onValueChange={(value) => handleSelectChange('gender', value)}
                        className="grid grid-cols-3 gap-4"
                      >
                        {[
                          { value: 'male', label: t.male },
                          { value: 'female', label: t.female },
                          { value: 'other', label: t.other },
                        ].map((option) => (
                          <div key={option.value} className="flex items-center space-x-2">
                            <RadioGroupItem value={option.value} id={option.value} />
                            <Label htmlFor={option.value} className="text-sm cursor-pointer">
                              {option.label}
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Body Measurements */}
                {currentStep === 2 && (
                  <motion.div
                    key="step2"
                    className="space-y-6"
                    variants={fadeIn}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <div className="space-y-2">
                      <Label htmlFor="height" className="text-sm font-medium">
                        {t.height} (cm)
                      </Label>
                      <Input
                        id="height"
                        name="height"
                        type="number"
                        placeholder={t.enterHeight}
                        value={formData.height}
                        onChange={handleInputChange}
                        className="h-12"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="weight" className="text-sm font-medium">
                        {t.currentWeight} (kg)
                      </Label>
                      <Input
                        id="weight"
                        name="weight"
                        type="number"
                        placeholder={t.enterWeight}
                        value={formData.weight}
                        onChange={handleInputChange}
                        className="h-12"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="goalWeight" className="text-sm font-medium">
                        {t.goalWeight} (kg)
                      </Label>
                      <Input
                        id="goalWeight"
                        name="goalWeight"
                        type="number"
                        placeholder={t.enterGoalWeight}
                        value={formData.goalWeight}
                        onChange={handleInputChange}
                        className="h-12"
                      />
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Activity Level */}
                {currentStep === 3 && (
                  <motion.div
                    key="step3"
                    className="space-y-6"
                    variants={fadeIn}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <div className="space-y-3">
                      <Label className="text-sm font-medium">{t.activityLevel}</Label>
                      <Select
                        value={formData.activityLevel}
                        onValueChange={(value) => handleSelectChange('activityLevel', value)}
                      >
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder={t.selectActivityLevel} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sedentary">{t.sedentary}</SelectItem>
                          <SelectItem value="light">{t.lightlyActive}</SelectItem>
                          <SelectItem value="moderate">{t.moderatelyActive}</SelectItem>
                          <SelectItem value="very">{t.veryActive}</SelectItem>
                          <SelectItem value="extreme">{t.extremelyActive}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </motion.div>
                )}

                {/* Step 4: Goals */}
                {currentStep === 4 && (
                  <motion.div
                    key="step4"
                    className="space-y-6"
                    variants={fadeIn}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <div className="space-y-4">
                      <Label className="text-sm font-medium">{t.yourGoal}</Label>
                      <RadioGroup
                        value={formData.goal}
                        onValueChange={(value) => handleSelectChange('goal', value)}
                        className="space-y-3"
                      >
                        {[
                          { value: 'lose', label: t.loseWeight, desc: 'Create a calorie deficit' },
                          { value: 'maintain', label: t.maintainWeight, desc: 'Maintain current weight' },
                          { value: 'gain', label: t.gainWeight, desc: 'Create a calorie surplus' },
                        ].map((option) => (
                          <div
                            key={option.value}
                            className="flex items-start space-x-3 p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                          >
                            <RadioGroupItem value={option.value} id={option.value} className="mt-1" />
                            <div className="flex-1">
                              <Label htmlFor={option.value} className="text-sm font-medium cursor-pointer">
                                {option.label}
                              </Label>
                              <p className="text-xs text-gray-500 mt-1">{option.desc}</p>
                            </div>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation Buttons */}
              <motion.div
                className="flex justify-between items-center mt-8 pt-6 border-t"
                variants={fadeIn}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.3 }}
              >
                <Button
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className="flex items-center gap-2"
                >
                  <ChevronLeft className="w-4 h-4" />
                  {t.back}
                </Button>

                {currentStep < 4 ? (
                  <Button
                    onClick={nextStep}
                    disabled={!isStepValid()}
                    className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
                  >
                    {t.continue}
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                ) : (
                  <Button onClick={handleSubmit} disabled={!isStepValid()} className="bg-green-600 hover:bg-green-700">
                    {t.complete}
                  </Button>
                )}
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
}
