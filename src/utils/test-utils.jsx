import { render as rtlRender } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import teamsReducer from '../store/reducers/teamsSlice';
import appOverviewReducer from '../store/reducers/appOverviewSlice';
import stickersReducer from '../store/reducers/stickersSlice';
import { CustomRouter } from 'routing/CustomRouter';
import { history } from 'routing/my-history';

export const initialState = {
    teams: { teams: {}, teamMembersByTeam: {} },
    stickers: {
        stickerSet: [],
        numOfStickerSets: 3,
    },
    appOverview: {
        isLoading: false,
        numOfActiveRequests: 0,
        pageNumber: 0,
    },
};

function render(
    ui,
    {
        preloadedState,
        store = configureStore({
            reducer: {
                teams: teamsReducer,
                appOverview: appOverviewReducer,
                stickers: stickersReducer,
            },
            preloadedState,
        }),
        ...renderOptions
    } = {},
) {
    function Wrapper({ children }) {
        return (
            <Provider store={store}>
                <CustomRouter history={history}>{children}</CustomRouter>
            </Provider>
        );
    }
    return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

// re-export everything
export * from '@testing-library/react';
// override render method
export { render };
