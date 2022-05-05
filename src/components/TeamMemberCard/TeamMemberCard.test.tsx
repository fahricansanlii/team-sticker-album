import { TeamMember } from 'store/models/team-member.model';
import { TeamMemberCard } from 'components/TeamMemberCard/TeamMemberCard';
import { render, screen } from 'utils/test-utils';
const webTeam = require('data/web-team.json');

describe('TeamMemberCard component', () => {
    it('should render the team member card correctly if they are revealed', () => {
        const teamMember: TeamMember = { ...webTeam[0], isRevealed: true };
        render(<TeamMemberCard teamMember={teamMember}></TeamMemberCard>);
        expect(screen.getByTestId('team-member-card')).toBeInTheDocument();
        expect(screen.getByTestId('team-member-card-name').textContent).toBe(
            `${teamMember.first_name} ${teamMember.last_name}`,
        );
        expect(screen.getByTestId('team-member-card-title')).toBeInTheDocument();
        expect(screen.getByTestId('team-member-card-title').textContent).toBe(teamMember.job_title);
        expect(screen.getByTestId('team-member-card-avatar')).toBeInTheDocument();
        expect(screen.getByTestId('team-member-card-avatar').getAttribute('src')).toContain(
            `svgs/${teamMember.avatar}.svg`,
        );
    });

    it('should render the team member card correctly if they are not revealed', () => {
        const teamMember: TeamMember = { ...webTeam[0], isRevealed: false };
        render(<TeamMemberCard teamMember={teamMember}></TeamMemberCard>);
        expect(screen.getByTestId('team-member-card')).toBeInTheDocument();
        expect(screen.getByTestId('team-member-card-name').textContent).toBe(
            `${teamMember.first_name} ${teamMember.last_name}`,
        );
        expect(screen.getByTestId('team-member-card-title')).toBeInTheDocument();
        expect(screen.getByTestId('team-member-card-title').textContent).toBe(teamMember.job_title);
        expect(screen.getByTestId('team-member-card-avatar')).toBeInTheDocument();
        expect(screen.getByTestId('team-member-card-avatar').getAttribute('src')).toContain(
            '/images/unknown-member.png',
        );
    });
});
