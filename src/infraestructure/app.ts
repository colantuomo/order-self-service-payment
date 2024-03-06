import express from 'express';
import helmet from 'helmet';
import { routes } from './adapters/routes';
import { AmpqQueueService } from './services/ampq';
import { AMPQ_HOST, AMQP_PASSWD, AMQP_USER } from '../config/local-envs';
import { listenAllQueues } from './adapters/events';


const app = express();
app.use(helmet());
app.use(express.json());
app.get('/health', async (req, res, next) => {
    res.status(200).json({
        status: 'API Up and running',
    });
});
app.use('/api', routes);

async function connectToAmpq() {
    await AmpqQueueService.connect({ host: AMPQ_HOST!, user: AMQP_USER!, password: AMQP_PASSWD! });
    await listenAllQueues();
}

export { app, connectToAmpq };
