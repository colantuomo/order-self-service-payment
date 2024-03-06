import amqplib from 'amqplib';
import { ConnectQueueOptions, QueueService } from './interfaces/ampq';

class AmqpService implements QueueService {
    private conn: amqplib.Connection | undefined;

    constructor() {
        this.conn = undefined;
    }

    async connect(options: ConnectQueueOptions): Promise<void> {
        const { user, password, host } = options;

        this.conn = await amqplib.connect(`amqps://${user}:${password}@${host}/${user}`);
    };

    async listen(queue: string, callback: Function): Promise<void> {
        const channel = await this.conn!.createChannel();

        await channel.assertQueue(queue);

        channel.consume(queue, async (msg) => {
            if (!msg) return;

            await callback(JSON.parse(msg.content.toString()));

            channel.ack(msg);
        });
    };

    async send(queue: string, content: string): Promise<void> {
        const channel = await this.conn!.createChannel();

        channel.sendToQueue(queue, Buffer.from(content));
    };
}

export const AmpqQueueService = new AmqpService();