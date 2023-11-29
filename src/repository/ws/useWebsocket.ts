import { useEffect, useRef } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { is } from "typia";

import useAddConsoleMessage from "../redux/dispatchs/useAddConsoleMessage";
import { WsEventMQTTConnectionUpdate } from "./wsEvents";


export default function useWebsocket(token: string) {
  const didUnmount = useRef(false);
  const socketUrl = import.meta.env.VITE_APP_API_URL.replace("http", "ws");

  const { addMQTTConnectionUpdateMessage } = useAddConsoleMessage();

  useEffect(() => () => {
    didUnmount.current = true;
  }, []);

  const { readyState } = useWebSocket(
    socketUrl,
    {
      protocols: ["Authorization", token],
      onOpen: () => console.log("WS: new connection established"),
      onClose: () => console.log("WS: connection closed"),
      onMessage: onReceive,
      shouldReconnect: (closeEvent) => true,
      reconnectInterval: 3000,
    },
  );

  function onReceive(event: WebSocketEventMap["message"]) {
    const data = JSON.parse(event.data);
    console.debug("Received message", data);

    if (is<WsEventMQTTConnectionUpdate>(data)) {
      addMQTTConnectionUpdateMessage(data.status);
    } else {
      console.warn("Received unknown message", data);
    }
  }

  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];

  return { connectionStatus };
}