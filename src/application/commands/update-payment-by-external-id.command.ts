import { PaymentStatus } from "../../domain/interfaces";

export interface IUpdatePaymentByExternalIdCommand {
    id: string;
    newStatus?: PaymentStatus;
}