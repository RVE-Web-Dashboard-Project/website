import { Box, GlobalStyles, Typography } from "@mui/material";

export default function Home() {
  return (
    <Box>
      <GlobalStyles
        styles={{
          body: { backgroundColor: "lightyellow" },
        }}
      />
      <Typography my={2} variant="h4" noWrap>
      Login
      </Typography>
    </Box>
  );
}