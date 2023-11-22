import { Box, styled } from "@mui/material";

export const Console = () => {
  const text = [
    "Hello world",
    "This is a test",
    // "Hello world",
    // "This is a test",
    // "Hello world",
    // "This is a test",
    // "Hello world",
    // "This is a test",
    // "Hello world",
    // "This is a test",
    // "Hello world",
    // "This is a test",
    // "Hello world",
    // "This is a test",
    // "Hello world",
    // "This is a test",
    // "Hello world",
    // "This is a test",
    // "Hello world",
    // "This is a test",
  ];

  return (
    <ConsoleContainer>
      {text.map((line, index) => (
        <Box key={index}>{line}</Box>
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