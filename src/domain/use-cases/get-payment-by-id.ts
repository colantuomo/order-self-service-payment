import { IGetPaymentByIdCommand } from "../../application/commands/get-payment-by-id.command";
import { repository } from "../../infraestructure/repository/payment-repository";

export async function getPaymentByIdUseCase({ id }: IGetPaymentByIdCommand) {
    try {
        const response = await repository.getPaymentByIdUseCase(id);
        return { status: 200, response };
    } catch (error) {
        return { status: 500, response: error };
    }
}