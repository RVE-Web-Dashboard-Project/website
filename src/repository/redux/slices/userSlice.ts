import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { InvitationInfo, UserObject } from "../../types/user";
import { getTokenFromStorage } from "../middlewares/localStorageMiddleware";

export interface UserState {
  userId: number | null;
  token: string | null;
  users: Record<string, UserObject>;
  invitations: Record<string, InvitationInfo> | undefined;
}

const initialState: UserState = {
  userId: null,
  token: getTokenFromStorage(),
  users: {},
  invitations: undefined,
};


export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<UserObject>) => {
      state.userId = action.payload.id;
      state.users[action.payload.id] = action.payload;
    },
    logout: (state) => {
      state.userId = null;
      state.token = null;
      state.users = {};
    },
    setToken: (state, action: PayloadAction<UserState["token"]>) => {
      state.token = action.payload;
    },
    setUsers: (state, action: PayloadAction<UserObject[]>) => {
      action.payload.forEach((user) => {
        state.users[user.id] = user;
      });
    },
    removeUser: (state, action: PayloadAction<number>) => {
      delete state.users[action.payload];
    },
    setInvitation: (state, action: PayloadAction<InvitationInfo>) => {
      if (state.invitations === undefined) {
        state.invitations = {};
      }
      state.invitations[action.payload.id] = action.payload;
    },
    setInvitations(state, action: PayloadAction<InvitationInfo[]>) {
      if (state.invitations === undefined) {
        state.invitations = {};
      }
      action.payload.forEach((invitation) => {
        state.invitations![invitation.id] = invitation;
      });
    },
    removeInvitation: (state, action: PayloadAction<string>) => {
      if (state.invitations !== undefined) {
        delete state.invitations[action.payload];
      }
    },
  },
});

export const { login, logout, setToken, setUsers, removeUser, setInvitation, setInvitations, removeInvitation } = userSlice.actions;

export default userSlice.reducer;