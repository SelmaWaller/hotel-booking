import React from 'react';
import {Map, GoogleApiWrapper, Marker} from 'google-maps-react';

import SingleHotel from '../components/single-hotel';
import hotels from '../lib/establishments.json';
import EnquiryModal from '../components/enquiry-modal';

function HotelSpecific({
  google,
  match: {
    params: {id},
  },
}) {
  const hotel = hotels.find(hotel => hotel.id == id);
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

      <EnquiryModal name={hotel.establishmentName} />

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
