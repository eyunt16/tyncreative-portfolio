// Shared TypeScript types

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  category: string;
  tags: string[];
  year: string;
  client: string;
  image: string;
  featured: boolean;
  duration: string;
}

export interface ContactPayload {
  name: string;
  email: string;
  message: string;
  company?: string;
}

export interface ContactResponse {
  success: boolean;
  message?: string;
  errors?: string[];
}

export interface ApiResponse<T> {
  success: boolean;
  count?: number;
  data: T;
}

export interface NavLink {
  label: string;
  href: string;
}