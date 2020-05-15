import React, {useState} from 'react';

import Illustration from '../components/illustration';
import trees from '../svgs/trees.svg';

function Contact() {
  const [responseMessage, setResponseMessage] = useState(false);
  const [clientNameError, setClientNameError] = useState(true);
  const [emailError, setEmailError] = useState(true);

  let handleChange = input => {
    let clientName = input.target.name;
    let value = input.target.value;
    let clientNamePattern = /^[a-zA-Zæøå -]+$/;
    let emailPattern = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;

    switch (clientName) {
      case 'clientName':
        clientNamePattern.test(value)
          ? setClientNameError(false)
          : setClientNameError(true);
        break;
      case 'email':
        emailPattern.test(value) ? setEmailError(false) : setEmailError(true);
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
              <form method="POST" action="contact-success.php">
                <label htmlFor="clientName">Full name</label>
                <input
                  onChange={handleChange}
                  type="text"
                  name="clientName"
                  id="clientName"
                />
                <p className={clientNameError ? 'error' : 'error__hidden'}>
                  Only letters, no special characters
                </p>
                <label htmlFor="email">Email Address</label>
                <input
                  onChange={handleChange}
                  type="text"
                  name="email"
                  id="email"
                />
                <p className={emailError ? 'error' : 'error__hidden'}>
                  Must be a valid email address
                </p>
                <label for="message">Message</label>
                <textarea
                  name="message"
                  id="message"
                  rows="8"
                  cols="80"
                ></textarea>
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
