import React, {useState} from 'react';
import {Map, GoogleApiWrapper, Marker} from 'google-maps-react';
import Calendar from 'react-calendar';

import SingleHotel from '../components/single-hotel';
import hotels from '../lib/establishments.json';
import EnquiryModal from '../components/enquiry-modal';

function HotelSpecific({
  google,
  match: {
    params: {id},
  },
}) {
  const [date, setDate] = useState(new Date());

  const hotel = hotels.find(hotel => hotel.id === parseInt(id), 10);

  const checkInDate = date => {
    setDate(date);
    console.log(date);
  };

  return (
    <div className="contact">
      <SingleHotel
        name={hotel.establishmentName}
        image={hotel.imageUrl}
        guests={hotel.maxGuests}
        price={hotel.price}
        catering={hotel.selfCatering}
        email={hotel.establishmentEmail}
        description={hotel.description}
      />

      <EnquiryModal
        name={hotel.establishmentName}
        calendarCheckIn={
          <Calendar
            name="checkin"
            id="checkin"
            onChange={checkInDate}
            value={date}
          />
        }
        calendarCheckOut={
          <Calendar
            name="checkout"
            id="checkout"
            onChange={checkInDate}
            value={date}
          />
        }
      />

      <Map
        containerStyle={{height: 300, width: '100%'}}
        google={google}
        initialCenter={{lat: hotel.googleLat, lng: hotel.googleLong}}
        zoom={12}
      >
        <Marker
          name={hotel.establishmentName}
          key={hotel.id}
          position={{lat: hotel.googleLat, lng: hotel.googleLong}}
        />
      </Map>
    </div>
  );
}
export default GoogleApiWrapper({
  apiKey: 'AIzaSyCRM5Te1P06jmywUUMW9EHQPBEtMcXFBkc',
})(HotelSpecific);
