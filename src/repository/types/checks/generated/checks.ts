import { WsEventMQTTConnectionUpdate } from "../../../ws/wsEvents";
import { MQTTResponse } from "../../mqttResponse";
export const isWsEventMQTTConnectionUpdate = (input: any): input is WsEventMQTTConnectionUpdate => {
    const $io0 = (input: any): boolean => "mqtt_connection_update" === input.type && "string" === typeof input.status;
    return "object" === typeof input && null !== input && $io0(input);
};
export const isMQTTResponse = (input: any): input is MQTTResponse => {
    const $io0 = (input: any): boolean => "number" === typeof input.command && "number" === typeof input.coord_id && (undefined === input.node_id || "number" === typeof input.node_id) && (undefined === input.params || "object" === typeof input.params && null !== input.params && $io1(input.params));
    const $io1 = (input: any): boolean => "number" === typeof input.param1 && 0 === input.param2;
    return "object" === typeof input && null !== input && $io0(input);
};
