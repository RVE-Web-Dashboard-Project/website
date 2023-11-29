import typia from "typia";
import { WsEventMQTTConnectionUpdate } from "../../../ws/wsEvents";
export const isWsEventMQTTConnectionUpdate = (input: any): input is WsEventMQTTConnectionUpdate => {
    const $io0 = (input: any): boolean => "mqtt_connection_update" === input.type && "string" === typeof input.status;
    return "object" === typeof input && null !== input && $io0(input);
};
