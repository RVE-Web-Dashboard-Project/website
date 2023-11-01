import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CoordinatorsState {
  nodesMap: {[key: number]: {
    selected: boolean,
    nodes: {
      [key: number]: boolean,
    }
  }} | null;
}

const initialState: CoordinatorsState = {
  nodesMap: null,
};

export const coordinatorsSlice = createSlice({
  name: "coordinators",
  initialState,
  reducers: {
    setNodesMap: (state, action: PayloadAction<CoordinatorsState["nodesMap"]>) => {
      state.nodesMap = action.payload;
    },
  },
});

export const { setNodesMap } = coordinatorsSlice.actions;

export default coordinatorsSlice.reducer;