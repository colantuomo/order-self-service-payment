import { repository } from "../../infraestructure/repository/payment-repository";
import { IGetPaymentByIdCommand } from "../commands/get-payment-by-id.command";

export async function getPaymentById({ id }: IGetPaymentByIdCommand) {
    try {
        const response = await repository.getPaymentById(id);
        return { status: 200, response };
    } catch (error) {
        return { status: 500, response: error };
    }
}