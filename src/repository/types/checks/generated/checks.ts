import { WsEventCoordinatorsMapUpdate, WsEventMQTTConnectionUpdate } from "../../../ws/wsEvents";
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
export const isWsEventCoordinatorsMapUpdate = (input: any): input is WsEventCoordinatorsMapUpdate => {
    const $io0 = (input: any): boolean => "coordinators_map_update" === input.type && ("object" === typeof input.data && null !== input.data && false === Array.isArray(input.data) && $io1(input.data));
    const $io1 = (input: any): boolean => Object.keys(input).every((key: any) => {
        const value = input[key];
        if (undefined === value)
            return true;
        if ("number" === typeof Number(key))
            return Array.isArray(value) && value.every((elem: any) => "number" === typeof elem);
        return true;
    });
    return "object" === typeof input && null !== input && $io0(input);
};
