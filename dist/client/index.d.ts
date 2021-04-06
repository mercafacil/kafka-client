import { KafkaConfig, Producer, ProducerConfig, ConsumerConfig, ConsumerRunConfig } from 'kafkajs';
import { IKafkaHandler } from '../types';
declare class KafkaClient {
    private static instance;
    private producer;
    private kafka;
    private constructor();
    static getInstance(config: KafkaConfig): KafkaClient;
    startProducer(options?: ProducerConfig): Promise<Producer>;
    startConsumer(options: ConsumerConfig, runOptions: ConsumerRunConfig, topics: Array<string>, handler: IKafkaHandler, fromBeginning?: boolean): Promise<void>;
}
export { KafkaClient };
