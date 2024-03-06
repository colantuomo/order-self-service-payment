import { ICreateNewPaymentCommand } from "../../application/commands/create-new-payment.command";
import { PaymentEvent, Queues } from "../../application/queues";
import { createNewPaymentUseCase } from "../../domain/use-cases";
import { AmpqQueueService } from "../services/ampq";

export async function listenAllQueues() {
    await AmpqQueueService.listen(Queues.NEW_ORDER_QUEUE, OnNewOrderReceived);
}

async function OnNewOrderReceived(message: string) {
    if (message === undefined && !message) {
        return;
    }

    const order = JSON.parse(message) as ICreateNewPaymentCommand;
    await createNewPaymentUseCase(order);
}

export async function SendSucessPaymentStatus(message: PaymentEvent) {
    await AmpqQueueService.send(Queues.PAYMENT_SUCCESS_QUEUE, JSON.stringify(message));
}

export async function SendFailedPaymentStatus(message: PaymentEvent) {
    await AmpqQueueService.send(Queues.PAYMENT_FAILED_QUEUE, JSON.stringify(message));
}