import { ServiceCategory } from "@/types/auth";

export const mockServiceCategories: ServiceCategory[] = [
  {
    id: "1",
    name: "Plumbing",
    description: "Plumbing installation, repair, and maintenance services",
    icon: "🔧",
  },
  {
    id: "2",
    name: "Painting",
    description: "Interior and exterior painting services",
    icon: "🎨",
  },
  {
    id: "3",
    name: "Beauty",
    description: "Beauty, spa, and wellness services",
    icon: "💄",
  },
  {
    id: "4",
    name: "Digital Marketing",
    description: "Online marketing and social media services",
    icon: "📱",
  },
  {
    id: "5",
    name: "Website Design",
    description: "Web design and development services",
    icon: "💻",
  },
  {
    id: "6",
    name: "Skincare & Spa",
    description: "Skincare treatments and spa services",
    icon: "🧴",
  },
  {
    id: "7",
    name: "Hairdressing & Barbering",
    description: "Hair styling and barbering services",
    icon: "✂️",
  },
  {
    id: "8",
    name: "Graphic Design",
    description: "Logo design, branding, and graphic services",
    icon: "🎨",
  },
  {
    id: "9",
    name: "Photography & Videography",
    description: "Professional photography and video services",
    icon: "📸",
  },
  {
    id: "10",
    name: "Makeup Services",
    description: "Professional makeup for events and occasions",
    icon: "💋",
  },
  {
    id: "11",
    name: "Carpentry",
    description: "Wood work, furniture making, and repair services",
    icon: "🔨",
  },
  {
    id: "12",
    name: "Electrical Repairs",
    description: "Electrical installation and repair services",
    icon: "⚡",
  },
];

export const mockServices = [
  {
    id: "1",
    title: "Professional Plumbing Services",
    provider: "John Doe",
    rating: 4.8,
    reviews: 124,
    price: "GHS 50/hour",
    image: "/api/placeholder/300/200",
    category: "Plumbing",
  },
  {
    id: "2",
    title: "Interior & Exterior Painting",
    provider: "Jane Smith",
    rating: 4.9,
    reviews: 89,
    price: "GHS 200/room",
    image: "/api/placeholder/300/200",
    category: "Painting",
  },
  {
    id: "3",
    title: "Bridal Makeup & Beauty",
    provider: "Beauty by Sarah",
    rating: 5.0,
    reviews: 156,
    price: "GHS 300/session",
    image: "/api/placeholder/300/200",
    category: "Beauty",
  },
  {
    id: "4",
    title: "Social Media Marketing",
    provider: "Digital Pro Agency",
    rating: 4.7,
    reviews: 67,
    price: "GHS 500/month",
    image: "/api/placeholder/300/200",
    category: "Digital Marketing",
  },
];

// Mock authentication functions
export const mockAuth = {
  signIn: async (email: string, password: string) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (email === "test@example.com" && password === "password") {
      return {
        user: {
          id: "1",
          email: "test@example.com",
          firstName: "John",
          lastName: "Doe",
          role: "USER" as const,
          hasCompletedOnboarding: false,
          profileCompleteness: 20,
        },
        token: "mock-jwt-token",
      };
    }

    throw new Error("Invalid credentials");
  },

  signUp: async (email: string, password: string) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return {
      user: {
        id: "2",
        email,
        role: "USER" as const,
        hasCompletedOnboarding: false,
        profileCompleteness: 0,
      },
      requiresVerification: true,
    };
  },

  verifyEmail: async (email: string, code: string) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (code === "123456") {
      return { success: true };
    }

    throw new Error("Invalid verification code");
  },

  resendVerification: async (email: string) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));
    return { success: true };
  },
};
