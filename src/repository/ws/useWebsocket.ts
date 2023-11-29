import { useEffect, useRef } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";

import useAddConsoleMessage from "../redux/dispatchs/useAddConsoleMessage";
import { isWsEventMQTTConnectionUpdate } from "../types/checks";


export default function useWebsocket(token: string) {
  const didUnmount = useRef(false);
  const socketUrl = process.env.REACT_APP_API_URL.replace("http", "ws");

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

    if (isWsEventMQTTConnectionUpdate(data)) {
      addMQTTConnectionUpdateMessage(data.status);
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