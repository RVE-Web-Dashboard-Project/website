import { Box, FormControl, MenuItem, Select, SelectChangeEvent, TextField, Typography } from "@mui/material";
import { ReactNode, useState } from "react";

import { useGetOrFetchCommands } from "../../repository/commands/useGetOrFetchCommands";
import { Command, CommandParameter } from "../../repository/types/command";

export const CommandSelection = () => {
  const { commands, error } = useGetOrFetchCommands();
  const [selectedCommand, setSelectedCommand] = useState<Command | null>(null);
  const [parameters, setParameters] = useState<Record<string, number> | null>(null);

  if (error) {
    return <Typography variant="h6" color="error">{error}</Typography>;
  }

  const onSelectChange = (event: SelectChangeEvent<string>, child: ReactNode) => {
    const commandId = event.target.value as string;
    const command = commands.find((cmd) => cmd.id === Number(commandId));
    setSelectedCommand(command ?? null);
  };

  const onParameterValueChange = (parameterId: number, value: number) => {
    const absoluteParamId = `${selectedCommand?.id}-${parameterId}`;
    setParameters((prev) => ({ ...prev, [absoluteParamId]: value }));
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

        {selectedCommand?.parameters.map((parameter) => (
          <ParameterTextField
            key={`${selectedCommand?.id}-${parameter.id}`}
            parameter={parameter}
            value={parameters?.[`${selectedCommand?.id}-${parameter.id}`]}
            onChange={onParameterValueChange}
          />
        ))
        }

      </FormControl>
    </Box>
  );
};


interface ParameterTextFieldProps {
  parameter: CommandParameter;
  value?: number;
  onChange: (parameterId: number, value: number) => void;
}

const ParameterTextField = ({ parameter, value, onChange }: ParameterTextFieldProps) => {
  const [currentTextValue, setCurrentTextValue] = useState((value ?? parameter.default).toString());

  const onValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentTextValue(e.target.value);
    if (checkValue(e.target.value)) {
      console.log("changing to", Number(e.target.value));
      onChange(parameter.id, Number(e.target.value));
    }
  };

  function checkValue(inputValue: string) {
    if (parameter.type === "int") {
      return Number.isInteger(Number(inputValue));
    } else {
      return !Number.isNaN(Number(inputValue));
    }
  }

  return (
    <TextField
      id={`command-parameter-${parameter.id}`}
      inputMode="numeric"
      label={parameter.name}
      value={currentTextValue}
      onChange={onValueChange}
      size="small"
      color="secondary"
      error={!checkValue(currentTextValue)}
      required
    />
  );
};