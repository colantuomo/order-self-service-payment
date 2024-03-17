import { PaymentStatus } from "../../domain/interfaces";

export enum Queues {
    CREATE_ORDER = 'q-new-order-payment',
    PAYMENT_UPDATE = 'payment-update',
}

export interface PaymentEvent {
    id: string;
    orderId: string;
    status: PaymentStatus;
}

export interface NewOrderEvent {
    id: string;
    customer: Customer;
    dateCreated: string;
    status: string;
    total_order: number;
    payment: null;
    items: Item[];
}

export interface Customer {
    id: string;
    name: string;
    cpf: string;
    date_created: string;
    phone: string;
    email: string;
}

export interface Item {
    product: Product;
    quantity: number;
    item_value: number;
    total_value: number;
}

export interface Product {
}