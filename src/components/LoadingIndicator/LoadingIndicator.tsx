import { useAppSelector } from 'store/hook';
import { selectIsLoading } from 'store/reducers/appOverviewSlice';
import './LoadingIndicator.scss';

export const LoadingIndicator = () => {
    const isLoading = useAppSelector(selectIsLoading);

    return isLoading ? (
        <div data-testid="loading-indicator" className="spinner-container">
            <img src={`${window.location.origin}/spinner.gif`}></img>
        </div>
    ) : null;
};
