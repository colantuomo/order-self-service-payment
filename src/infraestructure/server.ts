import * as dotenv from 'dotenv';
import { app, connectToAmpq } from './app';

dotenv.config();

const port = process.env.PORT;

async function startServer() {
    await connectToAmpq();
    app.listen(port, () => {
        console.log(`Application is running on port ${port}`);
    });
}

startServer().catch(console.error);