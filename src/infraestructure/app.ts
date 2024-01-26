import express from 'express';
import helmet from 'helmet';
import { routes } from './adapters/routes';
// import { routes } from './adapters/index.routes';
// import { authWithJWT } from './middlewares/auth.middleware';


const app = express();
app.use(helmet());
app.use(express.json());
app.get('/health', async (req, res, next) => {
    res.status(200).json({
        status: 'API Up and running',
    });
});
// app.use(authWithJWT)
app.use('/api', routes);

export { app };
