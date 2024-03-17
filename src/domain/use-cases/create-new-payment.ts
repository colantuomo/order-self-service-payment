import { ICreateNewPaymentCommand } from "../../application/commands/create-new-payment.command";
import { repository } from "../../infraestructure/repository/payment-repository";
import { mercadoPagoService } from "../../infraestructure/services/mercado-livre";

export async function createNewPaymentUseCase({ id, payerEmail, amount }: ICreateNewPaymentCommand) {
    try {
        const serviceResponse = await mercadoPagoService.create({
            transaction_amount: amount,
            description: `Gerar pagamento para pedido de valor ${amount} - pedido: ${id}`,
            installments: 1,
            payment_method_id: 'pix',
            payer: {
                email: payerEmail,
            },
        });
        const response = await repository.createPayment(id, amount, serviceResponse.id.toString());
        return { status: 200, response };
    } catch (error: any) {
        return { status: 500, response: error.response };
    }
}