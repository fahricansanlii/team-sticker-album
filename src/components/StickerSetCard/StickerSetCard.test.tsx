import { StickerSetCard } from 'components/StickerSetCard/StickerSetCard';
import { render, screen, fireEvent } from 'utils/test-utils';

const mockDispatch = jest.fn();
jest.mock('../../store/hook', () => ({
    __esModule: true,
    useAppDispatch: () => mockDispatch,
}));

describe('StickerSetCard component', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should render the title and the text', () => {
        render(<StickerSetCard></StickerSetCard>);
        expect(screen.getByTestId('sticker-set-card-title')).toBeInTheDocument();
        expect(screen.getByTestId('sticker-set-card-title').textContent).toBe('Trendyoltech');
        expect(screen.getByTestId('sticker-set-card-text')).toBeInTheDocument();
        expect(screen.getByTestId('sticker-set-card-text').textContent).toBe('STICKER SET');
    });

    it('should render sticker card button and call the click function upon click', () => {
        render(<StickerSetCard></StickerSetCard>);
        const stickerCardButton = screen.getByTestId('sticker-set-card-button');
        expect(stickerCardButton.textContent).toBe('OPEN');
        fireEvent.click(stickerCardButton);
        expect(mockDispatch).toHaveBeenCalled();
    });
});
