import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthState, AuthStep, User } from '@/types/auth';

interface AuthStore extends AuthState {
  // Actions
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  showAuth: (step?: AuthStep) => void;
  hideAuth: () => void;
  setAuthStep: (step: AuthStep) => void;
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

      signOut: () => set({ 
        user: null, 
        isAuthenticated: false,
        showAuthModal: false 
      }),
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
