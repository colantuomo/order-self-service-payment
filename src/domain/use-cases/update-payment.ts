import { PaymentStatus } from "@prisma/client";
import { repository } from "../../infraestructure/repository/payment-repository";
import { mercadoPagoService } from "../../infraestructure/services/mercado-livre";
import { IUpdatePaymentByExternalIdCommand } from "../../application/commands/update-payment-by-external-id.command";

export async function updatePaymentByExternalId({ id }: IUpdatePaymentByExternalIdCommand) {
    try {
        const { status } = await mercadoPagoService.read(parseInt(id));
        let paymentStatus = "PENDING";
        switch (status) {
            case 'approved':
                paymentStatus = "PAID";
                break;
            case 'rejected':
                paymentStatus = "CANCELED";
                break;
        }
        const response = await repository.updatePaymentByExternalId(id, paymentStatus as PaymentStatus)
        return { status: 200, response };
    } catch (error: any) {
        return { status: 500, response: error };
    }
}