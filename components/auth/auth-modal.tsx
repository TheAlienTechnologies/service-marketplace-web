'use client';

import { useAuthStore } from '@/store/auth-store';
import { Modal } from '@/components/ui/modal';
import { SignInForm } from './sign-in-form';
import { SignUpForm } from './sign-up-form';
import { VerifyEmailForm } from './verify-email-form';
import { ForgotPasswordForm } from './forgot-password-form';
import { ForgotPasswordSent } from './forgot-password-sent';
import { VerifyPasswordResetOtp } from './verify-password-reset-otp';
import { ResetPasswordForm } from './reset-password-form';
import { ResetPasswordSuccess } from './reset-password-success';
import { PersonalizationForm } from './onboarding/personalization-form';
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
      case 'forgot-password':
        return <ForgotPasswordForm />;
      case 'forgot-password-sent':
        return <ForgotPasswordSent />;
      case 'verify-password-reset-otp':
        return <VerifyPasswordResetOtp />;
      case 'reset-password':
        return <ResetPasswordForm />;
      case 'reset-password-success':
        return <ResetPasswordSuccess />;
      case 'onboarding-personalize':
        return <PersonalizationForm />;
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
    if (authStep === 'onboarding-personalize') {
      return 'max-w-xl'; // Wider for personalization title
    }
    if (authStep === 'onboarding-profile') {
      return 'max-w-xl'; // Wider for profile form
    }
    // Forgot password steps need exact width for split layout (315px + 522px = 837px)
    if (authStep === 'forgot-password' || 
        authStep === 'forgot-password-sent' || 
        authStep === 'verify-password-reset-otp' ||
        authStep === 'reset-password') {
      return 'max-w-[837px]'; // Exact width for image (315px) + form (522px) layout
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
