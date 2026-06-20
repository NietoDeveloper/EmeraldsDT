'use client';

import { useState, use } from 'react';
import { useRouter } from 'next/navigation';
import { apiClient } from '@/lib/apiClient';
import { loginSchema, LoginInput } from '../../lib/schemas/auth.schema';

interface AuthPageProps {
  params: Promise<{ lang: string }>;
}

export default function AuthPage({ params }: AuthPageProps) {
  const { lang } = use(params);
  const router = useRouter();
  const isEs = lang === 'es';

  // Estados atómicos para máximo rendimiento sin re-renders innecesarios
  c