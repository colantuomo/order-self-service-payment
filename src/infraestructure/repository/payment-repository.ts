import { PrismaClient } from "@prisma/client";
import { PaymentStatus } from "../../domain/interfaces";

const prisma = new PrismaClient();

function getPaymentByIdUseCase(id: string) {
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

async function updatePaymentByExternalIdUseCase(externalPaymentId: string, status: PaymentStatus) {
    const response = await prisma.payment.findFirstOrThrow({
        where: {
            externalPaymentId: externalPaymentId,
        }
    });
    return prisma.payment.update({
        where: { id: response?.id },
        data: {
            status: status
        }
    })
}

export const repository = { getPaymentByIdUseCase, createPayment, updatePaymentByExternalIdUseCase };