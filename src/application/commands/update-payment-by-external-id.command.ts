import { PaymentStatus } from "@prisma/client";

export interface IUpdatePaymentByExternalIdCommand {
    id: string;
    newStatus?: PaymentStatus;
}