import { DeleteOutline } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";

interface DeleteButtonProps {
  onClick: () => void;
  tooltip?: string;
}

export const DeleteButton = ({ onClick, tooltip }: DeleteButtonProps) => (
  <Tooltip title={tooltip}>
    <IconButton size="small" sx={{ "&:hover": { color: "red" } }} onClick={onClick}>
      <DeleteOutline />
    </IconButton>
  </Tooltip>
);