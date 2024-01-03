import { Button, Typography } from "@mui/material";
import { Fragment, useState } from "react";

import { useEditNodes } from "../../repository/api/useEditNodes";
import { isCoordinatorsMapObject } from "../../repository/types/checks";
import { ConfirmationDialog } from "../common/ConfirmationDialog";

export const EditCoordinatorsButton = () => {
  const { editNodesCommand, loading, errorCode } = useEditNodes();
  const [isReading, setIsReading] = useState(false);
  const [fileJsonContent, setFileJsonContent] = useState<{[key: number]: number[]} | null>(null);

  if (errorCode) {
    return <Typography color="error">Something went wrong</Typography>;
  }

  const isConfirmationOpen = fileJsonContent !== null;

  function onSubmit(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.item(0);
    if (file && file.type === "application/json") {
      setIsReading(true);
      const reader = new FileReader();
      reader.onload = () => {
        const text = reader.result as string;
        if (text.length < 2 || text.length > 1e6) {
          alert("Invalid JSON file");
          return;
        }
        const json = JSON.parse(text);
        setIsReading(false);
        if (!isCoordinatorsMapObject(json)) {
          alert("Invalid JSON file");
          return;
        }
        setFileJsonContent(json);
      };
      reader.onerror = (readerEvent) => {
        console.error("error reading file", readerEvent);
        alert("Something went wrong while reading this file");
      };
      reader.readAsText(file);
    } else {
      alert("Only JSON files are supported");
    }
  }

  function onConfirm() {
    if (fileJsonContent === null) return;
    editNodesCommand(fileJsonContent);
    setFileJsonContent(null);
  }

  return (
    <Fragment>
      <input
        accept="application/json"
        id="edit-coordinators-button-file"
        type="file"
        onChange={onSubmit}
        hidden
      />
      <label htmlFor="edit-coordinators-button-file">
        <Button variant="outlined" component="span" disabled={loading || isReading}>
          Upload configuration
        </Button>
      </label>
      <ConfirmationDialog
        title="Confirm configuration upload"
        message="Are you sure you want to upload this configuration? You will not be able to undo this action."
        open={isConfirmationOpen}
        onConfirm={onConfirm}
        onCancel={() => setFileJsonContent(null)}
      />
    </Fragment>
  );
};