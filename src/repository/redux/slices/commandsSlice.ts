import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Command } from "../../types/command";

export interface CommandsState {
  commands: Command[];
}

const initialState: CommandsState = {
  commands: [],
};

export const commandsSlice = createSlice({
  name: "commands",
  initialState,
  reducers: {
    setCommands: (state, action: PayloadAction<CommandsState["commands"]>) => {
      state.commands = action.payload;
    },
  },
});

export const { setCommands } = commandsSlice.actions;

export default commandsSlice.reducer;