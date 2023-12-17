import React, { useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Modal, Button, Form } from "react-bootstrap";
import useChat from "../hooks/useChat.jsx";
import {
  getChannels,
  getTypeModal,
  getChannelId,
} from "../slices/selectors.js";

const getValidationShema = (channel) =>
  Yup.object().shape({
    name: Yup.string()
      .trim()
      .required("Обязательное поле")
      .min(3, "От 3 до 20 символов")
      .max(20, "От 3 до 20 символов")
      .notOneOf(channel, "Должно быть уникальным"),
  });

const AddChannel = ({ hideModal }) => {
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
      name: "",
    },
    validationSchema: getValidationShema(channelsName),
    onSubmit: (values) => {
      const newNameChannel = { name: values.name };
      chatApi.addNewChannel(newNameChannel);
      hideModal();
    },
  });

  return (
    <Modal show centered onHide={hideModal}>
      <Modal.Header closeButton>
        <Modal.Title>Добавить канал</Modal.Title>
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
              Имя канала
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
              Отменить
            </Button>
            <Button type="submit">Отправить</Button>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

const RemoveChannel = ({ hideModal }) => {
  const chatApi = useChat();
  const channelId = useSelector(getChannelId);

  const handleRemoveChannel = (id) => {
    chatApi.removeChannel(id);
    hideModal();
  };

  return (
    <Modal show centered onHide={hideModal}>
      <Modal.Header closeButton>
        <Modal.Title>Удалить канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">Уверены?</p>

        <div className="d-flex justify-content-end">
          <Button
            type="button"
            className="me-2"
            variant="secondary"
            onClick={hideModal}
          >
            Отменить
          </Button>
          <Button
            variant="danger"
            type="button"
            onClick={() => handleRemoveChannel(channelId)}
          >
            Удалить
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

const RenameChannel = ({ hideModal }) => {
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
    validationSchema: getValidationShema(channelsName),
    onSubmit: (values) => {
      const newChannel = { id: channelId, name: values.name };
      chatApi.renameChannel(newChannel);
      hideModal();
    },
  });
  return (
    <Modal show centered onHide={hideModal}>
      <Modal.Header closeButton>
        <Modal.Title>Переименовать канал</Modal.Title>
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
              Имя канала
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
              Отменить
            </Button>
            <Button type="submit">Отправить</Button>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

const Component = (props) => {
  const { type, hideModal } = props;

  const modals = {
    adding: AddChannel,
    removing: RemoveChannel,
    renaming: RenameChannel,
  };
  const CurrentComponent = modals[type];

  return <CurrentComponent hideModal={hideModal} />;
};

const ModalComponent = (props) => {
  const { hideModal } = props;
  const type = useSelector(getTypeModal);

  return type && <Component type={type} hideModal={hideModal} />;
};

export default ModalComponent;
