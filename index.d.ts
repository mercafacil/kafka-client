import { KafkaMessage, Kafka, Admin } from 'kafkajs';
import { GraphQLSchema, ExecutionResult } from 'graphql';

interface IGenericObject {
    [key: string]: any;
}

interface IKafkaHandler {
    run(topic: string, payload: KafkaMessage): Promise<ExecutionResult>;
}

export declare class KafkaClient {
    kafka: Kafka;
    handler: IKafkaHandler;
    constructor(clientId: string, brokers: Array<string>);
    send(topic: string, messages: Array<KafkaMessage>): Promise<void>;
    getAdmin(): Promise<Admin>;
    startConsumer(topics: Array<string>, handler: IKafkaHandler, groupId?: string, fromBeginning?: boolean): Promise<void>;
}