'use client';

import { useState, use } from 'react';
import { useRouter } from 'next/navigation';
import { apiClient } from '@/lib/apiClient';
import { loginSchema, LoginInput } from '@/lib/schemas/auth.schema';

interface AuthPageProps {
  params: Promise<{ lang: string }>;
}

export default function AuthPage({ params }: AuthPageProps) {
  const { lang } = use(params);
  const router = useRouter();
  const isEs = lang === 'es';

  // Estados atómicos para máximo rendimiento sin re-renders innecesarios
  const [formData, setFormData] = useState<LoginInput>({ email: '', password: '' });
  const [errors, setErrors] = useState<Partial<Record<keyof LoginInput, string>>>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Limpiar errores tipográficos en caliente para mejorar la UX
    if (errors[e.target.name as keyof LoginInput]) {
      setErrors({ ...errors, [e.target.name]: undefined });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setServerError(null);
    setErrors({});

    // 1. Zod Shield Client Validation (Filtro perimetral anti-basura)
    const validation = loginSchema.safeParse(formData);
    
    if (!validation.success) {
      const formattedErrors: Partial<Record<keyof LoginInput, string>> = {};
      validation.error.issues.forEach((issue) => {
        if (issue.path[0]) {
          formattedErrors[issue.path[0] as keyof LoginInput] = issue.message;
        }
      });
      setErrors(formattedErrors);
      setLoading(false);
      return;
    }

    try {
      // 2. Conexión directa al endpoint del Back-End
      // credentials: 'include' configurado en tu apiClient inyectará automáticamente la cookie HTTPOnly
      await apiClient.post('/auth/login', validation.data);

      // Redirección inmediata optimizada al catálogo transaccional
      router.push(`/${lang}/collection`);
      router.refresh();
    } catch (error: any) {
      setServerError(
        isEs 
          ? 'Credenciales inválidas o fallo de conexión con el clúster.' 
          : 'Invalid credentials or cluster connection fault.'
      );
    } finally {
      setLoading(false);
    }
  };

