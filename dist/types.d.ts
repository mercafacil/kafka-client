import { KafkaMessage } from 'kafkajs';
interface IGenericObject {
    [key: string]: any;
}
interface IKafkaHandler {
    run(topic: string, payload: KafkaMessage): Promise<Boolean>;
}
export { IGenericObject, IKafkaHandler };
