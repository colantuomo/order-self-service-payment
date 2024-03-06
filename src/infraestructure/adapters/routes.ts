import { Router } from 'express';
import { createNewPaymentUseCase, getPaymentByIdUseCase, updatePaymentByExternalIdUseCase } from '../../domain/use-cases';
import { ICreateNewPaymentCommand } from '../../application/commands/create-new-payment.command';

const routes = Router();

routes.get('/:id', async (request, res) => {
    const { status, response } = await getPaymentByIdUseCase({ id: request.params.id });
    return res.status(status).json(response);
});

routes.post('/', async (request, res) => {
    const body: ICreateNewPaymentCommand = {
        "orderId": request.body.orderId,
        "amount": request.body.amount,
        "installments": request.body.installments,
        "payerEmail": request.body.payerEmail,
        "paymentMethodId": request.body.paymentMethodId,
    };
    const { status, response } = await createNewPaymentUseCase(body);
    return res.status(status).json(response);
});

routes.post('/webhook/mercadopago', async (request, res) => {
    const { status, response } = await updatePaymentByExternalIdUseCase({ id: request.body.data.id });
    return res.status(status).json(response);
});


export { routes };