export interface WsEventMQTTConnectionUpdate {
  type: "mqtt_connection_update",
  status: string,
}

export interface WsEventCoordinatorsMapUpdate {
  type: "coordinators_map_update",
  data: Record<number, number[]>,
}