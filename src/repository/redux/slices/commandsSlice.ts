import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { SendCommandParams } from "../../api/useSendCommand";
import { Command } from "../../types/command";
import { ConsoleMessage } from "../../types/console";

interface OngoingCommand extends SendCommandParams {
  sentAt: number;
}

export interface CommandsState {
  commands: Command[];
  messages: ConsoleMessage[];
  brokerConnectionStatus: string | null;
  ongoingCommands: Record<number, OngoingCommand>;
}

const initialState: CommandsState = {
  commands: [],
  messages: [],
  brokerConnectionStatus: null,
  ongoingCommands: {},
};

export const commandsSlice = createSlice({
  name: "commands",
  initialState,
  reducers: {
    setCommands: (state, action: PayloadAction<CommandsState["commands"]>) => {
      state.commands = action.payload;
    },
    addMessage: (state, action: PayloadAction<ConsoleMessage>) => {
      state.messages.push(action.payload);
    },
    resetConsole: (state) => {
      state.messages = [];
    },
    setBrokerConnectionStatus: (state, action: PayloadAction<string>) => {
      state.brokerConnectionStatus = action.payload;
    },
    registerOnGoingCommand: (state, action: PayloadAction<{orderId: number, command: OngoingCommand}>) => {
      state.ongoingCommands[action.payload.orderId] = action.payload.command;
    },
  },
});

export const { setCommands, addMessage, resetConsole, setBrokerConnectionStatus, registerOnGoingCommand } = commandsSlice.actions;

export default commandsSlice.reducer;