import { useAppDispatch } from "../hooks";
import useBrokerConnectionStatusSelector from "../selectors/useBrokerConnectionStatusSelector";
import { setBrokerConnectionStatus as setBrokerConnectionStatusFromReducer } from "../slices/commandsSlice";
import useAddConsoleMessage from "./useAddConsoleMessage";

export default function useSetBrokerConnectionStatus() {
  const dispatch = useAppDispatch();

  const currentStatus = useBrokerConnectionStatusSelector();
  const { addMQTTConnectionUpdateMessage } = useAddConsoleMessage();

  async function setBrokerConnectionStatus(status: string) {
    if (status !== currentStatus) {
      addMQTTConnectionUpdateMessage(status);
    }
    dispatch(setBrokerConnectionStatusFromReducer(status));
  }

  return { setBrokerConnectionStatus };
}