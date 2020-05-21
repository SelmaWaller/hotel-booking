import React, {useEffect, useState} from 'react';
import axios from 'axios';
import ReactLoading from 'react-loading';

import cabin_mobile from '../../images/cabin_mobile.png';
import {
  ESTABLISHMENTS_API,
  ADD_ESTABLISHMENTS_SUCCESS,
} from '../../constants/constants';
import MyEstablishments from '../../components/my-establishments';

const minChars = 20;

export default function Establishments() {
  const [modalOpen, setModalOpen] = useState(true);
  const [establishments, setEstablishments] = useState([]);
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState(true);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(true);
  const [image, setImage] = useState('');
  const [imageError, setImageError] = useState(true);
  const [price, setPrice] = useState('');
  const [priceError, setPriceError] = useState(true);
  const [guests, setGuests] = useState(true);
  const [guestError, setGuestError] = useState(true);
  const [googleLat, setGoogleLat] = useState('');
  const [googleLatError, setGoogleLatError] = useState(true);
  const [googleLng, setGoogleLng] = useState('');
  const [googleLngError, setGoogleLngError] = useState(true);
  const [description, setDescription] = useState('');
  const [descriptionError, setDescriptionError] = useState(true);
  const [switchButton, setSwitchButton] = useState(true);
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
    let imagePattern = /^(http)\S*$/;
    let coordinatesPattern = /^([0-9]{1,2})+\.([0-9]{5,})$/;
    let descriptionPattern = /^(.{20,})$/;

    switch (name) {
      case 'establishmentName':
        setNameError(!namePattern.test(value));
        setName(value);
        break;
      case 'establishmentEmail':
        setEmailError(!emailPattern.test(value));
        setEmail(value);
        break;
      case 'imageUrl':
        setImageError(!imagePattern.test(value));
        setImage(value);
        break;
      case 'price':
        setPriceError(!value > 1);
        setPrice(value);
        break;
      case 'maxGuests':
        setGuestError(!value > 1);
        setGuests(value);
        break;
      case 'googleLat':
        setGoogleLatError(!coordinatesPattern.test(value));
        setGoogleLat(value);
        break;
      case 'googleLong':
        setGoogleLngError(!coordinatesPattern.test(value));
        setGoogleLng(value);
        break;
      case 'description':
        setCount(minChars - value.length);
        setDescriptionError(!descriptionPattern.test(value));
        setDescription(value);
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

  let toggleSwitch = () => {
    setSwitchButton(!switchButton);
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
            action={ADD_ESTABLISHMENTS_SUCCESS}
            onSubmit={() => {
              alert(
                `Establishment successfully published \n\nEstablishment: ${name} \nEmail: ${email} \nImage URL: ${image} \nPrice: ${price} \nGuests: ${guests} \nLatitude: ${googleLat} \nLongitude: ${googleLng} \nDescription: ${description} \nSelf-catering: ${
                  switchButton ? 'Yes' : 'No'
                }`
              );
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
            <p className={imageError ? 'error' : 'error__hidden'}>
              Must be a valid URL
            </p>
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
              <div
                className={switchButton ? 'switch__on' : 'switch__on--hidden'}
              >
                <input
                  onClick={toggleSwitch}
                  type="radio"
                  name="selfCatering"
                  value={false}
                />
                <span>Yes</span>
                <div className="switchThumb"></div>
              </div>

              <div
                className={switchButton ? 'switch__off--hidden' : 'switch__off'}
              >
                <input
                  onClick={toggleSwitch}
                  type="radio"
                  name="selfCatering"
                  value={true}
                  defaultChecked={true}
                />
                <span>No</span>
                <div className="switchThumb"></div>
              </div>
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
