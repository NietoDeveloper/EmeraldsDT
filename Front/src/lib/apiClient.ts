/**
 * 🛰️ Emerald DT - API Client Engine
 * Diseñado bajo el estándar Software DT para comunicaciones atómicas con el clúster back-end.
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1';

interface RequestOptions extends RequestInit {
  params?: Record<string, string>;
}

export const apiClient = {
  /**
   * E
    
    // 1. Construcción de URL con Query Params si existen
    let url = `${API_BASE_URL}${endpoint}`;
    if (params) {
      const searchParams = new URLSearchParams(params);
      url += `?${searchParams.toString()}`;
    }

    // 2. Configuración de Headers Base de Red
    const defaultHeaders: HeadersInit = {
      'Content-Type': 'application/json',
    };

    const config: RequestInit = {
      method: options.method || 'GET',
      headers: {
        ...defaultHeaders,
        ...headers,
    ', 
      ...customConfig,
    };

    try {
r el parser JSON (ej: 204 No Content)
      if (response.status === 204) {
        return {} as T;
      }

