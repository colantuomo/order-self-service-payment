import express from 'express';
import helmet from 'helmet';
import { routes } from './adapters/routes';


const app = express();
app.use(helmet());
app.use(express.json());
app.get('/health', async (req, res, next) => {
    res.status(200).json({
        status: 'API Up and running',
    });
});
app.use('/api', routes);

export { app };
