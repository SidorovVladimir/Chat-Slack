/* eslint-disable no-param-reassign */
import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit';
import api from '../../api/index.js';
import routes from '../../utils/routes.js';

export const fetchContent = createAsyncThunk(
  'channels/fetchContent',
  async () => {
    const { data } = await api.get(routes.usersData());
    return data;
  },
);

const channelsAdapter = createEntityAdapter();
const initialState = channelsAdapter.getInitialState({
  currentChannelId: 1,
  defaultChannelId: 1,
  loadingStatus: 'idle',
});

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setCurrentChannel: (state, { payload }) => {
      state.currentChannelId = payload;
    },
    addChannel: channelsAdapter.addOne,
    removeChannel: channelsAdapter.removeOne,
    renameChannel: channelsAdapter.setOne,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContent.pending, (state) => {
        state.loadingStatus = 'loading';
      })
      .addCase(fetchContent.fulfilled, (state, { payload }) => {
        channelsAdapter.addMany(state, payload.channels);
        state.loadingStatus = 'idle';
      });
  },
});
export const {
  setCurrentChannel,
  addChannel,
  removeChannel,
  renameChannel,
} = channelsSlice.actions;

export default channelsSlice.reducer;
