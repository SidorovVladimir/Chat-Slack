import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Col, Button, Dropdown, ButtonGroup } from "react-bootstrap";
import {
  setCurrentChannel,
  addChannel,
  removeChannel,
  renameChannel,
} from "../slices/channelsSlice";
import { addMessage } from "../slices/messagesSlice";
import { getChannels } from "../slices/selectors";
import { closeModal, openModal } from "../slices/modalsSlice";
import ModalComponent from "./Modal.jsx";
import useChat from "../hooks/useChat";

const Channel = ({ channels, channel, showModal, handleSetCurrenChannel }) => {
  const variant = channel.id === channels.currentChannelId ? "secondary" : "";

  return (
    <li key={channel.id} className="nav-item w-100">
      {channel.removable ? (
        <Dropdown as={ButtonGroup} className="d-flex">
          <Button
            variant={variant}
            className="w-100 rounded-0 text-start btn text-truncate"
            onClick={() => handleSetCurrenChannel(channel.id)}
          >
            <span className="me-1">#</span>
            {channel.name}
          </Button>
          <Dropdown.Toggle split variant={variant} className="flex-grow-0">
            <span className="visually-hidden">Управление каналом</span>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => showModal("removing", channel.id)}>
              Удалить
            </Dropdown.Item>
            <Dropdown.Item onClick={() => showModal("renaming", channel.id)}>
              Переименовать
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      ) : (
        <Button
          variant={variant}
          className="w-100 rounded-0 text-start btn"
          onClick={() => handleSetCurrenChannel(channel.id)}
        >
          <span className="me-1">#</span>
          {channel.name}
        </Button>
      )}
    </li>
  );
};

const ChannelsList = () => {
  const dispatch = useDispatch();
  const chatApi = useChat();
  const channels = useSelector(getChannels);

  useEffect(() => {
    const setNewMessage = (newMessage) => {
      dispatch(addMessage(newMessage));
    };

    const setNewChannel = (newChannel) => {
      dispatch(addChannel(newChannel));
      dispatch(setCurrentChannel(newChannel.id));
    };
    const setRemoveChannel = ({ id }) => {
      dispatch(removeChannel(id));
      dispatch(setCurrentChannel(channels.defaultChannelId));
    };
    const setRenameChannel = (channel) => {
      dispatch(renameChannel(channel));
    };

    chatApi.socket.on("newMessage", setNewMessage);
    chatApi.socket.on("newChannel", setNewChannel);
    chatApi.socket.on("removeChannel", setRemoveChannel);
    chatApi.socket.on("renameChannel", setRenameChannel);

    return () => {
      chatApi.socket.off("newMessage", setNewMessage);
      chatApi.socket.off("newChannel", setNewChannel);
      chatApi.socket.off("removeChannel", setRemoveChannel);
      chatApi.socket.off("renameChannel", setRenameChannel);
    };
  }, [chatApi.socket, dispatch, channels.defaultChannelId]);

  const handleSetCurrenChannel = (id) => {
    dispatch(setCurrentChannel(id));
  };

  const showModal = (type, id = null) => {
    dispatch(openModal({ type, id }));
  };
  const hideModal = () => {
    dispatch(closeModal());
  };

  return (
    <Col
      md={2}
      className="col-4 border-end px-0 bg-light flex-column h-100 d-flex"
    >
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>Каналы</b>
        <Button
          className="p-0 text-primary"
          variant="group-vertical"
          onClick={() => showModal("adding")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            width="20"
            height="20"
            fill="currentColor"
          >
            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
          </svg>
          <span className="visually-hidden">+</span>
        </Button>
      </div>
      <ul
        id="channels-box"
        className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block"
      >
        {Object.values(channels.entities).map((channel) => (
          <Channel
            key={channel.id}
            channel={channel}
            channels={channels}
            showModal={showModal}
            handleSetCurrenChannel={handleSetCurrenChannel}
          />
        ))}
      </ul>
      <ModalComponent hideModal={hideModal} />
    </Col>
  );
};

export default ChannelsList;
