import reducer, {
    incrementActiveRequests,
    decrementActiveRequests,
    setPageNumber,
    appOverviewSlice,
} from './appOverviewSlice';

describe('AppOverview slice', () => {
    it('should have the correct initial state', () => {
        expect(appOverviewSlice.getInitialState()).toEqual({
            isLoading: false,
            numOfActiveRequests: 0,
            pageNumber: 0,
        });
    });

    it('should set the page number', () => {
        const initialState = appOverviewSlice.getInitialState();
        expect(reducer(initialState, setPageNumber(1))).toEqual({
            isLoading: false,
            numOfActiveRequests: 0,
            pageNumber: 1,
        });
    });

    it('should increment the number of active requests', () => {
        const initialState = appOverviewSlice.getInitialState();
        expect(reducer(initialState, incrementActiveRequests())).toEqual({
            isLoading: true,
            numOfActiveRequests: 1,
            pageNumber: 0,
        });
    });

    it('should decrement the number of active requests', () => {
        const initialState = {
            isLoading: true,
            numOfActiveRequests: 1,
            pageNumber: 0,
        };
        expect(reducer(initialState, decrementActiveRequests())).toEqual({
            isLoading: false,
            numOfActiveRequests: 0,
            pageNumber: 0,
        });
    });
});
