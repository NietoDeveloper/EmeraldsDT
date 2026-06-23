import Link from 'next/link';
import { notFound } from 'next/navigation';
import { apiClient, Product } from '@/lib/apiClient';

interface CollectionPageProps {
  params: P