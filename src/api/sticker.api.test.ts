import { generateStickerSet } from './sticker.api';

describe('Sticker api', () => {
    it('generates a sticker set', async () => {
        const stickerSet = await generateStickerSet();
        expect(stickerSet).toHaveLength(6);
    });
});
