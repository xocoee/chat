import React, { useEffect, useRef } from 'react';

const MessageList = ({ messages }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: 'auto' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div id="messages-box" className="chat-messages overflow-auto px-5">
      {messages.map((message) => (
        <div key={message.id} className="text-break mb-2">
          <b>{message.username}</b>
          {': '}
          {message.body}
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;
