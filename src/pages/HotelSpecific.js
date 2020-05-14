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
  const [modalOpen, setModalOpen] = useState(false);
  const [dates, setDates] = useState(new Date());
  const [activeMarker, setActiveMarker] = useState();
  const [activeHotel, setActiveHotel] = useState();
  const [showingInfoWindow, setShowingInfoWindow] = useState(false);
  const hotel = hotels.find(hotel => hotel.id === parseInt(id), 10);

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

  return (
    <>
      <div className={modalOpen ? 'modal' : 'modal__closed'}>
        <button className="closeModal" onClick={closeModal}>
          <div className="bar1"></div>
          <div className="bar2"></div>
        </button>
        <h2>Establishment</h2>
        <h3>{hotel.establishmentName}</h3>
        <div className="form">
          <form method="POST" action="enquiry-success.php">
            <label htmlFor="clientName">Full name</label>
            <input type="text" name="clientName" id="clientName" />
            <label htmlFor="email">Email Address</label>
            <input type="text" name="email" id="email" />
            <label>Check-in & Check-out</label>
            <Calendar
              name="checkin"
              id="checkin"
              onChange={checkedDates}
              value={dates}
              selectRange={true}
              minDate={new Date()}
              maxDate={addYears(new Date(), 1)}
              minDetail="year"
            />
            <button type="submit">Submit</button>
          </form>
        </div>
        <img src={cabin_mobile} alt="illustration" />
      </div>

      <div className={modalOpen ? 'contact-blur' : 'contact'}>
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

        <div
          className={
            modalOpen
              ? 'container__inner modal'
              : 'container__inner modal__closed'
          }
        ></div>

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
              console.log(props);
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
    </>
  );
}
export default GoogleApiWrapper({
  apiKey: 'AIzaSyCRM5Te1P06jmywUUMW9EHQPBEtMcXFBkc',
})(HotelSpecific);
