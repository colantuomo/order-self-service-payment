import axios from "axios";
import { MercadoPagoCreatePaymentBody } from "./interfaces/mercado-pago";

interface MercadoLivreResponse {
    id: string;
    status: string;
}

function http() {
    return axios.create(
        {
            baseURL: process.env.MERCADO_PAGO_BASE_URL, headers: {
                'Authorization': `Bearer ${process.env.MERCADO_PAGO_ACCESS_TOKEN}`
            }
        }
    );
}

export class MercadoPagoService {

    async read(id: number): Promise<MercadoLivreResponse> {
        const { data } = await http().get(`/v1/payments/${id}`);
        return data;
    }

    async create(body: MercadoPagoCreatePaymentBody): Promise<MercadoLivreResponse> {
        try {
            const { data } = await http().post(`/v1/payments`, {
                ...body
            });
            return data;
        } catch (error) {
            throw (error);
        }
    }

}

export const mercadoPagoService = new MercadoPagoService();