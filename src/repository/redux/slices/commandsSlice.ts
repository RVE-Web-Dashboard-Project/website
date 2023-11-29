import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Command } from "../../types/command";
import { ConsoleMessage } from "../../types/console";

export interface CommandsState {
  commands: Command[];
  messages: ConsoleMessage[];
  brokerConnectionStatus: string | null;
}

const initialState: CommandsState = {
  commands: [],
  messages: [],
  brokerConnectionStatus: null,
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
  },
});

export const { setCommands, addMessage, resetConsole, setBrokerConnectionStatus } = commandsSlice.actions;

export default commandsSlice.reducer;