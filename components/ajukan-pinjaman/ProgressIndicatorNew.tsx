'use client';

import { ApplicationStep } from '@/types/loan-application';

interface ProgressIndicatorNewProps {
  currentStep: ApplicationStep;
}

const steps = [
  { id: 'phone-verification', label: 'Verifikasi HP', number: 1 },
  { id: 'prescreening', label: 'Prescreening', number: 2 },
  { id: 'prescreening-result', label: 'Hasil', number: 3 },
  { id: 'data-bisnis', label: 'Data Bisnis', number: 4 },
  { id: 'upload-documents', label: 'Upload Dokumen', number: 5 },
  { id: 'review', label: 'Review', number: 6 },
];

export default function ProgressIndicatorNew({ currentStep }: ProgressIndicatorNewProps) {
  const currentStepIndex = steps.findIndex((step) => step.id === currentStep);

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center flex-1">
            <div className="flex flex-col items-center flex-1">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors ${
                  index <= currentStepIndex
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-gray-200 text-gray-400'
                }`}
              >
                {index < currentStepIndex ? (
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  step.number
                )}
              </div>
              <span
                className={`text-xs mt-2 text-center ${
                  index <= currentStepIndex ? 'text-foreground font-medium' : 'text-secondary'
                }`}
              >
                {step.label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`h-0.5 flex-1 mx-2 ${
                  index < currentStepIndex ? 'bg-primary' : 'bg-gray-200'
                }`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
