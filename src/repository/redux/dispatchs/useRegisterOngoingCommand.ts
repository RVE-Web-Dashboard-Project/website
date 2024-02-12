import { SendCommandParams } from "../../api/useSendCommand";
import { useAppDispatch } from "../hooks";
import { registerOnGoingCommand as registerOnGoingCommandReducer } from "../slices/commandsSlice";

export default function useRegisterOngoingCommand() {
  const dispatch = useAppDispatch();

  async function registerOngoingCommand({ orderId, command }: {orderId: number, command: SendCommandParams}) {
    const timestamp = new Date().getTime();
    dispatch(registerOnGoingCommandReducer({
      orderId,
      command: { ...command, sentAt: timestamp },
    }));
  }

  return { registerOngoingCommand };
}