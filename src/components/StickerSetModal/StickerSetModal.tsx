import { useCallback, useEffect } from 'react';
import ReactModal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import { StickerSetCard } from 'components/StickerSetCard/StickerSetCard';
import { TeamMemberCard } from 'components/TeamMemberCard/TeamMemberCard';
import { useAppDispatch, useAppSelector } from 'store/hook';
import {
    resetStickerSet,
    selectNumOfStickerSets,
    selectStickerSet,
} from 'store/reducers/stickersSlice';
import './StickerSetModal.scss';

if (!document.getElementById('root')) {
    const root = document.createElement('div');
    root.setAttribute('id', 'root');
    document.body.append(root);
}
ReactModal.setAppElement('#root');

export const StickerSetModal = ({
    isModalOpen,
    closeModal,
}: {
    isModalOpen: boolean;
    closeModal: () => void;
}) => {
    const numOfStickerSets = useAppSelector(selectNumOfStickerSets);
    const stickerSet = useAppSelector(selectStickerSet);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        return () => {
            dispatch(resetStickerSet());
        };
    }, [dispatch]);

    const handlePasteToYourAlbumClick = useCallback(() => {
        navigate('/1');
    }, [navigate]);

    const getStickers = () => {
        return (
            <div className="sticker-set-modal__sticker-cards">
                {stickerSet.length
                    ? stickerSet.map((sticker, index) => (
                          <div className="sticker-set-modal__sticker-card-container" key={index}>
                              <TeamMemberCard teamMember={sticker}></TeamMemberCard>
                          </div>
                      ))
                    : Array(numOfStickerSets)
                          .fill(0)
                          .map((_, index) => (
                              <div
                                  className="sticker-set-modal__sticker-card-container"
                                  key={index}
                              >
                                  <StickerSetCard></StickerSetCard>
                              </div>
                          ))}
            </div>
        );
    };

    const getTitle = useCallback(() => {
        if (stickerSet.length) {
            return `STICKER SET HAS OPENED YOU ${stickerSet.length} NEW STICKERS`;
        } else {
            return 'DAILY STICKERS SETS';
        }
    }, [stickerSet]);

    const getText = useCallback(() => {
        if (stickerSet.length) {
            return '';
        } else {
            return `YOU HAVE ${numOfStickerSets} STICKER SETS TO OPEN`;
        }
    }, [stickerSet, numOfStickerSets]);

    return (
        <ReactModal
            isOpen={isModalOpen}
            overlayClassName="sticker-set-modal__overlay"
            className="sticker-set-modal__content"
            shouldCloseOnOverlayClick={true}
            shouldCloseOnEsc={true}
            onRequestClose={closeModal}
        >
            <div data-testid="sticker-set-modal" className="sticker-set-modal">
                <div className="sticker-set-modal__header">
                    <h3 data-testid="sticker-set-modal-title" className="sticker-set-modal__title">
                        {getTitle()}
                    </h3>
                    <p data-testid="sticker-set-modal-text" className="sticker-set-modal__text">
                        {getText()}
                    </p>
                    <button
                        type="button"
                        className="button sticker-set-modal__close-button"
                        data-testid="sticker-set-modal-close-button"
                        onClick={closeModal}
                    >
                        <i className="bi bi-x"></i>
                    </button>
                </div>
                <div className="sticker-set-modal__body">{getStickers()}</div>
                {stickerSet.length ? (
                    <div className="sticker-set-modal__footer">
                        <button
                            type="button"
                            className="button sticker-set-modal__paste-button"
                            data-testid="sticker-set-modal-paste-to-album-button"
                            onClick={handlePasteToYourAlbumClick}
                        >
                            PASTE TO YOUR ALBUM
                        </button>
                    </div>
                ) : null}
            </div>
        </ReactModal>
    );
};
