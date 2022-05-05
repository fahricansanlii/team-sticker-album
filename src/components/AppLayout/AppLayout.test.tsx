import { AppLayout } from 'components/AppLayout/AppLayout';
import { Team } from 'store/models/team.model';
import { TeamsState } from 'store/reducers/teamsSlice';
import { render, screen } from 'utils/test-utils';
import { history } from 'routing/my-history';

const teams: Team[] = require('data/teams.json');

jest.mock('../Homepage/Homepage', () => ({
    __esModule: true,
    Homepage: () => {
        return <div data-testid="homepage"></div>;
    },
}));

jest.mock('../TeamOverview/TeamOverview', () => ({
    __esModule: true,
    TeamOverview: () => {
        return <div data-testid="team-overview"></div>;
    },
}));

jest.mock('../TeamOverview/TeamOverview', () => ({
    __esModule: true,
    TeamOverview: () => {
        return <div data-testid="team-overview"></div>;
    },
}));

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => {
    const originalModule = jest.requireActual('react-router-dom');

    return {
        __esModule: true,
        ...originalModule,
        useNavigate: () => mockNavigate,
    };
});

describe('AppLayout component', () => {
    const teamState: TeamsState = {
        teams: { 1: teams[0], 2: teams[1] },
        teamMembersByTeam: {},
    };
    const preloadedState = {
        teams: teamState,
        appOverview: {
            pageNumber: 0,
        },
    };

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should open the homepage', () => {
        render(<AppLayout></AppLayout>, { preloadedState });
        expect(screen.getByTestId('homepage')).toBeInTheDocument();
    });

    it('should show the next button on the homepage', () => {
        render(<AppLayout></AppLayout>, { preloadedState });
        expect(screen.getByTestId('app-layout-next-button')).toBeInTheDocument();
    });

    it('should not show the back button on the homepage', () => {
        const { queryByTestId } = render(<AppLayout></AppLayout>, { preloadedState });
        expect(queryByTestId('app-layout-back-button')).not.toBeInTheDocument();
    });

    it('should show the team overview page', () => {
        history.push('/1');
        render(<AppLayout></AppLayout>, { preloadedState });
        expect(screen.getByTestId('team-overview')).toBeInTheDocument();
    });

    it('should show the back button on the team overview page', () => {
        history.push('/1');
        render(<AppLayout></AppLayout>, { preloadedState });
        expect(screen.getByTestId('app-layout-back-button')).toBeInTheDocument();
    });

    it('should show the next button on the team overview page if it is not the last team', () => {
        history.push('/1');
        render(<AppLayout></AppLayout>, { preloadedState });
        expect(screen.getByTestId('app-layout-next-button')).toBeInTheDocument();
    });

    it('should not show the next button on the team overview page if it is the last team', () => {
        history.push('/2');
        const { queryByTestId } = render(<AppLayout></AppLayout>, { preloadedState });
        expect(queryByTestId('app-layout-next-button')).not.toBeInTheDocument();
    });

    it('should go to the homepage if the url is not valid', () => {
        history.push('/asd');
        render(<AppLayout></AppLayout>, { preloadedState });
        expect(mockNavigate).toHaveBeenCalledWith('/');
    });

    it('should go to the homepage if the page number is bigger than teams length', () => {
        history.push('/6');
        render(<AppLayout></AppLayout>, { preloadedState });
        expect(mockNavigate).toHaveBeenCalledWith('/');
    });
});
