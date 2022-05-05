import { TeamOverview } from 'components/TeamOverview/TeamOverview';
import { TeamMember } from 'store/models/team-member.model';
import { Team } from 'store/models/team.model';
import { TeamsState } from 'store/reducers/teamsSlice';
import { render, screen } from 'utils/test-utils';
const teams: Team[] = require('data/teams.json');
const webTeam: TeamMember[] = require('data/web-team.json');

jest.mock('../TeamMemberCard/TeamMemberCard', () => ({
    __esModule: true,
    TeamMemberCard: () => {
        return <div data-testid="team-member-card"></div>;
    },
}));

describe('TeamOverview component', () => {
    const teamMembers: { [key: string]: TeamMember } = {};
    webTeam.forEach(
        (teamMember) => (teamMembers[teamMember.id] = { ...teamMember, isRevealed: false }),
    );
    const teamState: TeamsState = {
        teams: { 1: teams[0] },
        teamMembersByTeam: { 1: teamMembers },
    };
    const preloadedState = {
        teams: teamState,
        appOverview: {
            pageNumber: 1,
        },
    };

    it('should team details correctly', () => {
        render(<TeamOverview></TeamOverview>, { preloadedState });
        expect(screen.getByTestId('team-overview')).toBeInTheDocument();
        expect(screen.getByTestId('team-overview-logo')).toBeInTheDocument();
        expect(screen.getByTestId('team-overview-logo').getAttribute('src')).toContain(
            'svgs/1.svg',
        );
        expect(screen.getByTestId('team-overview-team-name')).toBeInTheDocument();
        expect(screen.getByTestId('team-overview-team-name').textContent).toBe(teams[0].name);
        expect(screen.getByTestId('team-overview-team-motto')).toBeInTheDocument();
        expect(screen.getByTestId('team-overview-team-motto').textContent).toBe(teams[0].motto);
        expect(screen.getByTestId('team-overview-team-description')).toBeInTheDocument();
        expect(screen.getByTestId('team-overview-team-description').textContent).toBe(
            teams[0].description,
        );
    });

    it('should render the team members', () => {
        const { queryAllByTestId } = render(<TeamOverview></TeamOverview>, { preloadedState });
        expect(queryAllByTestId('team-member-card')).toBeTruthy();
        expect(queryAllByTestId('team-member-card').length).toBe(10);
    });
});
