import { Homepage } from 'components/Homepage/Homepage';
import { render, screen, fireEvent } from 'utils/test-utils';

jest.mock('../StickerSetModal/StickerSetModal', () => ({
    __esModule: true,
    StickerSetModal: () => {
        return <div data-testid="sticker-modal"></div>;
    },
}));

describe('Homepage component', () => {
    it('should render the title and the text', () => {
        render(<Homepage></Homepage>);
        expect(screen.getByTestId('homepage-title')).toBeInTheDocument();
        expect(screen.getByTestId('homepage-title').textContent).toBe('Trendyoltech');
        expect(screen.getByTestId('homepage-text')).toBeInTheDocument();
        expect(screen.getByTestId('homepage-text').textContent).toBe('sticker album');
    });

    it('should render the button but the sticker modal should be closed', () => {
        const { queryByTestId } = render(<Homepage></Homepage>);
        expect(screen.getByTestId('homepage-button')).toBeInTheDocument();
        expect(screen.getByTestId('homepage-button').textContent).toBe('Get your daily stickers');
        expect(queryByTestId('sticker-modal')).not.toBeInTheDocument();
    });

    it('should open the  sticker modal when the button is clicked', () => {
        render(<Homepage></Homepage>);
        const stickerButton = screen.getByTestId('homepage-button');
        fireEvent.click(stickerButton);
        expect(screen.getByTestId('sticker-modal')).toBeInTheDocument();
    });
});
