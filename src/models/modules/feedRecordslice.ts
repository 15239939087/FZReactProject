import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import _ from "lodash";
import { RootState } from "@/models/index";

const feedHistoriesAdapter = createEntityAdapter<any>({
  sortComparer: (a, b) => b.id - a.id,
});
/**
 * Thunk
 */
export const fetchFeedHistories = createAsyncThunk<any>(
  "feedRecord/fetchFeedRecord",
  async (_) => {}
);

/**
 * Slice
 */
const feedRecordSlice = createSlice({
  name: "feedRecord",
  initialState: {
    feedHistories: feedHistoriesAdapter.getInitialState(),
    todayFeedCount: 123,
  },
  reducers: {
    feedRecordAdded(state, action: PayloadAction<any>) {
      feedHistoriesAdapter.upsertOne(state.feedHistories, action.payload);
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchFeedHistories.pending, (state, action) => {});

    builder.addCase(fetchFeedHistories.fulfilled, (state, action) => {
      feedHistoriesAdapter.upsertMany(state.feedHistories, action.payload);
    });
  },
});

/**
 * Actions
 */

export const { feedRecordAdded } = feedRecordSlice.actions;
/**
 * Selectors
 */
const feedHistoriesSelectors = feedHistoriesAdapter.getSelectors(
  (state: RootState) => state.feedRecord.feedHistories
);

export const selectTodayFeedCount = (state: RootState) =>
  state.feedRecord.todayFeedCount;

export const {
  selectIds: selectFeedHistoryIds,
  selectById: selectFeedHistoryById,
  selectAll: selectFeedAll,
  selectEntities: selectFeedEntities,
} = feedHistoriesSelectors;

export const selectFeedHistoryByCurrent = createSelector(
  [
    selectFeedHistoryIds,
    selectFeedEntities,
    (_state: RootState, day: number) => day,
  ],
  (ids, entities, day) => {}
);

export default feedRecordSlice.reducer;
