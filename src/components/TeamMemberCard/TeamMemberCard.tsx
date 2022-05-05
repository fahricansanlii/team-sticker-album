import { TeamMember } from 'store/models/team-member.model';
import './TeamMemberCard.scss';

export const TeamMemberCard = ({ teamMember }: { teamMember: TeamMember }) => {
    return (
        <div data-testid="team-member-card" className="team-member-card">
            <img
                className="team-member-card__avatar"
                data-testid="team-member-card-avatar"
                src={
                    teamMember.isRevealed
                        ? `${window.location.origin}/svgs/${teamMember.avatar}.svg`
                        : `${window.location.origin}/images/unknown-member.png`
                }
            ></img>
            <p data-testid="team-member-card-name" className="team-member-card__name">
                {teamMember.first_name} {teamMember.last_name}
            </p>
            <p data-testid="team-member-card-title" className="team-member-card__title">
                {teamMember.job_title}
            </p>
        </div>
    );
};
