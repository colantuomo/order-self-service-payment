export interface ICreateNewPaymentCommand {
    orderId: string,
    amount: number,
    payerEmail: string,
    paymentMethodId: string,
    installments: number,
    status?: string,
}