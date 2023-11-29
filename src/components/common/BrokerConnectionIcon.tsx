import { Wifi, WifiOff } from "@mui/icons-material";
import { CircularProgress, Tooltip } from "@mui/material";

import { useGetOrFetchBrokerConnectionStatus } from "../../repository/commands/useGetOrFetchBrokerConnectionStatus";

export const BrokerConnectionIcon = () => {
  const { status, loading } = useGetOrFetchBrokerConnectionStatus();

  return (
    <Tooltip title={`Broker status: ${status}`}>
      <span style={{ display: "flex" }}>
        <ActualIcon status={status} loading={loading} />
      </span>
    </Tooltip>
  );
};

interface ActualIconProps {
  status: string | null,
  loading: boolean
}

const ActualIcon = ({ status, loading }: ActualIconProps) => {
  if (loading) {
    return <CircularProgress />;
  }

  if (status === "connected") {
    return null;
  }

  if (status === null || status === "disconnected") {
    return <WifiOff />;
  }

  return <Wifi opacity={0.7} />;
};