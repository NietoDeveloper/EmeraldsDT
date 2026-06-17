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

      return data as T;
    } catch (error: any) {
      console.error(`\x1b[31m💥 [Network Fault] Fail to fetch endpoint: ${endpoint} -> ${error.message}\x1b[0m`);
      throw error;
    }
  },

  // Atajos semánticos para los métodos HTTP estándar
  get<T>(endpoint: string, options?: RequestOptions) {
    return this.request<T>(endpoint, { ...options, method: 'GET' });
  },

  post<T>(endpoint: string, body: any, options?: RequestOptions) {
    return this.request<T>(endpoint, { ...options, method: 'POST', body: JSON.stringify(body) });
  },

  put<T>(endpoint: string, body: any, options?: RequestOptions) {
    return this.request<T>(endpoint, { ...options, method: 'PUT', body: JSON.stringify(body) });
  },

  delete<T>(endpoint: string, options?: RequestOptions) {
    return this.request<T>(endpoint, { ...options, method: 'DELETE' });
  }
};