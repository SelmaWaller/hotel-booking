import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Map, InfoWindow, GoogleApiWrapper, Marker} from 'google-maps-react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import {addYears} from 'date-fns';

import SingleHotel from '../components/single-hotel';
import cabin_mobile from '../images/cabin_mobile.png';

import {ESTABLISHMENT_API, ENQUIRY_SUCCESS} from '../constants/constants';

function HotelSpecific({
  google,
  match: {
    params: {id},
  },
}) {
  const [hotel, setHotel] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [dates, setDates] = useState(new Date());
  const [activeMarker, setActiveMarker] = useState();
  const [activeHotel, setActiveHotel] = useState();
  const [showingInfoWindow, setShowingInfoWindow] = useState(false);

  const [clientNameError, setClientNameError] = useState(true);
  const [emailError, setEmailError] = useState(true);
  const [adultGuests, setAdultGuests] = useState(1);
  const [childGuests, setChildGuests] = useState(0);

  useEffect(() => {
    axios
      .get(ESTABLISHMENT_API + `?id=${parseFloat(id)}`)
      .then((hotelResult) => {
        setHotel(hotelResult.data);
      });
  }, [id]);

  let handleChange = (input) => {
    let name = input.target.name;
    let value = input.target.value;
    let namePattern = /^([a-zA-Z-æøåÆØÅ']{2,})+([ ]{1})+([a-zæøåA-ZÆØÅ '-]{2,})$/;
    let emailPattern = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;

    switch (name) {
      case 'clientName':
        setClientNameError(!namePattern.test(value));
        break;
      case 'email':
        setEmailError(!emailPattern.test(value));
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

  const checkedDates = (dates) => {
    setDates(dates);
    console.log(`check in; ${dates[0]}`);
    console.log(`check out: ${dates[1]}`);
  };

  const inDate = new Date(dates[0]);
  let yearIn = inDate.getFullYear();
  let monthIn = String(inDate.getMonth() + 1).padStart(2, '0');
  let dateIn = String(inDate.getDate()).padStart(2, '0');

  const outDate = new Date(dates[1]);
  let yearOut = outDate.getFullYear();
  let monthOut = String(outDate.getMonth() + 1).padStart(2, '0');
  let dateOut = String(outDate.getDate()).padStart(2, '0');

  let checkInDate = `${yearIn}-${monthIn}-${dateIn}`;
  let checkOutDate = `${yearOut}-${monthOut}-${dateOut}`;

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
            action={ENQUIRY_SUCCESS}
            onSubmit={() => {
              alert('*receipt popup*');
            }}
          >
            <div className="title">
              <input
                type="text"
                name="establishment"
                defaultValue={hotel.establishmentName}
                readOnly
              />
            </div>
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
            <label htmlFor="checkinout">Check-in & Check-out</label>
            <Calendar
              name="checkinout"
              onChange={checkedDates}
              value={dates}
              selectRange={true}
              minDate={new Date()}
              maxDate={addYears(new Date(), 1)}
              minDetail="year"
            />
            <div className="paired">
              <div
                className={
                  dates[0] ? 'date-inputs' : 'date-inputs__placeholder'
                }
              >
                <input
                  type="text"
                  name="checkin"
                  readOnly
                  value={
                    dates[0] ? checkInDate : 'Please select dates for your stay'
                  }
                />
                <span className={dates[0] ? 'hasDates' : 'hasDates__hidden'}>
                  {' '}
                  —{' '}
                </span>
                <input
                  type="text"
                  name="checkout"
                  readOnly
                  value={dates[0] ? checkOutDate : ''}
                />
              </div>
            </div>
            <div className="adultsAndChildren">
              <div className="adults">
                <label htmlFor="adults">Adults</label>
                <div className="guests">
                  <div className="guest-counter">
                    <input
                      onChange={handleChange}
                      type="number"
                      name="adults"
                      min="1"
                      max="20"
                      value={adultGuests}
                      readOnly
                    />
                    <button
                      className="addGuest"
                      onClick={(event) => {
                        event.preventDefault();
                        if (adultGuests <= 19) {
                          setAdultGuests(adultGuests + 1);
                        }
                      }}
                      disabled={adultGuests === 20}
                    >
                      <span>+</span>
                    </button>
                    <button
                      className="removeGuest"
                      onClick={(event) => {
                        event.preventDefault();
                        if (adultGuests >= 2) {
                          setAdultGuests(adultGuests - 1);
                        }
                      }}
                      disabled={!adultGuests || adultGuests === 1}
                    >
                      <span>-</span>
                    </button>
                  </div>
                </div>
              </div>

              <div className="children">
                <label htmlFor="children">Children</label>
                <div className="guests">
                  <div className="guest-counter">
                    <input
                      type="number"
                      name="children"
                      min="0"
                      max="20"
                      value={childGuests}
                      readOnly
                    />
                    <button
                      className="addGuest"
                      onClick={(event) => {
                        event.preventDefault();
                        if (childGuests <= 19) {
                          setChildGuests(childGuests + 1);
                        }
                      }}
                      disabled={childGuests === 20}
                    >
                      <span>+</span>
                    </button>
                    <button
                      className="removeGuest"
                      onClick={(event) => {
                        event.preventDefault();
                        if (childGuests >= 1) {
                          setChildGuests(childGuests - 1);
                        }
                      }}
                      disabled={!childGuests || childGuests === 0}
                    >
                      <span>-</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="notes">
              <label htmlFor="notes">Notes</label>
              <textarea
                name="notes"
                rows="5"
                cols="80"
                placeholder="Additional notes to the accommodation owner"
              ></textarea>
            </div>

            <button
              name="time"
              value={new Date()}
              type="submit"
              disabled={clientNameError || emailError || !dates[0]}
            >
              Submit
            </button>
          </form>
        </div>
        <img src={cabin_mobile} alt="illustration" />
      </div>
      <div className={modalOpen ? 'specific-blur' : 'specific'}>
        <SingleHotel
          name={hotel.establishmentName}
          image={hotel.imageUrl}
          guests={hotel.maxGuests}
          price={hotel.price}
          catering={hotel.selfCatering}
          email={hotel.establishmentEmail}
          description={hotel.description}
        />
        <div className="container__inner container__outer enquiry-button">
          <button onClick={openModal}>Make enquiry</button>
        </div>

        <div className="google-map google-map__single">
          <Map
            containerStyle={{height: 300, width: '100%'}}
            google={google}
            center={{lat: hotel.googleLat, lng: hotel.googleLong}}
            zoom={15}
          >
            <Marker
              onClick={(props, marker) => {
                setActiveMarker(marker);
                setActiveHotel(hotel);
                setShowingInfoWindow(true);
              }}
              key={hotel.id}
              position={{lat: hotel.googleLat, lng: hotel.googleLong}}
            />

            {activeMarker && activeHotel && (
              <InfoWindow marker={activeMarker} visible={showingInfoWindow}>
                <div className="google-hotel-info">
                  <h3>Coordinates:</h3>
                  <p>Lat: {activeHotel.googleLat}</p>
                  <p>Lng: {activeHotel.googleLong}</p>
                </div>
              </InfoWindow>
            )}
          </Map>
        </div>
      </div>
    </>
  );
}
export default GoogleApiWrapper({
  apiKey: 'AIzaSyCRM5Te1P06jmywUUMW9EHQPBEtMcXFBkc',
})(HotelSpecific);
