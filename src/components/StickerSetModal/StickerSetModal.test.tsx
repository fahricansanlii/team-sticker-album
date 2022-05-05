import { StickerSetModal } from 'components/StickerSetModal/StickerSetModal';
import { TeamMember } from 'store/models/team-member.model';
import { StickersState } from 'store/reducers/stickersSlice';
import { render, screen, fireEvent } from 'utils/test-utils';
const webTeam: TeamMember[] = require('data/web-team.json');

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => {
    const originalModule = jest.requireActual('react-router-dom');

    return {
        __esModule: true,
        ...originalModule,
        useNavigate: () => mockNavigate,
    };
});

const mockDispatch = jest.fn();
jest.mock('../../store/hook', () => {
    const originalModule = jest.requireActual('../../store/hook');

    return {
        __esModule: true,
        ...originalModule,
        useAppDispatch: () => mockDispatch,
    };
});

jest.mock('../TeamMemberCard/TeamMemberCard', () => ({
    __esModule: true,
    TeamMemberCard: () => {
        return <div data-testid="team-member-card"></div>;
    },
}));

jest.mock('../StickerSetCard/StickerSetCard', () => ({
    __esModule: true,
    StickerSetCard: () => {
        return <div data-testid="sticker-set-card"></div>;
    },
}));

describe('StickerSetModal component', () => {
    const mockCloseFn = jest.fn();

    afterEach(() => {
        jest.clearAllMocks();
    });

    const stickers: TeamMember[] = [];
    const stickersState: StickersState = {
        stickerSet: stickers,
        numOfStickerSets: 3,
    };
    const preloadedState = {
        stickers: stickersState,
    };

    it('should not render the modal when it is closed', () => {
        const { queryByTestId } = render(
            <StickerSetModal isModalOpen={false} closeModal={mockCloseFn}></StickerSetModal>,
            { preloadedState },
        );
        expect(queryByTestId('sticker-set-modal')).not.toBeInTheDocument();
    });

    describe('with a empty sticker set, ', () => {
        it('should render sticker cards when the modal is open and there is no sticker set', () => {
            render(
                <StickerSetModal isModalOpen={true} closeModal={mockCloseFn}></StickerSetModal>,
                {
                    preloadedState,
                },
            );
            expect(screen.getByTestId('sticker-set-modal')).toBeInTheDocument();
            expect(screen.getAllByTestId('sticker-set-card').length).toBe(3);
            expect(screen.getByTestId('sticker-set-modal-title')).toBeInTheDocument();
            expect(screen.getByTestId('sticker-set-modal-title').textContent).toBe(
                'DAILY STICKERS SETS',
            );
            expect(screen.getByTestId('sticker-set-modal-text')).toBeInTheDocument();
            expect(screen.getByTestId('sticker-set-modal-text').textContent).toBe(
                'YOU HAVE 3 STICKER SETS TO OPEN',
            );
        });

        it('should render close button and it should close the modal upon being clicked', () => {
            render(
                <StickerSetModal isModalOpen={true} closeModal={mockCloseFn}></StickerSetModal>,
                {
                    preloadedState,
                },
            );
            const closeButton = screen.getByTestId('sticker-set-modal-close-button');
            expect(closeButton).toBeInTheDocument();
            fireEvent.click(closeButton);
            expect(mockCloseFn).toHaveBeenCalled();
        });

        it('should not render paste to album button when there is no sticker set', () => {
            const { queryByTestId } = render(
                <StickerSetModal isModalOpen={true} closeModal={mockCloseFn}></StickerSetModal>,
                {
                    preloadedState,
                },
            );
            expect(
                queryByTestId('sticker-set-modal-paste-to-album-button'),
            ).not.toBeInTheDocument();
        });
    });

    describe('with a sticker set, ', () => {
        const stickers: TeamMember[] = webTeam.slice(0, 6).map((teamMember) => {
            return { ...teamMember, isRevealed: true };
        });
        const stickersState: StickersState = {
            stickerSet: stickers,
            numOfStickerSets: 3,
        };
        const preloadedState = {
            stickers: stickersState,
        };

        it('should render member cards when the modal is open and there is a sticker set', () => {
            render(
                <StickerSetModal isModalOpen={true} closeModal={mockCloseFn}></StickerSetModal>,
                {
                    preloadedState,
                },
            );
            expect(screen.getByTestId('sticker-set-modal')).toBeInTheDocument();
            expect(screen.getAllByTestId('team-member-card').length).toBe(6);
            expect(screen.getByTestId('sticker-set-modal-title')).toBeInTheDocument();
            expect(screen.getByTestId('sticker-set-modal-title').textContent).toBe(
                'STICKER SET HAS OPENED YOU 6 NEW STICKERS',
            );
        });

        it('should render paste to album button when there is a sticker set', () => {
            render(
                <StickerSetModal isModalOpen={true} closeModal={mockCloseFn}></StickerSetModal>,
                {
                    preloadedState,
                },
            );
            expect(
                screen.getByTestId('sticker-set-modal-paste-to-album-button'),
            ).toBeInTheDocument();
        });

        it('should render paste to album button when there is a sticker set', () => {
            render(
                <StickerSetModal isModalOpen={true} closeModal={mockCloseFn}></StickerSetModal>,
                {
                    preloadedState,
                },
            );
            expect(
                screen.getByTestId('sticker-set-modal-paste-to-album-button'),
            ).toBeInTheDocument();
        });

        it('should open the first team overview page when paste to album button is clicked', () => {
            render(
                <StickerSetModal isModalOpen={true} closeModal={mockCloseFn}></StickerSetModal>,
                {
                    preloadedState,
                },
            );
            const pasteToAlbumButton = screen.getByTestId(
                'sticker-set-modal-paste-to-album-button',
            );
            fireEvent.click(pasteToAlbumButton);
            expect(mockNavigate).toHaveBeenCalledWith('/1');
        });
    });
});
