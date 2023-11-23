import { useState } from "react";

import useAddConsoleMessage from "../redux/dispatchs/useAddConsoleMessage";
import useTokenSelector from "../redux/selectors/useTokenSelector";

export interface SendCommandParams {
  commandId: number;
  coordinatorIds: number[];
  nodeIds?: number[];
  parameters?: number[];
}

export function useSendCommand() {
  const [errorCode, setErrorCode] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const token = useTokenSelector();
  const { addSendCommandMessage } = useAddConsoleMessage();

  async function sendCommand(params: SendCommandParams) {
    setLoading(true);
    setErrorCode(null);
    setSuccess(false);

    if (token === null) {
      setErrorCode(401);
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        import.meta.env.VITE_APP_API_URL + "/commands",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(params),
        },
      );
      if (response.status === 200 || response.status === 202) {
        setSuccess(true);
        addSendCommandMessage(params);
      } else {
        setErrorCode(response.status);
      }
    } catch (err) {
      setErrorCode(503);
      console.error(err);
    } finally {
      setLoading(false);
    }

  }

  return { sendCommand, error: errorCode, loading, success };
}