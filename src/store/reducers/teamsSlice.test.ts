import { TeamMember } from 'store/models/team-member.model';
import reducer, {
    loadTeamsSuccessful,
    loadTeamMembersSuccessful,
    revealTeamMember,
    teamsSlice,
    TeamsState,
} from './teamsSlice';
const teamJson = require('../../data/teams.json');
const webTeamJson = require('../../data/web-team.json');

describe('Teams slice', () => {
    const initialState = teamsSlice.getInitialState();

    it('should have the correct initial state', () => {
        expect(initialState).toEqual({ teams: {}, teamMembersByTeam: {} });
    });

    it('should load teams successfully', () => {
        expect(reducer(initialState, loadTeamsSuccessful(teamJson))).toEqual({
            teams: {
                1: teamJson[0],
                2: teamJson[1],
            },
            teamMembersByTeam: {},
        });
    });

    it('should load team members successfully when there is no already loaded team member', () => {
        const teamMembers: TeamMember[] = [webTeamJson[0]];
        const expectedState: TeamsState = {
            teams: {},
            teamMembersByTeam: {
                1: { 1: { ...webTeamJson[0], isRevealed: false } },
            },
        };
        expect(
            reducer(initialState, loadTeamMembersSuccessful({ teamId: 1, teamMembers })),
        ).toEqual(expectedState);
    });

    it('should load team members successfully when there is at least one existing team member', () => {
        const teamMembers: TeamMember[] = [webTeamJson[0], webTeamJson[1]];
        const initialState: TeamsState = {
            teams: {},
            teamMembersByTeam: { 1: { 1: { ...webTeamJson[0], isRevealed: true } } },
        };
        const expectedState: TeamsState = {
            teams: {},
            teamMembersByTeam: {
                1: {
                    1: { ...webTeamJson[0], isRevealed: true },
                    2: { ...webTeamJson[1], isRevealed: false },
                },
            },
        };
        expect(
            reducer(initialState, loadTeamMembersSuccessful({ teamId: 1, teamMembers })),
        ).toEqual(expectedState);
    });

    it('should reveal the team member if it exists in the store', () => {
        const teamMemberToBeRevealed: TeamMember = { ...webTeamJson[0], isRevealed: true };
        const initialState: TeamsState = {
            teams: {},
            teamMembersByTeam: { 1: { 1: { ...webTeamJson[0], isRevealed: false } } },
        };
        const expectedState: TeamsState = {
            teams: {},
            teamMembersByTeam: {
                1: {
                    1: { ...webTeamJson[0], isRevealed: true },
                },
            },
        };
        expect(reducer(initialState, revealTeamMember(teamMemberToBeRevealed))).toEqual(
            expectedState,
        );
    });

    it('should reveal the team member if it does not exist in the store', () => {
        const teamMemberToBeRevealed: TeamMember = { ...webTeamJson[0], isRevealed: true };
        const initialState: TeamsState = {
            teams: {},
            teamMembersByTeam: {},
        };
        const expectedState: TeamsState = {
            teams: {},
            teamMembersByTeam: {
                1: {
                    1: { ...webTeamJson[0], isRevealed: true },
                },
            },
        };
        expect(reducer(initialState, revealTeamMember(teamMemberToBeRevealed))).toEqual(
            expectedState,
        );
    });
});
