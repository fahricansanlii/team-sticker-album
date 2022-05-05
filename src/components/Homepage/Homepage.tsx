import { useCallback, useState } from 'react';
import { StickerSetModal } from 'components/StickerSetModal/StickerSetModal';
import './Homepage.scss';

export const Homepage = () => {
    const [modalOpen, setModalOpen] = useState(false);

    const openModal = useCallback(() => setModalOpen(true), []);
    const closeModal = useCallback(() => setModalOpen(false), []);

    return (
        <>
            <div className="homepage">
                <div className="homepage__body">
                    <h1 data-testid="homepage-title" className="homepage__title">
                        Trendyol
                        <span className="homepage__inner-title">tech</span>
                    </h1>
                </div>
                <div className="homepage__footer">
                    <p data-testid="homepage-text" className="homepage__text">
                        sticker album
                    </p>
                    <button
                        data-testid="homepage-button"
                        type="button"
                        className="button homepage__button"
                        onClick={openModal}
                    >
                        Get your daily stickers
                    </button>
                </div>
            </div>
            {modalOpen ? (
                <StickerSetModal isModalOpen={modalOpen} closeModal={closeModal}></StickerSetModal>
            ) : null}
        </>
    );
};
