import { Box, styled } from "@mui/material";

import useConsoleMessagesSelector from "../../../repository/redux/selectors/useConsoleMessagesSelector";
import { ConsoleMessageRow } from "./ConsoleMessageRow";

export const Console = () => {
  const messages = useConsoleMessagesSelector();

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
  maxHeight: "50vh",
  overflowY: "auto",
  margin: "0 5%",
  border: "1px solid",
  borderRadius: 3,
  borderColor: theme.palette.grey[800],
  padding: `${theme.spacing(1)} ${theme.spacing(2)} ${theme.spacing(3)}`,

  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
  },
}));