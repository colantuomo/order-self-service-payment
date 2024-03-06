import { describe, test, expect, vi } from 'vitest'
import { mercadoPagoService } from '../../../infraestructure/services/mercado-livre';
import { createNewPaymentUseCase } from '../create-new-payment';

vi.mock('@prisma/client', () => ({
    PrismaClient: vi.fn()
}));

const SUCCESS_DATA = {
    id: '2193892',
    status: 'pending',
}

function spyMercadoPagoCreatePayment() {
    vi.spyOn(mercadoPagoService, 'create').mockResolvedValue(SUCCESS_DATA as any);
}

describe('Create new payment', () => {
    describe('When a new payment was created with success mercado pago request', () => {
        test('should call mercado pago with correct body', () => {
            spyMercadoPagoCreatePayment();
            createNewPaymentUseCase({
                amount: 50, installments: 1, orderId: 'order-id-123"', payerEmail: 'test@gmail.com', paymentMethodId: 'visa'
            });

            const response = {
                transaction_amount: 50,
                description: expect.stringContaining('Gerar pagamento para pedido de valor 50 - pedido: order-id-123'),
                installments: 1,
                payment_method_id: 'visa',
                payer: {
                    email: 'test@gmail.com'
                }
            };

            expect(mercadoPagoService.create).toHaveBeenCalledWith(response);
        });
    });
});