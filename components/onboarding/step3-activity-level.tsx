import type React from 'react';
import { motion } from 'framer-motion';
import { UseFormReturn } from 'react-hook-form';
import { FormRadioGroup } from '@/components/ui/form-radio-group';
import { thaiTranslations as t } from '@/lib/translations';
import { fadeIn } from '@/lib/motion-variants';
import type { OnboardingFormData } from '@/lib/validations/onboarding';
import { UserX, Zap, Activity, Dumbbell, Mountain, Heart, Info } from 'lucide-react';

interface Step3Props {
  form: UseFormReturn<OnboardingFormData>;
}

export const Step3ActivityLevel: React.FC<Step3Props> = ({ form }) => {
  const {
    setValue,
    watch,
    formState: { errors },
  } = form;

  const activityOptions = [
    {
      value: 'sedentary',
      label: 'Sedentary',
      description: 'นั่งทำงานเป็นส่วนใหญ่ ไม่ได้ออกกำลังกาย',
      icon: UserX,
      badge: 'x1.2',
    },
    {
      value: 'light',
      label: 'Lightly Active',
      description: 'ออกกำลังกายเบาๆ 1-3 วันต่อสัปดาห์',
      icon: Zap,
      badge: 'x1.375',
    },
    {
      value: 'moderate',
      label: 'Moderately Active',
      description: 'ออกกำลังกายปานกลาง 3-5 วันต่อสัปดาห์',
      icon: Activity,
      badge: 'x1.55',
    },
    {
      value: 'very',
      label: 'Very Active',
      description: 'ออกกำลังกายหนัก 6-7 วันต่อสัปดาห์',
      icon: Dumbbell,
      badge: 'x1.725',
    },
    {
      value: 'extreme',
      label: 'Extremely Active',
      description: 'ออกกำลังกายหนักมาก หรือมีงานที่ต้องใช้แรงงาน',
      icon: Mountain,
      badge: 'x1.9',
    },
  ];

  return (
    <motion.div
      key="step3"
      className="max-w-3xl mx-auto space-y-8"
      variants={fadeIn}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className="text-center mb-8">
        <motion.div
          className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full mb-6"
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Heart className="w-8 h-8 text-primary" />
        </motion.div>
        <h3 className="spotify-text-heading mb-3">How Active Are You?</h3>
        <p className="spotify-text-body text-muted-foreground max-w-2xl mx-auto">
          Your activity level helps us calculate your Total Daily Energy Expenditure (TDEE) for accurate calorie
          recommendations
        </p>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <FormRadioGroup
          label=""
          value={watch('activityLevel')}
          onValueChange={(value) => {
            setValue('activityLevel', value as OnboardingFormData['activityLevel'], { shouldValidate: true });
          }}
          options={activityOptions}
          layout="vertical"
          variant="premium"
          size="lg"
          error={errors.activityLevel?.message}
        />
      </motion.div>

      {/* Information Card */}
      <motion.div
        className="mt-8 p-6 bg-primary/5 rounded-xl border border-primary/20"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="flex items-start gap-4">
          <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center mt-1">
            <Info className="w-4 h-4 text-primary" />
          </div>
          <div>
            <p className="text-base font-medium text-foreground mb-2">Understanding Activity Multipliers</p>
            <p className="text-sm text-muted-foreground mb-3">
              These multipliers are applied to your BMR to calculate your Total Daily Energy Expenditure (TDEE). Be
              honest about your activity level for the most accurate calorie recommendations.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-muted rounded-full"></div>
                <span className="text-muted-foreground">Sedentary: Desk job, minimal exercise</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary/60 rounded-full"></div>
                <span className="text-muted-foreground">Light: Exercise 1-3 days/week</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-muted-foreground">Moderate: Exercise 3-5 days/week</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
