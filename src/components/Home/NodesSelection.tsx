import { CircularProgress, Typography } from "@mui/material";

import { useGetorFetchNodes } from "../../repository/commands/useGetOfFetchNodes";

export const NodesSelection = () => {
  const { nodes, error, loading } = useGetorFetchNodes();

  if (loading || nodes === null) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography variant="h6" color="error">{error}</Typography>;
  }

  return (
    <div>
      <Typography variant="h6">Select nodes</Typography>
      <ul>
        {Object.entries(nodes).map(([coordinatorId, nodesList]) => (
          <li>{coordinatorId}
            <ul>
              {nodesList.map((node) => (
                <li>{node}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};