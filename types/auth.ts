export interface User {
  id: string;
  email: string;
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

export interface OnboardingInterestsData {
  categories: string[];
}

export interface OnboardingExperienceData {
  level: 'BEGINNER' | 'INTERMEDIATE' | 'EXPERT';
}

export interface OnboardingDocumentsData {
  documents: File[];
}
