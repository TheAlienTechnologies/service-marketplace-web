import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthState, AuthStep, User } from '@/types/auth';
import { apiService } from '@/lib/api';

interface AuthStore extends AuthState {
  // Forgot password flow state
  forgotPasswordEmail: string | null;
  forgotPasswordOtp: string | null;
  
  // Actions
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  showAuth: (step?: AuthStep) => void;
  hideAuth: () => void;
  setAuthStep: (step: AuthStep) => void;
  setForgotPasswordEmail: (email: string | null) => void;
  setForgotPasswordOtp: (otp: string | null) => void;
  clearForgotPasswordState: () => void;
  signOut: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      isAuthenticated: false,
      isLoading: false,
      showAuthModal: false,
      authStep: 'signin',
      forgotPasswordEmail: null,
      forgotPasswordOtp: null,

      // Actions
      setUser: (user) => set({ 
        user, 
        isAuthenticated: !!user 
      }),

      setLoading: (isLoading) => set({ isLoading }),

      showAuth: (step = 'signin') => set({ 
        showAuthModal: true, 
        authStep: step 
      }),

      hideAuth: () => set({ 
        showAuthModal: false 
      }),

      setAuthStep: (authStep) => set({ authStep }),

      setForgotPasswordEmail: (forgotPasswordEmail) => set({ forgotPasswordEmail }),

      setForgotPasswordOtp: (forgotPasswordOtp) => set({ forgotPasswordOtp }),

      clearForgotPasswordState: () => set({ 
        forgotPasswordEmail: null, 
        forgotPasswordOtp: null 
      }),

      signOut: async () => {
        await apiService.signOut();
        set({ 
          user: null, 
          isAuthenticated: false,
          showAuthModal: false,
          forgotPasswordEmail: null,
          forgotPasswordOtp: null
        });
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ 
        user: state.user, 
        isAuthenticated: state.isAuthenticated 
      }),
    }
  )
);
