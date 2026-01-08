export interface User {
  id: string;
  email: string;
  emailVerified: boolean;
  firstName?: string;
  lastName?: string;
  displayName?: string;
  username?: string;
  avatar?: string;
  role: "USER" | "SERVICE_PROVIDER" | "ADMIN";
  hasCompletedOnboarding: boolean;
  profileCompleteness: number;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  showAuthModal: boolean;
  authStep: AuthStep;
  userAuthStep: UserAuthStep;
  providerAuthStep: ProviderAuthStep;
  authFlow: "user" | "provider";
}

export type AuthStep =
  | "signin"
  | "signup"
  | "verify-email"
  | "forgot-password"
  | "forgot-password-sent"
  | "verify-password-reset-otp"
  | "reset-password"
  | "reset-password-success";

export type UserAuthStep =
  | "signup"
  | "verify-email"
  | "onboarding-personalize"
  | "onboarding-location"
  | "onboarding-profile"
  | "onboarding-interests"
  | "onboarding-experience"
  | "onboarding-documents";

export type ProviderAuthStep =
  | "provider-signup"
  | "verify-email"
  | "provider-profile"
  | "provider-bio"
  | "provider-skills"
  | "provider-experience"
  | "provider-coverage"
  | "provider-documents"
  | "provider-submitted";

// Step arrays for easier navigation
export const USER_AUTH_STEPS: UserAuthStep[] = [
  "signup",
  "verify-email",
  "onboarding-personalize",
  "onboarding-location",
  "onboarding-profile",
  "onboarding-interests",
  "onboarding-experience",
  "onboarding-documents",
];

export const PROVIDER_AUTH_STEPS: ProviderAuthStep[] = [
  "provider-signup",
  "verify-email",
  "provider-profile",
  "provider-bio",
  "provider-skills",
  "provider-experience",
  "provider-coverage",
  "provider-documents",
  "provider-submitted",
];

// Mapping function to convert backend onboarding steps to frontend steps
export function mapBackendStepToFrontendStep(
  backendStep: string,
  userRole: "USER" | "SERVICE_PROVIDER" | "ADMIN"
): UserAuthStep | ProviderAuthStep {
  if (userRole === "SERVICE_PROVIDER") {
    const providerStepMap: Record<string, ProviderAuthStep> = {
      email_verification: "verify-email",
      basic_profile: "provider-profile",
      location: "provider-coverage", // Provider location step
      interests: "provider-skills", // Map interests to skills for providers
      experience: "provider-experience",
      verification_documents: "provider-documents",
    };
    return providerStepMap[backendStep] || "provider-profile";
  } else {
    const userStepMap: Record<string, UserAuthStep> = {
      email_verification: "verify-email",
      basic_profile: "onboarding-profile",
      location: "onboarding-location",
      interests: "onboarding-interests",
      experience: "onboarding-experience",
      verification_documents: "onboarding-documents",
    };
    return userStepMap[backendStep] || "onboarding-personalize";
  }
}

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
  imageUrl?: string;
  isActive: boolean;
  featured: boolean;
  parentCategoryId?: string;
  parentCategory?: { id: string; name: string };
  subCategories?: { id: string; name: string; imageUrl?: string }[];
  createdAt?: string;
  updatedAt?: string;
}

export interface OnboardingInterestsData {
  categories: string[];
}

export interface OnboardingExperienceData {
  level: "BEGINNER" | "INTERMEDIATE" | "EXPERT";
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
