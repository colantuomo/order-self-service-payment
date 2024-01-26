import { AdditionalInfo, Metadata } from "./shared";

export interface MercadoPagoCreatePaymentBody {
  additional_info?: AdditionalInfo;
  description: string;
  external_reference?: string;
  installments: number;
  metadata?: Metadata;
  payer: MercadoPagoCreatePaymentBodyPayer;
  payment_method_id: string;
  token?: string;
  transaction_amount: number;
  issuer_id?: string;
}

export interface MercadoPagoCreatePaymentBodyPayer {
  entity_type?: string;
  type?: string;
  identification?: Metadata;
  email: string;
}
