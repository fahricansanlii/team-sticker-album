import { render, screen } from 'utils/test-utils';
import App from './App';

jest.mock('router', () => ({
    __esModule: true,
    default: () => {
        return <div data-testid="router"></div>;
    },
}));

describe('AppLayout component', () => {
    it('renders it correctly', () => {
        render(<App />);
        expect(screen.getByTestId('router')).toBeInTheDocument();
    });
});
