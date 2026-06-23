/**
 * 🛰️ EMERALD DT - AUTOMATED FETCH CLIENT (LEVEL L5)
 * Motor síncrono/asíncrono de baja latencia sin sobrecarga de dependencias.
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1';

interface RequestOptions extends RequestInit {
  params?: Record<string, string>;
}

export const apiClient = {
  async request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    const { params, headers, method = 'GET', body, ...config } = options;
    
    const url = params 
      ? `${API_BASE_URL}${endpoint}?${new URLSearchParams(params)}`
      : `${API_BASE_URL}${endpoint}`;

    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      credentials: 'include', // Seguridad Transversal: Traspaso estricto de HTTPOnly Cookies
      body: body ? JSON.stringify(body) : undefined,
      ...config,
    });

    if (response.status === 204) return {} as T;

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || `HTTP_ERROR_${response.status}`);

    return data as T;
  },

  get<T>(endpoint: string, options?: Omit<RequestOptions, 'method' | 'body'>) {

  },

  put<T>(endpoint: string, body: any, options?: Omit<RequestOptions, 'method' | 'body'>) {
    return this.request<T>(endpoint, { ...options, method: 'PUT', body });
  },

  delete<T>(endpoint: string, options?: Omit<RequestOptions, 'method' | 'body'>) {
    return this.request<T>(endpoint, { ...options, method: 'DELETE' });
  }
};