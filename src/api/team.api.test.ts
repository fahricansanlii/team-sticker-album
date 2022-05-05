import { getTeamMember, getTeamMembers, getTeams, getTotalTeamMembersCount } from './team.api';

describe('Team api', () => {
    it('gets the teams', async () => {
        const teams = await getTeams();
        expect(teams.length).toBe(2);
        expect(teams[0].name).toBe('Web Team');
        expect(teams[1].name).toBe('Mobile Web Team');
    });

    it('gets the team members of the first team', async () => {
        const teamMembers = await getTeamMembers(1);
        expect(teamMembers.length).toBe(10);
        teamMembers.forEach((teamMember) => {
            expect(teamMember.team_id).toBe(1);
        });
    });

    it('gets the team members of the second team', async () => {
        const teamMembers = await getTeamMembers(2);
        expect(teamMembers.length).toBe(10);
        teamMembers.forEach((teamMember) => {
            expect(teamMember.team_id).toBe(2);
        });
    });

    it('throws an error when not existing team is looked up', async () => {
        expect.assertions(1);
        try {
            await getTeamMembers(3);
        } catch (e) {
            expect(e).toEqual(new Error('Team with id 3 does not exist.'));
        }
    });

    it('gets the team member of a team', async () => {
        const teamMember = await getTeamMember(1, 1);
        expect(teamMember).toBeTruthy();
        expect(teamMember.team_id).toBe(1);
    });

    it('throws an error when trying to get a team member of a not existing team', async () => {
        expect.assertions(1);
        try {
            await getTeamMember(3, 1);
        } catch (e) {
            expect(e).toEqual(new Error('Team with id 3 does not exist.'));
        }
    });

    it('throws an error when trying to get a not existing team member of an existing team', async () => {
        expect.assertions(1);
        try {
            await getTeamMember(1, 11);
        } catch (e) {
            expect(e).toEqual(
                new Error('Team member with id 11 does not exist in the team with id 1.'),
            );
        }
    });

    it('gets the total number of teammates', async () => {
        const totalNumberOfTeamMembers = await getTotalTeamMembersCount();
        expect(totalNumberOfTeamMembers).toBe(20);
    });
});
