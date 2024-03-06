export enum Queues {
    NEW_ORDER_QUEUE = 'NEW_ORDER_QUEUE',
    PAYMENT_SUCCESS_QUEUE = 'PAYMENT_SUCCESS_QUEUE',
    PAYMENT_FAILED_QUEUE = 'PAYMENT_FAILED_QUEUE'
}

export interface PaymentEvent {
    id: string;
    orderId: string;
}