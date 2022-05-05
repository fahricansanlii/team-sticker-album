import { AnyAction, createSlice, PayloadAction, ThunkAction } from '@reduxjs/toolkit';
import { getTeamMembers, getTeams } from 'api/team.api';
import { TeamMember } from 'store/models/team-member.model';
import { Team } from 'store/models/team.model';
import { RootState } from '../store';
import { incrementActiveRequests, decrementActiveRequests } from './appOverviewSlice';

export const loadTeams =
    (): ThunkAction<void, RootState, unknown, AnyAction> => async (dispatch, getState) => {
        if (!getState().teams.teams.length) {
            dispatch(incrementActiveRequests());
            const teams = await getTeams();
            dispatch(loadTeamsSuccessful(teams));
            dispatch(decrementActiveRequests());
        }
    };

export const loadTeamMembers =
    (teamId: number): ThunkAction<void, RootState, unknown, AnyAction> =>
    async (dispatch, getState) => {
        const teamSlice = getState().teams;
        const teamMembersByTeamId = teamSlice.teamMembersByTeam[teamId];
        const allTeamMembersAlreadyLoaded =
            teamMembersByTeamId &&
            Object.keys(teamMembersByTeamId).length === teamSlice.teams[teamId].numberOfTeamMembers;
        if (!allTeamMembersAlreadyLoaded) {
            dispatch(incrementActiveRequests());
            const teamMembers = await getTeamMembers(teamId);
            dispatch(loadTeamMembersSuccessful({ teamId, teamMembers }));
            dispatch(decrementActiveRequests());
        }
    };

export interface TeamsState {
    teams: { [key: string]: Team };
    teamMembersByTeam: {
        [key: number]: { [key: string]: TeamMember };
    };
}

const initialState: TeamsState = {
    teams: {},
    teamMembersByTeam: {},
};

export const teamsSlice = createSlice({
    name: 'teams',
    initialState,
    reducers: {
        loadTeamsSuccessful: (state, action: PayloadAction<Team[]>) => {
            const teams: { [key: string]: Team } = {};
            const teamMembersByTeam: {
                [key: number]: { [key: string]: TeamMember };
            } = {};
            action.payload.forEach((team) => {
                teams[team.id] = team;
            });
            state.teams = teams;
            state.teamMembersByTeam = teamMembersByTeam;
        },
        loadTeamMembersSuccessful: (
            state,
            action: PayloadAction<{ teamId: number; teamMembers: TeamMember[] }>,
        ) => {
            const teamId = action.payload.teamId;
            const teamMembers: { [key: string]: TeamMember } = {};
            action.payload.teamMembers.forEach((teamMember) => {
                const teamMemberId = teamMember.id;
                const teamMemberAlreadyExistsAndRevealed =
                    state.teamMembersByTeam[teamId] &&
                    state.teamMembersByTeam[teamId][teamMemberId] &&
                    state.teamMembersByTeam[teamId][teamMemberId].isRevealed;
                if (teamMemberAlreadyExistsAndRevealed) {
                    teamMembers[teamMemberId] = {
                        ...teamMember,
                        isRevealed: true,
                    };
                } else {
                    teamMembers[teamMemberId] = { ...teamMember, isRevealed: false };
                }
            });
            const teamMembersByTeam = {
                ...state.teamMembersByTeam,
                [teamId]: teamMembers,
            };
            state.teamMembersByTeam = teamMembersByTeam;
        },
        revealTeamMember: (state, action: PayloadAction<TeamMember>) => {
            const teamMember = action.payload;
            const teamId = teamMember.team_id;
            const teamMemberId = teamMember.id;
            const newTeam = { ...state.teamMembersByTeam[teamId] };
            newTeam[teamMemberId] = { ...teamMember };
            state.teamMembersByTeam = { ...state.teamMembersByTeam, [teamId]: newTeam };
        },
    },
});

export const { loadTeamsSuccessful, loadTeamMembersSuccessful, revealTeamMember } =
    teamsSlice.actions;

export const selectTeams = (state: RootState) => Object.values(state.teams.teams);
export const selectTeamById = (state: RootState, id: number) => state.teams.teams[id];
export const selectTeamMembersByTeamId = (state: RootState, id: number) =>
    state.teams.teamMembersByTeam[id] ? Object.values(state.teams.teamMembersByTeam[id]) : [];

export default teamsSlice.reducer;
