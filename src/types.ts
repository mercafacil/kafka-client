import { KafkaMessage, ITopicPartitionConfig } from 'kafkajs'

interface IGenericObject {
  [key: string]: any
}

interface IKafkaHandler {
  run(topic: string, payload: KafkaMessage): Promise<Boolean>
}

interface CreatePartitionsOptions {
  validateOnly?: boolean
  timeout?: number
  topicPartitions: ITopicPartitionConfig[]
}

export { IGenericObject, IKafkaHandler, CreatePartitionsOptions }
