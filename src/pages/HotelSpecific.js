import React, {useState} from 'react';
import {Map, InfoWindow, GoogleApiWrapper, Marker} from 'google-maps-react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import {addYears} from 'date-fns';

import SingleHotel from '../components/single-hotel';
import hotels from '../lib/establishments.json';
import cabin_mobile from '../images/cabin_mobile.png';
function HotelSpecific({
  google,
  match: {
    params: {id},
  },
}) {
  const hotel = hotels.find(hotel => hotel.id === parseInt(id), 10);

  const [modalOpen, setModalOpen] = useState(false);
  const [dates, setDates] = useState(new Date());
  const [activeMarker, setActiveMarker] = useState();
  const [activeHotel, setActiveHotel] = useState();
  const [showingInfoWindow, setShowingInfoWindow] = useState(false);

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

  const toggleModal = () => {
    window.scrollTo(0, 0);
    setModalOpen(!modalOpen);
  };

  let closeModal = () => {
    setModalOpen(false);
  };

  const checkedDates = dates => {
    setDates(dates);
    console.log(`check in; ${dates[0]}`);
    console.log(`check out: ${dates[1]}`);
  };

  const inDate = new Date(dates[0]);
  let dateIn = String(inDate.getDate()).padStart(2, '0');
  let monthIn = String(inDate.getMonth() + 1).padStart(2, '0');
  let yearIn = inDate.getFullYear();

  const outDate = new Date(dates[1]);
  let dateOut = String(outDate.getDate()).padStart(2, '0');
  let monthOut = String(outDate.getMonth() + 1).padStart(2, '0');
  let yearOut = outDate.getFullYear();

  let checkInDate = `${dateIn}.${monthIn}.${yearIn} — `;
  let checkOutDate = `${dateOut}.${monthOut}.${yearOut}`;
  return (
    <>
      <div className={modalOpen ? 'modal' : 'modal__closed'}>
        <button className="closeModal" onClick={closeModal}>
          <div className="bar1"></div>
          <div className="bar2"></div>
        </button>
        <div className="form">
          <form method="POST" action="enquiry-success.php">
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
            <label>Check-in & Check-out</label>
            <Calendar
              name="checkinout"
              id="checkinout"
              onChange={checkedDates}
              value={dates}
              selectRange={true}
              minDate={new Date()}
              maxDate={addYears(new Date(), 1)}
              minDetail="year"
            />
            <div className="paired">
              <div className={dates[0] ? 'date-inputs' : 'date-inputs__hidden'}>
                <input
                  type="text"
                  name="checkin"
                  readOnly
                  value={checkInDate}
                />
                <input
                  type="text"
                  name="checkout"
                  readOnly
                  value={checkOutDate}
                />
              </div>
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
        <img src={cabin_mobile} alt="illustration" />
      </div>
      <div className={modalOpen ? 'title' : 'title__closed'}>
        <h3>Establishment</h3>
        <h2>{hotel.establishmentName}</h2>
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
        <div className="container__inner enquiry-button">
          <button onClick={toggleModal}>Make enquiry</button>
        </div>

        <div className="google-map">
          <Map
            containerStyle={{height: 300, width: '100%'}}
            google={google}
            initialCenter={{lat: hotel.googleLat, lng: hotel.googleLong}}
            zoom={12}
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
