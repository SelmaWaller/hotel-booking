import React from 'react';

const ReceivedMessages = ({name, email, message, time}) => {
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
        <p>
          <span>Received: </span>
          {time}
        </p>
      </div>
    </div>
  );
};

export default ReceivedMessages;
