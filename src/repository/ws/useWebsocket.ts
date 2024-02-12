import { useEffect, useRef } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";

import useConditionalNodeUpdateOnMQTTResponse from "../commands/useConditionalNodeUpdateOnMQTTResponse";
import useAddConsoleMessage from "../redux/dispatchs/useAddConsoleMessage";
import useSetBrokerConnectionStatus from "../redux/dispatchs/useSetBrokerConnectionStatus";
import useSetNodesMap from "../redux/dispatchs/useSetNodesMap";
import { isMQTTResponse, isWsEventCoordinatorsMapUpdate, isWsEventMQTTConnectionUpdate } from "../types/checks";


export default function useWebsocket(token: string) {
  const didUnmount = useRef(false);
  const socketUrl = process.env.REACT_APP_API_URL.replace("http", "ws");

  const { setBrokerConnectionStatus } = useSetBrokerConnectionStatus();
  const { setNodesMapFromApi } = useSetNodesMap();
  const { addMQTTResponseMessage } = useAddConsoleMessage();
  const { updateNodePingStatus } = useConditionalNodeUpdateOnMQTTResponse();

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
      setBrokerConnectionStatus(data.status);
      return;
    }
    if (isMQTTResponse(data)) {
      addMQTTResponseMessage(data);
      updateNodePingStatus(data);
      return;
    }
    if (isWsEventCoordinatorsMapUpdate(data)) {
      setNodesMapFromApi(data.data);
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