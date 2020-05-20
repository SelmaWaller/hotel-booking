import React from 'react';

const MessagesComponent = ({name, email, message}) => {
  return (
    <>
      <h3>{name}</h3>
      <p>
        <a href={`mailto:${email}`}>{email}</a>
      </p>
      <p>{message}</p>
    </>
  );
};

export default MessagesComponent;
