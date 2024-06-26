import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CoordinatorsState {
  nodesMap: {[key: number]: {
    selected: boolean,
    nodes: {
      [key: number]: {
        selected: boolean,
        lastStatus: null | boolean; // null for not pinged, true for online, false for offline
      },
    }
  }} | null;
}

export type NodesState = Exclude<CoordinatorsState["nodesMap"], null>[number]["nodes"];

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
    setAllCoordinatorsSelection(state, action: PayloadAction<boolean>) {
      if (state.nodesMap) {
        for (const coordinatorId of Object.keys(state.nodesMap)) {
          // if coordinator has no nodes, skip it
          if (Object.keys(state.nodesMap[parseInt(coordinatorId)].nodes).length === 0) {
            continue;
          }
          state.nodesMap[parseInt(coordinatorId)].selected = action.payload;
          // if coordinator is unselected, also set all nodes to unselected
          if (!action.payload) {
            for (const nodeId of Object.keys(state.nodesMap[parseInt(coordinatorId)].nodes)) {
              state.nodesMap[parseInt(coordinatorId)].nodes[parseInt(nodeId)] = { selected: false, lastStatus: null };
            }
          }
        }
      }
    },
    setCoordinatorSelection: (state, action: PayloadAction<{coordinatorId: number, selected: boolean}>) => {
      if (state.nodesMap && state.nodesMap[action.payload.coordinatorId]) {
        state.nodesMap[action.payload.coordinatorId].selected = action.payload.selected;
        // if coordinator is unselected, also set all nodes to unselected
        if (!action.payload.selected) {
          for (const nodeId of Object.keys(state.nodesMap[action.payload.coordinatorId].nodes)) {
            state.nodesMap[action.payload.coordinatorId].nodes[parseInt(nodeId)] = { selected: false, lastStatus: null };
          }
        }
      }
    },
    setAllNodesSelection(state, action: PayloadAction<{coordinatorId: number, selected: boolean}>) {
      if (state.nodesMap && state.nodesMap[action.payload.coordinatorId]) {
        for (const nodeId of Object.keys(state.nodesMap[action.payload.coordinatorId].nodes)) {
          state.nodesMap[action.payload.coordinatorId].nodes[parseInt(nodeId)].selected = action.payload.selected;
        }
      }
    },
    setNodeSelection: (state, action: PayloadAction<{coordinatorId: number, nodeId: number, selected: boolean}>) => {
      if (state.nodesMap && state.nodesMap[action.payload.coordinatorId] && state.nodesMap[action.payload.coordinatorId].nodes[action.payload.nodeId] !== undefined) {
        state.nodesMap[action.payload.coordinatorId].nodes[action.payload.nodeId].selected = action.payload.selected;
      }
    },
    setNodePingStatus: (state, action: PayloadAction<{coordinatorId: number, nodeId: number, status: null | boolean}>) => {
      if (state.nodesMap && state.nodesMap[action.payload.coordinatorId] && state.nodesMap[action.payload.coordinatorId].nodes[action.payload.nodeId] !== undefined) {
        state.nodesMap[action.payload.coordinatorId].nodes[action.payload.nodeId].lastStatus = action.payload.status;
      }
    },
    resetAllNodesPingStatus: (state) => {
      if (state.nodesMap) {
        for (const coordinatorId of Object.keys(state.nodesMap)) {
          for (const nodeId of Object.keys(state.nodesMap[parseInt(coordinatorId)].nodes)) {
            state.nodesMap[parseInt(coordinatorId)].nodes[parseInt(nodeId)].lastStatus = null;
          }
        }
      }
    },
  },
});

export const { setNodesMap, setAllCoordinatorsSelection, setCoordinatorSelection, setAllNodesSelection, setNodeSelection, setNodePingStatus, resetAllNodesPingStatus } = coordinatorsSlice.actions;

export default coordinatorsSlice.reducer;