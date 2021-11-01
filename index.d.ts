import { KafkaMessage, Kafka, ITopicPartitionConfig } from 'kafkajs';
import { GraphQLSchema, ExecutionResult } from 'graphql';

interface IGenericObject {
    [key: string]: any;
}

interface IKafkaHandler {
    run(topic: string, payload: KafkaMessage): Promise<ExecutionResult>;
}

interface CreatePartitionsOptions {
    validateOnly?: boolean
    timeout?: number
    topicPartitions: ITopicPartitionConfig[]
}

export declare class KafkaClient {
    kafka: Kafka;
    handler: IKafkaHandler;
    constructor(clientId: string, brokers: Array<string>);
    send(topic: string, messages: Array<KafkaMessage>): Promise<void>;
    startConsumer(topics: Array<string>, handler: IKafkaHandler, groupId?: string, fromBeginning?: boolean): Promise<void>;
    createPartitions(ParticionConfig: CreatePartitionsOptions): Promise<void>;

}