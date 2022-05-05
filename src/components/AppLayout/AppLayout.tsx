import { useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { Homepage } from 'components/Homepage/Homepage';
import { TeamOverview } from 'components/TeamOverview/TeamOverview';
import { useAppDispatch, useAppSelector } from 'store/hook';
import { loadTeams, selectTeams } from 'store/reducers/teamsSlice';
import { selectPageNumber, setPageNumber } from 'store/reducers/appOverviewSlice';
import { history } from 'routing/my-history';
import './AppLayout.scss';

function getRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path=":pageNumber" element={<TeamOverview />} />
        </Routes>
    );
}

function removeSlash(pathname: string) {
    return pathname.replace('/', '');
}

export const AppLayout = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const location = useLocation();
    const teams = useAppSelector(selectTeams);
    const pageNumber = useAppSelector(selectPageNumber);

    // Check if the page number is not valid
    useEffect(() => {
        const path = removeSlash(location.pathname);
        if (path !== '') {
            const pageNumber = Number(path);
            if (isNaN(pageNumber)) {
                dispatch(setPageNumber(0));
                navigate('/');
            } else {
                dispatch(setPageNumber(pageNumber));
            }
        }
    }, []);

    // Check if the page number is bigger than the number of teams
    useEffect(() => {
        const path = removeSlash(location.pathname);
        if (path !== '') {
            const pageNumber = Number(path);
            if (teams.length && !isNaN(pageNumber) && pageNumber > teams.length) {
                dispatch(setPageNumber(0));
                navigate('/');
            }
        }
    }, [teams]);

    // Update the page number by listening to url changes
    useEffect(() => {
        const unlisten = history.listen((urlChange) => {
            const path = removeSlash(urlChange.location.pathname);
            const pageNumber = Number(path);
            if (!isNaN(pageNumber)) {
                dispatch(setPageNumber(pageNumber));
            }
        });

        return unlisten;
    }, []);

    useEffect(() => {
        dispatch(loadTeams());
    }, []);

    const handleOnClick = (nextPage: boolean) => {
        if (nextPage) {
            navigate(`/${pageNumber + 1}`);
        } else {
            navigate(pageNumber > 1 ? `${pageNumber - 1}` : '/');
        }
    };

    return (
        <div className="app-layout">
            {teams.length && pageNumber !== 0 ? (
                <button
                    type="button"
                    onClick={() => handleOnClick(false)}
                    className="button app-layout__button app-layout__button--back"
                    data-testid="app-layout-back-button"
                >
                    <i className="bi bi-arrow-left"></i>
                </button>
            ) : null}
            <div className="app-layout__content">{getRoutes()}</div>
            {teams.length && pageNumber !== teams.length ? (
                <button
                    type="button"
                    onClick={() => handleOnClick(true)}
                    className="button app-layout__button app-layout__button--next"
                    data-testid="app-layout-next-button"
                >
                    <i className="bi bi-arrow-right"></i>
                </button>
            ) : null}
        </div>
    );
};
