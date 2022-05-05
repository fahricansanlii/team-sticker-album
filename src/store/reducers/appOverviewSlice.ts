import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface AppOverviewState {
    isLoading: boolean;
    numOfActiveRequests: number;
    pageNumber: number;
}

const initialState: AppOverviewState = {
    isLoading: false,
    numOfActiveRequests: 0,
    pageNumber: 0,
};

export const appOverviewSlice = createSlice({
    name: 'appOverview',
    initialState,
    reducers: {
        incrementActiveRequests: (state) => {
            state.numOfActiveRequests++;
            state.isLoading = true;
        },
        decrementActiveRequests: (state) => {
            state.numOfActiveRequests--;
            if (state.numOfActiveRequests === 0) {
                state.isLoading = false;
            }
        },
        setPageNumber: (state, action: PayloadAction<number>) => {
            state.pageNumber = action.payload;
        },
    },
});

export const { incrementActiveRequests, decrementActiveRequests, setPageNumber } =
    appOverviewSlice.actions;

export const selectIsLoading = (state: RootState) => state.appOverview.isLoading;
export const selectPageNumber = (state: RootState) => state.appOverview.pageNumber;

export default appOverviewSlice.reducer;
