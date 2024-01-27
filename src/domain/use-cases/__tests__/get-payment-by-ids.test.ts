import { describe, test, expect, vi } from 'vitest'
import { repository } from '../../../infraestructure/repository/payment-repository';
import { getPaymentById } from '../get-payment-by-id';

vi.mock('@prisma/client', () => ({
    PrismaClient: vi.fn()
}));

const SUCCESS_DATA = {
    id: 'id-123',
    createdAt: new Date(),
    orderId: 'order-id-123',
    amount: 50,
    status: "PENDING",
    externalPaymentId: 'external-payment-id-123',
    updatedAt: new Date(),
}

function spySuccesfullRequest() {
    vi.spyOn(repository, 'getPaymentById').mockResolvedValue(SUCCESS_DATA as any);
}

function spyFailureRequest() {
    vi.spyOn(repository, 'getPaymentById').mockRejectedValue({});
}

describe('Get Payment By Ids', () => {
    describe('when a successfull request was made', () => {
        test('should retrieve payment data', async () => {
            spySuccesfullRequest();
            const response = await getPaymentById({ id: 'id-123' });
            expect(response).toStrictEqual({ status: 200, response: SUCCESS_DATA });
        });
    });

    describe('when a failure request was made', () => {
        test('should retrieve failure data', async () => {
            spyFailureRequest();
            const response = await getPaymentById({ id: 'id-123' });
            expect(response).toStrictEqual({ status: 500, response: {} });
        });
    });
});