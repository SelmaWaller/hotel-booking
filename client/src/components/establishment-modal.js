import React, {useState} from 'react';
import user_icon_black from '../svgs/icons/user_icon_black.svg';
import cabin_mobile from '../images/cabin_mobile.png';
import {ADD_ESTABLISHMENTS_SUCCESS} from '../constants/constants';
const maxChars = 150;

const EstablishmentModal = ({modalOpen, setModalOpen, establishments}) => {
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState(true);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(true);
  const [image, setImage] = useState('');
  const [imageError, setImageError] = useState(true);
  const [price, setPrice] = useState('');
  const [priceError, setPriceError] = useState(true);
  const [guests, setGuests] = useState('');
  const [guestError, setGuestError] = useState(true);
  const [googleLat, setGoogleLat] = useState('');
  const [googleLatError, setGoogleLatError] = useState(true);
  const [googleLng, setGoogleLng] = useState('');
  const [googleLngError, setGoogleLngError] = useState(true);
  const [description, setDescription] = useState('');
  const [charLimit, setCharLimit] = useState(false);
  const [switchButton, setSwitchButton] = useState(true);
  const [count, setCount] = useState(maxChars);

  let handleChange = (input) => {
    let name = input.target.name;
    let value = input.target.value;
    let namePattern = /^([a-zæøåA-ZÆØÅ ]{3,25})$/;
    let emailPattern = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;
    let imagePattern = /^(http)\S*$/;
    let coordinatesPattern = /^([0-9]{1,2})+\.([0-9]{5,})$/;
    let charPattern = /^(.{0,150})$/;

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
        setCount(maxChars - value.length);
        setCharLimit(!charPattern.test(value));
        setDescription(value);
        break;
      default:
        break;
    }
  };

  let closeModal = () => {
    setModalOpen(false);
  };

  let toggleSwitch = () => {
    setSwitchButton(!switchButton);
  };

  return (
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
          <input onChange={handleChange} type="text" name="establishmentName" />
          <p className={nameError ? 'error' : 'error__hidden'}>
            Max 25 letters, no special characters
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
          <div className="small-input">
            <label htmlFor="price">Price per night</label>
            <input
              type="number"
              name="price"
              min="1"
              max="999"
              onChange={handleChange}
            />
            <span>$</span>
          </div>
          <p className={priceError ? 'error' : 'error__hidden'}>
            This field cannot be empty
          </p>
          <div className="small-input__guests">
            <label htmlFor="maxGuests">Max guests</label>
            <input
              onChange={handleChange}
              type="number"
              name="maxGuests"
              min="1"
            />
            <img src={user_icon_black} alt="icon" />
          </div>
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
          <div className="description">
            <label htmlFor="description">Description</label>
            <textarea
              onChange={handleChange}
              name="description"
              rows="5"
              cols="80"
              placeholder="A brief description about the accommodation"
            ></textarea>
            <div className="description__limit">
              <p className={charLimit ? 'limit__over' : 'limit'}>{count}</p>
            </div>
          </div>
          <label htmlFor="selfCatering">Self-catering</label>
          <div className="switch">
            <div className={switchButton ? 'switch__on' : 'switch__on--hidden'}>
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
          <button
            name="id"
            value={establishments.length + 1}
            type="submit"
            disabled={
              nameError ||
              emailError ||
              imageError ||
              priceError ||
              guestError ||
              googleLatError ||
              googleLngError ||
              charLimit
            }
          >
            Submit
          </button>
        </form>
      </div>
      <img src={cabin_mobile} alt="illustration" />
    </div>
  );
};

export default EstablishmentModal;
