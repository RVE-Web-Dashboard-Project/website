import typia from "typia";
import { WsEventMQTTConnectionUpdate } from "../../../ws/wsEvents";


export const isWsEventMQTTConnectionUpdate = typia.createIs<WsEventMQTTConnectionUpdate>();

