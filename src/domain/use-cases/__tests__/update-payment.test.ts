import { describe, test, expect, vi } from 'vitest'
import { mercadoPagoService } from '../../../infraestructure/services/mercado-livre';
import { updatePaymentByExternalIdUseCase } from '../update-payment';
import { repository } from '../../../infraestructure/repository/payment-repository';

vi.mock('@prisma/client', () => ({
    PrismaClient: vi.fn()
}));

function spyMercadoPagoReadPayment() {
    vi.spyOn(mercadoPagoService, 'read').mockResolvedValue({
        id: '2193892',
        status: 'pending',
    });
}

function spySuccesfullRequest() {
    vi.spyOn(repository, 'updatePaymentByExternalIdUseCase').mockResolvedValue({
        id: 'id-123',
        createdAt: new Date(),
        orderId: 'order-id-123',
        amount: 50,
        status: "PENDING",
        externalPaymentId: 'external-payment-id-123',
        updatedAt: new Date(),
    } as any);
}

describe('Update payment', () => {
    describe('When the mercado pago webhook URL was called', () => {
        test('should update payment based on mercado pago payment status', async () => {
            spyMercadoPagoReadPayment();
            spySuccesfullRequest();
            await updatePaymentByExternalIdUseCase({ id: '2193892' });

            expect(mercadoPagoService.read).toHaveBeenCalledWith(2193892);
            expect(repository.updatePaymentByExternalIdUseCase).toHaveBeenCalledWith('2193892', 'PENDING');
        });
    });
});
