import { Button } from "@mui/material";
import { useMemo } from "react";

import { useSendCommand } from "../../repository/api/useSendCommand";
import useSelectedNodesSelector from "../../repository/redux/selectors/useSelectedNodesSelector";
import { Command } from "../../repository/types/command";

interface SendCommandButtonProps {
  command: Command | null;
  parameterValues: Record<string, number>;
}

export const SendCommandButton = ({ command, parameterValues }: SendCommandButtonProps) => {
  const selectedNodes = useSelectedNodesSelector();
  const { sendCommand, loading } = useSendCommand();

  const sanitizedParameters: number[] | null = useMemo(() => {
    if (command === null) {
      return null;
    }
    const result: number[] = [];
    for (const parameter of command.parameters) {
      const value = parameterValues[`${command.id}-${parameter.id}`];
      if (value === undefined || value === null) {
        return null;
      }
      result.push(value);
    }
    return result;
  }, [command, parameterValues]);

  if (loading) {
    return <Button variant="contained" color="primary" disabled fullWidth>Loading...</Button>;
  }

  const onClick = () => {
    if (!loading && command !== null && sanitizedParameters !== null) {
      sendCommand({
        commandId: command.id,
        coordinatorIds: Object.keys(selectedNodes).map((id) => Number(id)),
        nodeIds: Object.values(selectedNodes).reduce((acc, val) => [...acc, ...val], [] as number[]),
        parameters: sanitizedParameters.length === 0 ? undefined : sanitizedParameters,
      });
    }
  };

  const isButtonDisabled = command === null || Object.keys(selectedNodes).length === 0 || sanitizedParameters === null;

  return (
    <Button variant="contained" color="primary" disabled={isButtonDisabled} onClick={onClick} fullWidth>
      Send
    </Button>
  );

};