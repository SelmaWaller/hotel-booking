import React, {useEffect, useState} from 'react';
import axios from 'axios';

import ReceivedMessages from '../../components/received-messages';
import {CONTACT_API} from '../../constants/constants';
import Illustration from '../../components/illustration';
import trees from '../../svgs/trees.svg';

export default function Messages() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    document.title = 'Holidaze | Messages';
    axios.get(CONTACT_API).then((messages) => {
      setMessages(
        messages.data.sort(function (newer, older) {
          return (
            new Date(older.time).getTime() - new Date(newer.time).getTime()
          );
        })
      );
    });
  }, []);

  return (
    <div className="styled-scroll">
      <div className="blur">
        <Illustration />
      </div>
      <div className="enquiries-and-messages">
        <div className="messages">
          <div className="container__inner">
            <h1>Messages</h1>
          </div>
          {messages ? (
            messages.map((message, index) => {
              return (
                <ReceivedMessages
                  key={index}
                  name={message.clientName}
                  email={message.email}
                  message={message.message}
                  time={new Date(message.time)
                    .toLocaleDateString()
                    .split('.')
                    .join('/')}
                />
              );
            })
          ) : (
            <div className="enquiries-and-messages__empty">
              <p>No messages received yet</p>
              <img src={trees} alt="illustration" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
