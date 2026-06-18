'use client';

import { useState } from 'react';
import { apiClient } from '@/lib/apiClient';

interface CheckoutFormProps {
  productId: string;
  isEs: boolean;
  price: number;
}

type PaymentStatus = 'IDLE' | 'PROCESSING' | 'APPROVED' | 'REJECTED' | 'PENDING';

export default function CheckoutForm({ productId, isEs, price }: CheckoutFormProps) {
  const [status, setStatus] = useState<PaymentStatus>('IDLE');
  const [gatewayError, setGatewayError] = useState<string | null>(null);

  const handleProcessPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('PROCESSING');
    setGatewayError(null);

    try {
      // Consumo seguro de tu pasarela integrada en el Back-End (/api/v1/transactions)
      const response = await apiClient.post<{ status: 'APPROVED' | 'REJECTED' | 'PENDING'; redirectUrl?: string }>('/transactions', {
        productId,
        amount: price,
        currency: 'USD'
      });

      const txStatus = response.status;

      if (txStatus === 'APPROVED') {
        setStatus('APPROVED');
      } else if (txStatus === 'PENDING' && response.redirectUrl) {
        // Si la pasarela requiere redirección segura (ej: PSE / Wompi / Stripe)
        window.location.href = response.redirectUrl;
      } else {
        setStatus('REJECTED');
      }
    } catch (error) {
      setStatus('REJECTED');
      setGatewayError(isEs ? 'Transacción rechazada por el clúster financiero.' : 'Transaction rejected by financial cluster.');
    }
  };

  if (status === 'APPROVED') {
    return (
      <div className="font-mono text-center py-8 space-y-4">
        <div className="w-12 h-12 bg-emerald-950/30 border border-emerald-500 flex items-center justify-center mx-auto rounded-full">
          <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
        </div>
        <h2 className="text-lg font-bold text-white uppercase tracking-tight">
          {isEs ? 'ADQUISICIÓN COMPLETA' : 'ACQUISITION COMPLETE'}
        </h2>
        <p className="text-xs text-zinc-400 max-w-xs mx-auto leading-relaxed">
          {isEs ? 'El nodo criptográfico ha verificado tu pago. Tu certificado de autenticidad está siendo emitido.' : 'The cryptographic node has verified your payment. Your authenticity certificate is being issued.'}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleProcessPayment} className="space-y-6 font-mono">
      <div>
        <h2 className="text-sm font-bold uppercase tracking-wider mb-1 text-white">
          {isEs ? 'PROCESAMIENTO DE PAGO SEGURO' : 'SECURE PAYMENT PROCESSING'}
        </h2>
        <p className="text-[10px] text-zinc-500 tracking-widest uppercase">// GATEWAY INSTANCE V1.0</p>
      </div>

      {status === 'REJECTED' && (
        <div className="border-l-2 border-red-500 bg-red-950/10 p-4 text-xs text-red-400">
          <p className="font-bold uppercase mb-1">// TRANSACTION FAULT</p>
          <p>{gatewayError || (isEs ? 'Verifica los fondos o pasarela externa.' : 'Verify funds or external gateway Link.')}</p>
        </div>
      )}

      <div className="border-t border-white/5 pt-4">
        <p className="text-[10px] text-zinc-400 leading-relaxed mb-6">
          {isEs 
            ? 'Al accionar el botón de ejecución, aceptas que los fondos serán retenidos de forma segura mientras el clúster procesa la firma del smart contract de la joya.' 
            : 'By pulling the execution trigger, you agree that funds will be safely held while the cluster processes the signature of the asset smart contract.'}
        </p>

        <button
          type="submit"
          disabled={status === 'PROCESSING'}
          className="w-full border border-gold text-gold hover:bg-gold hover:text-black transition-colors font-bold py-3.5 tracking-[0.2em] text-[10px] uppercase disabled:opacity-40"
        >
          {status === 'PROCESSING' ? (isEs ? 'ENCRIPTANDO ORDEN...' : 'ENCRYPTING ORDER...') : (isEs ? 'EJECUTAR TRANSACCIÓN' : 'EXECUTE TRANSACTION')}
        </button>
      </div>
    </form>
  );
}