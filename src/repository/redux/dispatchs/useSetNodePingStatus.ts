import { useAppDispatch } from "../hooks";
import { setNodePingStatus as setNodePingStatusReducer } from "../slices/coordinatorsSlice";

export default function useSetNodePingStatus() {
  const dispatch = useAppDispatch();

  async function setNodePingStatus(payload: Parameters<typeof setNodePingStatusReducer>[0]) {
    dispatch(setNodePingStatusReducer(payload));
  }

  return { setNodePingStatus };
}