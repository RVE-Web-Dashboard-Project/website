import { Clear, Search } from "@mui/icons-material";
import { IconButton, InputAdornment, TextField, useTheme } from "@mui/material";
import { useState } from "react";

interface ConsoleFilterProps {
  text: string | null;
  onChange: (newText: string | null) => void;
}

export const ConsoleFilter = ({ text, onChange }: ConsoleFilterProps) => {
  const theme = useTheme();
  const [focused, setFocused] = useState(false);

  function onValueChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.value.trim().length === 0) {
      onChange(null);
    } else {
      onChange(event.target.value.trimStart());
    }
  }

  return (
    <TextField
      fullWidth
      size="small"
      color="secondary"
      label="Filter"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Search htmlColor={focused ? theme.palette.secondary.light : "#ddd"} />
          </InputAdornment>
        ),
        endAdornment: (
          <IconButton
            sx={{ visibility: text ? "visible" : "hidden" }}
            onClick={() => onChange(null)}
          >
            <Clear fontSize="small" htmlColor="#aaa" />
          </IconButton>
        ),
      }}
      value={text ?? ""}
      onChange={onValueChange}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    />
  );
};