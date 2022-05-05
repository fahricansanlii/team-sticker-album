import { TeamMember } from 'store/models/team-member.model';
import { Team } from 'store/models/team.model';
const teamJson = require('../data/teams.json');
const webTeamJson = require('../data/web-team.json');
const mobileWebTeamJson = require('../data/mobile-web-team.json');

enum TeamName {
    WebTeam = 1,
    MobileWebTeam = 2,
}

export function getTeams(): Promise<Team[]> {
    return new Promise((resolve) => {
        setTimeout(async () => {
            resolve(teamJson);
        }, 300);
    });
}

export function getTeamMembers(teamId: number): Promise<TeamMember[]> {
    return new Promise((resolve, reject) => {
        setTimeout(async () => {
            if (teamId === TeamName.WebTeam) resolve(webTeamJson);
            else if (teamId === TeamName.MobileWebTeam) resolve(mobileWebTeamJson);
            else reject(new Error(`Team with id ${teamId} does not exist.`));
        }, 300);
    });
}

export async function getTeamMember(teamId: number, teamMemberId: number): Promise<TeamMember> {
    let teamMembers: TeamMember[];
    try {
        teamMembers = await getTeamMembers(teamId);
    } catch (error) {
        throw error;
    }

    return new Promise((resolve, reject) => {
        setTimeout(async () => {
            const teamMember = teamMembers.find((teamMember) => teamMember.id === teamMemberId);
            teamMember
                ? resolve(teamMember)
                : reject(
                      new Error(
                          `Team member with id ${teamMemberId} does not exist in the team with id ${teamId}.`,
                      ),
                  );
        }, 300);
    });
}

export async function getTotalTeamMembersCount(): Promise<number> {
    const teams = await getTeams();
    return new Promise((resolve) => {
        setTimeout(async () => {
            const totalTeamMembersCount = teams
                .map((team) => team.numberOfTeamMembers)
                .reduce((prev, next) => prev + next);
            resolve(totalTeamMembersCount);
        }, 300);
    });
}
