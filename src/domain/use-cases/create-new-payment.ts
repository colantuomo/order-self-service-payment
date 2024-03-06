import { ICreateNewPaymentCommand } from "../../application/commands/create-new-payment.command";
import { repository } from "../../infraestructure/repository/payment-repository";
import { mercadoPagoService } from "../../infraestructure/services/mercado-livre";

export async function createNewPaymentUseCase({ orderId, amount, payerEmail, paymentMethodId, installments }: ICreateNewPaymentCommand) {
    try {
        const serviceResponse = await mercadoPagoService.create({
            transaction_amount: amount,
            description: `Gerar pagamento para pedido de valor ${amount} - pedido: ${orderId}`,
            installments: installments,
            payment_method_id: paymentMethodId,
            payer: {
                email: payerEmail,
            },
        });
        const response = await repository.createPayment(orderId, amount, serviceResponse.id.toString());
        return { status: 200, response };
    } catch (error: any) {
        return { status: 500, response: error.response };
    }
}