import { Kafka, KafkaConfig, Producer, ProducerConfig, ConsumerConfig, ConsumerRunConfig } from 'kafkajs'
import { IKafkaHandler } from '../types'

class KafkaClient {
  private static instance: KafkaClient
  private producer: Producer
  private kafka: Kafka

  private constructor(config: KafkaConfig) {
    this.kafka = new Kafka(config)
  }

  static getInstance(config: KafkaConfig) {
    if (!KafkaClient.instance) {
      KafkaClient.instance = new KafkaClient(config)
    }
    return KafkaClient.instance
  }

  async startProducer(options?: ProducerConfig) {
    if (!this.producer) {
      this.producer = this.kafka.producer(options)
    }

    await this.producer.connect()

    return this.producer
  }

  async startConsumer(options: ConsumerConfig, runOptions: ConsumerRunConfig, topics: Array<string>, handler: IKafkaHandler, fromBeginning: boolean = false) {
    const consumer = this.kafka.consumer(options)

    await consumer.connect()

    await Promise.all(topics.map(topic => consumer.subscribe({ topic, fromBeginning })))

    await consumer.run({
      ...runOptions,
      eachMessage: async ({ topic, partition, message }) => {
        const success = await handler.run(topic, message)
        if (success) consumer.commitOffsets([{ topic, partition, offset: message.offset + 1 }])
      }
    })
  }
}

export { KafkaClient }
