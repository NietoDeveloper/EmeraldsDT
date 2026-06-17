/**
 * 🛰️ Emerald DT - API Client Engine
 * Diseñado bajo el estándar Software DT para comunicaciones atómicas con el clúster back-end.
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1';

interface RequestOptions extends RequestInit {
  params
export const apiClient = {
