import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { InvitationInfo, UserObject } from "../../types/user";
import { getTokenFromStorage } from "../middlewares/localStorageMiddleware";

export interface UserState {
  user: UserObject | null;
  token: string | null;
  invitations: Record<string, InvitationInfo>;
}

const initialState: UserState = {
  user: null,
  token: getTokenFromStorage(),
  invitations: {},
};


export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<Exclude<UserState["user"], null>>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
    setToken: (state, action: PayloadAction<UserState["token"]>) => {
      state.token = action.payload;
    },
    setInvitation: (state, action: PayloadAction<InvitationInfo>) => {
      state.invitations[action.payload.id] = action.payload;
    },
  },
});

export const { login, logout, setToken, setInvitation } = userSlice.actions;

export default userSlice.reducer;