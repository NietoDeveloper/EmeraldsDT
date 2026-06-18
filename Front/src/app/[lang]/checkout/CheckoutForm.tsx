'use client';

import { useState } from 'react';
import { apiClient } from '@/lib/apiClient';

interface CheckoutFormProps {
  productId: string;
  isEs: boolean;
  price: number;
}

type PaymentStatus = 'IDLE' | 'PROCESSING' | 'APPROVED' | 'REJECTED';

interface GatewayResponse {
  status: 'APPROVED' | 'REJECTED' | 'PENDING';
  redirectUrl?: string;
}

export default function CheckoutForm({ productId, isEs, price }: CheckoutFormProps) {
  const [status, setStatus] = useState<PaymentStatus>('IDLE');
  const [gatewayError, setGatewayError] = useState<string | null>(null);

  const handleProcessPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'PROCESSING') return;

    setStatus('PROCESSING');
    setGatewayError(null);

    try {
      // Tu apiClient desenvuelve la respuesta directamente bajo la firma L5
      const response = await apiClient.post<GatewayResponse>('/transactions', {
        productId,
        amount: price,
        currency: 'USD'
      });

      if (!response) {
        throw new Error('NULL_CLUSTER_RESPONSE');
      }

      if (response.status === 'APPROVED') {
        setStatus('APPROVED');
        return;
      }

      if (response.status === 'PENDING' && response.redirectUrl) {
        window.location.href = response.redirectUrl;
        return;
      }

      setStatus('REJECTED');
    } catch (error) {
      setStatus('REJECTED');
      setGatewayError(
        isEs 
          ? 'Transacción rechazada por el clúster financiero.' 
          : 'Transaction rejected by financial cluster.'
      );
    }
  };

  if (status === 'APPROVED') {
    return (
      <div className="font-mono text-center py-10 space-y-4 animate-fade-in min-w-[278px]">
        <div className="w-10 h-10 bg-emerald-950/20 border border-emerald-500/40 flex items-center justify-center mx-auto relative">
          <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
          <span className="absolute inset-0 border border-emerald-500 animate-ping opacity-20" />
        </div>
        <div className="space-y-1">
          <h2 className="text-sm font-black text-white uppercase tracking-wider">
            {isEs ? 'ADQUISICIÓN COMPLETA' : 'ACQUISITION COMPLETE'}
          </h2>
          <p className="text-[10px] text-zinc-500 uppercase tracking-widest">// BLOCK_CONFIRMED_OK</p>
        </div>
        <p className="text-[11px] text-zinc-400 max-w-xs mx-auto leading-relaxed">
          {isEs 
            ? 'El nodo central ha verificado tu transferencia. Certificado de autenticidad emitido.' 
            : 'The core node has verified your transfer. Authenticity certificate issued.'}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleProcessPayment} className="space-y-6 font-mono min-w-[278px] w-full">
      <div>
        <h2 className="text-xs font-black uppercase tracking-widest text-white">
          {isEs ? 'PROCESAMIENTO DE PAGO SEGURO' : 'SECURE PAYMENT PROCESSING'}
        </h2>
        <p className="text-[9px] text-zinc-600 tracking-widest uppercase">// GATEWAY INSTANCE V2.2_</p>
      </div>

      {status === 'REJECTED' && (
        <div className="border border-red-500/20 bg-red-950/10 p-4 text-[11px] text-red-400 animate-fade-in">
          <p className="font-bold uppercase tracking-wider mb-0.5">// TRANSACTION FAULT</p>
          <p className="text-zinc-400">{gatewayError || (isEs ? 'Fondos insuficientes o pasarela inválida.' : 'Insufficient funds or invalid gateway.')}</p>
        </div>
      )}

      <div className="border-t border-white/5 pt-4 space-y-5">
        <p className="text-[10px] text-zinc-500 leading-relaxed">
          {isEs 
            ? 'Los fondos serán retenidos de forma segura mientras el clúster firma el smart contract de la esmeralda.' 
            : 'Funds will be safely held while the cluster signatures the emerald smart contract.'}
        </p>

        <button
          type="submit"
          disabled={status === 'PROCESSING'}
          className="w-full border border-gold text-gold bg-transparent hover:bg-gold hover:text-black transition-colors font-bold py-3.5 tracking-[0.25em] text-[10px] uppercase disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-gold"
        >
          {status === 'PROCESSING' ? (isEs ? 'ENCRIPTANDO ORDEN...' : 'ENCRYPTING ORDER...') : (isEs ? 'EJECUTAR TRANSACCIÓN' : 'EXECUTE TRANSACTION')}
        </button>
      </div>
    </form>
  );
}