export interface ConsoleMessage {
  uuid: string;
  date: string;
  type: "out" | "success" | "error";
  source: string;
  message: string;
}