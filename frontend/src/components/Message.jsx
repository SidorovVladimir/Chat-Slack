import React from 'react';
import LeoProfanity from 'leo-profanity';

const Message = (props) => {
  const {
    message,
    lastMessage,
  } = props;
  const filteredMessage = LeoProfanity.clean(message.body);

  return (
    <div ref={lastMessage} className="text-break mb-2">
      <b>{message.username}</b>
      {': '}
      {filteredMessage}
    </div>
  );
};

export default Message;
