export interface User {
  id: string;
  email: string;
  emailVerified: boolean;
  firstName?: string;
  lastName?: string;
  displayName?: string;
  username?: string;
  avatar?: string;
  role: 'USER' | 'SERVICE_PROVIDER' | 'ADMIN';
  hasCompletedOnboarding: boolean;
  profileCompleteness: number;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  showAuthModal: boolean;
  authStep: AuthStep;
}

export type AuthStep = 
  | 'signin' 
  | 'signup' 
  | 'verify-email' 
  | 'forgot-password'
  | 'forgot-password-sent'
  | 'verify-password-reset-otp'
  | 'reset-password'
  | 'reset-password-success'
  | 'onboarding-personalize'
  | 'onboarding-location'
  | 'onboarding-profile'
  | 'onboarding-interests'
  | 'onboarding-experience'
  | 'onboarding-documents';

export interface SignInData {
  email: string;
  password: string;
}

export interface SignUpData {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface VerifyEmailData {
  email: string;
  code: string;
}

export interface OnboardingLocationData {
  address: string;
  useCurrentLocation: boolean;
}

export interface OnboardingProfileData {
  fullName: string;
  phoneNumber: string;
  language: string;
  avatar?: File;
}

export interface ServiceCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  isActive: boolean;
}

export interface OnboardingInterestsData {
  categories: string[];
}

export interface OnboardingExperienceData {
  level: 'BEGINNER' | 'INTERMEDIATE' | 'EXPERT';
}

export interface OnboardingDocumentsData {
  documents: File[];
}

export interface OnboardingStep {
  step: string;
  required: boolean;
  completed: boolean;
  label: string;
  description: string;
}

export interface OnboardingStatus {
  isComplete: boolean;
  nextRequiredStep?: string;
  completedSteps: string[];
  requiredSteps: string[];
  steps: OnboardingStep[];
  completionPercentage: number;
}
