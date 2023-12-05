import { Check, ErrorOutline } from "@mui/icons-material";
import { Button, CircularProgress, Stack, styled, Typography } from "@mui/material";
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
  const { sendCommand, loading, error, success } = useSendCommand();

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

  const isNodeSelectionValid: boolean = useMemo(() => {
    if (command === null) {
      return false;
    }
    if (command.targetType === "node") {
      return Object.keys(selectedNodes).length > 0;
    }
    return true;
  }, [command, selectedNodes]);


  if (loading) {
    return <Button variant="contained" color="primary" disabled fullWidth>Loading...</Button>;
  }

  const onClick = () => {
    if (!loading && command !== null && sanitizedParameters !== null) {
      const nodeIds = command.targetType === "node"
        ? Object.values(selectedNodes).reduce((acc, val) => [...acc, ...val], [] as number[])
        : undefined;

      sendCommand({
        commandId: command.id,
        coordinatorIds: Object.keys(selectedNodes).map((id) => Number(id)),
        nodeIds: nodeIds,
        parameters: sanitizedParameters.length === 0 ? undefined : sanitizedParameters,
      });
    }
  };

  const isButtonDisabled = command === null || !isNodeSelectionValid || sanitizedParameters === null;

  return (
    <Stack useFlexGap spacing={0.5}>
      <Button variant="contained" color="primary" disabled={isButtonDisabled} onClick={onClick} fullWidth>
        Send
      </Button>
      <ButtonCaption loading={loading} error={error} success={success} />
    </Stack>
  );
};

const ButtonCaption = ({ loading, error, success }: Omit<ReturnType<typeof useSendCommand>, "sendCommand">) => {
  const iconStyle = { fontSize: "small", mr: 0.5 };
  if (loading) {
    return <AlignedTypo variant="caption" color="GrayText"><CircularProgress size={20} sx={{ ...iconStyle, color: "gray" }} />We're sending your command...</AlignedTypo>;
  }
  if (error) {
    return <AlignedTypo variant="caption" color="error"><ErrorOutline sx={iconStyle} />Oops, something went wrong while sending the command</AlignedTypo>;
  }
  if (success) {
    return <AlignedTypo variant="caption" color="green"><Check sx={iconStyle} /> Command sent successfully!</AlignedTypo>;
  }
  return null;
};

const AlignedTypo = styled(Typography)(() => ({
  display: "flex",
  alignItems: "center",
}));