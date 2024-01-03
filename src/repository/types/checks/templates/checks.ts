import typia from "typia";

import { WsEventCoordinatorsMapUpdate, WsEventMQTTConnectionUpdate } from "../../../ws/wsEvents";
import { MQTTResponse } from "../../mqttResponse";


export const isWsEventMQTTConnectionUpdate = typia.createIs<WsEventMQTTConnectionUpdate>();

export const isMQTTResponse = typia.createIs<MQTTResponse>();

export const isWsEventCoordinatorsMapUpdate = typia.createIs<WsEventCoordinatorsMapUpdate>();

export const isCoordinatorsMapObject = typia.createIs<{[key: number]: number[]}>();