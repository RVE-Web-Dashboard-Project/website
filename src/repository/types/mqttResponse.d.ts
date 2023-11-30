export interface MQTTResponse {
  command: number;
  coord_id: number;
  node_id?: number;
  params?: {
    param1: number;
    param2: 0;
  }
}