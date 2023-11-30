import typia from "typia";

import { WsEventMQTTConnectionUpdate } from "../../../ws/wsEvents";
import { MQTTResponse } from "../../mqttResponse";


export const isWsEventMQTTConnectionUpdate = typia.createIs<WsEventMQTTConnectionUpdate>();

export const isMQTTResponse = typia.createIs<MQTTResponse>();

