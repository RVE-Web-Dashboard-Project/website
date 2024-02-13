import { Button } from "@mui/material";
import { useState } from "react";

import { useSendCommand } from "../../../repository/api/useSendCommand";

export const PingAllNodesButton = ({ coordinators }: {coordinators: [string, {
  selected: boolean;
  nodes: {
      [key: number]: {
          selected: boolean;
          lastStatus: boolean | null;
      };
  };
}][]}) => {
  const { sendCommand, loading, error } = useSendCommand();
  const [isDisabled, setIsDisabled] = useState(false);

  if (error) {
    console.error(error);
  }

  const onClick = () => {
    if (!loading && !isDisabled) {
      sendCommand({
        commandId: 15,
        coordinatorIds: coordinators.map(([id, _]) => Number(id)),
        nodeIds: coordinators.map(([_, coordinator]) => Object.keys(coordinator.nodes).map(Number)).flat(),
      });
      setIsDisabled(true);
      setTimeout(function() {
        setIsDisabled(false);
      }, 1000 * 15);
    }
  };

  return (
    <Button variant="outlined" disabled={isDisabled || loading} onClick={onClick}>
      Ping All Nodes
    </Button>
  );
};