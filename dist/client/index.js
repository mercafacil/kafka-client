"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KafkaClient = void 0;
const kafkajs_1 = require("kafkajs");
class KafkaClient {
    constructor(config) {
        this.kafka = new kafkajs_1.Kafka(config);
    }
    static getInstance(config) {
        if (!KafkaClient.instance) {
            KafkaClient.instance = new KafkaClient(config);
        }
        return KafkaClient.instance;
    }
    async startProducer(options) {
        if (!this.producer) {
            this.producer = this.kafka.producer(options);
        }
        await this.producer.connect();
        return this.producer;
    }
    async startConsumer(options, runOptions, topics, handler, fromBeginning = false) {
        const consumer = this.kafka.consumer(options);
        await consumer.connect();
        await Promise.all(topics.map(topic => consumer.subscribe({ topic, fromBeginning })));
        await consumer.run({
            ...runOptions,
            eachMessage: async ({ topic, partition, message }) => {
                const success = await handler.run(topic, message);
                if (success)
                    consumer.commitOffsets([{ topic, partition, offset: message.offset + 1 }]);
            }
        });
    }
}
exports.KafkaClient = KafkaClient;
