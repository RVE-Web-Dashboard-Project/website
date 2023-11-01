import { CircularProgress, Typography } from "@mui/material";

import { useGetorFetchNodes } from "../../repository/commands/useGetOfFetchNodes";
import { SelectionContainer } from "./SelectionContainer";

export const NodesSelection = () => {
  const { nodes, error, loading } = useGetorFetchNodes();

  if (loading || nodes === null) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography variant="h6" color="error">{error}</Typography>;
  }

  return (
    <SelectionContainer>
      <Typography variant="h5">Nodes</Typography>
      <ul>
        {Object.entries(nodes).map(([coordinatorId, nodesObject]) => (
          <li>{coordinatorId}
            <ul>
              {
                Object.entries(nodesObject.nodes).map(([nodeId, nodeSelected]) => (
                  <li>{nodeId}</li>
                ))
              }
            </ul>
          </li>
        ))}
      </ul>
    </SelectionContainer>
  );
};