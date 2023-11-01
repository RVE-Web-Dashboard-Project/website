import { Stack, styled } from "@mui/material";

export const SelectionContainer = styled(Stack)(({ theme }) => ({
  flex: 1,
  border: "1px solid",
  borderRadius: 35,
  borderColor: theme.palette.grey[500],
  padding: theme.spacing(2.5),
}));