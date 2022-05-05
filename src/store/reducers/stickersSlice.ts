import { AnyAction, createSlice, PayloadAction, ThunkAction } from '@reduxjs/toolkit';
import { generateStickerSet } from 'api/sticker.api';
import { TeamMember } from 'store/models/team-member.model';
import { RootState } from '../store';
import { decrementActiveRequests, incrementActiveRequests } from './appOverviewSlice';
import { revealTeamMember } from './teamsSlice';

export const loadStickerSet =
    (): ThunkAction<void, RootState, unknown, AnyAction> => async (dispatch, getState) => {
        if (getState().stickers.numOfStickerSets) {
            dispatch(incrementActiveRequests());
            const teamMembersToBeRevealed = (await generateStickerSet()).map((teamMember) => {
                return { ...teamMember, isRevealed: true };
            });

            for (let i = 0; i < teamMembersToBeRevealed.length; i++) {
                dispatch(revealTeamMember(teamMembersToBeRevealed[i]));
            }
            dispatch(
                updateStickers({
                    stickerSet: teamMembersToBeRevealed,
                    numOfStickerSets: getState().stickers.numOfStickerSets - 1,
                }),
            );
            dispatch(decrementActiveRequests());
        }
    };

export interface StickersState {
    stickerSet: Array<TeamMember>;
    numOfStickerSets: number;
}

const initialState: StickersState = {
    stickerSet: [],
    numOfStickerSets: 3,
};

export const stickersSlice = createSlice({
    name: 'stickers',
    initialState,
    reducers: {
        updateStickers: (state, action: PayloadAction<StickersState>) => {
            state.numOfStickerSets = action.payload.numOfStickerSets;
            state.stickerSet = action.payload.stickerSet;
        },
        resetStickerSet: (state) => {
            state.stickerSet = [];
        },
    },
});

export const { updateStickers, resetStickerSet } = stickersSlice.actions;

export const selectStickerSet = (state: RootState) => state.stickers.stickerSet;
export const selectNumOfStickerSets = (state: RootState) => state.stickers.numOfStickerSets;

export default stickersSlice.reducer;
