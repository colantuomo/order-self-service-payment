import { Given, When, Then } from '@cucumber/cucumber';
import axios from 'axios';

const HOST = 'http://localhost:8081';
const BASE_URL = `${HOST}/api/`;

const makeRequest = async (body) => {
    const {
        data,
    } = await axios.post(`${BASE_URL}/`, { body });
    return data;
};

let body = {
    orderId: '',
    amount: 0,
    installments: 1,
    payerEmail: 'teste@gmail.com',
    paymentMethodId: 'pix'
}

let expectedResponse = {};

Given('I provide a orderId ${orderId} and an amount ${amount}', async (orderId, amount) => {
    body.orderId = orderId;
    body.amount = amount;
});

When('I submit a new payment order', async () => {
    const { response } = await makeRequest(body);
    expectedResponse = response;
});

Then('I I should receive my payment details with status pending', () => {
    return expectedResponse.status;
});