import { TeamMember } from 'store/models/team-member.model';
import reducer, {
    updateStickers,
    resetStickerSet,
    stickersSlice,
    StickersState,
} from './stickersSlice';

describe('Stickers slice', () => {
    const teamMembersToBeRevealed: TeamMember[] = [
        {
            id: 11,
            first_name: 'Raine',
            last_name: 'Laffranconi',
            email: 'rlaffranconia@youtube.com',
            gender: 'Female',
            avatar: 4,
            job_title: 'Senior Sales Associate',
            team_id: 2,
            isRevealed: true,
        },
        {
            id: 12,
            first_name: 'Zacharias',
            last_name: 'Caplis',
            email: 'zcaplisb@ca.gov',
            gender: 'Male',
            avatar: 1,
            job_title: 'Assistant Manager',
            team_id: 2,
            isRevealed: true,
        },
        {
            id: 1,
            first_name: 'Justen',
            last_name: 'Binner',
            email: 'jbinner0@thetimes.co.uk',
            gender: 'Male',
            avatar: 1,
            job_title: 'Professor',
            team_id: 1,
            isRevealed: true,
        },
    ];

    const updatedStickersSlice: StickersState = {
        stickerSet: teamMembersToBeRevealed,
        numOfStickerSets: 2,
    };

    it('should have the correct initial state', () => {
        expect(stickersSlice.getInitialState()).toEqual({ stickerSet: [], numOfStickerSets: 3 });
    });

    it('should update the sticker sets', () => {
        const initialState = stickersSlice.getInitialState();

        expect(reducer(initialState, updateStickers(updatedStickersSlice))).toEqual(
            updatedStickersSlice,
        );
    });

    it('should reset the sticker sets', () => {
        expect(reducer(updatedStickersSlice, resetStickerSet())).toEqual({
            stickerSet: [],
            numOfStickerSets: 2,
        });
    });
});
