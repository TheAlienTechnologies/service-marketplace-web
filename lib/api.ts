import {
  SignInData,
  SignUpData,
  User,
  OnboardingStatus,
  Category,
} from "@/types/auth";
import { Service, ServiceStatus, CreateServiceData } from "@/types/service";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data: T;
}

interface AuthResponse {
  userId: string;
  token: string;
  refreshToken: string;
  user?: User;
  isNewUser?: boolean;
}

class ApiService {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${API_BASE_URL}${endpoint}`;

    const config: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    };

    // Add auth token if available
    const token = localStorage.getItem("auth_token");
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        // Handle specific error format from the backend
        if (data.message) {
          // Create a custom error with additional properties if available
          const error = new Error(data.message);
          if (data.attemptsLeft !== undefined) {
            (error as any).attemptsLeft = data.attemptsLeft;
          }
          throw error;
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error("API request failed:", error);
      throw error;
    }
  }

  // Auth endpoints
  async signIn(credentials: SignInData): Promise<AuthResponse> {
    const response = await this.request<AuthResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });

    // Store tokens
    if (response.data.token) {
      localStorage.setItem("auth_token", response.data.token);
      localStorage.setItem("refresh_token", response.data.refreshToken);
    }

    return response.data;
  }

  async signUp(
    userData: SignUpData & { role?: "USER" | "SERVICE_PROVIDER" }
  ): Promise<AuthResponse> {
    const response = await this.request<AuthResponse>("/auth/register", {
      method: "POST",
      body: JSON.stringify({
        email: userData.email,
        password: userData.password,
        ...(userData.role && { role: userData.role }),
      }),
    });

    // Store tokens
    if (response.data.token) {
      localStorage.setItem("auth_token", response.data.token);
      localStorage.setItem("refresh_token", response.data.refreshToken);
    }

    return response.data;
  }

  async verifyEmail(email: string, code: string): Promise<void> {
    await this.request("/auth/verify-email", {
      method: "POST",
      body: JSON.stringify({
        email,
        otpCode: code,
      }),
    });
  }

  async resendEmailVerification(email: string): Promise<void> {
    await this.request("/auth/resend-email-verification", {
      method: "POST",
      body: JSON.stringify({
        email,
      }),
    });
  }

  async getProfile(): Promise<{ user: User }> {
    const response = await this.request<{ user: User }>("/auth/me");
    return response.data;
  }

  async getOnboardingStatus(): Promise<OnboardingStatus> {
    const response = await this.request<OnboardingStatus>("/onboarding/status");
    return response.data;
  }

  async sendPhoneVerification(phoneNumber: string): Promise<void> {
    await this.request("/auth/send-phone-verification", {
      method: "POST",
      body: JSON.stringify({
        phoneNumber,
      }),
    });
  }

  async verifyPhone(phoneNumber: string, code: string): Promise<void> {
    await this.request("/auth/verify-phone", {
      method: "POST",
      body: JSON.stringify({
        phoneNumber,
        otpCode: code,
      }),
    });
  }

  async resendPhoneVerification(phoneNumber: string): Promise<void> {
    await this.request("/auth/resend-phone-verification", {
      method: "POST",
      body: JSON.stringify({
        phoneNumber,
      }),
    });
  }

  async getCategories(
    includeInactive = false
  ): Promise<{ categories: Category[] }> {
    const endpoint = includeInactive
      ? "/categories?includeInactive=true"
      : "/categories";
    const response = await this.request<Category[]>(endpoint);
    return { categories: response.data };
  }

  async getFeaturedCategories(): Promise<{ categories: Category[] }> {
    const response = await this.request<Category[]>("/categories/featured");
    return { categories: response.data };
  }

  async getCategoryById(id: string): Promise<Category> {
    const response = await this.request<Category>(`/categories/${id}`);
    return response.data;
  }

  async createCategory(
    data: {
      name: string;
      description?: string;
      parentCategoryId?: string;
      featured?: boolean;
    },
    imageFile?: File
  ): Promise<Category> {
    const formData = new FormData();
    formData.append("name", data.name);
    if (data.description) formData.append("description", data.description);
    if (data.parentCategoryId)
      formData.append("parentCategoryId", data.parentCategoryId);
    if (data.featured !== undefined)
      formData.append("featured", String(data.featured));
    if (imageFile) formData.append("image", imageFile);

    const token = localStorage.getItem("auth_token");
    const response = await fetch(`${API_BASE_URL}/categories`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || `HTTP error! status: ${response.status}`
      );
    }

    const result = await response.json();
    return result.data;
  }

  async updateCategory(
    id: string,
    data: {
      name?: string;
      description?: string;
      parentCategoryId?: string | null;
      featured?: boolean;
      isActive?: boolean;
    },
    imageFile?: File
  ): Promise<Category> {
    const formData = new FormData();
    if (data.name !== undefined) formData.append("name", data.name);
    if (data.description !== undefined)
      formData.append("description", data.description);
    if (data.parentCategoryId !== undefined) {
      formData.append("parentCategoryId", data.parentCategoryId || "");
    }
    if (data.featured !== undefined)
      formData.append("featured", String(data.featured));
    if (data.isActive !== undefined)
      formData.append("isActive", String(data.isActive));
    if (imageFile) formData.append("image", imageFile);

    const token = localStorage.getItem("auth_token");
    const response = await fetch(`${API_BASE_URL}/categories/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || `HTTP error! status: ${response.status}`
      );
    }

    const result = await response.json();
    return result.data;
  }

  async deleteCategory(id: string): Promise<void> {
    await this.request(`/categories/${id}`, {
      method: "DELETE",
    });
  }

  // Users API methods
  async getUsers(options?: {
    page?: number;
    limit?: number;
    search?: string;
    role?: string;
    status?: string;
  }): Promise<{
    users: User[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }> {
    const params = new URLSearchParams();
    if (options?.page) params.append("page", options.page.toString());
    if (options?.limit) params.append("limit", options.limit.toString());
    if (options?.search) params.append("search", options.search);
    if (options?.role) params.append("role", options.role);
    if (options?.status) params.append("status", options.status);

    const query = params.toString() ? `?${params.toString()}` : "";
    const response = await this.request<{
      users: User[];
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    }>(`/users${query}`);
    return response.data;
  }

  async getUserStats(): Promise<{
    totalUsers: number;
    activeUsers: number;
    premiumUsers: number;
    onboardedUsers: number;
  }> {
    const response = await this.request<{
      totalUsers: number;
      activeUsers: number;
      premiumUsers: number;
      onboardedUsers: number;
    }>("/users/stats");
    return response.data;
  }

  async updateUserStatus(
    userId: string,
    status: "ACTIVE" | "SUSPENDED" | "DELETED"
  ): Promise<User> {
    const response = await this.request<User>(`/users/${userId}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    });
    return response.data;
  }

  async deleteUser(userId: string): Promise<void> {
    await this.request(`/users/${userId}`, {
      method: "DELETE",
    });
  }

  // Services API methods
  async createService(
    data: CreateServiceData,
    coverImage?: File
  ): Promise<Service> {
    const formData = new FormData();

    // Add service data as JSON
    formData.append("title", data.title);
    formData.append("categoryId", data.categoryId);
    formData.append("overview", data.overview);

    if (data.tags && data.tags.length > 0) {
      data.tags.forEach((tag) => formData.append("tags[]", tag));
    }

    // Add plans
    formData.append("plans", JSON.stringify(data.plans));

    // Add addons if present
    if (data.addons && data.addons.length > 0) {
      formData.append("addons", JSON.stringify(data.addons));
    }

    // Add cover image if present
    if (coverImage) {
      formData.append("coverImage", coverImage);
    }

    const response = await this.request<Service>("/services", {
      method: "POST",
      body: formData,
      headers: {
        // Remove Content-Type header to let browser set it with boundary
      },
    });
    return response.data;
  }

  async getServices(options?: {
    status?: ServiceStatus;
    categoryId?: string;
    page?: number;
    limit?: number;
  }): Promise<{
    services: Service[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }> {
    const params = new URLSearchParams();
    if (options?.status) params.append("status", options.status);
    if (options?.categoryId) params.append("categoryId", options.categoryId);
    if (options?.page) params.append("page", options.page.toString());
    if (options?.limit) params.append("limit", options.limit.toString());

    const query = params.toString() ? `?${params.toString()}` : "";
    const response = await this.request<{
      services: Service[];
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    }>(`/services${query}`);
    return response.data;
  }

  async getMyServices(options?: {
    status?: ServiceStatus;
    page?: number;
    limit?: number;
  }): Promise<{
    services: Service[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }> {
    const params = new URLSearchParams();
    if (options?.status) params.append("status", options.status);
    if (options?.page) params.append("page", options.page.toString());
    if (options?.limit) params.append("limit", options.limit.toString());

    const query = params.toString() ? `?${params.toString()}` : "";
    const response = await this.request<{
      services: Service[];
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    }>(`/services/my${query}`);
    return response.data;
  }

  async getAdminServices(options?: {
    status?: ServiceStatus;
    categoryId?: string;
    providerId?: string;
    page?: number;
    limit?: number;
  }): Promise<{
    services: Service[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }> {
    const params = new URLSearchParams();
    if (options?.status) params.append("status", options.status);
    if (options?.categoryId) params.append("categoryId", options.categoryId);
    if (options?.providerId) params.append("providerId", options.providerId);
    if (options?.page) params.append("page", options.page.toString());
    if (options?.limit) params.append("limit", options.limit.toString());

    const query = params.toString() ? `?${params.toString()}` : "";
    const response = await this.request<{
      services: Service[];
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    }>(`/services/admin/all${query}`);
    return response.data;
  }

  async getService(id: string): Promise<Service> {
    const response = await this.request<Service>(`/services/${id}`);
    return response.data;
  }

  async updateService(
    id: string,
    data: Partial<CreateServiceData>,
    coverImage?: File
  ): Promise<Service> {
    const formData = new FormData();

    if (data.title) formData.append("title", data.title);
    if (data.categoryId) formData.append("categoryId", data.categoryId);
    if (data.overview) formData.append("overview", data.overview);
    if (data.tags) {
      data.tags.forEach((tag) => formData.append("tags[]", tag));
    }
    if (data.plans) {
      formData.append("plans", JSON.stringify(data.plans));
    }
    if (data.addons) {
      formData.append("addons", JSON.stringify(data.addons));
    }
    if (coverImage) {
      formData.append("coverImage", coverImage);
    }

    const response = await this.request<Service>(`/services/${id}`, {
      method: "PUT",
      body: formData,
      headers: {},
    });
    return response.data;
  }

  async updateServiceStatus(
    id: string,
    status: ServiceStatus
  ): Promise<Service> {
    const response = await this.request<Service>(`/services/${id}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    });
    return response.data;
  }

  async deleteService(id: string): Promise<void> {
    await this.request(`/services/${id}`, {
      method: "DELETE",
    });
  }

  async uploadServiceImages(id: string, images: File[]): Promise<Service> {
    const formData = new FormData();
    images.forEach((image) => formData.append("images", image));

    const response = await this.request<Service>(`/services/${id}/images`, {
      method: "POST",
      body: formData,
      headers: {},
    });
    return response.data;
  }

  async deleteServiceImage(serviceId: string, imageId: string): Promise<void> {
    await this.request(`/services/${serviceId}/images/${imageId}`, {
      method: "DELETE",
    });
  }

  async updateInterests(
    categoryIds: string[],
    type: "INTEREST" | "SERVICE" = "INTEREST"
  ): Promise<void> {
    await this.request("/onboarding/interests", {
      method: "PUT",
      body: JSON.stringify({
        categoryIds,
        type,
      }),
    });
  }

  async updateExperience(
    experienceLevel: "BEGINNER" | "INTERMEDIATE" | "EXPERT"
  ): Promise<{ user: User }> {
    const response = await this.request<{ user: User }>(
      "/onboarding/experience",
      {
        method: "PUT",
        body: JSON.stringify({
          experienceLevel,
        }),
      }
    );
    return response.data;
  }

  async updateLocation(locationData: {
    placeId?: string;
    addressName: string;
    formattedAddress: string;
    latitude: number;
    longitude: number;
    city?: string;
    state?: string;
    country?: string;
    postalCode?: string;
    isPrimary?: boolean;
  }): Promise<void> {
    await this.request("/onboarding/location", {
      method: "PUT",
      body: JSON.stringify(locationData),
    });
  }

  async updateProfile(
    profileData: {
      firstName?: string;
      lastName?: string;
      phoneNumber?: string;
      countryCode?: string;
      preferredLanguage?: string;
      bio?: string;
      experienceLevel?: string;
    },
    avatarFile?: File
  ): Promise<{ user: User }> {
    const formData = new FormData();

    // Add profile data
    if (profileData.firstName) {
      formData.append("firstName", profileData.firstName);
    }
    if (profileData.lastName) {
      formData.append("lastName", profileData.lastName);
    }
    if (profileData.phoneNumber) {
      formData.append("phoneNumber", profileData.phoneNumber);
    }
    if (profileData.countryCode) {
      formData.append("countryCode", profileData.countryCode);
    }
    if (profileData.preferredLanguage) {
      formData.append("preferredLanguage", profileData.preferredLanguage);
    }
    if (profileData.bio) {
      formData.append("bio", profileData.bio);
    }
    if (profileData.experienceLevel) {
      formData.append("experienceLevel", profileData.experienceLevel);
    }
    // Add avatar file if provided
    if (avatarFile) {
      formData.append("avatar", avatarFile);
    }

    // Use fetch directly for FormData to avoid JSON processing
    const token = localStorage.getItem("auth_token");
    const response = await fetch(`${API_BASE_URL}/onboarding/profile`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMessage =
        errorData.message ||
        errorData.error ||
        `HTTP error! status: ${response.status}`;
      throw new Error(errorMessage);
    }

    const result = await response.json();
    return result.data;
  }

  async refreshToken(): Promise<AuthResponse> {
    const refreshToken = localStorage.getItem("refresh_token");
    if (!refreshToken) {
      throw new Error("No refresh token available");
    }

    const response = await this.request<AuthResponse>("/auth/refresh", {
      method: "POST",
      body: JSON.stringify({
        refreshToken,
      }),
    });

    // Update tokens
    if (response.data.token) {
      localStorage.setItem("auth_token", response.data.token);
      localStorage.setItem("refresh_token", response.data.refreshToken);
    }

    return response.data;
  }

  async signOut(): Promise<void> {
    // Clear tokens
    localStorage.removeItem("auth_token");
    localStorage.removeItem("refresh_token");
  }

  // Forgot password flow
  async forgotPassword(email: string): Promise<void> {
    await this.request("/auth/forgot-password", {
      method: "POST",
      body: JSON.stringify({
        email,
      }),
    });
  }

  async verifyPasswordResetOtp(
    email: string,
    otpCode: string
  ): Promise<{ valid: boolean }> {
    const response = await this.request<{ valid: boolean }>(
      "/auth/verify-password-reset-otp",
      {
        method: "POST",
        body: JSON.stringify({
          email,
          otpCode,
        }),
      }
    );
    return response.data;
  }

  async resetPassword(
    email: string,
    otpCode: string,
    newPassword: string
  ): Promise<void> {
    await this.request("/auth/reset-password", {
      method: "POST",
      body: JSON.stringify({
        email,
        otpCode,
        newPassword,
      }),
    });
  }

  // Social auth - Google only
  async socialAuth(
    provider: "google",
    accessToken: string,
    idToken?: string,
    role?: "USER" | "SERVICE_PROVIDER"
  ): Promise<AuthResponse> {
    const response = await this.request<AuthResponse>("/auth/social", {
      method: "POST",
      body: JSON.stringify({
        provider,
        accessToken,
        idToken,
        role,
      }),
    });

    // Store tokens
    if (response.data.token) {
      localStorage.setItem("auth_token", response.data.token);
      localStorage.setItem("refresh_token", response.data.refreshToken);
    }

    return response.data;
  }

  async uploadDocument(
    file: File,
    documentType: string,
    description?: string
  ): Promise<any> {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("documentType", documentType);
    if (description) {
      formData.append("description", description);
    }

    const token = localStorage.getItem("auth_token");
    const response = await fetch(`${API_BASE_URL}/onboarding/documents`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMessage =
        errorData.message ||
        errorData.error ||
        `HTTP error! status: ${response.status}`;
      throw new Error(errorMessage);
    }

    const result = await response.json();
    return result.data;
  }

  async getUserDocuments(): Promise<any[]> {
    const response = await this.request<any[]>("/onboarding/documents");
    return response.data;
  }

  async deleteDocument(documentId: string): Promise<void> {
    await this.request(`/onboarding/documents/${documentId}`, {
      method: "DELETE",
    });
  }

  async completeOnboarding(): Promise<{ user: User }> {
    const response = await this.request<{ user: User }>(
      "/onboarding/complete",
      {
        method: "POST",
      }
    );
    return response.data;
  }
}

export const apiService = new ApiService();
