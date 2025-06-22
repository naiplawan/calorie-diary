'use client';

import type React from 'react';
import { motion } from 'framer-motion';
import type { UseFormReturn } from 'react-hook-form';
import { Input } from '@/components/ui/modern-input';
import { thaiTranslations as t } from '@/lib/translations';
import { fadeIn } from '@/lib/motion-variants';
import type { OnboardingFormData } from '@/lib/validations/onboarding';
import { Ruler, Scale, Target, Calculator, Info, Sparkles } from 'lucide-react';

interface Step2Props {
  form: UseFormReturn<OnboardingFormData>;
}

export const Step2BodyMeasurements: React.FC<Step2Props> = ({ form }) => {
  const {
    register,
    formState: { errors },
  } = form;

  return (
    <motion.div
      key="step2"
      className="max-w-lg mx-auto space-y-8"
      variants={fadeIn}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className="text-center mb-8">
        <motion.div
          className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full mb-6"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Calculator className="w-8 h-8 text-primary" />
        </motion.div>
        <h3 className="spotify-text-heading mb-3">Body Measurements</h3>
        <p className="spotify-text-body text-muted-foreground max-w-lg mx-auto">
          These measurements help us calculate your personalized daily calorie needs using proven scientific formulas
        </p>
      </div>

      <motion.div
        className="space-y-8"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.15,
            },
          },
        }}
      >
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
        >
          <Input
            label="Height (cm)"
            type="number"
            placeholder="Enter your height"
            min="100"
            max="250"
            step="0.1"
            error={errors.height?.message}
            leftIcon={<Ruler className="w-4 h-4" />}
            variant="glass"
            inputSize="lg"
            helperText="Your height in centimeters (e.g., 170 cm)"
            {...register('height')}
          />
        </motion.div>

        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
        >
          <Input
            label="Current Weight (kg)"
            type="number"
            placeholder="Enter your weight"
            min="30"
            max="300"
            step="0.1"
            error={errors.weight?.message}
            leftIcon={<Scale className="w-4 h-4" />}
            variant="glass"
            inputSize="lg"
            helperText="Your current weight in kilograms (e.g., 70 kg)"
            {...register('weight')}
          />
        </motion.div>

        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
        >
          <Input
            label="Goal Weight (kg)"
            type="number"
            placeholder="Enter your goal weight"
            min="30"
            max="300"
            step="0.1"
            error={errors.goalWeight?.message}
            leftIcon={<Target className="w-4 h-4" />}
            variant="glass"
            inputSize="lg"
            helperText="Your target weight goal in kilograms"
            {...register('goalWeight')}
          />
        </motion.div>
      </motion.div>

      {/* Information Cards */}
      <motion.div className="space-y-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
        <div className="p-4 bg-primary/5 rounded-xl border border-primary/20">
          <div className="flex items-start gap-3">
            <div className="w-5 h-5 bg-primary/20 rounded-full flex items-center justify-center mt-0.5">
              <Info className="w-3 h-3 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground mb-1">Why we need these measurements</p>
              <p className="text-xs text-muted-foreground">
                We use the Mifflin-St Jeor equation to calculate your Basal Metabolic Rate (BMR) - the calories your
                body needs at rest. Your goal weight helps us tailor recommendations for your specific objectives.
              </p>
            </div>
          </div>
        </div>

        <div className="p-4 bg-accent/5 rounded-xl border border-accent/20">
          <div className="flex items-start gap-3">
            <div className="w-5 h-5 bg-accent/20 rounded-full flex items-center justify-center mt-0.5">
              <Target className="w-3 h-3 text-accent" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground mb-1">Setting realistic goals</p>
              <p className="text-xs text-muted-foreground">
                A healthy rate of weight change is 0.5-1 kg per week. Our recommendations will help you reach your goal
                weight safely and sustainably.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
