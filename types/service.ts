// Service Types
export interface ServicePlan {
  id?: string;
  title: string;
  price: number;
  inclusions: string;
  isPopular?: boolean;
  sortOrder?: number;
}

export interface ServiceAddon {
  id?: string;
  title: string;
  description?: string;
  price: number;
}

export interface ServiceImage {
  id: string;
  url: string;
  fileName: string;
  sortOrder: number;
}

export type ServiceStatus = "DRAFT" | "PUBLISHED" | "ARCHIVED" | "SUSPENDED";

export interface Service {
  id: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  slug: string;
  overview: string;
  coverImage?: string;
  tags: string[];
  status: ServiceStatus;
  providerId: string;
  categoryId: string;

  // Relations
  plans: ServicePlan[];
  addons: ServiceAddon[];
  images: ServiceImage[];
  category?: {
    id: string;
    name: string;
    imageUrl?: string;
  };
  provider?: {
    id: string;
    firstName?: string;
    lastName?: string;
    displayName?: string;
    avatar?: string;
  };
}

export interface CreateServiceData {
  title: string;
  categoryId: string;
  overview: string;
  tags?: string[];
  plans: ServicePlan[];
  addons?: ServiceAddon[];
}
