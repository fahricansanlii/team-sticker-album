import { useCallback } from 'react';
import { useAppDispatch } from 'store/hook';
import { loadStickerSet } from 'store/reducers/stickersSlice';
import './StickerSetCard.scss';

export const StickerSetCard = () => {
    const dispatch = useAppDispatch();

    const handleOnClick = useCallback(() => {
        dispatch(loadStickerSet());
    }, [dispatch]);

    return (
        <div data-testid="sticker-set-card" className="sticker-set-card">
            <div className="sticker-set-card__content">
                <h5 data-testid="sticker-set-card-title" className="sticker-set-card__title">
                    Trendyol
                    <span className="sticker-set-card__inner-title">tech</span>
                </h5>
                <p data-testid="sticker-set-card-text" className="sticker-set-card__text">
                    STICKER SET
                </p>
            </div>
            <button
                type="button"
                className="button sticker-set-card__button"
                data-testid="sticker-set-card-button"
                onClick={handleOnClick}
            >
                OPEN
            </button>
        </div>
    );
};
