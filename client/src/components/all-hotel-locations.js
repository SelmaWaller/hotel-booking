import React, {useState} from 'react';
import {Link, BrowserRouter} from 'react-router-dom';
import {Map, InfoWindow, GoogleApiWrapper, Marker} from 'google-maps-react';

import user_icon_black from '../svgs/icons/user_icon_black.svg';
const AllHotelLocations = ({hotels, google}) => {
  const [activeMarker, setActiveMarker] = useState();
  const [hotelId, setHotelId] = useState();
  const [activeHotel, setActiveHotel] = useState();
  const [showingInfoWindow, setShowingInfoWindow] = useState(false);

  const center = {
    lat: 60.3927206,
    lng: 5.2815214,
  };
  return (
    <Map
      containerStyle={{height: 300, width: '100%'}}
      google={google}
      initialCenter={center}
      zoom={10}
      onClick={() => {
        setShowingInfoWindow(false);
      }}
    >
      {hotels.map(hotel => (
        <Marker
          onClick={(props, marker) => {
            setActiveMarker(marker);
            setActiveHotel(hotel);
            setShowingInfoWindow(true);
            setHotelId(hotel.id);
            console.log(props);
          }}
          name={hotel.establishmentName}
          key={hotel.id}
          position={{lat: hotel.googleLat, lng: hotel.googleLong}}
        />
      ))}

      {activeMarker && activeHotel && (
        <InfoWindow marker={activeMarker} visible={showingInfoWindow}>
          <div className="google-hotel-info">
            <h3>{activeHotel.establishmentName}</h3>
            <div className="paired">
              <img src={user_icon_black} alt="icon" />
              <p>{activeHotel.maxGuests}</p>
              <p>${activeHotel.price}</p>
            </div>
            <BrowserRouter>
              <Link to={`/hotel-specific/${hotelId}`}>
                <button>See more</button>
              </Link>
            </BrowserRouter>
          </div>
        </InfoWindow>
      )}
    </Map>
  );
};

export default GoogleApiWrapper({
  apiKey: 'AIzaSyCRM5Te1P06jmywUUMW9EHQPBEtMcXFBkc',
})(AllHotelLocations);
