import { Checkbox, FormControlLabel } from "@mui/material";

interface CustomCheckboxProps {
  id: string;
  label: string;
  checked: boolean;
  onChange: (id: string, checked: boolean) => void;
}

export const CustomCheckbox = ({ id, label, checked, onChange }: CustomCheckboxProps) => {
  const onCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>, isChecked: boolean) => {
    onChange(event.target.id, isChecked);
  };

  return <FormControlLabel control={<Checkbox id={id} checked={checked} color="secondary" onChange={onCheckboxChange} />} label={label} />;
};