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

  return (
    <main className="min-h-screen w-full bg-black flex items-center justify-center px-4 sm:px-6 relative overflow-hidden selection:bg-gold/30">
      {/* Luz ambiental esmeralda de bajo contraste (Estilo Aeroespacial) */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-950/10 blur-[150px] rounded-full pointer-events-none z-0" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-zinc-900/20 blur-[100px] rounded-full pointer-events-none z-0" />
      
      {/* Contenedor Responsivo desde 310px hasta 1900px */}
      <div className="w-full max-w-[420px] border border-white/10 bg-zinc-950/40 backdrop-blur-md p-6 sm:p-8 md:p-10 relative z-10 my-auto">
        
        {/* Marcadores angulares de precisión técnica */}
        <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-gold/40" />
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-gold/40" />

        {/* Encabezado del Formulario */}
        <div className="mb-8">
          <h1 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white mb-2">
            {isEs ? 'IDENTIDAD DE ACCESO' : 'ACCESS IDENTITY'}
          </h1>
          <p className="text-[10px] font-mono text-zinc-500 tracking-wider">
            // SECURE GATEWAY V2.2_
          </p>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {serverError && (
            <div className="border-l-2 border-red-500 bg-red-950/20 p-3 text-xs font-mono text-red-400 animate-fade-in">
              {serverError}
            </div>
          )}

          {/* Campo: Email */}
          <div className="relative group">
            <label className="block text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-400 mb-2">
              {isEs ? 'Correo Electrónico' : 'Email Address'}
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled={loading}
              className="w-full bg-black border border-white/10 rounded-none px-4 py-3 text-sm text-white focus:outline-none focus:border-gold/60 font-mono tracking-wide transition-colors disabled:opacity-40"
              placeholder="operator@emeralddt.com"
              autoComplete="email"
            />
            {errors.email && (
              <p className="text-[11px] font-mono text-red-400 mt-1.5 tracking-wide">{errors.email}</p>
            )}
          </div>

          {/* Campo: Contraseña */}
          <div className="relative group">
            <label className="block text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-400 mb-2">
              {isEs ? 'Contraseña' : 'Password'}
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              disabled={loading}
              className="w-full bg-black border border-white/10 rounded-none px-4 py-3 text-sm text-white focus:outline-none focus:border-gold/60 tracking-wide transition-colors disabled:opacity-40"
              autoComplete="current-password"
            />
            {errors.password && (
              <p className="text-[11px] font-mono text-red-400 mt-1.5 tracking-wide">{errors.password}</p>
            )}
          </div>
Name="w-full border border-gold text-gold bg-transparent hover:bg-gold hover:text-black transition-all duration-500 font-bold py-4 tracking-widest text-[11px] disabled:opacity-50 uppercase relative overflow-hidden group/btn"
          >
            <span className="relative z-10">
              {loading ? (isEs ? 'PROCESANDO...' : 'PROCESSING...') : (isEs ? 'INGRESAR' : 'ENTER')}
            </span>
          </button>
        </form>
      </div>

      {/* Identificador de pie de página técnico discreto */}
      <div className="absolute bottom-4 left-4 hidden md:block z-10 text-[9px] font-mono text-white/20 tracking-widest">
        EMERALD DT // INTEGRATION
      </div>
    </main>
  );
}