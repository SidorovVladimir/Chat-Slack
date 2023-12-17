/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

const modalsSlice = createSlice({
  name: "Modal",
  initialState: {
    type: null,
    channelId: null,
  },
  reducers: {
    openModal: (state, { payload }) => {
      state.type = payload.type;
      state.channelId = payload.id;
    },
    closeModal: (state) => {
      state.type = null;
      state.channelId = null;
    },
  },
});

export const { openModal, closeModal } = modalsSlice.actions;
export default modalsSlice.reducer;
