'use client';

import { useState } from 'react';
import { apiClient } from '@/lib/apiClient';

interface CheckoutFormProps {
  productId: string;
  isEs: boolean;
  price: number;
}

type PaymentStatus = 'IDLE' | 'PROCESSING' | 'APPROVED' | 'REJECTED' | 'PENDING';

export default function CheckoutForm({ productId
      </div>
    </form>
  );
}