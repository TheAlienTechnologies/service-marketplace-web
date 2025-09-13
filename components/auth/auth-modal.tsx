'use client';

import { useAuthStore } from '@/store/auth-store';
import { Modal } from '@/components/ui/modal';
import { SignInForm } from './sign-in-form';
import { SignUpForm } from './sign-up-form';
import { VerifyEmailForm } from './verify-email-form';
import { OnboardingLocationForm } from './onboarding/location-form';
import { OnboardingProfileForm } from './onboarding/profile-form';
import { OnboardingInterestsForm } from './onboarding/interests-form';

export function AuthModal() {
  const { showAuthModal, authStep, hideAuth } = useAuthStore();

  const renderAuthStep = () => {
    switch (authStep) {
      case 'signin':
        return <SignInForm />;
      case 'signup':
        return <SignUpForm />;
      case 'verify-email':
        return <VerifyEmailForm />;
      case 'onboarding-location':
        return <OnboardingLocationForm />;
      case 'onboarding-profile':
        return <OnboardingProfileForm />;
      case 'onboarding-interests':
        return <OnboardingInterestsForm />;
      default:
        return <SignInForm />;
    }
  };

  // Determine modal width based on the current step
  const getModalWidth = () => {
    if (authStep === 'onboarding-interests') {
      return 'max-w-2xl'; // Wider for interests tags
    }
    return 'max-w-md'; // Default width for other steps
  };

  return (
    <Modal
      isOpen={showAuthModal}
      onClose={hideAuth}
      showCloseButton={!authStep.startsWith('onboarding')}
      className={getModalWidth()}
    >
      {renderAuthStep()}
    </Modal>
  );
}
