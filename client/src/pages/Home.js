import React, {useEffect, useState} from 'react';
import axios from 'axios';
import ReactLoading from 'react-loading';

import Illustration from '../components/illustration';
import SearchBar from '../components/search-bar';
import Hotels from '../components/hotels';
import AllHotelLocations from '../components/all-hotel-locations';
import HotelFilter from '../components/hotel-filter';
import {ESTABLISHMENTS_API} from '../constants/constants';

export default function Home() {
  const [hotels, setHotels] = useState([]);
  const [filteredMatches, setFilterMatches] = useState([]);
  const [noResults, setNoResults] = useState(false);

  useEffect(() => {
    document.title = 'Holidaze | Home';
    axios.get(ESTABLISHMENTS_API).then((hotels) => {
      setHotels(
        hotels.data.sort(function (low, high) {
          return high.id - low.id;
        })
      );
    });
  }, []);

  return (
    <>
      <div className="home-illustration">
        <Illustration />
      </div>
      <div className="container__outer">
        <header className="container__inner">
          <div className="header">
            <h1>BERGEN</h1>
            <p>
              Explore the city of Norway <br />
              surrounded by The Seven Mountains
            </p>
            <SearchBar hotels={hotels} />
          </div>
        </header>
      </div>

      <main className="content-animation">
        <div className="container__outer">
          <section>
            <HotelFilter
              hotels={hotels}
              setFilterMatches={setFilterMatches}
              setNoResults={setNoResults}
            />
          </section>

          {filteredMatches.length === 0 ? (
            hotels ? (
              <>
                <div className="container__inner filter-status">
                  <h3>
                    {noResults
                      ? 'No results, showing all hotels:'
                      : 'All hotels:'}
                  </h3>
                </div>
                <div className="grid all-hotels">
                  {hotels.map((hotel, index) => {
                    return (
                      <div className="card" key={index}>
                        <Hotels
                          key={index}
                          img={hotel.imageUrl}
                          name={hotel.establishmentName}
                          price={hotel.price}
                          guests={hotel.maxGuests}
                          selfCatering={hotel.selfCatering}
                          id={hotel.id}
                        />
                      </div>
                    );
                  })}
                </div>
              </>
            ) : (
              <div className="loading-circle">
                <ReactLoading
                  type={'spinningBubbles'}
                  color={'#ffc69c'}
                  height={100}
                  width={100}
                />
              </div>
            )
          ) : (
            <>
              <div className="container__inner  filter-status">
                <h3>Filtered results:</h3>
              </div>
              <div className="grid all-hotels">
                {filteredMatches.map((hotel, index) => {
                  return (
                    <div className="card" key={index}>
                      <Hotels
                        key={index}
                        img={hotel.imageUrl}
                        name={hotel.establishmentName}
                        price={hotel.price}
                        guests={hotel.maxGuests}
                        selfCatering={hotel.selfCatering}
                        id={hotel.id}
                      />
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>

        <div className="google-map">
          {filteredMatches.length === 0 ? (
            <AllHotelLocations hotels={hotels} />
          ) : (
            <AllHotelLocations hotels={filteredMatches} />
          )}
        </div>
      </main>
    </>
  );
}
