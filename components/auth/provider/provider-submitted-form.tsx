'use client';

import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/store/auth-store';

export function ProviderSubmittedForm() {
  const { hideAuth, previousProviderStep } = useAuthStore();

  const handleGoToDashboard = () => {
    hideAuth();
    // Navigate to provider dashboard
    window.location.href = '/';
  };

  const handleEditDocuments = () => {
    previousProviderStep();
  };

  return (
    <div className="p-8 text-center">
      {/* Progress indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
          <span>5/5</span>
          <span>100%</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div className="bg-green-600 h-2 rounded-full" style={{ width: '100%' }}></div>
        </div>
      </div>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-[30px] font-bold leading-[38px] text-gray-900 dark:text-white font-inter tracking-[0%] mb-6">
          Let's finish setting up your account
        </h1>
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Your documents have been submitted
          </h2>
        </div>
      </div>

      {/* Checklist Complete Icon */}
      <div className="mb-8 flex justify-center">
        <img 
          src="/assets/icons/checklist_complete.svg" 
          alt="Documents submitted successfully"
          className="w-20 h-20"
        />
      </div>

      {/* Status Message */}
      <div className="mb-8">
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          Our team is reviewing your credentials. You'll receive an email once your account is verified.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between">
        <Button
          onClick={handleEditDocuments}
          variant="ghost"
          className="text-gray-600 hover:text-gray-700"
        >
          ← Edit Documents
        </Button>
        
        <Button
          onClick={handleGoToDashboard}
          className="bg-green-600 hover:bg-green-700 text-white font-medium px-6"
        >
          Go to Dashboard →
        </Button>
      </div>
    </div>
  );
}
