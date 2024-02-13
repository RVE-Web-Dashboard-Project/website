import { useState } from "react";

import useAddConsoleMessage from "../redux/dispatchs/useAddConsoleMessage";
import useRegisterOngoingCommand from "../redux/dispatchs/useRegisterOngoingCommand";
import useSetNodePingStatus from "../redux/dispatchs/useSetNodePingStatus";
import useCoordinatorSelector from "../redux/selectors/useCoordinatorsSelector";
import useTokenSelector from "../redux/selectors/useTokenSelector";

export interface SendCommandParams {
  commandId: number;
  coordinatorIds: number[];
  nodeIds?: number[];
  parameters?: number[];
}

interface ApiResponse {
  orderId: number;
}

export function useSendCommand() {
  const [errorCode, setErrorCode] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const token = useTokenSelector();
  const { addSendCommandMessage } = useAddConsoleMessage();
  const { registerOngoingCommand } = useRegisterOngoingCommand();
  const { resetNodesPingStatus } = useResetNodesPingStatus();

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
        process.env.REACT_APP_API_URL + "/commands",
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
        const data = await response.json() as ApiResponse;
        registerOngoingCommand({ orderId: data.orderId, command: params });
        if (params.commandId === 15) {
          resetNodesPingStatus(params);
        }
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

function useResetNodesPingStatus() {
  const coordinators = useCoordinatorSelector();
  const { setNodePingStatus } = useSetNodePingStatus();

  async function resetNodesPingStatus(params: SendCommandParams) {
    if (params.commandId !== 15 || !params.nodeIds || coordinators === null) return;
    for (const nodeId of params.nodeIds) {
      const coordinatorId = Object.entries(coordinators).find(([cId, cObject]) => cObject.nodes[nodeId] !== undefined)?.[0];
      if (coordinatorId) {
        setNodePingStatus({ coordinatorId: parseInt(coordinatorId), nodeId, status: null });
      }
    }
  }

  return { resetNodesPingStatus };
}
