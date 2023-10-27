import { CircularProgress, Typography } from "@mui/material";

import { useGetorFetchNodes } from "../../repository/commands/useGetOfFetchNodes";

export const CoordinatorsSelection = () => {
  const { nodes, error, loading } = useGetorFetchNodes();

  if (loading || nodes === null) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography variant="h6" color="error">{error}</Typography>;
  }

  return (
    <div>
      <Typography variant="h6">Select a coordinator</Typography>
      <ul>
        {Object.keys(nodes).map((coordinatorId) => (
          <li>{coordinatorId}</li>
        ))}
      </ul>
    </div>
  );
};