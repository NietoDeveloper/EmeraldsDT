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
  delete<T>(endpoint: string, options?: Omit<RequestOptions, 'method' | 'body'>) {
    return this.request<T>(endpoint, { ...options, method: 'DELETE' });
  }
};