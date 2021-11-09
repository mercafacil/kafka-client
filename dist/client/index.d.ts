import { KafkaConfig, Producer, Admin, ProducerConfig, ConsumerConfig, ConsumerRunConfig, AdminConfig } from 'kafkajs';
import { IKafkaHandler } from '../types';
declare class KafkaClient {
    private static instance;
    private producer;
    private kafka;
    private admin;
    private constructor();
    static getInstance(config: KafkaConfig): KafkaClient;
    startProducer(options?: ProducerConfig): Promise<Producer>;
    stopProducer(): Promise<void>;
    startConsumer(options: ConsumerConfig, runOptions: ConsumerRunConfig, topics: Array<string>, handler: IKafkaHandler, fromBeginning?: boolean): Promise<void>;
    startAdmin(options?: AdminConfig): Promise<Admin>;
    stopAdmin(): Promise<void>;
    disconnect(): Promise<void>;
}
export { KafkaClient };
