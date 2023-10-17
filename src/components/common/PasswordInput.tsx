import { Visibility, VisibilityOff } from "@mui/icons-material";
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, SxProps, Theme } from "@mui/material";
import { useState } from "react";

interface PasswordInputProps {
  id: string;
  label: string;
  value?: Parameters<(typeof OutlinedInput)>[0]["value"];
  onInput?: Parameters<(typeof OutlinedInput)>[0]["onInput"];
  disabled?: boolean;
  required?: boolean;
  controlSx?: SxProps<Theme>;
}

export default function PasswordInput({ id, label, value, onInput, disabled, required, controlSx }: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <FormControl sx={controlSx} variant="outlined">
      <InputLabel htmlFor={id}>{label}</InputLabel>

      <OutlinedInput
        id={id}
        type={showPassword ? "text" : "password"}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        label={label}
        required={required}
        value={value}
        onInput={onInput}
        disabled={disabled}
      />
    </FormControl>
  );
}