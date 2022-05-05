import { useEffect } from 'react';
import { TeamMemberCard } from 'components/TeamMemberCard/TeamMemberCard';
import { useAppSelector, useAppDispatch } from 'store/hook';
import { selectPageNumber } from 'store/reducers/appOverviewSlice';
import {
    loadTeamMembers,
    selectTeamById,
    selectTeamMembersByTeamId,
} from 'store/reducers/teamsSlice';
import './TeamOverview.scss';

export const TeamOverview = () => {
    const pageNumber = useAppSelector(selectPageNumber);
    const dispatch = useAppDispatch();
    const team = useAppSelector((state) => selectTeamById(state, pageNumber));
    const teamMembers = useAppSelector((state) =>
        selectTeamMembersByTeamId(state, (team && team.id) || 0),
    );

    useEffect(() => {
        if (pageNumber !== 0) {
            dispatch(loadTeamMembers(pageNumber));
        }
    }, [pageNumber]);

    return team ? (
        <div data-testid="team-overview" className="team-overview">
            <div className="team-overview__team-details-container">
                <img
                    className="team-overview__team-logo"
                    data-testid="team-overview-logo"
                    src={`${window.location.origin}/svgs/1.svg`}
                    alt={`${team.name} Logo`}
                ></img>
                <div className="team-overview__team-details">
                    <h1 data-testid="team-overview-team-name" className="team-overview__team-name">
                        {team.name}
                    </h1>
                    <h3
                        data-testid="team-overview-team-motto"
                        className="team-overview__team-motto"
                    >
                        {team.motto}
                    </h3>
                    <p
                        data-testid="team-overview-team-description"
                        className="team-overview__team-introduction-text"
                    >
                        {team.description}
                    </p>
                </div>
            </div>
            {teamMembers && teamMembers.length ? (
                <div className="team-overview__team-members">
                    {teamMembers.map((teamMember) => (
                        <div className="team-overview__team-member" key={teamMember.id}>
                            <div className="team-overview__team-member-detail">
                                <TeamMemberCard teamMember={teamMember}></TeamMemberCard>
                            </div>
                        </div>
                    ))}
                </div>
            ) : null}
        </div>
    ) : null;
};
