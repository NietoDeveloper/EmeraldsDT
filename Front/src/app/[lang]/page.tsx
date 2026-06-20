'use client';

import { useState, use } from 'react';
import { useRouter } from 'next/navigation';
import { apiClient } from '@/lib/apiClient';
import { loginSchema, LoginInput } from '@/lib/schemas/auth.schema';

interface AuthPageProps {
  params: Promise<{ lang: string }>;
}


