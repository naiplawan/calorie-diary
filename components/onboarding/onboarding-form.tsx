import type React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/modern-card';
import { Progress } from '@/components/ui/progress';
import { calculateBMR, calculateTDEE, calculateTargetCalories, calculateMacroTargets } from '@/lib/calorie-calculator';
import { t } from '@/lib/translations';
import { fadeIn, staggerContainer } from '@/lib/motion-variants';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

import { Step1BasicInfo } from './step1-basic-info';
import { Step2BodyMeasurements } from './step2-body-measurements';
import { Step3ActivityLevel } from './step3-activity-level';
import { Step4Goals } from './step4-goals';

// Import validation schemas
import {
  onboardingSchema,
  step1Schema,
  step2Schema,
  step3Schema,
  step4Schema,
  type OnboardingFormData,
} from '@/lib/validations/onboarding';

interface OnboardingFormProps {
  steps: Array<{
    id: number;
    title: string;
    description: string;
    icon: React.ComponentType<any>;
  }>;
}

export const OnboardingForm: React.FC<OnboardingFormProps> = ({ steps }) => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);

  const form = useForm<OnboardingFormData>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      age: '',
      gender: 'male',
      height: '',
      weight: '',
      goalWeight: '',
      activityLevel: 'sedentary',
      goal: 'maintain',
    },
    mode: 'onChange',
  });

  const {
    trigger,
    getValues,
    handleSubmit,
    formState: { isValid, errors },
  } = form;

  const nextStep = async () => {
    let isStepValid = false;

    // Validate current step
    switch (currentStep) {
      case 1:
        isStepValid = await trigger(['age', 'gender']);
        break;
      case 2:
        isStepValid = await trigger(['height', 'weight', 'goalWeight']);
        break;
      case 3:
        isStepValid = await trigger(['activityLevel']);
        break;
      case 4:
        isStepValid = await trigger(['goal']);
        break;
    }

    console.log('Step validation result:', isStepValid, 'Current step:', currentStep);

    // For development, allow proceeding with basic validation
    const values = getValues();
    const hasBasicValues =
      currentStep === 1
        ? values.age && values.gender
        : currentStep === 2
        ? values.height && values.weight && values.goalWeight
        : currentStep === 3
        ? values.activityLevel
        : values.goal;

    if ((isStepValid || hasBasicValues) && currentStep < 4) {
      setCurrentStep((prev) => prev + 1);
    } else if (!isStepValid && !hasBasicValues) {
      // Log validation errors for debugging
      console.log('Current form values:', values);
      console.log('Form errors:', form.formState.errors);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const onSubmit = (data: OnboardingFormData) => {
    // Calculate BMR and TDEE
    const bmr = calculateBMR(
      Number.parseFloat(data.weight),
      Number.parseFloat(data.height),
      Number.parseInt(data.age),
      data.gender
    );

    const tdee = calculateTDEE(bmr, data.activityLevel);

    // Map form goals to calculation function goals
    let goalForCalculation: string;
    switch (data.goal) {
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
        ...data,
        bmr,
        tdee,
        targetCalories,
        macroTargets,
      })
    );

    router.push('/dashboard');
  };

  const isCurrentStepValid = () => {
    const values = getValues();
    console.log('Validating step:', currentStep, 'with values:', values);

    try {
      switch (currentStep) {
        case 1:
          const step1Result = step1Schema.safeParse(values);
          console.log('Step 1 validation:', step1Result);
          return step1Result.success;
        case 2:
          const step2Result = step2Schema.safeParse(values);
          console.log('Step 2 validation:', step2Result);
          return step2Result.success;
        case 3:
          const step3Result = step3Schema.safeParse(values);
          console.log('Step 3 validation:', step3Result);
          return step3Result.success;
        case 4:
          const step4Result = step4Schema.safeParse(values);
          console.log('Step 4 validation:', step4Result);
          return step4Result.success;
        default:
          return false;
      }
    } catch (error) {
      console.error('Validation error:', error);
      return false;
    }
  };

  const progress = (currentStep / 4) * 100;
  const currentStepData = steps[currentStep - 1];
  const StepIcon = currentStepData.icon;

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1BasicInfo form={form} />;
      case 2:
        return <Step2BodyMeasurements form={form} />;
      case 3:
        return <Step3ActivityLevel form={form} />;
      case 4:
        return <Step4Goals form={form} />;
      default:
        return null;
    }
  };

  return (
    <motion.div
      className="w-full max-w-4xl mx-auto px-4"
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >
      {/* Header Section */}
      <motion.div className="text-center mb-12" variants={fadeIn}>
        <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-6">
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-primary">Personalized Setup</span>
        </div>
        <h1 className="spotify-text-hero mb-4">Welcome to Your Health Journey</h1>
        <p className="spotify-text-body text-lg text-muted-foreground max-w-2xl mx-auto">
          Let's set up your personalized calorie tracking experience in just a few simple steps
        </p>
      </motion.div>

      {/* Steps Indicator */}
      <motion.div className="mb-12" variants={fadeIn}>
        <div className="flex items-center justify-center space-x-4 mb-8">
          {steps.map((step, index) => {
            const isActive = currentStep === step.id;
            const isCompleted = currentStep > step.id;
            const StepIcon = step.icon;

            return (
              <div key={step.id} className="flex items-center">
                <motion.div
                  className={`relative flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300 ${
                    isActive
                      ? 'border-primary bg-primary text-primary-foreground scale-110'
                      : isCompleted
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-border bg-background text-muted-foreground'
                  }`}
                  animate={{
                    scale: isActive ? 1.1 : 1,
                    rotate: isCompleted ? 360 : 0,
                  }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                >
                  <StepIcon className="w-5 h-5" />
                  {isActive && (
                    <motion.div
                      className="absolute inset-0 rounded-full border-2 border-primary"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}
                </motion.div>
                {index < steps.length - 1 && (
                  <div
                    className={`w-12 h-1 mx-2 rounded-full transition-all duration-500 ${
                      isCompleted ? 'bg-primary' : 'bg-border'
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Progress Bar */}
        <div className="relative max-w-md mx-auto">
          <div className="h-2 bg-muted/40 rounded-full overflow-hidden backdrop-blur-sm">
            <motion.div
              className="h-full bg-gradient-to-r from-primary via-primary/90 to-primary/70 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            />
          </div>
          <div className="flex justify-between text-xs text-muted-foreground mt-2">
            <span>Start</span>
            <span className="font-medium text-primary">{Math.round(progress)}% Complete</span>
            <span>Finish</span>
          </div>
        </div>
      </motion.div>

      {/* Main Content Card */}
      <motion.div variants={fadeIn}>
        <Card variant="glass" className="backdrop-blur-xl border border-border/20 shadow-2xl">
          {/* Card Header */}
          <div className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5" />
            <div className="relative text-center py-10 px-8">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-6">
                  <StepIcon className="w-8 h-8 text-primary" />
                </div>
                <h2 className="spotify-text-heading mb-3">{currentStepData.title}</h2>
                <p className="spotify-text-body text-muted-foreground max-w-lg mx-auto">
                  {currentStepData.description}
                </p>
              </motion.div>
            </div>
          </div>

          {/* Card Content */}
          <div className="p-8 lg:p-12">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="min-h-[400px] flex items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.4, ease: 'easeInOut' }}
                    className="w-full"
                  >
                    {renderCurrentStep()}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Navigation */}
              <motion.div
                className="flex justify-between items-center pt-8 mt-8 border-t border-border/20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Button
                  type="button"
                  variant="ghost"
                  size="lg"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className="flex items-center gap-2 px-6"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Back
                </Button>

                <div className="flex items-center gap-4">
                  <div className="text-sm text-muted-foreground">
                    Step {currentStep} of {steps.length}
                  </div>

                  {currentStep < 4 ? (
                    <Button
                      type="button"
                      variant="primary"
                      size="lg"
                      onClick={nextStep}
                      disabled={!isCurrentStepValid()}
                      className="flex items-center gap-2 px-8"
                    >
                      Continue
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      disabled={!isCurrentStepValid()}
                      className="flex items-center gap-2 px-8 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
                    >
                      <Sparkles className="w-4 h-4" />
                      Complete Setup
                    </Button>
                  )}
                </div>
              </motion.div>
            </form>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
};
