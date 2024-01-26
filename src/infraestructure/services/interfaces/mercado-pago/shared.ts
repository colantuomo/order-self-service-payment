export interface AdditionalInfo {
  items: Item[];
  payer: AdditionalInfoPayer;
  shipments: Shipments;
}

export interface Item {
  id: string;
  title: string;
  description: string;
  picture_url: string;
  category_id: string;
  quantity: number;
  unit_price: number;
}

export interface AdditionalInfoPayer {
  registration_date: string;
}

export interface Shipments {
  receiver_address: ReceiverAddress;
}

export interface ReceiverAddress {
  street_name: string;
  street_number: number;
  zip_code: number;
  city_name: string;
  state_name: string;
}

export interface Phone {
  area_code: number;
  number: string;
}

export interface Metadata {
}

export interface Identification {
  number: number;
  type: string;
}

export interface TransactionDetails {
  net_received_amount: number;
  total_paid_amount: number;
  overpaid_amount: number;
  installment_amount: number;
}
