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
    async stopProducer() {
        if (this.producer) {
            await this.producer.disconnect();
        }
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
                    consumer.commitOffsets([{ topic, partition, offset: `${Number(message.offset) + 1}` }]);
            }
        });
    }
    async startAdmin(options) {
        if (!this.admin) {
            this.admin = this.kafka.admin(options);
        }
        await this.admin.connect();
        return this.admin;
    }
    async stopAdmin() {
        if (this.admin) {
            await this.admin.disconnect();
        }
    }
    async disconnect() {
        if (this.producer) {
            await this.producer.disconnect();
        }
        if (this.admin) {
            await this.admin.disconnect();
        }
    }
}
exports.KafkaClient = KafkaClient;
