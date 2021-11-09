import { Kafka, KafkaConfig, Producer, Admin, ProducerConfig, ConsumerConfig, ConsumerRunConfig, AdminConfig } from 'kafkajs'
import { IKafkaHandler } from '../types'

class KafkaClient {
  private static instance: KafkaClient
  private producer: Producer
  private kafka: Kafka
  private admin: Admin

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

  async stopProducer() {
    if (this.producer) {
      await this.producer.disconnect()
    }
  }

  async startConsumer(options: ConsumerConfig, runOptions: ConsumerRunConfig, topics: Array<string>, handler: IKafkaHandler, fromBeginning: boolean = false) {
    const consumer = this.kafka.consumer(options)

    await consumer.connect()

    await Promise.all(topics.map(topic => consumer.subscribe({ topic, fromBeginning })))

    await consumer.run({
      ...runOptions,
      eachMessage: async ({ topic, partition, message }) => {
        const success = await handler.run(topic, message)
        if (success) consumer.commitOffsets([{ topic, partition, offset: `${Number(message.offset) + 1}` }])
      }
    })
  }

  async startAdmin(options?: AdminConfig) {
    if (!this.admin) {
      this.admin = this.kafka.admin(options)
    }

    await this.admin.connect()

    return this.admin
  }

  async stopAdmin() {
    if (this.admin) {
      await this.admin.disconnect()
    }
  }

  async disconnect() {
    if (this.producer) {
      await this.producer.disconnect()
    }
    if (this.admin) {
      await this.admin.disconnect()
    }
  }
}

export { KafkaClient }
