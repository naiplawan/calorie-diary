import type React from 'react';
import { motion } from 'framer-motion';
import { UseFormReturn } from 'react-hook-form';
import { FormRadioGroup } from '@/components/ui/form-radio-group';
import { thaiTranslations as t } from '@/lib/translations';
import { fadeIn } from '@/lib/motion-variants';
import type { OnboardingFormData } from '@/lib/validations/onboarding';
import { TrendingDown, Minus, TrendingUp, Target, Lightbulb, Star } from 'lucide-react';

interface Step4Props {
  form: UseFormReturn<OnboardingFormData>;
}

export const Step4Goals: React.FC<Step4Props> = ({ form }) => {
  const {
    setValue,
    watch,
    formState: { errors },
  } = form;

  const goalOptions = [
    {
      value: 'lose',
      label: 'Lose Weight',
      description: 'Create a sustainable calorie deficit for healthy weight loss',
      icon: TrendingDown,
      badge: 'Popular',
    },
    {
      value: 'maintain',
      label: 'Maintain Weight',
      description: 'Maintain your current weight with balanced nutrition',
      icon: Minus,
    },
    {
      value: 'gain',
      label: 'Gain Weight',
      description: 'Build muscle and gain weight with strategic nutrition',
      icon: TrendingUp,
    },
  ];

  const selectedGoal = watch('goal');

  const getGoalExplanation = (goal: string) => {
    switch (goal) {
      case 'lose':
        return {
          title: 'Weight Loss Strategy',
          description:
            "We'll create a moderate calorie deficit (typically 300-500 calories below your TDEE) to promote sustainable weight loss of 1-2 pounds per week.",
          tips: [
            'Focus on nutrient-dense foods',
            'Maintain adequate protein intake',
            'Stay hydrated',
            'Include regular exercise',
          ],
        };
      case 'maintain':
        return {
          title: 'Weight Maintenance',
          description:
            'Your target calories will match your TDEE to maintain your current weight while supporting your lifestyle and activity level.',
          tips: ['Balance macronutrients', 'Listen to hunger cues', 'Stay consistent', 'Monitor portion sizes'],
        };
      case 'gain':
        return {
          title: 'Healthy Weight Gain',
          description:
            "We'll create a moderate calorie surplus (typically 300-500 calories above your TDEE) to support healthy weight and muscle gain.",
          tips: [
            'Emphasize protein intake',
            'Include strength training',
            'Choose nutrient-dense foods',
            'Eat frequently',
          ],
        };
      default:
        return null;
    }
  };

  const goalInfo = selectedGoal ? getGoalExplanation(selectedGoal) : null;

  return (
    <motion.div
      key="step4"
      className="max-w-3xl mx-auto space-y-8"
      variants={fadeIn}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className="text-center mb-8">
        <motion.div
          className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full mb-6"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Target className="w-8 h-8 text-primary" />
        </motion.div>
        <h3 className="spotify-text-heading mb-3">What's Your Goal?</h3>
        <p className="spotify-text-body text-muted-foreground max-w-2xl mx-auto">
          Choose your primary health objective to get personalized recommendations tailored just for you
        </p>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <FormRadioGroup
          label=""
          value={watch('goal')}
          onValueChange={(value) => {
            setValue('goal', value as OnboardingFormData['goal'], { shouldValidate: true });
          }}
          options={goalOptions}
          layout="vertical"
          variant="premium"
          error={errors.goal?.message}
          className="space-y-4"
        />
      </motion.div>

      {/* Dynamic Goal Explanation */}
      {goalInfo && (
        <motion.div
          className="mt-8 p-6 bg-gradient-to-br from-primary/5 via-background to-accent/5 rounded-xl border border-primary/20"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          key={selectedGoal}
        >
          <div className="flex items-start gap-4">
            <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center mt-1">
              <Lightbulb className="w-4 h-4 text-primary" />
            </div>
            <div className="flex-1">
              <h4 className="text-base font-semibold text-foreground mb-2 flex items-center gap-2">
                {goalInfo.title}
                <Star className="w-4 h-4 text-accent" />
              </h4>
              <p className="text-sm text-muted-foreground mb-4">{goalInfo.description}</p>
              <div>
                <p className="text-sm font-medium text-foreground mb-2">Key Strategies:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {goalInfo.tips.map((tip, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center gap-2 text-xs text-muted-foreground"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index }}
                    >
                      <div className="w-1.5 h-1.5 bg-primary/60 rounded-full"></div>
                      <span>{tip}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Success Tip */}
      <motion.div
        className="mt-6 p-4 bg-accent/5 rounded-xl border border-accent/20"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.7 }}
      >
        <div className="flex items-start gap-3">
          <div className="w-5 h-5 bg-accent/20 rounded-full flex items-center justify-center mt-0.5">
            <Star className="w-3 h-3 text-accent" />
          </div>
          <div>
            <p className="text-sm font-medium text-foreground mb-1">Success Tip</p>
            <p className="text-xs text-muted-foreground">
              Remember, sustainable changes take time. Focus on building healthy habits rather than pursuing quick
              fixes. Your personalized plan will help you achieve your goals safely and effectively.
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
