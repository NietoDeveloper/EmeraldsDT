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
   * Ejecuta peticiones HTTP asíncronas inyectando headers globales de seguridad
   */
  async request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    const { params, headers, ...customConfig } = options;
    
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
      },
      // Configuración equivalente a withCredentials: true en Axios.
      // Obligatorio para compartir cookies HTTPOnly (JWT de sesión) entre dominios y puertos.
      credentials: 'include', 
      ...customConfig,
    };

    try {
      const response = await fetch(url, config);

      // Manejo de respuestas vacías sin romper el parser JSON (ej: 204 No Content)
      if (response.status === 204) {
        return {} as T;
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `API Error: Status ${response.status}`);

    }
};