import type React from 'react';
import { motion } from 'framer-motion';
import { UseFormReturn } from 'react-hook-form';
import { Input } from '@/components/ui/modern-input';
import { FormRadioGroup } from '@/components/ui/form-radio-group';
import { thaiTranslations as t } from '@/lib/translations';
import { fadeIn } from '@/lib/motion-variants';
import type { OnboardingFormData } from '@/lib/validations/onboarding';
import { Calendar, User2, Users, Sparkles } from 'lucide-react';

interface Step1Props {
  form: UseFormReturn<OnboardingFormData>;
}

export const Step1BasicInfo: React.FC<Step1Props> = ({ form }) => {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = form;

  const genderOptions = [
    {
      value: 'male',
      label: 'Male',
      icon: User2,
      description: 'Male',
    },
    {
      value: 'female',
      label: 'Female',
      icon: Users,
      description: 'Female',
    },
    {
      value: 'other',
      label: 'Other',
      icon: User2,
      description: 'Other',
    },
  ];

  return (
    <motion.div
      key="step1"
      className="max-w-lg mx-auto space-y-8"
      variants={fadeIn}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className="text-center mb-8">
        <motion.div
          className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full mb-6"
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Calendar className="w-8 h-8 text-primary" />
        </motion.div>
        <h3 className="spotify-text-heading mb-3">Tell us about yourself</h3>
        <p className="spotify-text-body text-muted-foreground">
          This helps us create a personalized experience just for you
        </p>
      </div>

      <motion.div
        className="space-y-8"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.1,
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
            label="Your Age"
            type="number"
            placeholder="Enter your age"
            min="18"
            max="100"
            error={errors.age?.message}
            leftIcon={<Calendar className="w-4 h-4" />}
            variant="glass"
            inputSize="lg"
            helperText="We use this to calculate your personalized calorie needs"
            {...register('age')}
          />
        </motion.div>

        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
        >
          <div className="space-y-4">
            <label className="block text-sm font-medium text-foreground">Gender</label>
            <FormRadioGroup
              label=""
              value={watch('gender')}
              onValueChange={(value) => {
                setValue('gender', value as 'male' | 'female' | 'other', { shouldValidate: true });
              }}
              options={genderOptions}
              layout="grid"
              variant="card"
              error={errors.gender?.message}
              className="grid-cols-3 gap-3"
            />
            {errors.gender && <p className="text-sm text-destructive mt-2">{errors.gender.message}</p>}
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        className="mt-8 p-4 bg-primary/5 rounded-xl border border-primary/20"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="flex items-start gap-3">
          <div className="w-5 h-5 bg-primary/20 rounded-full flex items-center justify-center mt-0.5">
            <Sparkles className="w-3 h-3 text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium text-foreground mb-1">Why we need this information</p>
            <p className="text-xs text-muted-foreground">
              Age and gender help us calculate your Basal Metabolic Rate (BMR) and provide accurate calorie
              recommendations based on scientific formulas.
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
