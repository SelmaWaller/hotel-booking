import React, {useState} from 'react';
import axios from 'axios';
import Illustration from '../components/illustration';
import trees from '../svgs/trees.svg';

function Contact() {
  const [responseMessage, setResponseMessage] = useState(false);
  const [clientNameError, setClientNameError] = useState(true);
  const [emailError, setEmailError] = useState(true);
  const [clientName, setClientName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  let handleChange = input => {
    let name = input.target.name;
    let value = input.target.value;
    let clientNamePattern = /^[a-zA-Zæøå -]+$/;
    let emailPattern = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;

    switch (name) {
      case 'clientName':
        clientNamePattern.test(value)
          ? setClientNameError(false)
          : setClientNameError(true);
        setClientName(value);
        break;
      case 'email':
        emailPattern.test(value) ? setEmailError(false) : setEmailError(true);
        setEmail(value);
        break;
      case 'message':
        setMessage(value);
      default:
        break;
    }
  };

  let handleSubmit = e => {
    e.preventDefault();
    axios({
      method: 'post',
      url: 'http://localhost/holidaze/contact-success.php',
      headers: {'content-type': 'application/json'},
      data: clientName,
      email,
      message,
    })
      .then(result => {
        console.log(result.data.sent);
      })
      .catch(error => console.log(error));
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
              <form onSubmit={handleSubmit}>
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
                <label htmlFor="message">Message</label>
                <textarea
                  onChange={handleChange}
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
