import useTokenSelector from "../redux/selectors/useTokenSelector";
import useWebsocket from "./useWebsocket";


export const WebsocketComponent = () => {
  const token = useTokenSelector();

  if (token === null) {
    return null;
  }

  return <ActualWebsocket token={token} />;
};

const ActualWebsocket = ({ token }: {token: string}) => {
  const { connectionStatus } = useWebsocket(token);
  console.debug("WS: connection is", connectionStatus);

  return null;
};