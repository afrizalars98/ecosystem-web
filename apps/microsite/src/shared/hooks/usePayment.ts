import { useState } from "react";
import { api } from "../../core/api/client";

interface PaymentPayload {
  partner_id: string;
  transaction_type: "booking" | "order";
  payload: Record<string, unknown>;
  amount: number;
}

interface PaymentResult {
  transaction_id: string;
  deep_link: string;
  amount: number;
  status: string;
}

export function usePayment() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const pay = async (data: PaymentPayload): Promise<boolean> => {
    setIsProcessing(true);
    setError(null);

    try {
      const result = await api.post<PaymentResult>("/payment/prepare", data);
      window.location.href = result.deep_link;
      return true;
    } catch {
      setError("Tidak dapat membuka pembayaran. Silakan selesaikan pembayaran di aplikasi wondr.");
      return false;
    } finally {
      setIsProcessing(false);
    }
  };

  return { pay, isProcessing, error };
}
