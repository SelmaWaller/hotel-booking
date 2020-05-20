import React, {useEffect, useState} from 'react';
import axios from 'axios';
import ReactLoading from 'react-loading';

import MessagesComponent from '../../components/messages-component';
import {CONTACT_API} from '../../constants/constants';

export default function Messages() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState(true);

  useEffect(() => {
    axios.get(CONTACT_API).then((messages) => {
      setMessages(messages.data);
    });
  }, []);

  let readMessage = () => {
    setNewMessage(false);
  };
  return (
    <div className="enquiries-and-messages">
      <div className="container__inner">
        <h1>Messages</h1>
      </div>
      <div className="admin-grid">
        {messages ? (
          messages.map((message, index) => {
            return (
              <div
                className={newMessage ? 'card' : 'card__read'}
                key={index}
                onClick={readMessage}
              >
                <MessagesComponent
                  key={index}
                  name={message.clientName}
                  email={message.email}
                  message={message.message}
                />
              </div>
            );
          })
        ) : (
          <>
            <div className="loading-circle">
              <ReactLoading
                type={'spinningBubbles'}
                color={'#ffc69c'}
                height={100}
                width={100}
              />
            </div>
          </>
        )}
        <div className="card"></div>
      </div>
    </div>
  );
}