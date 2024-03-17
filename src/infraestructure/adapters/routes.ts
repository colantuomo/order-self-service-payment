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
        id: request.body.id,
        amount: request.body.total_order,
        payerEmail: request.body.customer.email
    };
    const { status, response } = await createNewPaymentUseCase(body);
    return res.status(status).json(response);
});

routes.post('/webhook/mercadopago', async (request, res) => {
    const { status, response } = await updatePaymentByExternalIdUseCase({ id: request.body.id, newStatus: request.body.newStatus });
    return res.status(status).json(response);
});


export { routes };