import React from 'react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  icon?: React.ReactNode;
  description?: string;
  required?: boolean;
}

export const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, error, icon, description, required, className, ...props }, ref) => {
    return (
      <div className="space-y-2">
        <Label className="form-label">
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </Label>

        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">{icon}</div>
          )}
          <Input
            ref={ref}
            className={cn(
              'form-input',
              icon && 'pl-10',
              error && 'border-destructive focus:border-destructive focus:ring-destructive/20',
              className
            )}
            {...props}
          />
        </div>

        {description && !error && <p className="text-body-small">{description}</p>}

        {error && (
          <p className="form-error flex items-center gap-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            {error}
          </p>
        )}
      </div>
    );
  }
);

FormInput.displayName = 'FormInput';
