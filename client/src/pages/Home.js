import React, {useEffect, useState} from 'react';
import axios from 'axios';
import ReactLoading from 'react-loading';
import Collapsible from 'react-collapsible';

import Illustration from '../components/illustration';
import SearchBar from '../components/search-bar';
import Hotels from '../components/hotels';
import AllHotelLocations from '../components/all-hotel-locations';

import user_icon_light from '../svgs/icons/user_icon_light.svg';
import ReactSlider from 'react-slider';
import {ESTABLISHMENTS_API} from '../constants/constants';

export default function Home() {
  const [hotels, setHotels] = useState([]);
  const [filteredGuests, setFilteredGuests] = useState(1);
  const [filteredPrice, setFilteredPrice] = useState({min: 0, max: 300});
  const [filteredMatches, setFilterMatches] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [sortedLow, setSortedLow] = useState(undefined);

  useEffect(() => {
    axios.get(ESTABLISHMENTS_API).then((hotels) => {
      setHotels(
        hotels.data.sort(function (low, high) {
          return high.id - low.id;
        })
      );
    });
  }, []);

  let handleFilter = () => {
    setNoResults(true);
    const filter = hotels.filter(
      (hotel) =>
        parseFloat(hotel.price) >= filteredPrice.min &&
        parseFloat(hotel.price) <= filteredPrice.max &&
        parseFloat(hotel.maxGuests) >= filteredGuests
    );

    setFilterMatches(filter);
  };

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
            <Collapsible trigger="Filter hotels">
              <div className="filter-box">
                <div className="options-grid">
                  <div className="sort-price">
                    <p>Sort price</p>
                    <div className="switch">
                      <div className={sortedLow ? 'switch__on' : 'switch__off'}>
                        <input
                          type="checkbox"
                          onClick={() => {
                            setSortedLow(!sortedLow);
                            hotels.sort(function (low, high) {
                              if (sortedLow === true) {
                                return low.price - high.price;
                              } else {
                                return high.price - low.price;
                              }
                            });
                            handleFilter();
                          }}
                        />
                        <p>{sortedLow ? 'High' : 'Low'}</p>
                        <div className="switchThumb"></div>
                      </div>
                    </div>
                  </div>
                  <div className="guests">
                    <p>Min guests</p>
                    <div className="guest-counter">
                      <input
                        name="guests"
                        type="number"
                        defaultValue={1}
                        min="1"
                        max="99"
                        onChange={(input) => {
                          setFilteredGuests(input.target.value);
                          handleFilter();
                        }}
                      />
                      <img src={user_icon_light} alt="guests" />
                    </div>
                  </div>
                  <div className="reset-button">
                    <button
                      onClick={() => {
                        setFilterMatches([]);
                        setNoResults(false);
                        hotels.sort(function (low, high) {
                          return high.id - low.id;
                        });
                      }}
                    >
                      Show all
                    </button>
                  </div>
                </div>

                <p>Price range</p>
                <div className="slider-container">
                  <ReactSlider
                    className="slider"
                    thumbClassName="slider__thumb"
                    trackClassName="slider__track"
                    defaultValue={[0, 200]}
                    min={0}
                    max={200}
                    step={10}
                    onChange={(newValue) => {
                      setFilteredPrice({min: newValue[0], max: newValue[1]});
                      handleFilter();
                    }}
                    renderThumb={(props, state) => (
                      <div className="currentValue" {...props}>
                        {`$` + state.valueNow}
                      </div>
                    )}
                    pearling
                    minDistance={10}
                  />
                </div>
              </div>
            </Collapsible>
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
