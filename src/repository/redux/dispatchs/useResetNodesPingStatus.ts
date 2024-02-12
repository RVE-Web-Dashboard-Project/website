import { useAppDispatch } from "../hooks";
import { resetAllNodesPingStatus as resetAllNodesPingStatusReducer } from "../slices/coordinatorsSlice";

export default function useResetNodesPingStatus() {
  const dispatch = useAppDispatch();

  async function resetNodesPingStatus() {
    dispatch(resetAllNodesPingStatusReducer());
  }

  return { resetNodesPingStatus };
}