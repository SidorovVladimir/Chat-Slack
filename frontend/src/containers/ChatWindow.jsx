import React, { useRef, useEffect } from 'react';
import { Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import {
  getCurrentChannelMessages,
  getCurrentChannel,
} from '../store/slices/selectors';
import ChatInput from './ChatInput';
import Message from '../components/Message';
import { useCustomSelector } from '../store/index.js';

const ChatWindow = () => {
  const { t } = useTranslation();
  const lastMessage = useRef(null);
  const currentChannelMessages = useCustomSelector(getCurrentChannelMessages);
  const currentChannel = useCustomSelector(getCurrentChannel);
  useEffect(() => {
    if (lastMessage.current) {
      lastMessage.current.scrollIntoView({ behavior: 'instant' });
    }
  }, [currentChannelMessages]);

  return (
    <Col className="p-0 h-100">
      <div className="d-flex flex-column h-100">
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
        <div id="messages-box" className="chat-messages overflow-auto px-5">
          {currentChannelMessages.map((message) => (
            <Message
              key={message.id}
              message={message}
              lastMessage={lastMessage}
            />
          ))}
        </div>
        <ChatInput />
      </div>
    </Col>
  );
};

export default ChatWindow;
