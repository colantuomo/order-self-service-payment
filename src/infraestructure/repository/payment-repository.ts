import { PaymentStatus, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function getPaymentById(id: string) {
    return prisma.payment.findUniqueOrThrow({ where: { id } });
}

function createPayment(orderId: string, amount: number, externalPaymentId: string) {
    return prisma.payment.create({
        data: {
            orderId,
            amount,
            status: 'PENDING',
            externalPaymentId: externalPaymentId
        }
    });
}

async function updatePaymentByExternalId(externalPaymentId: string, status: PaymentStatus) {
    const response = await prisma.payment.findFirstOrThrow({
        where: {
            externalPaymentId: externalPaymentId.toString(),
        }
    });
    return prisma.payment.update({
        where: { id: response?.id },
        data: {
            status: status
        }
    })
}

export const repository = { getPaymentById, createPayment, updatePaymentByExternalId };