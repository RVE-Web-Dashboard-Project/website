import { Box, FormControl, MenuItem, Select, SelectChangeEvent, styled, TextField, Typography } from "@mui/material";
import { ReactNode, useEffect, useState } from "react";

import { useGetOrFetchCommands } from "../../repository/commands/useGetOrFetchCommands";
import { Command, CommandParameter } from "../../repository/types/command";
import { SendCommandButton } from "./SendCommandButton";

export const CommandSelection = () => {
  const { commands, error } = useGetOrFetchCommands();
  const [selectedCommand, setSelectedCommand] = useState<Command | null>(null);
  const [parameters, setParameters] = useState<Record<string, number>>({});

  if (error) {
    return <Typography variant="h6" color="error">{error}</Typography>;
  }

  const onSelectChange = (event: SelectChangeEvent<string>, child: ReactNode) => {
    const commandId = event.target.value as string;
    const command = commands.find((cmd) => cmd.id === Number(commandId));
    setSelectedCommand(command ?? null);
  };

  const onParameterValueChange = (parameterId: number, value: number | null) => {
    const absoluteParamId = `${selectedCommand?.id}-${parameterId}`;
    if (value === null) {
      // reset parameter
      const { [absoluteParamId]: _, ...rest } = parameters ?? {};
      setParameters(rest);
    } else {
      setParameters((prev) => ({ ...prev, [absoluteParamId]: value }));
    }
  };

  return (
    <Box minWidth="250px">
      <Typography variant="h5" mb={2}>Command</Typography>
      <FormControl fullWidth size="small" color="secondary" sx={{ gap: 2 }}>
        <Select
          id="command-select"
          value={selectedCommand?.id.toString() ?? ""}
          onChange={onSelectChange}
          required
          disabled={commands.length === 0 || error !== null}
        >
          {commands.map((command) => (
            <MenuItem key={command.id} value={command.id} sx={{ flexDirection: "column", alignItems: "flex-start" }}>
              <Typography>{command.name}</Typography>
              <MenuItemCaption variant="caption">{command.description}</MenuItemCaption>
            </MenuItem>
          ))}
        </Select>

        {selectedCommand?.parameters.map((parameter) => (
          <ParameterTextField
            key={`${selectedCommand?.id}-${parameter.id}`}
            parameter={parameter}
            value={parameters[`${selectedCommand?.id}-${parameter.id}`]}
            onChange={onParameterValueChange}
          />
        ))}

        <SendCommandButton command={selectedCommand} parameterValues={parameters} />
      </FormControl>
    </Box>
  );
};

const MenuItemCaption = styled(Typography)(({ theme }) => ({
  color: theme.palette.grey[700],
}));


interface ParameterTextFieldProps {
  parameter: CommandParameter;
  value?: number;
  onChange: (parameterId: number, value: number | null) => void;
}

const ParameterTextField = ({ parameter, value, onChange }: ParameterTextFieldProps) => {
  const [currentTextValue, setCurrentTextValue] = useState((value ?? parameter.default).toString());
  const [errorText, setErrorText] = useState<string | null>(null);

  const onValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentTextValue(e.target.value);
    if (checkValue(e.target.value)) {
      onChange(parameter.id, Number(e.target.value));
    } else {
      onChange(parameter.id, null);
    }
  };

  useEffect(() => {
    if (value === undefined && currentTextValue === parameter.default.toString()) {
      onChange(parameter.id, parameter.default);
    }
  }, [onChange, parameter.default, parameter.id, value, currentTextValue]);

  function checkValue(inputValue: string) {
    if (inputValue.trim().length === 0) {
      setErrorText("Value must be a number");
      return false;
    }
    if (parameter.type === "int" && (!Number.isInteger(Number(inputValue)) || inputValue.includes("."))) {
      setErrorText("Value must be an integer");
      return false;
    }
    if (parameter.type === "float" && Number.isNaN(Number(inputValue))) {
      setErrorText("Value must be a number");
      return false;
    }
    if (parameter.minValue !== undefined && Number(inputValue) < parameter.minValue) {
      setErrorText(`Value must be at least ${parameter.minValue}`);
      return false;
    }
    if (parameter.maxValue !== undefined && Number(inputValue) > parameter.maxValue) {
      setErrorText(`Value must be at most ${parameter.maxValue}`);
      return false;
    }
    setErrorText(null);
    return true;
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
      error={errorText !== null}
      helperText={errorText}
      required
    />
  );
};