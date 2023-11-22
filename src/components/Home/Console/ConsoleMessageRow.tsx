import { Stack, styled, Typography } from "@mui/material";
import { useMemo } from "react";

import { ConsoleMessage } from "../../../repository/types/console";

export const ConsoleMessageRow = ({ message }: {message: ConsoleMessage}) => {
  const color = useMemo(() => {
    if (message.type === "out") {
      return "text.secondary";
    } else if (message.type === "error") {
      return "error.main";
    }
    return "secondary";
  }, [message.type]);

  const parsedDate = useMemo(() => new Date(message.date), [message.date]);

  return (
    <Stack useFlexGap direction="row" spacing={1} alignItems="baseline">
      <HourText>
        {parsedDate.toLocaleTimeString()}
      </HourText>
      <SourceText color={color}>
        {message.source + ":"}
      </SourceText>
      <Typography>
        {message.message}
      </Typography>
    </Stack>
  );
};

const HourText = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: 14,
  minWidth: 60,
}));

const SourceText = styled(Typography)({
  fontSize: 14,
  minWidth: 70,
});
