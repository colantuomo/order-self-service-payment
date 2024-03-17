import { ICreateNewPaymentCommand } from "../../application/commands/create-new-payment.command";
import { NewOrderEvent, PaymentEvent, Queues } from "../../application/queues";
import { createNewPaymentUseCase } from "../../domain/use-cases";
import { AmpqQueueService } from "../services/ampq";

export async function listenAllQueues() {
    await AmpqQueueService.listen(Queues.CREATE_ORDER, OnNewOrderReceived);
}

async function OnNewOrderReceived(message: NewOrderEvent) {
    if (message === undefined && !message) {
        return;
    }
    const param: ICreateNewPaymentCommand = {
        id: message.id,
        amount: message.total_order,
        payerEmail: message.customer.email,
    };
    await createNewPaymentUseCase(param);
}

export async function SendPaymentStatusChanged(message: PaymentEvent) {
    const response = {
        id: message.orderId,
        paymentId: message.id,
        status: message.status,
    };
    await AmpqQueueService.sendToExchange(Queues.PAYMENT_UPDATE, JSON.stringify(response));
}