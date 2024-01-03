import { Button, Typography } from "@mui/material";

import { useGetOrFetchNodes } from "../../repository/commands/useGetOrFetchNodes";

export const DownloadCoordinatorsButton = () => {
  const { nodes: coordinators, error } = useGetOrFetchNodes();

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  function onClick() {
    if (coordinators === null) {
      console.error("coordinators is null");
      return;
    }
    const content = Object.fromEntries(Object.entries(coordinators).map(([key, value]) => ([key, Object.keys(value.nodes).map(Number)])));

    const blob = new Blob([JSON.stringify(content)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "coordinators.json";
    link.click();
  }

  return (
    <Button variant="contained" onClick={onClick}>Download configuration</Button>
  );
};