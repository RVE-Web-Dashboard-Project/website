export interface ConsoleMessage {
  uuid: string;
  date: Date;
  type: "out" | "success" | "error";
  source: string;
  message: string;
}