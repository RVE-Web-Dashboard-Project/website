export interface CommandParameter {
  id: number;
  name: string;
  type: "int" | "float";
  default: number;
  minValue?: number;
  maxValue?: number;
}

export interface Command {
  id: number;
  name: string;
  description: string;
  targetType: "coordinator" | "node";
  parameters: CommandParameter[];
  responseType: "int" | "float" | "bool" | "ACK";
}