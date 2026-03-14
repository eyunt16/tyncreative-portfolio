import type { ApiResponse, Project, ContactPayload, ContactResponse } from '@/types';

const BASE_URL = import.meta.env.VITE_API_URL ?? '/api';

async function fetchJSON<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Unknown error' }));
    throw new Error(err.error ?? `HTTP ${res.status}`);
  }

  return res.json() as Promise<T>;
}

// Projects ──────────────────────────────────────────────────────────────────

export async function fetchProjects(category?: string): Promise<Project[]> {
  const url = category && category !== 'All'
    ? `${BASE_URL}/projects?category=${encodeURIComponent(category)}`
    : `${BASE_URL}/projects`;

  const data = await fetchJSON<ApiResponse<Project[]>>(url);
  return data.data;
}

export async function fetchProject(id: string): Promise<Project> {
  const data = await fetchJSON<ApiResponse<Project>>(`${BASE_URL}/projects/${id}`);
  return data.data;
}

// Contact ───────────────────────────────────────────────────────────────────

export async function submitContact(payload: ContactPayload): Promise<ContactResponse> {
  return fetchJSON<ContactResponse>(`${BASE_URL}/contact`, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}
