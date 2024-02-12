import useSetNodePingStatus from "../redux/dispatchs/useSetNodePingStatus";
import useOngoingCommandsSelector from "../redux/selectors/useOngoingCommandsSelector";
import { MQTTResponse } from "../types/mqttResponse";

export default function useConditionalNodeUpdateOnMQTTResponse() {
  const { setNodePingStatus } = useSetNodePingStatus();
  const ongoingCommands = useOngoingCommandsSelector();

  function updateNodePingStatus(mqttResponse: MQTTResponse) {
    if (mqttResponse.command === 10 && mqttResponse.node_id) {
      // NOACK response
      const sentCommandId = ongoingCommands[mqttResponse.order_id]?.commandId;
      if (sentCommandId === 15) { // originate from a ping command
        setNodePingStatus({
          coordinatorId: mqttResponse.coord_id,
          nodeId: mqttResponse.node_id,
          status: false,
        });
      }
    } else if (mqttResponse.command === 15 && mqttResponse.node_id) {
      // PING response
      setNodePingStatus({
        coordinatorId: mqttResponse.coord_id,
        nodeId: mqttResponse.node_id,
        status: true,
      });
    }
  }

  return { updateNodePingStatus };
}