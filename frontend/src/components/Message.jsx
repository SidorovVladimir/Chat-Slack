import React from 'react';

const Message = (props) => {
  const {
    message,
    lastMessage,
  } = props;

  return (
    <div ref={lastMessage} className="text-break mb-2">
      <b>{message.username}</b>
      {': '}
      {message.body}
    </div>
  );
};

export default Message;
