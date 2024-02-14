import shortUUID from "short-uuid";

import { SendCommandParams } from "../../api/useSendCommand";
import { ConsoleMessage } from "../../types/console";
import { MQTTResponse } from "../../types/mqttResponse";
import { WsEventMQTTConnectionUpdate } from "../../ws/wsEvents";
import { useAppDispatch } from "../hooks";
import useCommandsSelector from "../selectors/useCommandsSelector";
import useOngoingCommandsSelector from "../selectors/useOngoingCommandsSelector";
import { addMessage } from "../slices/commandsSlice";

type MessageWithOptionalUUID = Omit<ConsoleMessage, "uuid"> & { uuid?: string };

export default function useAddConsoleMessage() {
  const dispatch = useAppDispatch();
  const commands = useCommandsSelector();
  const ongoingCommands = useOngoingCommandsSelector();

  async function addRawConsoleMessage(message: MessageWithOptionalUUID) {
    dispatch(addMessage({
      ...message,
      uuid: message.uuid || shortUUID.generate(),
    }));
  }

  async function addSendCommandMessage(command: SendCommandParams) {
    let destination = "";
    if (!command.nodeIds) {
      if (command.coordinatorIds.length === 1) {
        destination = `coordinator ${command.coordinatorIds[0]}`;
      } else {
        destination = `coordinators ${command.coordinatorIds.join(", ")}`;
      }
    } else if (command.nodeIds.length === 1) {
      destination = `node ${command.nodeIds[0]}`;
    } else {
      destination = `nodes ${command.nodeIds.join(", ")}`;
    }

    const usedCommand = commands.find((c) => c.id === command.commandId);
    const commandName = usedCommand?.name ?? command.commandId.toString();

    let msg = `Sending command "${commandName}" to ${destination}`;

    if (command.parameters) {
      if (usedCommand) {
        msg += ` with parameters "${command.parameters.map((p, i) => {
          const param = usedCommand.parameters[i];
          return `${param.name}: ${p}`;
        }).join(", ")}"`;
      } else {
        msg += ` with parameters "${command.parameters.join(", ")}"`;
      }
    }

    await addRawConsoleMessage({
      date: new Date().toISOString(),
      type: "out",
      source: "Website",
      message: msg,
    });
  }

  async function addMQTTConnectionUpdateMessage(status: WsEventMQTTConnectionUpdate["status"]) {
    await addRawConsoleMessage({
      date: new Date().toISOString(),
      type: status === "disconnected" ? "error" : "out",
      source: "Server",
      message: `MQTT connection status: ${status}`,
    });
  }

  async function addMQTTResponseMessage(data: MQTTResponse) {
    let destination = "";
    if (data.node_id) {
      destination = `node ${data.node_id}`;
    } else {
      destination = `coordinator ${data.coord_id}`;
    }

    let msg = "";
    const sentCommandId = ongoingCommands[data.order_id]?.commandId;
    const usedCommand = commands.find((c) => c.id === sentCommandId);
    const commandName = usedCommand?.name ?? (sentCommandId ?? data.command).toString();
    if (data.command === 10) {
      msg = `Error received from ${destination} for command "${commandName}" (NOACK response)`;
    } else if (data.params) {
      msg = `Response received from ${destination} for command "${commandName}": ${data.params.param1}`;
    } else {
      msg = `Successful response received from ${destination} for command "${commandName}"`;
    }

    await addRawConsoleMessage({
      date: new Date().toISOString(),
      type: data.command === 10 ? "error" : "success",
      source: data.node_id ? `Node ${data.node_id}` : `Coord. ${data.coord_id}`,
      message: msg,
    });
  }

  return {
    addRawConsoleMessage,
    addSendCommandMessage,
    addMQTTConnectionUpdateMessage,
    addMQTTResponseMessage,
  };
}