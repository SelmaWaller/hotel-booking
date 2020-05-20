import React, {useState} from 'react';
import Illustration from '../components/illustration';
import trees from '../svgs/trees.svg';

import {CONTACT_SUCCESS} from '../constants/constants';
const minMessageChars = 10;

function Contact() {
  const [responseMessage, setResponseMessage] = useState(false);
  const [clientNameError, setClientNameError] = useState(true);
  const [emailError, setEmailError] = useState(true);
  const [messageError, setMessageError] = useState(true);
  const [count, setCount] = useState(minMessageChars);

  let handleChange = (input) => {
    let name = input.target.name;
    let value = input.target.value;
    let clientNamePattern = /^([a-zæøåA-ZÆØÅ'-]{2,})+(\W{1})+([a-zæøåA-ZÆØÅ '-]{2,})$/;
    let emailPattern = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;
    let messagePattern = /^(.{10,})$/;

    switch (name) {
      case 'clientName':
        clientNamePattern.test(value)
          ? setClientNameError(false)
          : setClientNameError(true);
        break;
      case 'email':
        emailPattern.test(value) ? setEmailError(false) : setEmailError(true);
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
                <p className={clientNameError ? 'error' : 'error__hidden'}>
                  Please enter your first and last name
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
                  {count} more characters required
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

export default Contact;
