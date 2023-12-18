import { DeleteOutline } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import { Fragment, useState } from "react";

import { ConfirmationDialog } from "../common/ConfirmationDialog";

interface DeleteButtonProps {
  onClick: () => void;
  tooltip?: string;
}

export const DeleteButton = ({ onClick, tooltip }: DeleteButtonProps) => {
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

  function handleConfirm() {
    setIsConfirmationOpen(false);
    onClick();
  }

  return (
    <Fragment>
      <Tooltip title={tooltip}>
        <IconButton size="small" sx={{ "&:hover": { color: "red" } }} onClick={() => setIsConfirmationOpen(true)}>
          <DeleteOutline />
        </IconButton>
      </Tooltip>
      <ConfirmationDialog
        title="Delete user"
        message="Are you sure you want to delete this user?"
        open={isConfirmationOpen}
        onConfirm={handleConfirm}
        onCancel={() => setIsConfirmationOpen(false)}
      />
    </Fragment>
  );
};