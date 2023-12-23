import React, { useRef, useEffect } from 'react';
// import React from 'react';
import { useSelector } from 'react-redux';
import { Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import {
  getCurrentChannelId,
  getMessages,
  getChannels,
} from '../slices/selectors';
import MessageForm from './MessageForm';

const Header = () => {
  const { t } = useTranslation();
  const messages = useSelector(getMessages);
  const channels = useSelector(getChannels);
  const channelId = useSelector(getCurrentChannelId);
  const currentChannel = Object.values(channels.entities).find(
    ({ id }) => id === channelId,
  );
  const currentChannelMessages = Object.values(messages.entities).filter(
    (msg) => msg.channelId === channelId,
  );

  return (
    <div className="bg-light mb-4 p-3 shadow-sm small">
      <p className="m-0">
        <b>{`# ${currentChannel?.name}`}</b>
      </p>
      <span className="text-muted">
        {`${currentChannelMessages.length} ${t('chat.messageCount', {
          count: currentChannelMessages.length,
        })}`}
      </span>
    </div>
  );
};

const Body = () => {
  const lastMessage = useRef(null);
  const channelId = useSelector(getCurrentChannelId);
  const messages = useSelector(getMessages);
  const currentChannelMessages = Object.values(messages.entities).filter(
    (msg) => msg.channelId === channelId,
  );
  //  Не срабатывает скролл на последнее сообщение канала при переключении каналов

  useEffect(() => {
    if (lastMessage.current) {
      lastMessage.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [currentChannelMessages.length, channelId]);

  return (
    <div id="messages-box" className="chat-messages overflow-auto px-5">
      {currentChannelMessages.map((message, index) => {
        const isLastMessage = index === currentChannelMessages.length - 1;

        return (
          <div ref={isLastMessage ? lastMessage : null} key={message.id} className="text-break mb-2">
            <b>{message.username}</b>
            {': '}
            {message.body}
          </div>
        );
      })}
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
