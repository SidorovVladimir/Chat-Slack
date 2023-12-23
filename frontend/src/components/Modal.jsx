import React, { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import { Modal, Button, Form } from 'react-bootstrap';
import useChat from '../hooks/useChat.jsx';
import {
  getChannels,
  getTypeModal,
  getChannelId,
} from '../slices/selectors.js';

const getValidationShema = (channel, t) =>
  Yup.object().shape({
    name: Yup.string()
      .trim()
      .required(t('validate.required'))
      .min(3, t('validate.min_max'))
      .max(20, t('validate.min_max'))
      .notOneOf(channel, t('validate.unique')),
  });

const AddChannel = ({ handleStatus, hideModal }) => {
  const { t } = useTranslation();
  const channels = useSelector(getChannels);
  const channelsName = Object.values(channels.entities).map(
    (channel) => channel.name
  );
  const inputRef = useRef();

  const chatApi = useChat();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: getValidationShema(channelsName, t),
    onSubmit: (values) => {
      const newNameChannel = { name: values.name };
      chatApi.addNewChannel(newNameChannel, handleStatus);
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

const RemoveChannel = ({ handleStatus, hideModal }) => {
  const { t } = useTranslation();
  const chatApi = useChat();
  const channelId = useSelector(getChannelId);

  const handleRemoveChannel = (id) => {
    chatApi.removeChannel(id, handleStatus);
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

const RenameChannel = ({ handleStatus, hideModal }) => {
  const { t } = useTranslation();
  const channels = useSelector(getChannels);
  const channelId = useSelector(getChannelId);
  const channelsName = Object.values(channels.entities).map(
    (channel) => channel.name
  );
  const currentChannel = channels.entities[channelId];

  const inputRef = useRef();

  const chatApi = useChat();

  useEffect(() => {
    inputRef.current.select();
  }, []);

  const formik = useFormik({
    initialValues: {
      name: currentChannel.name,
    },
    validationSchema: getValidationShema(channelsName, t),
    onSubmit: (values) => {
      const newChannel = { id: channelId, name: values.name };
      chatApi.renameChannel(newChannel, handleStatus);
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

const Component = (props) => {
  const { type, handleStatus, hideModal } = props;

  const modals = {
    adding: AddChannel,
    removing: RemoveChannel,
    renaming: RenameChannel,
  };
  const CurrentComponent = modals[type];

  return <CurrentComponent handleStatus={handleStatus} hideModal={hideModal} />;
};

const ModalComponent = (props) => {
  const { handleStatus, hideModal } = props;
  const type = useSelector(getTypeModal);

  return (
    type && (
      <Component
        type={type}
        handleStatus={handleStatus}
        hideModal={hideModal}
      />
    )
  );
};

export default ModalComponent;
