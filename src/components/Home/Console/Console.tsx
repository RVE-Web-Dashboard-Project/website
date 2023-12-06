import { Box, Stack, styled } from "@mui/material";
import { useState } from "react";

import useConsoleMessagesSelector from "../../../repository/redux/selectors/useConsoleMessagesSelector";
import { ConsoleFilter } from "./ConsoleFilter";
import { ConsoleMessageRow } from "./ConsoleMessageRow";

export const Console = () => {
  const [filterText, setFilterText] = useState<string | null>(null);

  return (
    <Stack useFlexGap spacing={1} width={1}>
      <ConsoleFilter text={filterText} onChange={setFilterText} />
      <MessagesList filterText={filterText} />
    </Stack>
  );
};

const MessagesList = ({ filterText }: {filterText: string | null}) => {
  const messages = useConsoleMessagesSelector().filter((message) => {
    if (filterText === null) {
      return true;
    }
    return message.message.toLowerCase().includes(filterText.toLowerCase());
  });

  return (
    <ConsoleContainer>
      {messages.map((message) => (
        <ConsoleMessageRow key={message.uuid} message={message} />
      ))}
    </ConsoleContainer>
  );
};

const ConsoleContainer = styled(Box)(({ theme }) => ({
  flex: 1,
  minHeight: "min(200px, 50vh)",
  maxHeight: "50vh",
  overflowY: "auto",
  border: "1px solid",
  borderRadius: 3,
  borderColor: theme.palette.grey[800],
  padding: `${theme.spacing(1)} ${theme.spacing(2)} ${theme.spacing(3)}`,

  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
  },
}));