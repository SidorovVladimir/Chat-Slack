import React from 'react';
import { useTranslation } from 'react-i18next';
import { Modal, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import useChat from '../../hooks/useApi.jsx';
import { getChannelId } from '../../store/slices/selectors.js';
import { useCustomSelector, useCustomDispatch, wrapCloseModal } from '../../store/index.js';

const RemoveChannel = () => {
  const { t } = useTranslation();
  const dispatch = useCustomDispatch();
  const { removeChannel } = useChat();
  const channelId = useCustomSelector(getChannelId);

  const hideModal = () => {
    dispatch(wrapCloseModal());
  };

  const handleStatus = ({ status }) => {
    switch (status) {
      case 'Network error':
        toast.error(t('errors.networkError'));
        break;
      case 'ok':
        hideModal();
        break;
      default:
        toast.error(t('errors.unknownError'));
    }
  };

  const handleRemoveChannel = (id) => {
    removeChannel(id, handleStatus);
  };

  return (
    <Modal show centered onHide={hideModal}>
      <Modal.Header closeButton>
        <Modal.Title>{t('modal.titleDeleteChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">{t('modal.subTitle')}</p>

        <div className="d-flex justify-content-end">
          <Button
            type="button"
            className="me-2"
            variant="secondary"
            onClick={hideModal}
          >
            {t('modal.buttonCancel')}
          </Button>
          <Button
            variant="danger"
            type="button"
            onClick={() => handleRemoveChannel(channelId)}
          >
            {t('modal.buttonDelete')}
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};
export default RemoveChannel;
