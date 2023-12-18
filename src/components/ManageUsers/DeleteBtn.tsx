import { DeleteOutline } from "@mui/icons-material";
import { CircularProgress, IconButton, Tooltip } from "@mui/material";
import { Fragment, useState } from "react";

import { ConfirmationDialog } from "../common/ConfirmationDialog";

interface DeleteButtonProps {
  onClick: () => void;
  loading?: boolean;
  tooltip?: string;
  confirmTitle?: string;
  confirmMessage?: string;
}

export const DeleteButton = ({ onClick, loading, tooltip, confirmTitle, confirmMessage }: DeleteButtonProps) => {
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const shouldShowConfirmation = !!confirmTitle && !!confirmMessage;

  function handleButtonClick() {
    if (shouldShowConfirmation) {
      setIsConfirmationOpen(true);
    } else {
      onClick();
    }
  }

  function handleConfirm() {
    setIsConfirmationOpen(false);
    onClick();
  }

  return (
    <Fragment>
      <Tooltip title={tooltip}>
        <IconButton size="small" sx={{ "&:hover": { color: "red" } }} disabled={loading} onClick={handleButtonClick}>
          { loading ? <CircularProgress color="gray" /> : <DeleteOutline /> }
        </IconButton>
      </Tooltip>
      <ConfirmationDialog
        title={confirmTitle || ""}
        message={confirmMessage || ""}
        open={isConfirmationOpen}
        onConfirm={handleConfirm}
        onCancel={() => setIsConfirmationOpen(false)}
      />
    </Fragment>
  );
};