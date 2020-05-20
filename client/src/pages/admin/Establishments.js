import React, {useEffect, useState} from 'react';
import axios from 'axios';
import ReactLoading from 'react-loading';

import cabin_mobile from '../../images/cabin_mobile.png';
import {
  ESTABLISHMENTS_API,
  ADD_ESTABLISHMENT_SUCCESS,
} from '../../constants/constants';
import MyEstablishments from '../../components/my-establishments';

const minChars = 20;

export default function Establishments() {
  const [modalOpen, setModalOpen] = useState(true);
  const [establishments, setEstablishments] = useState([]);
  const [nameError, setNameError] = useState(true);
  const [emailError, setEmailError] = useState(true);
  const [imageError, setImageError] = useState(true);
  const [priceError, setPriceError] = useState(true);
  const [guestError, setGuestError] = useState(true);
  const [googleLatError, setGoogleLatError] = useState(true);
  const [googleLngError, setGoogleLngError] = useState(true);
  const [descriptionError, setDescriptionError] = useState(true);
  const [count, setCount] = useState(minChars);

  useEffect(() => {
    axios.get(ESTABLISHMENTS_API).then((establishments) => {
      setEstablishments(establishments.data);
    });
  }, []);

  let handleChange = (input) => {
    let name = input.target.name;
    let value = input.target.value;
    let namePattern = /^([a-zæøåA-ZÆØÅ ]{3,})$/;
    let emailPattern = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;
    let imagePattern = /^(http)+(.{10,})+\.([A-Za-z]{2,3})$/;
    let coordinatesPattern = /^([0-9]{1})+\.([0-9]{5,})$/;
    let descriptionPattern = /^(.{20,})$/;

    switch (name) {
      case 'establishmentName':
        setNameError(!namePattern.test(value));
        break;
      case 'establishmentEmail':
        setEmailError(!emailPattern.test(value));
        break;
      case 'imageUrl':
        setImageError(!imagePattern.test(value));
        break;
      case 'price':
        setPriceError(!value > 1);
        break;
      case 'maxGuests':
        setGuestError(!value > 1);
        break;
      case 'googleLat':
        setGoogleLatError(!coordinatesPattern.test(value));
        break;
      case 'googleLong':
        setGoogleLngError(!coordinatesPattern.test(value));
        break;
      case 'description':
        setCount(minChars - value.length);
        setDescriptionError(!descriptionPattern.test(value));
        break;
      default:
        break;
    }
  };

  const openModal = () => {
    window.scrollTo(0, 0);
    setModalOpen(!modalOpen);
  };

  let closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <div className={modalOpen ? 'modal' : 'modal__closed'}>
        <button className="closeModal" onClick={closeModal}>
          <div className="bar1"></div>
          <div className="bar2"></div>
        </button>
        <div className="form">
          <form
            method="POST"
            action={ADD_ESTABLISHMENT_SUCCESS}
            onSubmit={() => {
              alert('*receipt popup*');
            }}
          >
            <div className="title">
              <input type="text" defaultValue={'New establishment'} readOnly />
            </div>
            <label htmlFor="establishmentName">Establishment name</label>
            <input
              onChange={handleChange}
              type="text"
              name="establishmentName"
            />
            <p className={nameError ? 'error' : 'error__hidden'}>
              Only letters, no special characters
            </p>
            <label htmlFor="establishmentEmail">Email Address</label>
            <input
              onChange={handleChange}
              type="text"
              name="establishmentEmail"
            />
            <p className={emailError ? 'error' : 'error__hidden'}>
              Must be a valid email address
            </p>
            <label htmlFor="imageUrl">Image URL</label>
            <input onChange={handleChange} type="text" name="imageUrl" />
            <p className={'error'}>Accommodation image is required</p>
            <label htmlFor="price">Price per night</label>
            <input
              onChange={handleChange}
              type="number"
              name="price"
              placeholder="$"
              min="1"
            />
            <p className={priceError ? 'error' : 'error__hidden'}>
              This field cannot be empty
            </p>
            <label htmlFor="maxGuests">Max guests</label>
            <input
              onChange={handleChange}
              type="number"
              name="maxGuests"
              placeholder="person"
              min="1"
            />
            <p className={guestError ? 'error' : 'error__hidden'}>
              This field cannot be empty
            </p>
            <label htmlFor="googleLat">Google latitude coordinates</label>
            <input onChange={handleChange} type="text" name="googleLat" />
            <p className={googleLatError ? 'error' : 'error__hidden'}>
              Latitude number is required
            </p>
            <label htmlFor="googleLong">Google longitude coordinates</label>
            <input onChange={handleChange} type="text" name="googleLong" />
            <p className={googleLngError ? 'error' : 'error__hidden'}>
              Longitude number is required
            </p>
            <label htmlFor="description">Description</label>
            <textarea
              onChange={handleChange}
              name="description"
              rows="5"
              cols="80"
              placeholder="A brief description about the accommodation"
            ></textarea>
            <p className={descriptionError ? 'error' : 'error__hidden'}>
              Requires {count} more characters
            </p>
            <label htmlFor="selfCatering">Self-catering</label>
            <div className="switch">
              <input
                onChange={handleChange}
                type="checkbox"
                name="selfCatering"
              />
              <div className="switchThumb"></div>
            </div>
            <label htmlFor="id">ID</label>
            <input onChange={handleChange} type="number" min="8" max="8" />
            <p className={'error'}>This field is required</p>
            <button
              type="submit"
              disabled={
                nameError ||
                emailError ||
                imageError ||
                priceError ||
                guestError ||
                googleLatError ||
                googleLngError ||
                descriptionError
              }
            >
              Submit
            </button>
          </form>
        </div>
        <img src={cabin_mobile} alt="illustration" />
      </div>

      <div
        className={modalOpen ? 'new-establishment__blur' : 'new-establishment'}
      >
        <div className="new-establishment__background">
          <div className="container__inner">
            <button onClick={openModal}>Create new</button>
            <h1>My establishments</h1>
            <div className="grid">
              {establishments ? (
                establishments.map((establishment, index) => {
                  return (
                    <div className="card" key={index}>
                      <MyEstablishments
                        key={index}
                        img={establishment.imageUrl}
                        name={establishment.establishmentName}
                        email={establishment.establishmentEmail}
                        price={establishment.price}
                        guests={establishment.maxGuests}
                        catering={establishment.selfCatering}
                        lat={establishment.googleLat}
                        lng={establishment.googleLong}
                        description={establishment.description}
                      />
                      <div className="line"></div>
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
