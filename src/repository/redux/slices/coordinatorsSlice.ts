import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CoordinatorsState {
  nodesMap: {[key: number]: number[]};
}

const initialState: CoordinatorsState = {
  nodesMap: {},
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