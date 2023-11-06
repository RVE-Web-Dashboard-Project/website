import { Box, FormControl, MenuItem, Select, SelectChangeEvent, Typography } from "@mui/material";
import { ReactNode, useState } from "react";

import { useGetOrFetchCommands } from "../../repository/commands/useGetOrFetchCommands";
import { Command } from "../../repository/types/command";

export const CommandSelection = () => {
  const { commands, error } = useGetOrFetchCommands();
  const [selectedCommand, setSelectedCommand] = useState<Command | null>(null);

  if (error) {
    return <Typography variant="h6" color="error">{error}</Typography>;
  }

  const onSelectChange = (event: SelectChangeEvent<string>, child: ReactNode) => {
    const commandId = event.target.value as string;
    const command = commands.find((cmd) => cmd.id === Number(commandId));
    setSelectedCommand(command ?? null);
  };

  return (
    <Box minWidth="250px">
      <Typography variant="h5" mb={1}>Command</Typography>
      <FormControl fullWidth size="small" color="secondary">
        <Select
          id="command-select"
          value={selectedCommand?.id.toString() ?? ""}
          onChange={onSelectChange}
          disabled={commands.length === 0 || error !== null}
        >
          {commands.map((command) => (
            <MenuItem key={command.id} value={command.id}>{command.name}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );

};