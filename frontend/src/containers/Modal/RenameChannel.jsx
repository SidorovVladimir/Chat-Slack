import React, { useRef, useEffect } from 'react';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { Modal, Button, Form } from 'react-bootstrap';
import LeoProfanity from 'leo-profanity';
import useChat from '../../hooks/useApi.jsx';
import {
  getChannelId,
  getChannelsName,
  getCurrentChannel,
} from '../../store/slices/selectors.js';
import { getModalShema } from '../../utils/validationShemas.js';
import { useSelectorCustom, useDispatchCustom, closeModalCustom } from '../../store/index.js';

const RenameChannel = () => {
  const { t } = useTranslation();
  const dispatch = useDispatchCustom();
  const currentChannel = useSelectorCustom(getCurrentChannel);
  const channelId = useSelectorCustom(getChannelId);
  const channelsName = useSelectorCustom(getChannelsName);

  const inputRef = useRef();

  const { renameChannel } = useChat();

  const hideModal = () => {
    dispatch(closeModalCustom());
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

  useEffect(() => {
    inputRef.current.select();
  }, []);

  const formik = useFormik({
    initialValues: {
      name: currentChannel.name,
    },
    validationSchema: getModalShema(channelsName, t),
    onSubmit: (values) => {
      const filteredChannel = LeoProfanity.clean(values.name);
      const newChannel = { id: channelId, name: filteredChannel };
      renameChannel(newChannel, handleStatus);
    },
    validateOnBlur: false,
    validateOnChange: false,
  });
  return (
    <Modal show centered onHide={hideModal}>
      <Modal.Header closeButton>
        <Modal.Title>{t('modal.titleRenameChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Control
              ref={inputRef}
              name="name"
              id="name"
              className="mb-2"
              value={formik.values.name}
              required
              onChange={formik.handleChange}
              isInvalid={!formik.isValid}
            />
            <Form.Label className="visually-hidden" htmlFor="name">
              {t('modal.channelNameLabel')}
            </Form.Label>

            <Form.Control.Feedback type="invalid">
              {formik.errors.name}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="d-flex justify-content-end">
            <Button
              type="button"
              className="me-2"
              variant="secondary"
              onClick={hideModal}
            >
              {t('modal.buttonCancel')}
            </Button>
            <Button type="submit">{t('modal.buttonSend')}</Button>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
export default RenameChannel;
