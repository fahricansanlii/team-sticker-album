import { LoadingIndicator } from 'components/LoadingIndicator/LoadingIndicator';
import { render } from 'utils/test-utils';

describe('LoadingIndicator component', () => {
    it('should not render the loading indicator', () => {
        const { queryByTestId } = render(<LoadingIndicator></LoadingIndicator>);
        expect(queryByTestId('loading-indicatore')).not.toBeInTheDocument();
    });

    it('should render the loading indicator', () => {
        const { queryByTestId } = render(<LoadingIndicator></LoadingIndicator>, {
            preloadedState: {
                appOverview: {
                    isLoading: true,
                    numOfActiveRequests: 1,
                },
            },
        });
        expect(queryByTestId('loading-indicatore')).not.toBeInTheDocument();
    });
});
