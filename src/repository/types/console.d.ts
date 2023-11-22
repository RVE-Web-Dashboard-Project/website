export interface ConsoleMessage {
  date: Date;
  type: "out" | "success" | "error";
  author: string;
  message: string;
}