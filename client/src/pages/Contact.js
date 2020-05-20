import React, {useState} from 'react';
import Illustration from '../components/illustration';
import trees from '../svgs/trees.svg';

import {CONTACT_SUCCESS} from '../constants/constants';
const minMessageChars = 10;

export default function Contact() {
  const [responseMessage, setResponseMessage] = useState(false);
  const [nameError, setNameError] = useState(true);
  const [emailError, setEmailError] = useState(true);
  const [messageError, setMessageError] = useState(true);
  const [count, setCount] = useState(minMessageChars);

  let handleChange = (input) => {
    let name = input.target.name;
    let value = input.target.value;
    let namePattern = /^([a-zæøåA-ZÆØÅ'-]{2,})+(\W{1})+([a-zæøåA-ZÆØÅ '-]{2,})$/;
    let emailPattern = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;
    let messagePattern = /^(.{10,})$/;

    switch (name) {
      case 'clientName':
        setNameError(!namePattern.test(value));
        break;
      case 'email':
        setEmailError(!emailPattern.test(value));
        break;
      case 'message':
        setCount(minMessageChars - value.length);
        setMessageError(!messagePattern.test(value));
        break;
      default:
        break;
    }
  };

  return (
    <>
      <div className="blur">
        <Illustration />
      </div>
      <div className="contact">
        <div className="contact__background">
          <div className="container__inner">
            <h1>Contact</h1>
            <div className="form">
              <form
                method="POST"
                action={CONTACT_SUCCESS}
                onSubmit={() => {
                  alert('*receipt popup*');
                }}
              >
                <label htmlFor="clientName">Full name</label>
                <input onChange={handleChange} type="text" name="clientName" />
                <p className={nameError ? 'error' : 'error__hidden'}>
                  No invalid characters
                </p>
                <label htmlFor="email">Email Address</label>
                <input onChange={handleChange} type="text" name="email" />
                <p className={emailError ? 'error' : 'error__hidden'}>
                  Must be a valid email address
                </p>
                <label htmlFor="message">Message</label>
                <textarea
                  onChange={handleChange}
                  name="message"
                  rows="8"
                  cols="80"
                ></textarea>
                <p className={messageError ? 'error' : 'error__hidden'}>
                  Requires {count} more characters
                </p>
                <div className="paired">
                  <button type="submit">Submit</button>
                  <p
                    className={
                      responseMessage ? 'response' : 'response__hidden'
                    }
                  >
                    Message sent!
                  </p>
                </div>
              </form>
            </div>
          </div>
          <img src={trees} alt="illustration" />
        </div>
      </div>
    </>
  );
}
