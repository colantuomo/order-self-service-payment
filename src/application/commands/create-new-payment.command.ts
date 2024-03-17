export interface ICreateNewPaymentCommand {
    id: string;
    payerEmail: string;
    amount: number;
}