import { PaymentStatus } from "@prisma/client";
import { repository } from "../../infraestructure/repository/payment-repository";
import { mercadoPagoService } from "../../infraestructure/services/mercado-livre";
import { IUpdatePaymentByExternalIdCommand } from "../../application/commands/update-payment-by-external-id.command";
import { SendPaymentStatusChanged } from "../../infraestructure/adapters/events";

export async function updatePaymentByExternalIdUseCase({ id, newStatus }: IUpdatePaymentByExternalIdCommand) {
    try {
        const { status } = await mercadoPagoService.read(parseInt(id));
        let paymentStatus: PaymentStatus;
        switch (status) {
            case 'approved':
                paymentStatus = PaymentStatus.PAID;
                break;
            case 'rejected':
                paymentStatus = PaymentStatus.CANCELED;
                break;
            default:
                paymentStatus = PaymentStatus.PENDING;

        }
        const response = await repository.updatePaymentByExternalIdUseCase(id, paymentStatus)
        SendPaymentStatusChanged({ id: response.id, orderId: response.orderId, status: newStatus ?? response.status });
        return { status: 200, response };
    } catch (error: any) {
        return { status: 500, response: error };
    }
}