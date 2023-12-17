import React from "react";
import { useSelector } from "react-redux";
import { Col } from "react-bootstrap";
import {
  getCurrentChannelId,
  getMessages,
  getChannels,
} from "../slices/selectors";
import MessageForm from "./MessageForm";

const Header = () => {
  const messages = useSelector(getMessages);
  const channels = useSelector(getChannels);
  const channelId = useSelector(getCurrentChannelId);
  const currentChannel = Object.values(channels.entities).find(
    ({ id }) => id === channelId
  );
  const currentChannelMessages = Object.values(messages.entities).filter(
    (msg) => msg.channelId === channelId
  );

  return (
    <div className="bg-light mb-4 p-3 shadow-sm small">
      <p className="m-0">
        <b>{`# ${currentChannel?.name}`}</b>
      </p>
      <span className="text-muted">{`${currentChannelMessages.length} message`}</span>
    </div>
  );
};

const Body = () => {
  const channelId = useSelector(getCurrentChannelId);
  const messages = useSelector(getMessages);
  const currentChannelMessages = Object.values(messages.entities).filter(
    (msg) => msg.channelId === channelId
  );

  return (
    <div id="messages-box" className="chat-messages overflow-auto px-5">
      {currentChannelMessages.map((message) => (
        <div key={message.id} className="text-break mb-2">
          <b>{message.username}</b>
          {": "}
          {message.body}
        </div>
      ))}
    </div>
  );
};

const Chat = () => (
  <Col className="p-0 h-100">
    <div className="d-flex flex-column h-100">
      <Header />
      <Body />
      <MessageForm />
    </div>
  </Col>
);

export default Chat;
