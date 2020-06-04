import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Map, InfoWindow, GoogleApiWrapper, Marker} from 'google-maps-react';
import 'react-calendar/dist/Calendar.css';

import SingleHotel from '../components/single-hotel';
import EnquiryModal from '../components/enquiry-modal';
import {ESTABLISHMENT_API} from '../constants/constants';

function HotelSpecific({
  google,
  match: {
    params: {id},
  },
}) {
  const [hotel, setHotel] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [activeMarker, setActiveMarker] = useState();
  const [activeHotel, setActiveHotel] = useState();
  const [showingInfoWindow, setShowingInfoWindow] = useState(false);

  useEffect(() => {
    axios
      .get(ESTABLISHMENT_API + `?id=${parseFloat(id)}`)
      .then((hotelResult) => {
        setHotel(hotelResult.data);
        document.title = `Holidaze | ${hotelResult.data.establishmentName}`;
      });
  }, [id]);

  const openModal = () => {
    window.scrollTo(0, 0);
    setModalOpen(!modalOpen);
  };

  return (
    <>
      <EnquiryModal
        hotel={hotel}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
      />
      <div className={modalOpen ? 'specific-blur' : 'specific'}>
        <SingleHotel
          name={hotel.establishmentName}
          image={hotel.imageUrl}
          guests={hotel.maxGuests}
          price={hotel.price}
          catering={hotel.selfCatering}
          email={hotel.establishmentEmail}
          description={hotel.description}
          openModal={openModal}
        />

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
