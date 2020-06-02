import React from 'react';

const MessagesComponent = ({name, email, message, time}) => {
  return (
    <div className="received-card">
      <h3>{name}</h3>
      <div className="message-email">
        <p>
          <a href={`mailto:${email}`}>{email}</a>
        </p>
      </div>
      <p>{message}</p>
      <div className="timestamp">
        <p className="date-received">{time}</p>
      </div>
    </div>
  );
};

export default MessagesComponent;
