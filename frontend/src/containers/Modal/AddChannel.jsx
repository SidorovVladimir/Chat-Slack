import React, { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { Modal, Button, Form } from 'react-bootstrap';
import LeoProfanity from 'leo-profanity';
import { toast } from 'react-toastify';
import useChat from '../../hooks/useApi.jsx';
import useAuth from '../../hooks/useAuth.jsx';
import { getChannelsName } from '../../store/slices/selectors.js';
import { closeModal } from '../../store/slices/modalsSlice.js';
import { getModalShema } from '../../utils/validationShemas.js';

const AddChannel = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const channelsName = useSelector(getChannelsName);
  const inputRef = useRef();
  const { currentUser } = useAuth();

  const { addNewChannel } = useChat();

  const hideModal = () => {
    dispatch(closeModal());
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
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: getModalShema(channelsName, t),
    onSubmit: (values) => {
      const filteredChannel = LeoProfanity.clean(values.name);
      const newNameChannel = { name: filteredChannel, author: currentUser };
      addNewChannel(newNameChannel, handleStatus);
    },
    validateOnBlur: false,
    validateOnChange: false,
  });

  return (
    <Modal show centered onHide={hideModal}>
      <Modal.Header closeButton>
        <Modal.Title>{t('modal.titleAddChannel')}</Modal.Title>
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
export default AddChannel;
