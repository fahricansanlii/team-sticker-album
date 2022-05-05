import { configureStore } from '@reduxjs/toolkit';
import teamsReducer from './reducers/teamsSlice';
import appOverviewReducer from './reducers/appOverviewSlice';
import stickersReducer from './reducers/stickersSlice';

export const store = configureStore({
    reducer: {
        teams: teamsReducer,
        appOverview: appOverviewReducer,
        stickers: stickersReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
